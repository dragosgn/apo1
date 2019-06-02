<template>
    <v-app>
        <v-container>
            <v-layout align-center justify-center>
                <v-flex grow>
                    <v-layout row align-center>
                        <v-flex xs-6 pl-3>
                            <h3>Relevante Ereignesse</h3>
                        </v-flex>
                        <v-flex xs-6>
                            <v-select
                                    :items="['Frauenarzt','Männerarzt']"
                                    label="Fachrichtung"
                            ></v-select>
                        </v-flex>
                    </v-layout>


                    <!--Activities of the person-->
                    <v-flex v-for="(hack, index) in acts" pb-2 :key="index"
                    >
                        <v-card class="elevation-2"

                        >

                            <v-card-text>


                                <v-layout align-center justify-center row wrap>
                                    <v-flex xs5 sm3>
                                        <v-card>
                                            <v-img height=80 :src="users[hack.user].image"/>

                                        </v-card>

                                    </v-flex>

                                    <v-flex pl-2 grow>
                                        {{users[hack.user].name}}
                                        <br/>
                                        Düsseldorf Altstadt
                                        <br/>
                                        Frauenarzt
                                        <br/>
                                    </v-flex>
                                    <v-flex pl-2 grow>

                                    </v-flex>


                                </v-layout>

                            </v-card-text>
                            <!--Description of the article-->
                            <v-card
                                    :to="'/app/question?act='+index"
                                    row width="100%">
                                <v-layout row align-center justify-start row fill-height>
                                    <v-flex pl-1 xs3>
                                        <v-sheet>
                                            <v-img height="40px" contain :src="hack.image"/>
                                        </v-sheet>
                                    </v-flex>
                                    <v-flex pl-2>
                                        <span style="color:#1B777D;font-style: italic; font-size: 16px;">{{hack.activity}}</span>:
                                        <p style="color:#1B777D;font-style: italic; font-size: 20px;">{{hack.text}}</p>

                                    </v-flex>

                                </v-layout>
                                <v-layout
                                        align-right justify-end
                                        row pa-1 style="color:#C72961; size:10px">
                                    <v-flex xs2>
                                        <v-icon small color="#C72961">
                                            save_alt
                                        </v-icon>
                                        2
                                    </v-flex>
                                    <v-flex xs2>
                                        <v-icon small color="#C72961">
                                            remove_red_eye
                                        </v-icon>
                                        {{hack.views}}
                                    </v-flex>
                                    <v-flex xs2>
                                        <v-icon small color="#C72961">
                                            comment
                                        </v-icon>
                                        3
                                    </v-flex>

                                </v-layout>
                            </v-card>
                        </v-card>
                    </v-flex>
                </v-flex>

            </v-layout>
            <div v-if="false">
                <v-layout>
                    <v-flex xs12 sm12>
                        <v-card>
                            <v-img
                                    src="https://vonboyettcorp.com/wp-content/uploads/2016/05/medical-equipment.jpg"
                                    aspect-ratio="2.75"
                            ></v-img>

                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">ISEC latest diagnostic equipment comming 12.06.2019</h3>
                                    <div> {{ card_text }}</div>
                                </div>
                            </v-card-title>

                            <v-card-actions>
                                <v-btn flat color="orange">Share</v-btn>
                                <v-btn flat color="orange">Explore</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>

                <div style="padding:10px; height: 5px;"/>
                <v-layout>
                    <v-flex xs12 sm12>
                        <v-card>
                            <v-img
                                    src="https://www.sciencedaily.com/images/2019/05/190530141522_1_540x360.jpg"
                                    aspect-ratio="2.75"
                            ></v-img>

                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">New way to protect against high-dose radiation damage
                                        discovered</h3>
                                    <div> {{ card_text }}</div>
                                </div>
                            </v-card-title>

                            <v-card-actions>
                                <v-btn flat color="orange">Share</v-btn>
                                <v-btn flat color="orange">Explore</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <div style="padding:10px; height: 5px;"/>
            </div>

        </v-container>

    </v-app>

</template>

<script>
  import {users, banks, courses, acts} from "./jsons.js";

  export default {
    name: "Acts",
    data: () => ({
      users: users,
      acts: acts,

    }),
    watch: {},
    mounted: function () {

    },
    methods: {}
  }
</script>
