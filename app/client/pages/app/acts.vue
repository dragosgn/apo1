<template>
  <v-app>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex grow>
          <h3>Relevante Ereignesse</h3>
          <v-layout row align-center>
            <v-flex xs-6>
              <v-select :items="['Frauenarzt','Männerarzt']" label="Fachrichtung"></v-select>
            </v-flex>
            <v-flex xs-6 pl-3>
              <v-btn block to="/app/map" style="color:white" color="#1B777D">Switch to Map</v-btn>
            </v-flex>
          </v-layout>

          <v-flex v-for="(hack, index) in acts" pb-2 :key="index">
            <v-card class="elevation-2">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs5 sm3>
                    <v-card>
                      <v-img height="75" :src="users[index+1].image"/>
                    </v-card>
                  </v-flex>

                  <v-flex pl-2 grow>
                    {{users[index+1].name}}
                    <br>Düsseldorf Altstadt
                    <br>Frauenarzt
                    <br>
                  </v-flex>
                  <v-flex pl-2 grow></v-flex>
                </v-layout>
              </v-card-text>
              <!--Description of the article-->
              <v-card to="/app/apoone" row align-center justify-start fill-height wight="100%">
                <v-layout row pa-1>
                  <v-flex pa-1 xs3>
                    <v-sheet>
                      <v-img height="30px" contain :src="hack.image"/>
                    </v-sheet>
                  </v-flex>
                  <v-flex pl-2>
                    <span style="color:#1B777D;font-style: italic">{{hack.activity}}</span>
                    :
                    {{hack.text}}
                  </v-flex>
                </v-layout>
                <v-layout align-right justify-end row pa-1 style="color:#C72961; size:10px">
                  <v-flex xs2>
                    <v-icon small color="#C72961">save_alt</v-icon>2
                  </v-flex>
                  <v-flex xs2>
                    <v-icon small color="#C72961">remove_red_eye</v-icon>
                    {{hack.views}}
                  </v-flex>
                  <v-flex xs2>
                    <v-icon small color="#C72961">comment</v-icon>3
                  </v-flex>
                </v-layout>
              </v-card>
            </v-card>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout marignBottom="10px">
        <v-flex xs12 sm12>
          <v-card>
            <v-img
              src="https://d1rtnate6r9gtg.cloudfront.net/-/media/iewcglobal/images/section-images/us/industries-we-serve/medical-equipment_banner.jpg?h=400&w=1400&la=en-US&hash=538B2B62E69C5DDFE0817C524A487F8B6CFF2D4C&vs=1&d=00010101T000000Z"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Latets IEWC diagonostics equipment release as of July 2019</h3>
                <div>{{ card_text }}</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="orange">Share</v-btn>
              <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider inset></v-divider>
    </v-container>
  </v-app>
</template>

<script>
import { users, banks, courses, acts } from "./jsons.js";

export default {
  name: "Acts",
  data: () => ({
    users: users,
    acts: acts
  }),
  watch: {},
  mounted: function() {},
  methods: {}
};
</script>
