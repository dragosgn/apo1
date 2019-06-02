<template>
  <v-app>
    <v-container>
      <v-layout column>
        <v-btn
          v-for="(view,idx) in views"
          :key="idx"
          large
          color="orange darken-1"
          width="100%"
          :to="view.to"
        >
          <v-layout align-center justify-center wrap>
            <v-flex xs12 style="text-align: center">{{view.text}}</v-flex>
          </v-layout>
        </v-btn>

        <v-btn large color="orange darken-1" width="100%" to="/app/video">
          <v-layout align-center justify-center wrap>
            <v-flex shrink>
              <v-icon pr-1 small color="pink darken-2">far fa-grin-tongue</v-icon>
              <v-icon pr-1 small color="pink darken-2">far fa-sad-cry</v-icon>
              <v-icon pr-1 small color="pink darken-2">far fa-kiss-wink-heart</v-icon>
            </v-flex>
            <v-flex xs12 style="text-align: center">AI reads your ugly face</v-flex>
          </v-layout>
        </v-btn>
        <v-btn large color="orange darken-1" width="100%" to="/app/leaflet">
          <v-layout align-center justify-center wrap>
            <v-flex shrink pr-1>
              <v-icon small color="green darken-4">fa-bed</v-icon>
            </v-flex>
            <v-flex shrink pr-1>
              <v-icon small color="green darken-4">fa-subway</v-icon>
            </v-flex>
            <v-flex xs12 style="text-align: center">AirBnb near your Hackathon</v-flex>
          </v-layout>
        </v-btn>

        <v-btn large color="orange darken-1" width="100%" to="/app/demos/GoodWork">
          <v-layout align-center justify-center wrap>
            <v-flex shrink pr-1>
              <v-icon small color="indigo">fa-route</v-icon>
            </v-flex>
            <v-flex shrink pr-1>
              <v-icon small color="indigo">fa-drafting-compass</v-icon>
            </v-flex>
            <v-flex shrink pr-1>
              <v-icon small color="indigo">fa-briefcase</v-icon>
            </v-flex>
            <v-flex xs12 style="text-align: center">match jobs to your hack skills</v-flex>
          </v-layout>
        </v-btn>

        <v-btn large color="orange darken-1" width="100%" to="/app/demos/Shaker">
          <v-layout align-center justify-center wrap>
            <v-flex shrink pr-1>
              <v-icon small color="purple darken-4">fa-cat</v-icon>
            </v-flex>

            <v-flex xs12 style="text-align: center">shake it till you make it mjau!</v-flex>
          </v-layout>
        </v-btn>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Demo",
  data: () => ({
    views: [
      {
        text: "map feed",
        to: "map"
      },
      {
        text: "Follow",
        to: "apoone"
      },
      {
        text: "registration",
        to: "registration"
      },
      {
        text: "Feed",
        to: "acts"
      }
    ]
  })
};
</script>

<style scoped>
</style>