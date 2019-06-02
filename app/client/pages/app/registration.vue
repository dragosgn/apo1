<template>
    <v-app>
        <v-container>
            <v-layout wrap>
                <v-progress-linear
                        size="20"
                        indeterminate
                        width="3"
                        color="blue"
                        v-if="loading"
                ></v-progress-linear>
                <h3>Registration</h3>
                <v-layout xs12 sm6 md6 row>

                    <v-text-field
                            v-model="new_users.med_id"
                            label="Medical Number"
                            required
                    ></v-text-field>
                    <v-btn
                            :disabled="loading"
                            style="color:white" color="#1B777D" @click="import_profile">
                        Import Profile
                    </v-btn>
                </v-layout>
                <v-flex xs12 sm6 md6>
                    <v-text-field
                            v-model="new_users.name"
                            label="Name"
                            required
                    ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                    <v-text-field
                            v-model="new_users.spec"
                            label="Speciality"
                            required
                    ></v-text-field>
                </v-flex>

                <v-layout xs12 sm12 sm12 row>
                    <v-flex xs5 sm3>
                        <v-card>
                            <v-img :src="new_users.image" class="height:100%"/>

                        </v-card>

                    </v-flex>
                    <v-flex>
                        <v-btn style="color:white" color="#1B777D">
                            Upload new photo
                        </v-btn>
                    </v-flex>

                </v-layout>


                <v-flex xs12 sm12 md4 v-if="!can_use_reg_data">
                    <v-text-field
                            v-model="new_users.phone"
                            label="Phone"
                            required
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md4 v-if="!can_use_reg_data">
                    <v-text-field
                            v-model="new_users.city"
                            label="City"
                            required
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-flex>
                <v-btn block to="/app/apoone" style="color:white" color="#1B777D">
                    Register
                </v-btn>
            </v-flex>
            or login with:
            <v-layout row align-center justify-center>
                <v-flex xs5 pr-1>
                    <v-btn block to="/app/apoone" style="color:white" color="#1B777D">
                          UpToDate
                    </v-btn>
                </v-flex>
                <v-flex pl-1  xs5>
                    <v-btn  block to="/app/apoone" style="color:white" color="#1B777D">
                         Amboss
                    </v-btn>
                </v-flex>
            </v-layout>

        </v-container>

    </v-app>

</template>

<script>


  export default {
    name: "friends",
    props: {
      data_set: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        new_users: {},
        loading: false,
        users: [{
          "id": 1,
          "med_id": 123213,
          "name": "Dr. Schmid",
          "phone": "+49176247279526",
          "email": "schmid@med-schmid.de",
          "spec": "Frauenarzt",
          "city": "Düsseldorf",
          "stadtteil": "Stadtteil",
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThsmhAV3cgP2f9ymMtqg9yS43NajFpUEL5zJlaR1qB6ZqeFKFZAQ"
        },
        ],
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThsmhAV3cgP2f9ymMtqg9yS43NajFpUEL5zJlaR1qB6ZqeFKFZAQ',
        valid: false,
        firstname: '',
        lastname: '',
        address: '',
        phone: '',
        email: '',
        can_use_reg_data: false,
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],

      }
    },
    methods: {
      import_profile: function () {
        this.loading = true;
        window.setTimeout(this.change,
            2000
        );


      },
      change: function () {
        this.loading = false;
        this.new_users = this.users[0];
      }

    }
  }
</script>

<style scoped>

</style>
