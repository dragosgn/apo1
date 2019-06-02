<template>
    <v-app>
        <v-container>
            <v-card pb-1>
                <v-card-text class="text-xs-center">
                    <h2>Planned hackathons participation</h2>

                    <v-divider color="orange"
                    ></v-divider>
                    <v-layout row class="body-2" justify-space-around pt-3>
                        <v-flex>
                            Total: <span v-if="!loading_stat">
                                                            {{hackathons.length}}

                            </span>
                            <v-progress-circular
                                    size="12"
                                    indeterminate
                                    width="2"
                                    color="orange"
                                    v-if="loading_stat"
                            ></v-progress-circular>
                        </v-flex>

                        <v-flex>
                            Cities: <span v-if="!loading_stat">

                             {{hack_cities.length}}
                                                        </span>
                            <v-progress-circular
                                    size="12"
                                    indeterminate
                                    color="orange"
                                    width="2"
                                    v-if="loading_stat"
                            ></v-progress-circular>
                        </v-flex>
                        <v-flex>
                            Countries:<span v-if="!loading_stat">

                             {{hack_countries.length}}
                                                        </span>
                            <v-progress-circular
                                    size="12"
                                    indeterminate
                                    width="2"

                                    color="orange"
                                    v-if="loading_stat"
                            ></v-progress-circular>
                        </v-flex>

                    </v-layout>
                </v-card-text>
                <v-card-actions>

                    <v-btn color="red" small block @click="load_hacks()">
                        <v-progress-circular
                                size="25"
                                indeterminate
                                color="white"
                                v-if="loading"
                        ></v-progress-circular>
                        <span v-if="!loading && !selected_hacks">
                           see all hackathons
                        </span>
                        <span v-if="!loading && selected_hacks">
                           {{selected_hacks.length}} loaded
                        </span>
                    </v-btn>

                </v-card-actions>
            </v-card>


        </v-container>
        <v-layout align-center justify-center>
            <v-flex md1 lg2></v-flex>

            <v-flex grow>


                <v-flex v-for="(hack, index) in hack_id?[hackathons[hack_id]]:selected_hacks" pb-2 :key="index"
                >


                    <v-card class="elevation-2">
                        <v-card-text>

                            <v-layout row justify-center align-center>
                                <v-flex grow>
                                    <h3>{{hack.titel}} </h3>
                                </v-flex>
                                <v-flex shrink>
                                    <v-btn small fab flat nuxt :href="'/app/PlanedHacks?hack_id='+index">
                                        <v-icon color="grey">
                                            share
                                        </v-icon>
                                    </v-btn>

                                </v-flex>

                            </v-layout>
                            <v-divider color="orange"
                            ></v-divider>
                            <v-layout column>
                                <v-flex pa-3>
                                    {{hack.text}}
                                </v-flex>
                                <v-flex>
                                    <v-icon color="orange" small>attach_money</v-icon>
                                    Travel expences: {{hack.cover}}
                                </v-flex>
                                <v-flex>
                                    <v-icon color="orange" small>build</v-icon>
                                    Challenges: {{hack.challenges}}
                                </v-flex>
                                <v-flex>
                                    <v-icon color="orange" small>hotel</v-icon>
                                    Overnight at location: {{hack.overnight}}
                                </v-flex>
                                <v-flex>
                                    <v-icon color="orange" small>language</v-icon>
                                    Homepage: <a :href="hack.url[0]" target="_blank">hier</a>
                                </v-flex>
                            </v-layout>
                            <v-layout row justify-space-between align-end pt-3>
                                <v-flex grow class="caption"> {{hack.city}}, {{hack.country}}</v-flex>
                                <v-flex shrink class="caption text-right">{{form_date(hack.date_start,'s')}} -
                                    {{form_date(hack.date_end,'e')}}
                                </v-flex>
                                <v-flex shrink class="caption text-right">, {{form_date(hack.date_start,'wd')}} -
                                    {{form_date(hack.date_end,'wd')}}
                                </v-flex>
                                <v-flex shrink class="caption text-right" pl-1>
                                    <v-icon small color="orange">{{working_days(hack.date_start,hack.date_end)}}
                                    </v-icon>
                                </v-flex>
                            </v-layout>


                        </v-card-text>
                        <v-card-actions>
                            <v-layout row align-center justify-start row fill-height>
                                <v-flex pl-2 shrink>
                                    Prizes:

                                </v-flex>
                                <v-flex>
                                    <v-item-group>
                                        <v-chip small v-for="(chip,index) in hack.prize" :key="index">
                                    <span class="caption">
                                        #{{index+1}}: {{chip}}

                                    </span>
                                        </v-chip>
                                    </v-item-group>
                                </v-flex>


                            </v-layout>
                        </v-card-actions>
                        <v-card-actions>
                            <v-layout row align-center justify-start row fill-height>
                                <v-flex pl-2 shrink>
                                    Tags:
                                </v-flex>
                                <v-flex>
                                    <v-item-group>
                                        <v-chip small v-for="(chip,index) in hack.tags" :key="chip">
                                    <span class="caption">
                                       {{chip}}
                                    </span>
                                        </v-chip>
                                    </v-item-group>
                                </v-flex>


                            </v-layout>
                        </v-card-actions>

                    </v-card>

                </v-flex>
            </v-flex>
            <v-flex md1 lg2></v-flex>

        </v-layout>

    </v-app>

