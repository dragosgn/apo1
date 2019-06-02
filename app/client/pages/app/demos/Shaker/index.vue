<template>
    <v-app>
        <v-form v-model="valid">
            <v-container fluid>

                <v-layout column wrap fill-height>
                    <v-flex v-if="false">
                        Here is the last X-value: {{axes[axes.length-1]}}
                        </br>
                        {{time_now -time_start }}
                        </br>
                        {{last_time[0]}}
                        </br>
                        {{shaking_time}}
                    </v-flex>
                    <div style="height: 100%">
                        <v-card
                                class="mx-auto text-xs-center"
                                color="green"
                                dark
                        >
                            <v-card-text v-if="shaking_time>0 && ((shaking_time <=40 && shaking===true)
                                || (shaking_time <=25 && shaking===false))">
                                <v-sheet
                                        :color="'hsl(' + (120-shaking_time*1.5) + ', 100%, 30%)'"
                                        height="300"
                                >

                                    <v-sparkline
                                            style="position:absolute; top:0; left:0; width: 100%;height: 100%"
                                            v-for="(value,key) in aches"
                                            :key="key"
                                            :value="aches[key]"
                                            color="white"
                                            height="300"
                                            width="800"
                                            padding="24"
                                            stroke-linecap="round"
                                            smooth
                                    >
                                        <template v-slot:label="item" v-if="false">
                                            ${{ item.value }}
                                        </template>
                                    </v-sparkline>


                                </v-sheet>
                            </v-card-text>

                            <v-layout v-if="shaking_time===0"
                                      :color="'hsl(' + (120-shaking_time*1.5) + ', 100%, 30%)'"
                                      align-center justify-center column fill-height
                            >
                                <v-flex style="height: 180px;text-align: center;font-size: 48px">

                                    Shake me hot!

                                </v-flex>
                                <v-flex style="text-align: center;">
                                    <v-img src="https://static.thenounproject.com/png/171410-200.png"
                                           contain width="120">

                                    </v-img>
                                </v-flex>

                            </v-layout>

                            <v-layout v-if="(shaking_time >40 && shaking===true)||(shaking >25 && shaking===false) "
                                      :color="'hsl(' + (120-shaking_time*1.5) + ', 100%, 30%)'"
                                      align-center justify-center column fill-height
                            >

                                <v-flex style="text-align: center;">
                                    <v-img src="https://media.giphy.com/media/41gJtUNiPfsEmzLqEN/giphy.gif"
                                           contain width="350">

                                    </v-img>
                                </v-flex>

                            </v-layout>

                            <v-layout>

                            </v-layout>
                        </v-card>
                    </div>

                </v-layout>


            </v-container>
        </v-form>

    </v-app>

</template>

<script>
  // Shake Instance
  //var Shake = require('shake');
  import Shake from 'shake.js';

  if (process.client) {


    var myShakeEvent = new Shake({
      threshold: 5, // optional shake strength threshold
      timeout: 10 // optional, determines the frequency of event generation
    });

    myShakeEvent.start();
    window.addEventListener('shake', shakeEventDidOccur, false);
  }


  //function to call when shake occurs
  var event_id = 0;
  var x_value = 0;
  var x_values = [];
  var y_values = [];
  var z_values = [];
  var m_values = [];
  var last_time = [0];

  function shakeEventDidOccur() {
    x_values.push(myShakeEvent.lastX);
    y_values.push(myShakeEvent.lastY);
    z_values.push(myShakeEvent.lastZ);
    last_time[0] = myShakeEvent.lastTime.getTime() / 1000;
    //put your own code here etc.
    //alert('X' + myShakeEvent.lastX + 'Y' + myShakeEvent.lastY + 'Z' + myShakeEvent.lastZ);
  }

  function shake_it() {

    // your function code here
    myShakeEvent.devicemotion();
    x_values.push(myShakeEvent.lastX);
    setTimeout(shake_it, 1000);
  }

  // shake_it();


  export default {
    components: {},
    data() {
      return {
        valid: false,
        firstname: '',
        lastname: '',
        address: '',
        phone: '',
        email: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        challenges: ['Challenge #1', 'Challenge #2', 'Challenge #3', 'Challenge #4'],
        team_names: ['Team1', 'Team2', 'Team3', 'Team4'],
        team: {
          'Team1': ['Member1', 'Member2', 'Member3'],
          'Team2': ['Member4', 'Member5', 'Member6'],
        },
        roles: ['Back-End Developer', 'Project Manager', 'Designer', 'Front-End Developer', 'Business Analyst', 'Data Scientist'],
        e1: 1,
        team_radios: undefined,
        challenge_radios: undefined,
        roles_selection: [],
        last_step: 9,
        first_step: 1,
        selected_skills: [],
        mentor_names: ['', '', ''],
        mentor_companies: ['', '', ''],


        friend_names: ['', '', ''],
        friend_contact: ['', '', ''],

        social_media: ['Xing', 'LinkedIn', 'GitHub', 'Your Page'],
        social_free_text: [],
        social_selected: [],

        can_use_reg_data: false,


        activator: null,
        attach: null,
        colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
        editing: null,
        index: -1,
        items: [
          {header: 'Select an option or create one'},
        ],
        nonce: 1,
        menu: false,
        model: [],
        x: 0,
        search: null,
        y: 0,
        axes: x_values,
        aches: {
          'x': x_values,
          'y': y_values,
          'z': z_values,
        },
        value_x: x_values,
        value_y: y_values,
        value_z: z_values,
        value_m: m_values,
        last_time: last_time,
        time_now: 0,
        shaking: false,
        shaking_time: 0,
        time_start: new Date().getTime() / 1000,

      }
    },
    mounted: function () {
      this.$nextTick(function () {
        window.setInterval(() => {
          this.countDown();
        }, 100);
      });
    },
    watch: {},
    methods: {
      countDown: function () {
        this.time_now = new Date().getTime() / 1000;
        if (this.time_now - last_time[0] > 1) {
          this.shaking = false;
          this.shaking_time -= 1;
          this.shaking_time = Math.max(0, this.shaking_time);

        } else {
          this.shaking = true;
          this.shaking_time += 1;
          this.shaking_time = Math.min(100, this.shaking_time);
        }

      }
    }
  }


  // Shake Instance END


</script>
<style>
</style>