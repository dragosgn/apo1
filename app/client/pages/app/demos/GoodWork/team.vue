<template>
    <v-sheet>
        <v-radio-group v-model="team_radios" :mandatory="false">
            <v-radio v-for="(item,idx) in team_names" :label="item" :value="item" :key="idx"></v-radio>
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
        team_names: ['Team1', 'Team2', 'Team3', 'Team4'],
        team: {
          'Team1': ['Member1', 'Member2', 'Member3'],
          'Team2': ['Member4', 'Member5', 'Member6'],
        },
        team_radios: undefined,

      }
    }
  }
</script>

<style scoped>

</style>