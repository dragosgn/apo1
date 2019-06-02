<template>
    <v-app>
        <v-container>
            <v-layout align-center justify-center>
                <v-flex grow>
                    <h3>Relevante Ereignesse</h3>
                    <v-flex v-for="(hack, index) in acts" pb-2 :key="index"
                    >
                        <v-card class="elevation-2">

                            <v-card-text>


                                <v-layout row wrap>
                                    <v-flex xs5 sm3>
                                        <v-card>
                                            <v-img height=75 :src="users[index+1].image"/>

                                        </v-card>

                                    </v-flex>

                                    <v-flex pl-2 grow>
                                        {{users[index+1].name}}
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
                                    to="/app/apoone"
                                    row align-center justify-start row fill-height wight="100%">
                                <v-layout row pa-1>
                                    <v-flex pa-1 xs3>
                                        <v-sheet>
                                            <v-img height="30px" contain :src="hack.image"/>

                                        </v-sheet>
                                    </v-flex>
                                    <v-flex pl-2>
                                        <span style="color:#1B777D;font-style: italic">{{hack.activity}}</span>:
                                        {{hack.text}}

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
                                        23
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