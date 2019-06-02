<template>
    <v-sheet>
        <v-layout row wrap v-for="(item, index) in friend_names" :key="index">
            <v-flex xs12 sm6 md6 lg6>
                <v-text-field
                        v-model="friend_names[index]"
                        :label="'Friend´s Name'"
                        clearable
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6>
                <v-text-field
                        v-model="friend_contact[index]"
                        :label="'Friend´s Contacts'"
                        clearable
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
        friend_names: ['', '', ''],
        friend_contact: ['', '', ''],
      }
    }
  }
</script>

<style scoped>

</style>