<template>
    <v-app>
        <v-container>

            <v-layout row>
                <v-flex  pl-4>
                    <v-slider
                            wrap
                        color="orange darken-1"
                        :label="'Age: ' + age"
                        v-model="age"
                        step="1"
                        max="100"
                        min="30"

                        thumb-label="always"
                ></v-slider>
                </v-flex>


                <v-layout v-if="false" align-center justify-center fill-height column>
                    <v-flex xs12>
                        <v-layout row wrap>

                            <v-btn
                                    :disabled="loading"
                                    color="orange darken-1" v-for="(sr, idx) in source" @click="toggle_exclusive= idx"
                                    :key="idx">

                                <v-img height="30" contain :src="sr.logo"></v-img>
                                {{sr.name}}
                            </v-btn>
                        </v-layout>


                    </v-flex>
                    <v-flex xs12>
                        <v-layout row justify-space-between>
                            <v-flex xs4>
                                <v-select
                                        value="public transpor"
                                        :items="['public transpor']"
                                        disabled
                                ></v-select>

                            </v-flex>

                            <v-flex xs6>
                                <v-radio-group v-model="long_stay" color="orange darken-1" row>
                                    <v-radio
                                            color="orange darken-1"
                                            label="Source: AirBnb"
                                            :value="false"
                                    ></v-radio>
                                    <v-radio
                                            color="orange darken-1"
                                            label="Source: ImmoScout24"
                                            :value="true"
                                    ></v-radio>
                                </v-radio-group>
                            </v-flex>
                        </v-layout>

                    </v-flex>
                    <v-flex>
                        Apartments, that are easy to reach in 10, 20 and 30 min by public transport: <b color="organge">{{this.markers[this.travel_time].length}}</b>
                    </v-flex>
                </v-layout>
                <v-flex pl-4>
                     <v-switch
                        color="red darken-2"
                        v-model="sex"
                        :label='sex?"singles":"all"'
                ></v-switch>
                </v-flex>
                <v-flex pl-4>
                    <v-select
                              :items="['Frauenarzt','Männerarzt']"
                              label="Fachrichtung"
                    ></v-select>
                </v-flex>

            </v-layout>

            <template>
                <v-progress-linear color="orange darkern-1" :indeterminate="loading"></v-progress-linear>
            </template>

            <no-ssr>
                <l-map class="mini-map" :zoom=13 :center="[users[0].lat_lon[0],users[0].lat_lon[1]]">
                    <l-tile-layer
                            url="https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"></l-tile-layer>


                    <l-marker
                            v-for="user in (users)"
                            :lat-lng="[user.lat_lon[0],user.lat_lon[1]]"
                    >
                        <l-icon :icon-anchor=" [30/2, 0]">
                            <v-card style="height:30px; width: 30px; background-color: white">
                                <v-img height="30" width="30" :src="user.image"/>
                            </v-card>
                        </l-icon>
                        <l-popup>
                            <v-layout column style="text-align: center">
                                <v-card>
                                    <img
                                            v-lazy="user.image    "
                                            width="100"
                                    />
                                </v-card>
                                <v-flex pt-1>
                                    {{user.address}}
                                    <br/>
                                    {{user.name}}
                                </v-flex>
                            </v-layout>
                        </l-popup>

                    </l-marker>


                </l-map>
            </no-ssr>
        </v-container>

    </v-app>

</template>

<script>
  import axios from "axios";
  import Vue from "vue";
  import users from "./jsons.js";


  var api_host = 'https://ohsrb65n38.execute-api.eu-central-1.amazonaws.com/proxy/'

  ;
  // var api_host = "http://localhost:5000/";
  // if (!location.hostname.includes("127.0.0.1") && !location.hostname.includes("localhost")) {
  //   api_host = "http://localhost:5000";
  // }

  // import {icon} from "leaflet";

  axios.defaults.headers.post = {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
  };
  axios.defaults.method = 'post';
  var api_aindex = axios.create({
    url: api_host,
  });

  export default {
    data: () => ({
      // Travel time describes the stage on which it is traveling
      users: users,
      travel_time: 0,
      sex: true,
      sources: {
        true: 'scout',
        false: 'airbnb'
      },
      toggle_exclusive: 0,
      long_stay: true,
      max_price: {
        true: 1500,
        false: 200
      },
      age: 35,
      source:
          [
            {
              coords: [49.021615, 8.439576],
              name: 'CAS',
              logo: 'cas.png'
            },
            {
              coords: [49.011575, 8.417105],
              name: 'KIT',
              logo: 'KIT.png'
            },
            {
              coords: [49.005820, 8.405106],
              name: 'BFK',
              logo: 'BFK.png'
            },
            {
              coords: [48.980583, 8.330252],
              name: 'MES',
              logo: 'mes.png'
            },
            {
              coords: [52.520614, 13.401752],
              name: 'HACK',
              logo: 'https://www.egr.msu.edu/fraunhofer-ccd/sites/default/files/content/FH_SYMBOL.jpg'
            },
          ],
      markers: [[], [], []],
      style: {
        color: "#000",
        weight: 1,
        opacity: 0.3,
        fillOpacity: 0.3
      },
      loading: false,
      geojsons: [{'type': 'Point', 'coordinates': [8.43586, 49.01273]}],
    }),
    methods: {
      get_data: function (start_loc) {
        this.loading = true;
        this.geojsons = [];
        this.markers = [[], [], []];
        api_aindex({
              data: JSON.parse(JSON.stringify(
                  {
                    "start": [start_loc[1], start_loc[0]],
                    "source": this.sources[this.long_stay]
                  }))
            }
            //"https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson"
        )
            .then(response => {
              console.log('Fetching');
              this.geojsons = response.data['polygons'];
              this.markers = response.data['locs'];
              this.loading = false;
            });
      },
    },
    watch: {
    },
    computed: {
      currentRouteName() {
        return this.$route.name;
      },
      // icon_one() {
      //   return icon({
      //     iconUrl: this.source[this.toggle_exclusive].logo,
      //     iconSize: [25, 25],
      //     iconAnchor: [25/2, 25/2]
      //   })
      // }
    },
    created() {

    }
  };
</script>

<style scoped>
    .mini-map {
        width: 100%;
        height: 50vh !important;
    }
</style>