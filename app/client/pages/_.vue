<template>
  <v-app>
    <v-layout row fill-height pt-2>
      <v-flex xs3>
        <v-card>
          <v-img
            src="https://www.rd.com/wp-content/uploads/2017/09/02_doctor_Insider-Tips-to-Choosing-the-Best-Primary-Care-Doctor_519507367_Stokkete.jpg"
            height="220"
          />
        </v-card>
      </v-flex>
      <v-flex xs9 pl-2>
        <v-card>
          <v-card-text>
            <h3>Dr. Thomas Müller</h3>
            <v-divider color="orange"></v-divider>
            <v-flex pt-3>
              <v-item-group>
                <v-chip
                  small
                  v-for="(chip,idx) in ['Arthritis', 'Dislocation', 'Joint pain']"
                  :key="idx"
                >
                  <span class="caption">{{chip}}</span>
                </v-chip>
              </v-item-group>
            </v-flex>
            <p></p>
          </v-card-text>
          <template>
  <div class="text-xs-center">
    <v-badge
      color="purple"
      left
      overlap
    >
      <template v-slot:badge>
        <v-icon
          dark
          small
        >
          done
        </v-icon>
      </template>
      <v-icon
        color="grey lighten-1"
        large
      >
        account_circle
      </v-icon>
      Verified user
    </v-badge>

    <v-badge
      overlap
      color="orange"
    >
      <template v-slot:badge>
        <v-icon
          dark
          small
        >
          notifications
        </v-icon>
      </template>
      <v-icon
        large
        color="grey darken-1"
      >
        account_box
      </v-icon>
    </v-badge>
      You have 15 new messaages

  </div>
</template>
          

          <v-card-actions>
            <p></p>
            

            <v-layout ml-3 pt-3 row justify-start fill-height column>
              <v-flex>Contact:</v-flex>
              <v-flex>
                <a href="https://www.xing.com/profile/Andrey_Bogomolov/cv" target="_blank">
                  <v-layout row>
                    <v-img src="app/xing.svg" srcset="xing.svg" contain max-width="20"></v-img>www.xing.com
                  </v-layout>
                </a>
              </v-flex>
              <v-flex>
                <a href="https://www.linkedin.com/in/andrey-b" target="_blank">
                  <v-layout row>
                    <v-img
                      src="app/linkedin_logo.png"
                      srcset="linkedin_logo.png"
                      contain
                      max-width="20"
                    ></v-img>www.linkedin.com
                  </v-layout>
                </a>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  data: () => ({}),
  methods: {
    show_mail: function() {
      let dog = "@";
      var mail = "mailto:" + "bogomolov" + dog + "live" + "." + "de",
        target = "_blank";
      alert(mail);
      return mail;
    }
  }
};
</script>

<style scoped>
</style>