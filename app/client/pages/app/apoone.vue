<template>
  <v-app>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex grow>
          <h3>Proffetionals you might know</h3>
          <v-flex v-for="(hack, index) in acts" pb-2 :key="index">
            <v-card class="elevation-2">
              <v-card-text>
                <!--<v-layout row justify-center align-center>-->
                <!--<v-flex grow>-->
                <!--<h3>{{hack.titel}} </h3>-->
                <!--</v-flex>-->
                <!--<v-flex shrink>-->
                <!--<v-btn small fab flat nuxt :href="'/app/PlanedHacks?hack_id='+index">-->
                <!--<v-icon color="grey">-->
                <!--share-->
                <!--</v-icon>-->
                <!--</v-btn>-->

                <!--</v-flex>-->

                <!--</v-layout>-->

                <v-layout row wrap>
                  <v-flex shrink>
                    <v-checkbox color="#1B777D"></v-checkbox>
                  </v-flex>
                  <v-flex xs5 sm3>
                    <v-card>
                      <v-img height="100px" :src="users[index+1].image"/>
                    </v-card>
                  </v-flex>

                  <v-flex pl-2 grow>
                    {{users[index+1].name}}
                    <br>Düsseldorf Altstadt
                    <br>Frauenarzt
                    <br>
                    Activity: {{hack.activity}}
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions v-if="false">
                <v-layout row align-center justify-start fill-height>
                  <v-flex pl-2 shrink>Prizes:</v-flex>
                  <v-flex>
                    <v-item-group>
                      <v-chip small v-for="(chip,index) in hack.prize" :key="index">
                        <span class="caption">#{{index+1}}: {{chip}}</span>
                      </v-chip>
                    </v-item-group>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-flex>
      </v-layout>
      <a href="/app/acts">
        <v-btn block style="color:white" color="#1B777D">Follow</v-btn>
      </a>
    </v-container>
  </v-app>
</template>

<script>
import { users, banks, courses } from "./jsons.js";

export default {
  name: "Timeline",
  data: () => ({
    users: users,
    acts: [
      {
        user: 1,
        activity: "Gogogogo1"
      },
      {
        user: 2,
        activity: "Gogogogo2"
      },
      {
        user: 3,
        activity: "Gogogogo3"
      }
    ]
  }),
  watch: {},
  mounted: function() {},
  methods: {}
};
</script>
