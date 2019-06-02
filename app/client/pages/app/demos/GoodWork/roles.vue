<template>
    <v-sheet>
        <v-checkbox v-for="(item ,idx) in roles" v-model="roles_selection" :label="item"
                    :key="idx"
                    :value="item">

        </v-checkbox>
    </v-sheet>

</template>

<script>
  export default {
    name: "roles",
    props: {
      data_set: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        roles: ['Back-End Developer', 'Project Manager', 'Designer', 'Front-End Developer', 'Business Analyst', 'Data Scientist'],

        roles_selection: [],

      }
    }
  }
</script>

<style scoped>

</style>