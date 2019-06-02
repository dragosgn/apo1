<template>
  <v-app>
    <v-container>
      <v-layout row>
        <v-flex pl-4>
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

        <v-flex pl-4>
          <v-switch color="red darken-2" v-model="sex" :label='sex?"singles":"all"'></v-switch>
        </v-flex>
      </v-layout>
      <v-layout row align-center>
        <v-flex xs-6>
          <v-select :items="['Frauenarzt','Männerarzt']" label="Fachrichtung"></v-select>
        </v-flex>
        <v-flex xs-6 pl-3>
          <v-btn block to="/app/acts" style="color:white" color="#1B777D">Switch to Feed</v-btn>
        </v-flex>
      </v-layout>


      <no-ssr>
        <l-map class="mini-map" :zoom="13" :center="[users[0].lat_lon[0],users[0].lat_lon[1]]">
          <l-tile-layer
            url="https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
          ></l-tile-layer>

          <div v-for="(loc_types,idx) in locs" :key="idx">
            <l-marker v-for="user in (loc_types)" :lat-lng="[user.lat_lon[0],user.lat_lon[1]]">
              <l-icon :icon-anchor=" [50/2, 0]">
                <v-badge overlap bottom color="transparent" style="background-color: transparent;">
                  <template
                    v-slot:badge
                    v-if="(user.id===1&&idx==='users')||user.hasOwnProperty('act')"
                  >
                    <v-icon large v-if="user.id===1" color="orange">star</v-icon>
                    <v-icon large v-if="user.hasOwnProperty('act')" color="#C72961">remove_red_eye</v-icon>
                  </template>
                  <v-card style="height:50px;  background-color: white">
                    <v-img height="50" width="50" :src="user.image" style="text-align: right"></v-img>
                  </v-card>
                </v-badge>
              </l-icon>
              <l-popup>
                <v-layout column style="text-align: center">
                  <v-card>
                    <img v-lazy="user.image" width="100">
                  </v-card>
                  <v-flex pt-1>
                    {{user.address}}
                    <br>
                    {{user.name}}
                  </v-flex>
                  <!--Description of the article-->
                  <!--Description of the article-->
                  <v-card
                    v-if="user.hasOwnProperty('act')"
                    :to="'/app/question?act='+user.act.id"
                    row
                    align-center
                    justify-start
                    fill-height
                    wight="100%"
                  >
                    <v-layout row pa-1>
                      <v-flex pa-1 xs3>
                        <v-sheet>
                          <v-img height="30px" contain :src="user.act.image"/>
                        </v-sheet>
                      </v-flex>
                      <v-flex pl-2>
                        <span style="color:#1B777D;font-style: italic">{{user.act.activity}}</span>
                        :
                        {{user.act.text}}
                      </v-flex>
                    </v-layout>
                    <v-layout align-right justify-end row pa-1 style="color:#C72961; size:10px">
                      <v-flex xs2>
                        <v-icon small color="#C72961">save_alt</v-icon>2
                      </v-flex>
                      <v-flex xs2>
                        <v-icon small color="#C72961">remove_red_eye</v-icon>23
                      </v-flex>
                      <v-flex xs2>
                        <v-icon small color="#C72961">comment</v-icon>3
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-layout>
              </l-popup>
            </l-marker>
          </div>
        </l-map>
      </no-ssr>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { users, banks, courses, acts } from "./jsons.js";

var api_host =
  "https://ohsrb65n38.execute-api.eu-central-1.amazonaws.com/proxy/";

// var api_host = "http://localhost:5000/";
// if (!location.hostname.includes("127.0.0.1") && !location.hostname.includes("localhost")) {
//   api_host = "http://localhost:5000";
// }

// import {icon} from "leaflet";

axios.defaults.headers.post = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
  "Content-Type": "application/json"
};
axios.defaults.method = "post";
var api_aindex = axios.create({
  url: api_host
});

export default {
  data: () => ({
    // Travel time describes the stage on which it is traveling
    users: users,
    banks: banks,
    acts: acts,
    locs: {
      banks: banks,
      users: users,
      courses: courses
    },
    travel_time: 0,
    sex: true,
    sources: {
      true: "scout",
      false: "airbnb"
    },
    toggle_exclusive: 0,
    long_stay: true,
    max_price: {
      true: 1500,
      false: 200
    },
    age: 35,

    markers: [[], [], []],
    style: {
      color: "#000",
      weight: 1,
      opacity: 0.3,
      fillOpacity: 0.3
    },
    loading: false,
    geojsons: [{ type: "Point", coordinates: [8.43586, 49.01273] }]
  }),
  methods: {
    get_data: function(start_loc) {
      this.loading = true;
      this.geojsons = [];
      this.markers = [[], [], []];
      api_aindex(
        {
          data: JSON.parse(
            JSON.stringify({
              start: [start_loc[1], start_loc[0]],
              source: this.sources[this.long_stay]
            })
          )
        }
        //"https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson"
      ).then(response => {
        console.log("Fetching");
        this.geojsons = response.data["polygons"];
        this.markers = response.data["locs"];
        this.loading = false;
      });
    }
  },
  watch: {},
  computed: {},
  created() {
    for (let i = 0; i < acts.length; i++) {
      let user = acts[i].user;
      this.users[user].act = acts[i];
      this.users[user].act.id = i;
    }
  }
};
</script>

<style scoped>
.mini-map {
  width: 100%;
  height: 50vh !important;
}
</style>
