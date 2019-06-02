<template>
    <v-sheet flat>
        <v-layout row wrap v-for="(item, index) in social_media" :key="index">
            <v-flex xs12 sm4 md3 lg2>
                <v-switch
                        v-model="social_selected[index]"
                        :label="social_media[index]"
                ></v-switch>
            </v-flex>
            <v-flex xs12 sm8 md9 lg10 v-if="social_selected[index]">
                <v-text-field
                        v-model="social_free_text[index]"
                        :label="'(optional) Link or User Name'"
                        clearable
                ></v-text-field>
            </v-flex>
        </v-layout>
    </v-sheet>
</template>

<script>
  export default {
    name: "social",
    props: {
      data_set: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        social_media: ['Xing', 'LinkedIn', 'GitHub', 'Your Page'],
        social_free_text: [],
        social_selected: [],
      }
    }
  }
</script>

<style scoped>

</style>