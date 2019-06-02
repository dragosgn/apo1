<template>
    <v-app>
        <v-container>


            <v-slider
                    color="orange darken-1"
                    :label="'Max Price: ' + price_slider +  ' EUR'"
                    v-model="price_slider"
                    :max="max_price[long_stay]"
                    step="5"
                    thumb-label="always"
            ></v-slider>
            <v-slider
                    color="orange darken-1"
                    :label="'Travel Time (30, 20 or till 10 min)'"
                    v-model="travel_time"
                    :max="2"
                    step="1"
                    thumb-label="always"
            ></v-slider>
            <v-layout align-center justify-center fill-height column>
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

            <v-switch
                    color="red darken-2"
                    v-model="new_search"
                    :label='(new_search?"AIndex apartments discovery: on":"AIndex apartments discovery: off")'
            ></v-switch>
            <template>
                <v-progress-linear color="orange darkern-1" :indeterminate="loading"></v-progress-linear>
            </template>

            <no-ssr>
                <l-map class="mini-map" :zoom=13 :center="source[toggle_exclusive].coords">
                    <l-tile-layer
                            url="https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"></l-tile-layer>
                    <l-marker :lat-lng="source[toggle_exclusive].coords"
                    >
                        <l-popup :content="source[toggle_exclusive].name"></l-popup>
                        <l-icon
                                :icon-anchor=" [30/2, 0]"
                        >
                            <v-card style="height:30px; width: 30px; background-color: white">
                                <v-img height="30" width="30" :src="source[toggle_exclusive].logo"/>
                            </v-card>
                        </l-icon>
                    </l-marker>
                    <l-geo-json :geojson="geojson" v-for="(geojson,idx) in geojsons" :key="idx"
                                :options-style="style">
                    </l-geo-json>
                    <div v-for="mark in (new_search?markers[travel_time]:scout_ka)">
                        <l-marker
                                v-if="mark.price<price_slider"
                                :lat-lng="[mark.coords.coordinates[1],mark.coords.coordinates[0]]"
                        >
                            <l-popup>
                                <v-layout column style="text-align: center">
                                    <v-card>
                                        <img
                                                v-lazy="mark.picture    "
                                                height="100" width="100"
                                        />
                                    </v-card>
                                    <v-flex pt-1>
                                        <a :href="mark.url" target="_blank">{{mark.price}} EUR</a>

                                    </v-flex>
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
      travel_time: 0,
      new_search: true,
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
      price_slider: 1500,
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
      scout_ka: [
        {
          'url': 'https://www.immobilienscout24.de/expose/110754525',
          'price': 1125.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/418a9434-5374-494a-a2d5-107c4754edd6-1285908606.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.3929, 48.99375]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/109825656',
          'price': 2500.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/7ff95f2d-5403-4220-a33e-80252d1e0f5c-1292547566.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.38154, 49.01043]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110752806',
          'price': 1500.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/6cf259a5-9204-45aa-8b56-bfc06615299a-1285926085.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.3929, 48.99375]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/108186226',
          'price': 1400.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/f805071b-1691-4679-be37-6122ad34250f-1250954441.jpg',
          'coords': {'type': 'Point', 'coordinates': [-97.38841, 32.71036]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110968484',
          'price': 505.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/154e6c03-6e02-462e-9399-c5531c9770a8-1287718110.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.33327, 49.00361]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/109807968',
          'price': 1950.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/6f24ce08-c1b1-47e2-94c4-2ceac6c7c5de-1285949256.jpg',
          'coords': {'type': 'Point', 'coordinates': [-50.70668, -16.50849]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111144881',
          'price': 650.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/d4ed394e-c13e-4fb0-b42c-e7b025087852-1289859159.jpg',
          'coords': {'type': 'Point', 'coordinates': [-50.70668, -16.50849]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111198689',
          'price': 2500.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/bd70fcc2-2cea-41de-90d9-72e9c68cbd21-1290595038.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29728, 55.9629]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/86771059',
          'price': 530.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/1e5e7cc7-e734-4ec0-a20a-71c0499e3825-999013863.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29806, 55.94431]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111303564',
          'price': 1060.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/3507dfa4-32f7-4e2c-9cdd-dc8f76bc40d7-1291898263.jpg',
          'coords': {'type': 'Point', 'coordinates': [-50.70668, -16.50849]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111018792',
          'price': 995.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/aaa7d28f-1aed-41b1-a0ef-7d5683246551-1288263754.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.42249, 49.0077]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111412797',
          'price': 925.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/302d968c-9404-4199-9b82-09ba077c4b65-1293233919.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/89676860',
          'price': 325.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/f35dc71d-2b27-42f1-85bc-a3525e18a8c8-1158827714.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.3365, 49.04466]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111391841',
          'price': 726.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/60a1b598-a86a-48d6-aac4-9009e36bffd8-1292967118.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.43241, 49.01039]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111353663',
          'price': 1050.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/0b5ea5ea-96c1-4b03-bf46-d3d1b773f843-1293152594.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29728, 55.9629]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111357781',
          'price': 550.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/0055f663-3d8f-48aa-8a66-f4bb7c04b82a-1292507349.jpg',
          'coords': {'type': 'Point', 'coordinates': [-97.33086, 32.75095]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110834256',
          'price': 350.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/b8334600-feaa-4a89-9478-fa2c41ec3865-1286195536.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.41038, 49.00011]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111257268',
          'price': 990.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/b4a13bed-2ea8-49db-aec6-565a39b6d043-1291309043.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111143180',
          'price': 440.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/2cb37a80-aa5c-4277-b751-ae7d29e5141b-1289839834.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.46086, 48.99602]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/106672219',
          'price': 790.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/4fa5d8dd-1bad-42da-886e-898b9ccdabbb-1230847940.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.2924, 55.94429]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/107068215',
          'price': 1600.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/b854dedb-5983-4a00-b884-0e64a16228c2-1264521052.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29728, 55.9629]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/101048736',
          'price': 54.9,
          'picture': 'https://pictures.immobilienscout24.de/listings/d7071981-786a-4ed0-9c11-37aeabe5e7ff-1278156963.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.39488, 49.0048]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111020607',
          'price': 870.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/39844dc9-fe86-4bf1-9d08-28356c52d6c5-1290387029.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.28059, 55.95653]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/108738077',
          'price': 510.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/a1f59d0e-19cf-4c42-809d-eb4fc4c9d519-1257664872.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.46829, 48.99922]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/108655709',
          'price': 500.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/07ebab86-1bbc-4205-b866-4cff02694d5c-1287075905.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.38576, 48.99694]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111275933',
          'price': 750.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/cb611512-7326-4f15-a6a4-3f12a2bcb34d-1291940870.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.33255, 55.95656]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111445127',
          'price': 470.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/513a6c2f-5ecc-4a7a-bfd4-a5fad3eab704-1293674262.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.3365, 49.04466]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111096743',
          'price': 1250.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/9d1ddfc3-a96b-4bc1-9be8-491ca2f4f01c-1289305222.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.39434, 49.01192]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/81466731',
          'price': 1400.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/828115e2-4a4e-45f6-b566-84ff949e23e2-915417539.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29728, 55.9629]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/104956502',
          'price': 930.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/68b620b7-cce7-4ece-90be-68bb04a5a225-1212203224.jpg',
          'coords': {'type': 'Point', 'coordinates': [-97.38841, 32.71036]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/91493660',
          'price': 550.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/2764ed4f-fdf8-446b-8526-62d44ae870bd-1293484431.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.38979, 49.00211]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111280465',
          'price': 860.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/14e5dfc5-2968-4d9e-b685-e85db8dd4279-1291570602.jpg',
          'coords': {'type': 'Point', 'coordinates': [-50.70668, -16.50849]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/94318749',
          'price': 1400.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/5feb50c0-5ad2-4769-9e1a-6fb368eb4394-1109266734.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29728, 55.9629]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/106802333',
          'price': 1250.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/1c22b9c2-ec7d-464d-a3ed-958d04e06fb3-1232715564.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.36377, 49.01293]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/106094014',
          'price': 1190.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/512a911b-db9b-43d9-8551-d73b14d7b86f-1291535234.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.41464, 49.0024]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/70294535',
          'price': 550.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/373fb3e8-4cdb-4ce3-8c75-179a21954e69-753907046.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.50804, 48.95536]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111160775',
          'price': 970.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/e13f8b3e-437a-4576-8966-f360efc5d19a-1290066003.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.3365, 49.04466]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/85925233',
          'price': 1850.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/821c5624-3643-4cee-9e89-8790f7a76b13-1283886790.jpg',
          'coords': {'type': 'Point', 'coordinates': [-50.70668, -16.50849]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111020208',
          'price': 540.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/26d5fc8c-1fb9-4cba-8e72-5be0d1910f0b-1288283401.jpeg',
          'coords': {'type': 'Point', 'coordinates': [8.39078, 49.01007]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111338707',
          'price': 1350.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/bd1f19e6-f7a7-47b1-91bb-119ec4b62d1e-1292294868.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.3494, 49.03241]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111229489',
          'price': 650.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/0835766c-c1e5-4ae6-9387-c68a8aa9b7db-1290955458.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.42359, 49.00931]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111449873',
          'price': 550.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/1c81c4a0-df90-422b-9128-fb0489baf301-1293716789.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29728, 55.9629]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111447486',
          'price': 560.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/3a9625a7-7a29-44bf-8063-591b9fe07eb0-1293694781.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.39036, 48.99295]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111437540',
          'price': 395.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/a938f3b4-62ff-4726-b51f-d4fa082b9d27-1293572667.jpg',
          'coords': {'type': 'Point', 'coordinates': [-97.38841, 32.71036]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111436531',
          'price': 1095.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/1142f95e-2bdc-4bff-8241-2f387a5a646b-1293551466.jpg',
          'coords': {'type': 'Point', 'coordinates': [-97.33086, 32.75095]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111436367',
          'price': 730.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/1b6b3a05-4d9b-4a35-a9b7-ddd7dd9d56fe-1293581876.png',
          'coords': {'type': 'Point', 'coordinates': [8.35732, 49.00574]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111434687',
          'price': 900.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/0c75f5ac-fd77-47bb-bfa4-262c0f9bc4f8-1293540245.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.2924, 55.94429]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111434683',
          'price': 1250.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/85f32666-bc93-45c1-81d8-79b2d810ba81-1293525078.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.2924, 55.94429]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111425048',
          'price': 990.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/cde09898-5b50-439d-82a2-913b46f47c0a-1293380175.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111422345',
          'price': 1380.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/651d1ee6-6133-4984-a222-585a32ea1715-1293629729.jpg',
          'coords': {'type': 'Point', 'coordinates': [-97.38841, 32.71036]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111421002',
          'price': 700.0,
          'coords': {'type': 'Point', 'coordinates': [8.3365, 49.04466]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111419628',
          'price': 380.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/c9135822-a260-4c40-9078-7b55e6c1a7da-1293304590.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.38, 49.00733]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111407365',
          'price': 250.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/b8006b72-f527-4b51-81a7-0cbc4dd7f32a-1293154892.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111403570',
          'price': 750.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/d52e56bf-4d84-4c7b-9b5c-5995d1bf81ba-1293082846.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.36164, 49.02646]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111402563',
          'price': 523.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/e16a16e9-3c6b-43b8-9bb4-1e77a54cdb00-1293074337.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.39428, 48.99949]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111401717',
          'price': 790.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/dc8d22a3-a86f-4a7a-b856-0cc424518e8c-1293063324.jpg',
          'coords': {'type': 'Point', 'coordinates': [-97.38841, 32.71036]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111401190',
          'price': 1350.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/415de629-1122-4362-82f6-21ef42587234-1293081114.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.36981, 49.00625]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111401000',
          'price': 440.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/84ce0850-f86a-4076-b3ba-56a1cf9623e7-1293063160.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.41457, 49.00831]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111400140',
          'price': 520.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/6dc6e434-bd99-4e7b-83a6-b9aaaf881bcf-1293718830.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.39446, 48.99818]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111392445',
          'price': 320.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/c9e298e7-14ba-4e28-ac11-a988d7f6e8c2-1292960951.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29806, 55.94431]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111389306',
          'price': 650.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/f09fe8b1-8b55-4a0e-8c89-6c6e2441c0a3-1292923576.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111386718',
          'price': 450.0,
          'coords': {'type': 'Point', 'coordinates': [-97.38841, 32.71036]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111383977',
          'price': 400.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/08fefa4c-31af-4976-9c38-96522942e0bb-1292845211.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.3818, 49.04363]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111383176',
          'price': 610.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/ad3882ae-fb39-44fb-b4e2-5edc907d334e-1292837769.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111380875',
          'price': 480.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/47bc6d2c-24e3-4cec-8012-b821649dbc83-1292819315.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.41457, 49.00831]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111375678',
          'price': 560.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/ddba13c0-01f8-4aeb-958f-bb27964f4dd0-1292753490.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.4065, 49.00892]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111371417',
          'price': 1000.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/c155b30a-35b1-4ec1-b5bd-63e62c8e3d8e-1292693248.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31669, 55.97292]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111369599',
          'price': 820.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/9cb7cbaf-2135-44fb-a0ba-430d779501cd-1292667767.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.41123, 49.001]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111352881',
          'price': 660.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/a3e0f6ef-aa0d-4f63-8660-72310e27caad-1292437977.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.38198, 49.00597]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111351460',
          'price': 585.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/4849769b-0ede-43f2-9681-7a362555bf2d-1292409825.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.39218, 48.99409]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111337168',
          'price': 365.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/3ab17a72-d3f1-4ba2-ac00-a646ab27b534-1292273881.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.50828, 49.00852]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111335886',
          'price': 740.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/73545829-9a6e-4081-aac4-45aef8e74c29-1292550450.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.45624, 48.99671]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111330844',
          'price': 400.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/47c5cc54-2de6-4be5-9646-c4c1061c7456-1292206693.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29728, 55.9629]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111325875',
          'price': 790.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/a2ebf379-b639-442c-81ee-25ae4e4f4a5b-1292506782.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31669, 55.97292]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111313976',
          'price': 1395.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/e50c7415-2ba0-4d89-b840-afbac93b0a90-1293058249.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.38154, 49.01043]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111313531',
          'price': 430.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/7eec0851-45c6-4815-b8de-169b379d4391-1292024976.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.36605, 49.0107]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111309417',
          'price': 890.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/2a2b3dd0-0415-4d56-acbf-4cb07b542393-1291971548.jpeg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111308981',
          'price': 690.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/6c7a00ef-961d-4fd1-9635-bed807184419-1291963736.jpeg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111299418',
          'price': 580.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/2785ea04-5672-449b-86a7-a70f949f157a-1291833385.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.28059, 55.95653]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111290492',
          'price': 600.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/698e44fa-38ba-4357-813f-6128bdda9555-1291718213.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.28059, 55.95653]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111285854',
          'price': 620.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/67a0b4d7-128d-4523-89b7-dbcb0426fa68-1291785344.jpg',
          'coords': {'type': 'Point', 'coordinates': [-50.70668, -16.50849]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111270059',
          'price': 2060.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/969a87e6-5544-4859-be91-5d7b31595bbc-1291453136.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.2924, 55.94429]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111266226',
          'price': 1550.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/822626b6-dada-4aa7-972b-320686ee0c66-1292447581.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111265864',
          'price': 420.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/dd4d81d5-ebe0-4628-a728-c78fa6ca98ca-1293372073.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.36434, 49.01205]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111257511',
          'price': 630.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/03da90d9-6241-459d-8e7f-b21ecf50aafb-1291669893.jpg',
          'coords': {'type': 'Point', 'coordinates': [-50.70668, -16.50849]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111247503',
          'price': 1750.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/bb19db0b-bc7f-4bfb-882f-7d8473a2bea2-1291983677.jpg',
          'coords': {'type': 'Point', 'coordinates': [-97.33086, 32.75095]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111181922',
          'price': 330.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/bc3d8273-17e2-4c29-8019-ef77e10aab5a-1290388667.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111169265',
          'price': 1190.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/50fb3782-fe97-4cbe-afff-86d045a2018e-1290199130.jpeg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111163908',
          'price': 750.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/b16498f2-923f-4dd1-8e21-744b2b485b99-1290114119.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111158771',
          'price': 550.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/0afd26b9-401b-4519-a222-3a0cdbc33c76-1290044939.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.39036, 49.0072]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111148644',
          'price': 750.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/a49192d5-0c50-4308-9b05-20a2409ec2f3-1289909189.jpg',
          'coords': {'type': 'Point', 'coordinates': [-50.70668, -16.50849]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111140257',
          'price': 750.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/895ef668-e6cc-4f7c-ad40-9862603a6c53-1289806878.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29466, 55.94347]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111106091',
          'price': 900.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/c7905062-a603-4295-9cbc-23f7e1fcb155-1292298311.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.3365, 49.04466]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111103404',
          'price': 365.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/aa34b219-c300-4768-b624-dd7db54a3592-1289414729.jpeg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111077504',
          'price': 640.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/c020bafb-ae87-4d4c-bbe8-fcbf49342000-1289037962.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.33327, 49.00361]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111043610',
          'price': 480.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/e8c25327-e363-485a-ac9a-b4810a527da4-1288565743.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111040687',
          'price': 650.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/781b7aa5-f8d8-4136-9d5d-8ba628ece6c8-1288520918.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.3571, 49.00386]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/111004947',
          'price': 1090.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/9ac11c0d-eafc-4186-940d-8bf1aebb7d11-1288121062.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.2924, 55.94429]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110911476',
          'price': 890.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/09f9b59a-5dd0-4dea-a42e-2302289c1497-1287088570.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.48977, 48.99033]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110897354',
          'price': 1050.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/84a0e5f3-f292-4089-a3c1-0e9edf07bc83-1286912555.jpg',
          'coords': {'type': 'Point', 'coordinates': [-97.33086, 32.75095]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110877279',
          'price': 1090.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/2b19572c-c057-4f95-b034-058681313418-1289952806.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.2924, 55.94429]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110807975',
          'price': 1400.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/d491c2f3-9f13-4c5f-aa8f-79d6f39fe43d-1285835076.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.47615, 48.98654]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110756951',
          'price': 950.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/37344041-eea5-46e0-838e-434a992df7e5-1290733469.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.35953, 49.01778]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110727645',
          'price': 1250.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/f68a6c67-0945-4909-b808-93535beef3a1-1284969709.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.46542, 48.97169]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110397300',
          'price': 847.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/07237abb-4602-41ee-802e-a2a508450e5e-1280183937.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110376347',
          'price': 1200.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/53865f72-e842-4490-bb9b-10ba4d9b8b1c-1280295105.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.40794, 49.00161]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110367078',
          'price': 665.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/463b6747-d8e2-40e2-a5d4-9155174127d0-1292409917.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29875, 55.95842]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110362854',
          'price': 935.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/d5d0dd0e-cf0d-45be-b427-327458c88a46-1290473779.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29875, 55.95842]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110343833',
          'price': 966.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/bfe6a6dd-da19-4a9d-b385-29700b4e649d-1279284443.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.3515, 49.00183]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/110171256',
          'price': 1400.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/ac51d17f-5448-4b23-9610-daa5937f48dc-1276883103.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.37465, 49.00551]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/109770419',
          'price': 1200.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/387ded0f-165f-4de4-862c-5e833b15f6ac-1271311241.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.36543, 49.01101]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/109489591',
          'price': 850.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/c7bcf680-1089-4ba3-9f3c-964d7b5597ce-1267522456.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.38216, 49.0005]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/109043043',
          'price': 1300.0,
          'coords': {'type': 'Point', 'coordinates': [23.29466, 55.94347]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/108911786',
          'price': 840.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/66f8e114-6008-4d14-a955-4041e7f82c59-1260265363.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31815, 55.95765]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/108706699',
          'price': 630.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/e529f3be-f0aa-4f0c-8181-02e57127dc23-1257300661.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31669, 55.97292]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/108680237',
          'price': 895.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/8d157191-1c31-4e25-a444-988890ebae2c-1257002554.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.35549, 49.01309]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/108611181',
          'price': 990.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/134ddfe1-36ac-4db7-bee8-50af0394f30f-1256072337.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29466, 55.94347]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/108519760',
          'price': 870.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/26c7d0bc-273c-44c0-b0ab-6c76e4d977ae-1283109674.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29728, 55.9629]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/108378086',
          'price': 1080.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/a054271f-e769-4b0d-80de-1dfa5b4c7405-1289107558.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29728, 55.9629]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/108202448',
          'price': 2200.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/697a974b-fbbe-4b74-9fbc-67eb3e625dca-1251201414.png',
          'coords': {'type': 'Point', 'coordinates': [8.33286, 49.00714]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/108063016',
          'price': 1800.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/5481ed4c-28b9-4962-9f85-65b7c5e37ddf-1255267072.jpg',
          'coords': {'type': 'Point', 'coordinates': [-97.38841, 32.71036]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/107958221',
          'price': 870.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/4da79e4f-d3a4-4176-8a75-46708170634e-1248248094.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.28059, 55.95653]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/107713695',
          'price': 1100.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/216311ae-3d8a-41f2-8cc8-6e469515dd94-1292723873.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.2924, 55.94429]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/107521339',
          'price': 950.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/175424d3-aa6f-4d7d-913a-b790c69c4ad2-1242517687.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.37675, 49.00621]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/106945014',
          'price': 610.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/e4dea279-e9db-4cf5-9314-3dc410d908e9-1234882381.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.37932, 49.0075]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/106799086',
          'price': 1650.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/b5aea4b0-e1f4-4eca-be9a-65f00400edb6-1232688164.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.41809, 49.00041]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/105965009',
          'price': 495.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/3b77c8f8-e3fb-4ce5-a1a5-1f0062989a67-1222468974.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.39987, 49.00493]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/105256080',
          'price': 550.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/e56114dc-de24-4636-9c87-c24fd7de008d-1292309323.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.40671, 49.00087]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/104505016',
          'price': 700.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/b3afb49f-134b-40a0-8f06-cd6fdd909f18-1207992198.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.2924, 55.94429]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/103600102',
          'price': 475.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/b2b571bb-30e5-47c0-8d5a-d99bc4dbfa02-1208832204.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.4545, 49.0356]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/100747592',
          'price': 1000.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/b74e0bb9-d1f9-405c-8157-a130106b4d53-1173693567.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.46521, 48.99968]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/98198036',
          'price': 1550.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/3870eff3-0087-49a7-894c-b97f1d4056d1-1151110460.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29806, 55.94431]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/98130964',
          'price': 895.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/981b3866-733d-43f5-b7b2-44148963e9fa-1272533712.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.38298, 49.0504]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/94896910',
          'price': 395.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/c396d09d-08b8-45b7-a0bb-a1cfad24f258-1281428848.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.41092, 49.00167]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/94621874',
          'price': 1100.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/ccf506b0-bd97-4081-881c-d66d92e2b52a-1157309132.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31669, 55.97292]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/90850532',
          'price': 569.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/a7ccd25f-000a-46fd-85aa-9c05bad82618-1067888180.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.3571, 49.00386]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/88295361',
          'price': 920.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/24e832c7-34e1-4424-a231-803a69b42fba-1024499377.jpg',
          'coords': {'type': 'Point', 'coordinates': [-97.38841, 32.71036]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/88223867',
          'price': 510.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/d1ddf51c-40ee-4930-b1aa-b1e84b0818de-1023351557.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.39243, 48.99452]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/87847681',
          'price': 800.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/78fed49f-a84d-4a9a-ac91-937444e098eb-1224031937.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.34447, 49.00181]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/87391524',
          'price': 2145.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/22c05ba1-5198-49f8-842e-9f5d17d8487f-1009901580.jpeg',
          'coords': {'type': 'Point', 'coordinates': [8.40131, 49.01059]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/83706582',
          'price': 510.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/d65fd795-f246-4534-9b0c-d1da9635d28f-951193454.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.36622, 49.0124]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/78672697',
          'price': 760.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/f2ee467d-da6f-4320-8cc2-3050f2306768-876361504.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.33255, 55.95656]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/75352036',
          'price': 580.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/c7d18310-e6b8-4913-abda-0bbb200c19d5-1287048784.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.35412, 49.03535]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/72786806',
          'price': 445.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/33573deb-b85c-4a0f-b732-739812a0967f-1207020985.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.43558, 49.0098]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/70117783',
          'price': 672.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/d6975583-dad2-4150-a407-268c535e743b-1233610836.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.31669, 55.97292]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/69737808',
          'price': 260.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/ce79646d-3bdd-4103-99e5-49f838067bc4-748164662.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29466, 55.94347]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/67592305',
          'price': 695.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/a780b4f1-4419-48e3-9550-61e2fdd544b8-721832649.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.38904, 48.9938]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/65069352',
          'price': 690.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/8f076dcf-d46d-4e99-b747-ce0c4e3edb9a-695915613.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.2924, 55.94429]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/61890311',
          'price': 820.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/e527824a-c33b-47b4-b6b9-f302eea4c2d9-1120471020.png',
          'coords': {'type': 'Point', 'coordinates': [-50.70668, -16.50849]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/60240687',
          'price': 400.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/2a348e2d-dbe2-40d4-b922-86825203a281-1259623602.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.47307, 48.96563]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/57531402',
          'price': 250.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/0575b453-2d80-4ddc-979d-cc7010d00011-1282345015.jpg',
          'coords': {'type': 'Point', 'coordinates': [8.38181, 49.00676]}
        }, {
          'url': 'https://www.immobilienscout24.de/expose/55860854',
          'price': 980.0,
          'picture': 'https://pictures.immobilienscout24.de/listings/ea53cf06-624e-44ca-b468-b52c9f74431b-1016150856.jpg',
          'coords': {'type': 'Point', 'coordinates': [23.29875, 55.95842]}
        }]

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
      long_stay: function () {
        this.get_data(this.source[this.toggle_exclusive].coords);
      },
      toggle_exclusive: function () {
        this.get_data(this.source[this.toggle_exclusive].coords);

      }
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


      this.get_data(this.source[this.toggle_exclusive].coords);
    }
  };
</script>

<style scoped>
    .mini-map {
        width: 100%;
        height: 50vh !important;
    }
</style>