<template>
    <v-app>
        <v-container>
            <v-layout align-center justify-center>
                <v-flex grow>
                    <h3>Proffetionals you might know</h3>
                    <v-flex v-for="(act, index) in acts" pb-2 :key="index"
                    >
                        <v-card class="elevation-2"

                        >
                            <v-card-text>
                                <v-layout row wrap>
                                    <v-flex shrink>
                                        <v-checkbox color="#1B777D">

                                        </v-checkbox>
                                    </v-flex>
                                    <v-flex xs5 sm3>
                                        <v-card>
                                            <v-img height="100px" :src="users[index+1].image"/>

                                        </v-card>
                                    </v-flex>
                                    <v-flex pl-2 grow>
                                        {{users[index+1].name}}
                                        <br/>
                                        Düsseldorf Altstadt
                                        <br/>
                                        Frauenarzt
                                        <br/>
                                        Activity: {{act.activity}}
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-flex>

            </v-layout>
            <a href="/app/acts">
                <v-btn block style="color:white" color="#1B777D">
                    Follow
                </v-btn>
            </a>

        </v-container>

    </v-app>

</template>

<script>
  import {users, banks, courses, acts} from "./jsons.js";


  export default {
    name: "Timeline",
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
