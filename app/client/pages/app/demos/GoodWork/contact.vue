<template>
    <v-sheet>
        <v-layout wrap>
            <v-flex xs12 sm6 md6>
                <v-text-field
                        v-model="firstname"
                        :rules="nameRules"
                        label="First name"
                        required
                ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md6>
                <v-text-field
                        v-model="lastname"
                        :rules="nameRules"
                        label="Last name"
                        required
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 sm12>
                <v-layout row>
                    <v-flex>
                        <v-btn
                                color="red darken-2"
                        >Upload
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        If you like, upload a photo or video from the hack. Maybe of your
                        solution
                        or the team?

                    </v-flex>
                </v-layout>

            </v-flex>
            <v-flex xs12 sm12 sm12>
                <v-switch
                        color="red darken-2"
                        v-model="can_use_reg_data"
                        label="Please use the data I have provided in my hackathon registration."

                ></v-switch>
            </v-flex>

            <v-flex xs12 sm12 md4 v-if="!can_use_reg_data">
                <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4 v-if="!can_use_reg_data">
                <v-text-field
                        v-model="phone"
                        label="Phone (optional)"
                        required
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md4 v-if="!can_use_reg_data">
                <v-text-field
                        v-model="address"
                        label="Address (optional)"
                        required
                ></v-text-field>
            </v-flex>
        </v-layout>

    </v-sheet>

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
    }
  }
</script>

<style scoped>

</style>