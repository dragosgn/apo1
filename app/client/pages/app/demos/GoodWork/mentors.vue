<template>
    <v-sheet>
        <v-layout row wrap v-for="(item, index) in mentor_names" :key="index">
            <v-flex xs7 d-flex>
                <v-text-field
                        v-model="mentor_names[index]"
                        :label="'Mentor #'+index"
                        clearable
                ></v-text-field>
            </v-flex>
            <v-flex xs5 d-flex>
                <v-text-field
                        v-model="mentor_companies[index]"
                        :label="'Company #'+index"
                        clearable
                ></v-text-field>
            </v-flex>
            <v-divider></v-divider>
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
        mentor_names: ['', '', ''],
        mentor_companies: ['', '', ''],
      }
    }
  }
</script>

<style scoped>

</style>