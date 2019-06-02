<template>
    <v-app>
        <v-container fluid>
            <v-stepper v-model="e1">
                <!--Buttons-->
                <v-sheet pb-2>
                    <v-layout align-center justify-space-between row>
                        <v-flex xs3 graw>
                            <v-btn
                                    block
                                    color="primary"
                                    @click="pre_step"
                                    small
                            >
                                back
                            </v-btn>
                        </v-flex>
                        <v-flex xs4 style="text-align: center;">
                            {{e1}}-{{last_step}}
                        </v-flex>
                        <v-flex graw>

                            <v-btn
                                    block
                                    color="primary"
                                    @click="next_step"
                                    small
                            >
                                Next Step

                            </v-btn>
                        </v-flex>

                    </v-layout>

                </v-sheet>
                <v-card mb5>
                    <v-container>


                        <v-stepper-items>

                            <v-stepper-content :step="idx+1" v-for="(value,idx) in test1" :key="idx">
                                <!--Titel Info-->
                                <v-layout column>
                                    <v-layout row justify-start align-center>
                                        <v-flex xs2 style="text-align: center;">
                                            <v-icon color="orange">
                                                {{value.icon}}
                                            </v-icon>
                                        </v-flex>
                                        <v-flex shrink>
                                            <h3>{{value.title}}</h3>

                                        </v-flex>
                                    </v-layout>
                                    <v-layout row justify-start align-center v-if="steps[e1-1].text.length>0">
                                        <v-flex shrink>
                                            <v-container>

                                                {{value.text}}
                                            </v-container>

                                        </v-flex>
                                    </v-layout>
                                </v-layout>

                                <component

                                        v-if="test1" :is="value.component" :data_set="value.data_set"
                                        @finished="update_skills"
                                        :items="value.items">

                                </component>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-container>

                </v-card>
            </v-stepper>
        </v-container>

    </v-app>

</template>

<script>
  import jobs from './jobs.vue';
  import social from './social.vue';
  import friends from './friends.vue';
  import mentors from './mentors.vue';
  import skills from './skills.vue';
  import challenges from './challenges.vue';
  import roles from './roles.vue';
  import team from './team.vue';
  import contact from './contact.vue';

  export default {
    components: {
      jobs,
      social,
      friends,
      mentors,
      skills,
      challenges,
      roles,
      team,
      contact,
    },
    data() {
      return {
        steps: [
          {
            icon: 'fa-address-card',
            title: 'Your Information',
            text: ''
          }, {
            icon: 'fa-users',
            title: 'Select your team',
            text: ''

          }, {
            icon: 'fa-clipboard-check',
            title: 'Select your challenge',
            text: ''

          }, {
            icon: 'fa-theater-masks',
            title: 'Select your roles in the project',
            text: ''
          }, {
            icon: 'fa-tools',
            title: 'Select your skills',
            text: ''
          }, {
            icon: 'fa-comment-alt',
            title: 'Enter mentors for reference.',
            text: 'Enter the mentors, who we can contact for reference.'
          }, {
            icon: 'fa-comment',
            title: 'Enter team members for reference.',
            text: 'Enter the team member who we can contact for reference. Please ask them before entering.'
          }, {
            icon: 'fa-share-square',
            title: 'Social media.',
            text: 'To better understand you what social channels we can look up?'
          }, {
            icon: 'fa-hiking',
            title: 'Find jobs for your skills:',
            text: ''
          },
        ],
        skills: {},
        e1: 1,
        last_step: 9,
        first_step: 1,
      }
    },
    watch: {},
    methods: {
      update_skills: function (new_skills) {
        this.skills = new_skills;
      },
      next_step: function () {
        this.e1 = Number(this.e1);
        this.e1 = this.e1 + 1;
        if (this.e1 > this.last_step) {
          this.e1 = this.first_step;
        }

      },
      pre_step: function () {
        this.e1 = Number(this.e1);
        this.e1 = this.e1 - 1;
        if (this.e1 < this.first_step) {
          this.e1 = this.last_step;
        }
      },

    },
    computed: {
      test1: function () {

        return [{
          data_set: this.skills,
          component: 'contact',
          icon: 'fa-address-card',
          title: 'Your Information',
          text: ''
        }, {
          data_set: this.skills,
          component: 'team',
          icon: 'fa-users',
          title: 'Select your team',
          text: '',
        }, {
          data_set: this.skills,
          component: 'challenges',
          icon: 'fa-clipboard-check',
          title: 'Select your challenge',
          text: '',
        }, {
          icon: 'fa-theater-masks',
          title: 'Select your roles in the project',
          text: '',
          data_set: this.skills,
          component: 'roles'
        }, {
          icon: 'fa-tools',
          title: 'Select your skills',
          text: '',
          data_set: this.skills,
          component: 'skills'
        }, {
          icon: 'fa-comment-alt',
          title: 'Enter mentors for reference.',
          text: 'Enter the mentors, who we can contact for reference.',
          data_set: this.skills,
          component: 'mentors'
        }, {
          text: 'Enter the team member who we can contact for reference. Please ask them before entering.',
          icon: 'fa-comment',
          title: 'Enter team members for reference.',
          data_set: this.skills,
          component: 'friends'
        },
          {
            text: 'To better understand you what social channels we can look up?',
            icon: 'fa-share-square',
            title: 'Social media.',

            data_set: this.skills,
            component: 'social'
          },
          {
            title: 'Find jobs for your skills:',

            data_set: this.skills,
            component: 'jobs',
            icon: 'fa-hiking',
          },

        ]
      }
    }
  }

</script>
<style>
    .v-stepper__content {
        padding: 6px 6px 6px;

    }

    .html {
        font-size: 14px !important;
    }
</style>