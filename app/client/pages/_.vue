<template>
    <v-app>
        <v-layout row fill-height pt-2>
            <v-flex xs3>
                <v-card>

                    <v-img
                            src="https://lh3.googleusercontent.com/ldBchu5s-PxO811KoANXYTA6HNyq3tpvWxJ2fcpzCLYw3ML8GWaxVM_7C87gx-jUlnayyi3CHncvtt6Rg2yyYzPqZZRLK_fn0cx0eUMUModnVySb-GBC4CJnvNJSFuW8pgpU3rXpuWQoAW62lTU4e4T0P5JQIkCu6D1s0fzRc0KEdo_VRXlOMcmA-dRnGm9T37FrgFMBAMti8LTpOz982z3k4aw6G4Rue7wxRN7vHXqB1J6yc-xS2v9S3ApJHR27bUo5rFseeukQpz-WFjh7Dlyf9yoSJ9D66pIgY1YbdWD_69snzgtmyt5dLrT6FWX3XtVt_RYlpoBj9RFCU_o146SAcSncQkXjNeXiuTJJASvR6jrRvzxj9ZrEm5swuGRnJl7VlE5ymPigmfdcySS6GBUbXZet-Hu6HbUyyjwxcro5l8kjQTf87qTDqz7eij-SBZWAIRfLr9qs0Fwxjs_R1hHEjoorysvVVyE1YyVWLFe8Leg4_6mMAvQxKvnFPTcDatTVk-gUjcRvNNPwaKyrzY5LuonWZFq8sYSS3dXt2gCh6biGH76oue4n1F6LW54DQ5w4umQPOkK-mqv8vamsjrTKNvk9YCk8NGyBFc5WOLF-gj7Wtr6R9QeCqFwSE9h9S7TZ9OS7AdoA4nnIlGb6qhwAqlh5nSg=w402-h689-no"
                    >

                    </v-img>
                </v-card>
            </v-flex>
            <v-flex xs9 pl-2>
                <v-card>
                    <v-card-text>
                        <h3>M. Sc. (Uni) Andrey Bogomolov</h3>
                        <v-divider color="orange"></v-divider>
                        <v-flex pt-3>
                            <v-item-group>
                                <v-chip small
                                        v-for="(chip,idx) in ['Rapid Ideas Generation', 'Lean Software Development', 'Energy Engineering']"
                                        :key="idx"
                                >
                                    <span class="caption">
                                    {{chip}}
                                    </span>
                                </v-chip>
                            </v-item-group>
                        </v-flex>
                        <p></p>
                    </v-card-text>

                    <v-card-actions>
                        <p></p>

                        <v-layout ml-3 pt-3 row justify-start fill-height column>
                            <v-flex>
                                Contact:
                            </v-flex>
                            <v-flex>
                                <a href="https://www.xing.com/profile/Andrey_Bogomolov/cv" target="_blank">
                                    <v-layout row>
                                        <v-img src="app/xing.svg" srcset="xing.svg" contain max-width="20"
                                        ></v-img>
                                        www.xing.com
                                    </v-layout>

                                </a>
                            </v-flex>
                            <v-flex>
                                <a href="https://www.linkedin.com/in/andrey-b" target="_blank">
                                    <v-layout row>
                                        <v-img src="app/linkedin_logo.png" srcset="linkedin_logo.png" contain
                                               max-width="20"
                                        ></v-img>
                                        www.linkedin.com
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
      show_mail: function () {
        let dog = "@";
        var mail = "mailto:" + "bogomolov" + dog + "live" + "." + "de", target = "_blank";
        alert(mail);
        return mail
      }
    }


  }
</script>

<style scoped>

</style>