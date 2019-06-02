<template>
    <v-sheet>
        <v-radio-group v-model="challenge_radios" :mandatory="false">
            <v-radio v-for="(item,index) in challenges" :label="item" :value="item" :key="index">

            </v-radio>
        </v-radio-group>
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
        challenges: ['Challenge #1', 'Challenge #2', 'Challenge #3', 'Challenge #4'],

        challenge_radios: undefined,

      }
    }
  }
</script>

<style scoped>

</style>