<template>

    <v-app
            id="inspire"

    >

        <template v-if="true">
            <v-layout class="sun">
                <v-bottom-nav
                        :value="true"
                        color="transparent"
                >
                    <v-flex xs12 sm10 md7>
                        <v-layout align-center justify-space-between row fill-height>

                            <v-btn :active="toggle_exclusive===6" @click="toggle_exclusive=6" flat color="white"
                                   to="/app">
                                <div :style="toggle_exclusive===6 ? 'text-decoration: underline' :''">
                                    Home
                                </div>
                                <v-icon>home</v-icon>
                            </v-btn>

                            <v-btn :active="toggle_exclusive===1" @click="toggle_exclusive=1" flat color="white"
                                   to="/app/Vita">
                                <div :style="toggle_exclusive===1 ? 'text-decoration: underline' :''">
                                    Vita
                                </div>
                                <v-icon>public</v-icon>
                            </v-btn>


                            <v-btn :active="toggle_exclusive===2" @click="toggle_exclusive=2" flat color="white"
                                   to="/app/Skills">
                                <div :style="toggle_exclusive===2 ? 'text-decoration: underline' :''">
                                    Skills
                                </div>
                                <v-icon>color_lens</v-icon>
                            </v-btn>
                            <v-btn
                                    :active="toggle_exclusive===3" @click="toggle_exclusive=3" flat color="white"
                                    to="/app/Hackathons">
                                <div :style="toggle_exclusive===3 ? 'text-decoration: underline' :''">
                                    Hackathon
                                </div>
                                <v-icon>star</v-icon>
                            </v-btn>
                            <v-btn
                                    small
                                    :active="toggle_exclusive===4" @click="toggle_exclusive=4" flat color="white"
                                    to="/app/Demos">
                                <div :style="toggle_exclusive===4 ? 'text-decoration: underline' :''">
                                    Toys
                                </div>
                                <v-icon>touch_app</v-icon>
                            </v-btn>
                        </v-layout>

                    </v-flex>

                </v-bottom-nav>
            </v-layout>
        </template>
        <v-content>
            <v-layout justify-center>
                <v-flex xs12 sm10 md7 lg6>

                    <nuxt/>
                </v-flex>
            </v-layout>

        </v-content>
    </v-app>
</template>

<script>


  export default {
    name: "App",
    components: {},
    data: () => ({
      dis: false,
      drawer: null,
      toggle_exclusive: 0,
      isMobile: false,
      quotes: [
        'To win in the future, use your weakness; To win now, use your strangth.',
        'If you think you are about to loos -> think, that you are about to win.',
        'If your live has no meaning, you have one more task to do.',
        'The most successful scientific AI will be the one, which sends the best Christmass cards.',
        'If you are afraid, that some one will steal your idea, you are actually afraid that they dont want to steal you.'

      ]

    }),
    props: {
      source: String
    },
    beforeDestroy() {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this.onResize, {passive: true})
      }
    },

    mounted() {
      this.onResize();
      window.addEventListener('resize', this.onResize, {passive: true});
      if (process.client) {
        var firebaseConfig = {
          apiKey: "AIzaSyBK9t1vhNsdSwapDw86vBmRwujaePFbpU8",
          authDomain: "goodwork-22b6f.firebaseapp.com",
          databaseURL: "https://goodwork-22b6f.firebaseio.com",
          projectId: "goodwork-22b6f",
        };

        const firebaseApp = firebase.initializeApp(firebaseConfig);
        firebaseApp.auth().signInAnonymously()
            .then(function (result) {
              console.log('result', result);
              // ...
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
            });
        firebaseApp.auth().onAuthStateChanged(user => {
          this.authUser = user;
          this.change_data();
          console.log('State Chage', user.uid);

        });
      }

    },

    methods: {
      onResize() {
        this.isMobile = window.innerWidth < 600
      }

    }
  }
</script>
<style>
    .v-toolbar__content {
        height: 52px;
        border-top: #ffa400;
        border-top-width: 4px;
        border-top-style: solid;
        background-color: #ff001ac4;
    }

    .sun {
        height: 60px;
        border-top: #ffa400;
        border-top-width: 4px;
        border-top-style: solid;
        background-color: #ff001ac4;
    }

    .v-item-group.v-bottom-nav .v-btn {
        min-width: 0px;
        width: 100%;
    }
</style>