</template>

<script>
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  var moment = require('moment');

  export default {
    name: "Timeline",
    data: () => ({
      star_color: ['yellow darken-2', 'gray', 'organge darken-3'],
      hackathons: [

        {
          titel: 'Rheinmain Hackathon',
          date_start: '2019.05.23',
          date_end: '2019.05.26',
          text: 'Will be a huge even with around 300 Participants!',
          cover: 'Practically full compensation!',
          city: 'Frankfurt',
          country: 'Germany',
          prize: ['?'],
          currency: 'EUR',
          overnight: 'undefined',

          challenges: '6 Challenges. Extremly divers. Air Industry, Banking, Health and more. Maybe quite strongly business oriented.',
          tags: ['air industry', 'banking', 'health'],

          url: ['https://www.hackdays-rheinmain.com/challenges']
        },
        {
          titel: 'ApoBank Hack',
          date_start: '2019.05.31',
          date_end: '2019.06.02',
          text: 'Probably not much techies, as it is Düsseldorf and not much advertisement.',
          cover: 'No covarage',
          city: 'Düsseldorf',
          country: 'Germany',
          prize: ['Total 15.000'],
          currency: 'EUR',
          overnight: 'undefined',

          challenges: '4 Challenges. Mainly banking industry related to medical doctors.',
          tags: ['banking', 'health'],

          url: ['https://www.eventbrite.de/e/apohackathon-tickets-60390958984']
        },
        {
          titel: 'Transportation hack Hack',
          date_start: '2019.06.6',
          date_end: '2019.06.9',
          text: 'No open application.',
          cover: 'Full cover of all expences.',
          city: 'Stockholm',
          country: 'Sweden',
          prize: ['?'],
          currency: 'EUR',
          overnight: 'yes',

          challenges: 'Various challenges',
          tags: ['transportation'],

          url: []
        },
        {
          titel: 'L&T Technology Hack',
          date_start: '2019.06.14',
          date_end: '2019.06.16',
          text: 'I will skip it and go to Den Haag instead. Only one prize of 10.000 EUR for the first place - can be very frustrating. ',
          cover: 'No covarage',
          city: 'München',
          country: 'Germany',
          prize: ['10.000'],
          currency: 'EUR',
          overnight: 'undefined',

          challenges: '4 verious industrial Challenges but one prize.',
          tags: ['mobility', 'health', 'energy', 'industry 4.0'],

          url: ['https://erdhackathon.bemyapp.com/']
        },
        {
          titel: 'Hackathon for Good: Data Science Initiative ',
          date_start: '2019.06.14',
          date_end: '2019.06.16',
          text: 'Very interesting topics and tasks. Data sets for data analysis. Fair prizes distribution.',
          cover: 'No covarage',
          city: 'Den Haag',
          country: 'Netherlands',
          prize: ['2.000 per Challenge', '3.000 for first Overall'],
          currency: 'EUR',
          overnight: 'undefined',

          challenges: '6 verious industrial Challenges with prize per challenge and overall prize.',
          tags: ['social', 'data science'],

          url: ['https://www.hackathonforgood.org/']
        },
                  {
          titel: 'VR / AR hackathon',
          date_start: '2019.06.28',
          date_end: '2019.06.28',
          text: 'Probably a small local hackathon. No prizes are annonced and will be probably none - usual for this region. Also not much advertisement.',
          cover: 'No covarage',
          city: 'Essen',
          country: 'Germany',
          prize: ['no'],
          currency: 'EUR',
          overnight: 'undefined',

          challenges: '6 verious industrial Challenges with prize per challenge and overall prize.',
          tags: ['VR', 'AR'],

          url: ['https://www.interaction-room.de/hackathon/']
        },

      ],
      hack_won: null,
      hack_cities: [],
      hack_countries: [],
      hack_id: null,
      loading: false,
      selected_hacks: null,
      loading_stat: true,
    }),
    watch: {
      hack_id: function () {
        console.log('hack_id changed:', this.hack_id, this.hackathons[this.hack_id])
      }
    },
    mounted: function () {
      console.log('Query:', this.$route.query.hack_id);
      this.hack_id = Number(this.$route.query.hack_id);
      this.load_stat();
    },
    methods: {
      form_date: function (date, format) {
        if (format === 'wd') {
          return moment(date).format('dd')

        }
        else if (format === 's') {
          return moment(date).format('DD')

        }
        else if (format === 'e') {
          return moment(date).format('DD MMM YYYY')

        }

      },
      working_days: function (date1, date2) {
        let date1_free = false;
        let date2_free = false;
        if (['Fr', 'Sa', 'Su'].includes(moment(date1).format('dd'))) {
          date1_free = true;
        }
        if (['Fr', 'Sa', 'Su'].includes(moment(date2).format('dd'))) {
          date2_free = true;
        }
        if (date1_free && date2_free) {
          return 'cake'
        }
        else if (date1_free || date2_free) {
          return 'brightness_6'
        }
        else {
          return 'work'
        }
      }
      ,
      load_hacks: async function () {
        this.loading = true;
        this.selected_hacks = null;
        this.hack_id = null;
        await sleep(1400);
        this.loading = false;
        this.selected_hacks = this.hackathons;

      },
      load_stat: async function () {
        this.loading_stat = true;
        this.selected_hacks = null;
        await sleep(800);
        this.loading_stat = false;
        this.get_won_hacks();

      },
      get_won_hacks: function () {
        // console.log("xx 0");
        if (!this.hack_won) {
          // console.log("xx1");
          for (let i = 0; i < this.hackathons.length; i++) {
            let hack = this.hackathons[i];
            // console.log("xx2:", i, hack.position, 'cities', this.hack_cities, 'city', hack.city);
            if (hack.position && hack.position < 3) {
              this.hack_won += 1;
            }
            if (!this.hack_cities.includes(hack.city.toLowerCase())) {
              this.hack_cities.push(hack.city.toLowerCase());

              // console.log("xx31", hack.city.toLowerCase());
            }
            if (!this.hack_countries.includes(hack.country.toLowerCase())) {

              this.hack_countries.push(hack.country.toLowerCase());
              // console.log("xx32", hack.city);

            }


          }
        }
        // console.log(this.hack_countries,this.hack_cities);
        return this.hack_won

      }
    }
  }
</script>