<template>
    <v-app>
        <v-container>
            <v-layout>
                <v-flex xs5 sm3 pa-2>
                    <v-card>
                        <v-img height="100px" :src="users[acts[act_nr].user].image"/>

                    </v-card>
                </v-flex>
                <v-flex grow>
                    <h3>{{users[acts[act_nr].user].name}}'s {{acts[act_nr].activity }}:</h3>

                    <p>{{acts[act_nr].text}}</p>
                    <v-flex>
                        <v-item-group v-if="acts[act_nr].hasOwnProperty('tags')">
                            <v-chip small v-for="(chip,index) in acts[act_nr].tags" :key="index">
                                {{chip}}
                            </v-chip>
                        </v-item-group>
                    </v-flex>
                    <v-container>

                        {{acts[act_nr].article}}
                    </v-container>

                </v-flex>

            </v-layout>

            <v-layout align-right justify-center column>

                <v-flex pb-2 v-for="(say,idx) in dialog[act_nr]" :key="idx">
                    <v-card class="elevation-2">
                        <v-card-text>
                            <v-layout row align-right justify-center class="subheading"
                                      :reverse="say.user===1"
                            >
                                <v-flex xs2>
                                    <v-avatar>
                                        <img contain :src="users[say.user].image"/>
                                    </v-avatar>
                                </v-flex>
                                <v-flex xs10 pl-2>
                                    {{say.text}}
                                </v-flex>
                            </v-layout>
                        </v-card-text>




                    </v-card>
                </v-flex>
                <v-flex>
                    <v-text-field
                            @click:clear="acceptance_score=1"
                            :clearable="true"
                            v-model="comment"
                            label="Outline"
                            outline
                    ></v-text-field>
                </v-flex>


            </v-layout>
            <v-btn @click="add_comment" block style="color:white" color="#1B777D">
                Comment
            </v-btn>
            <v-sheet
                    v-if="acceptance_score < min_acceptance"
                    style="color: red;font-size: 10px" class="small">Text is too offencive with acceptance score
                {{acceptance_score}}. Please adapt it.
            </v-sheet>
        </v-container>

    </v-app>

</template>

<script>
  import {users, banks, courses, acts,dialog} from "./jsons.js";
  import axios from "axios";
  import Vue from "vue";

  let accessKey = '962f0474742a485d95d3477ac17279e2';

  var api_host = 'https://pi.eu-central-1.amazonaws.com/proxy/';

  let uri = 'https://westcentralus.api.cognitive.microsoft.com';
  api_host = '/text/analytics/v2.1/sentiment';
  api_host = uri + api_host;
  axios.defaults.headers.post = {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': accessKey,
  };
  axios.defaults.method = 'post';
  var api_aindex = axios.create({
    url: api_host,
  });


  export default {
    name: "Question",
    data: () => ({
      act_nr: undefined,
      acts: acts,
      acceptance_score: 1,
      users: users,
      response: undefined,
      comment: undefined,
      min_acceptance: 0.35,
      dialog: dialog,

    }),
    watch: {},
    created: function () {
      this.act_nr = Number(this.$route.query.act);
    },
    mounted: function () {

    },
    methods: {
      add_comment: function () {

        let documents = {
          'documents': [
            {
              'id': '1',
              'language': 'de',
              'text': this.comment
            }

          ]
        };
        api_aindex({
          data: JSON.parse(JSON.stringify(
              documents))
        })
            .then(response => {
              console.log('response', response.data);
              this.acceptance_score = parseInt(response.data.documents[0].score * 100) / 100;

              if (response.data.documents[0].score > this.min_acceptance) {
                this.dialog[this.act_nr].push(
                    {
                      user: 1,
                      text: this.comment
                    }
                );
                this.comment = undefined;

              } else {
                console.log("Too aggressive text:", this.comment)

              }


            })
            .catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode, errorMessage);
              // ...
            });
      }
    }
  }
</script>
