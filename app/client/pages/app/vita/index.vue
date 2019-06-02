<template>
    <v-app>
        <div>
            <v-list two-line subheader>
                <layout v-if="item.country" v-for="(item, index) in cv" :key="index">
                    <div v-if="index===0 || item.group!=cv[index-1].group ">
                        <v-divider color="orange"
                        ></v-divider>
                        <v-subheader
                        ><h3>{{item.group}}</h3>

                        </v-subheader>
                        <v-img
                                v-if="item.pics"
                                :src=item.pics[0]
                                aspect-ratio="4"
                        ></v-img>
                    </div>


                    <v-card
                            :key="item.title"
                            avatar
                            @click=""
                            flat
                    >

                        <v-list-tile-avatar v-if="false">
                            <img :src="item.avatar">
                        </v-list-tile-avatar>
                        <v-card-text>
                            <v-layout row>
                                <v-flex xs9>
                                    <h4>{{item.title}}</h4>
                                    <v-list-tile-sub-title v-for="(topic,idx) in item.topics" :key="idx"
                                                           v-html="topic"></v-list-tile-sub-title>
                                </v-flex>

                                <v-flex xs3>
                                    <v-layout column align-center
                                              class="caption font-weight-light text-xs-right justify-end"
                                              color="white darken">
                                        <v-flex>{{ item.country }}</v-flex>
                                        <v-flex>{{ item.time }}</v-flex>
                                    </v-layout>

                                </v-flex>
                            </v-layout>

                        </v-card-text>


                    </v-card>

                </layout>

            </v-list>
        </div>
    </v-app>

</template>

<script>
  export default {
    name: "CV",
    data: () => ({
      cv: [
        {
          "group": "Start-up Ventures (2015 - present)",
          "pics": [
            'https://lh3.googleusercontent.com/a0cKz3syDWSPf6-3bPc3BEAcI0qjHtWSbQvy6gs5hjEmz8XeywFF5WuJNfQ_XOxIIjyD9nmuboX3PbXQdYeym5cP3vOTv9dPecMNS-3lE1gfBe1u1tkonlSoDQu-3OlWPim7Z1ET7_7TopAQseLIO0RkY0onfrDfYSkg81pNKkUU_MXPWzQHxCcG-z4L451OGsWvT6GW3Vq-jbAPMXDqve0L2zuw7vZty-bw7KKYL9PB5HwSWQclnfuA1cM080L33SI42N6FEn0R92swqu7-JqehmZrnSO_aoCk3sE6DVj0JDKtyWrBhG0lHkBVrCOLB-ZsNiVj15arjrisnT0eNmKJtduIj5r62fGC2OlxjHH6w1nOcmdFdCDrl3qG-Qs-hdkV002ekdz-ujhzM74FBeDQDOW0nw0unDjZ_-xU5Le8kLTVH2trT1dsLDYTjEKGHPCo-1bQ4aMNCKSGN7D02M-0663Cybfd9qNYp4AHuIeCeCQ6k1X64nWXA3z_MK_SsNiZN58f2WoyKzt0iswBVP6ufb7xIlC2CdoBzyMLhoaIkAELbWmpNIbu4kiWDGU8zd3e8t0n0Z3BKPIIx8v04XT76AHvDtY_GIsdaQ7aNjhC07DIiozkq3_27gxa-ifoFosaohmTZrxjEV9EyJ52459x3yXdCn68=w940-h450-no'
          ],
          "title": "CEO Aindex.Ruhr (Up to 5 persons team)",
          "time": "2017 - present",
          "country": "Germany",
          "topics": [
            "AI-Analysis of GIS Big Data",
            "Solution for attractiveness analysis of real-estate locations.",
            "Operation ongoing"
          ]
        },
        {
          "group": "Start-up Ventures (2015 - present)",
          "title": "CEO and Founder at Tryggel (Up to 4 persons team)",
          "time": "2016 \u2013 2017",
          "country": "Sweden",
          "topics": [
            "AI-Analysis of Human Behaviour (Internet of Thing)",
            "Raised over 70.000 EUR funding",
            "Elderly Care Solutions"
          ]
        },
        {
          "group": "Start-up Ventures (2015 - present)",
          "title": "CEO and Founder at ADNAMO Safety Solution UG",
          "time": " 2015 \u2013 2017",
          "country": "Germany",
          "topics": [
            "Application of Lean Business Development",
            "Raised over 30.000 EUR funding",
            "Fire Prevention Solutions"
          ]
        },
        {
          "pics": [
            'https://lh3.googleusercontent.com/WRXNwAxGsMZGqk0OfBZMNGcg010TG3juHt6WIIr55kdYCQntMzPWcqZGCvcyRkgl0Cv5fyh40Eej0lxeLkkWO-9l7g1hXCSLB0lOcxDIn0BiFb0wa9LNH1Jx8VhFXKrPXPsGEy7cWTWxEg9tT5G2OHDrnPbzk2vopSEUEIhENhVlH1BhdW3qR-WIHexGKRjODr2oupV_m3o9KA_fmh-JWyoB5bB1ixq4Rn4z7eqpfnHfzYvhtDLAiAH6UcFfwp4_vMrmQIt9hctVqeUMiaZf_zyxqtiMEbUo8m8sLEi8M0Ozy0zAuOBa0MXHCQdtUXqz7_u5bDeIdOy62YD88zQ9Dks2oWk6MIlm9sXTAShTeroWpfX6OgMQ5kMeURk2BNKPHJoWaTuyMED4iNn8k3VlPLDpjFjsmsKnTlOR1i94b33zzUSCqZEomZBNvLZFlHbvrR3uUzNfzrhjwYE3xD0EPBQ3TT7YCWixplpA3IEE22J4-x8DY9x4TFRrLLfdIwmqqeaSmpoZatli0KMtBF0SRvk8Rf0krdm3TasWhhVIjK5O3Eai4503Sz_MCPFddx3hdFYOeGwCbKh6Z2xmDm7OrjwR2EYArCzf4HK8XQTKoR8H93Hd_yE_r2I-jXAF1Nm9X3ZN1I_om4vtRr_Bypf7ZNcBhXifDUs=w1887-h1275-no',
            'https://lh3.googleusercontent.com/NCsh_MRMT_O4Xlup8VQshKOCVCUqxfigLcHhBq8iiSZLiQcLoiYB7iT1dId0NYXh2x0tUcbobzhVqFOu-l-dkkGnZdktPAk04Ti9K_HC00tic3ORXWxy57meX4hki6VkwgzZkWR8bunlk9GzTjN2nub9flXd68RM1V1RlaN7NW566m_hetPBEB1Hym_2f5iidPDK4i-X5otojtlC_APkkOsu0lhSA6U6ZB65VpegF-ScQnKwdY8VjhwkQUyWU0lgvHkNndF2e5a0NdqmFMHOpFnmbGXM-_UP9KYwtuFW6CL7ReFns0yr2f8rkRWiNz7dpsomng3833IAS2ESUxRLRhJ36xq_flyfWeUy_3WeLSiunzmWXljnOCzxSabof2tCICgat8VR8rZu03eru1bfnsK-2BFHsQvMwrdplz1acC4E-75E9mMR-RRSLbW-yS4RRWc1kVlr_gQtnRU2FzSAy8byPDtEWaacIvXXc285zqXKmNFEg8i8BDijRxSj6ZZ7j1Q6Fqvzb0hfJtCFZA3Ze9DssCvgO9EIh7uQ4nqTGKqapsPaaBgebMVeKiM7QSajp-GtNPc-fNv3K9Iy-pgVGldMQmKcL8d3YbgQF4bh99W07F-mdPR5W7-R1KAdVWSYUILFpHoKhuvUxMtAP8gcpwwd1_rKggs=w1920-h480-no'
          ],
          "group": "IT Trainee at E.ON (2013 \u2013 2015)",
          "title": "Project Manager - Strategy for Smart Meter Rollout in Norrk\u00f6ping",
          "time": "2015, Q1 - 3",
          "country": "Sweden",
          "topics": [
            "Project Budget around 1.000.000 EUR"
          ]
        },
        {
          "group": "IT Trainee at E.ON (2013 \u2013 2015)",
          "title": "PMO at Innovation Centre in Energy Grid Tech in Malm\u00f6",
          "time": "2014, Q3 - 4",
          "country": "Sweden",
          "topics": [
            "Business case analysis"
          ]
        },
        {
          "group": "IT Trainee at E.ON (2013 \u2013 2015)",
          "title": "Junior Data Analyst at E.ON Gas Storage in Essen",
          "time": "2014, Q2",
          "country": "Germany",
          "topics": [
            "Development of Calculation Too<l with Visual Basic"
          ]
        },
        {
          "group": "IT Trainee at E.ON (2013 \u2013 2015)",
          "title": "PMO at German Smart Meter Rollout Project in Hamburg",
          "time": "2013, Q3 - 4",
          "country": "Germany",
          "topics": [
            "Agile Project (SCRUM), Scrum-Master assistant"
          ]
        },
        {
          "pics": [
            'https://lh3.googleusercontent.com/LshqnXRwed4jxnWyH8StC8_J2ojr1BTZB7IHR_cO_EJKo-u25gmH8frBRpFRSWNQL_3izMWds9C6n_pDHPg2AagMEXHxkBkBpCA6qvKT2H5IxCg9ySJnBMMJClNBRIqd4VH52DSKtxfLqaAhtAgiHq5ZXP3rjKhjgOQ5p2KEhUdi4vyoxU0lyIQ3uWRe4KNC7G-BIfd0QmrlOSiWDlqdzI4KQGk_EpGLw0l0-E4yV_v51Y76XVRzzVst0JH7hGg8xlllZ-9JJHRXBfm8IgboXFFRS756y0p6Uc4eJtD4u_zOxvtUcCbaZx7BesKNlrjDNsbOu1NEIYUQgjwbIPQFWyvmRgb6HlQKHC9Pynj2-vT4PKTV6LSGEhmqaDqUF7JknTwCcnxciHep44e_Csi_Jejzm4JnfBT7k2MwUvbOkwsFFCwoY9WAxpf6X4D7npSPfV29M-TrwJ1J9LLd1mzejqtAmMhVWccqHHHlQzZ-sd2QWYXl_t0kBiMcos6EjWRTo2ccgmxAmWuhm9wVWpA4XgZ8rw9lvsl2on0WbSkuqBPX6UoMr_KXIVhlzOjA81iOuaOXX_SaBJaxGOGRgjsL3HtNLX-NOjOywZSfubiynu-3x5bwI2Kl8VhbLzLt80rFmCesSI0pwvyi-QXB2Mbuw1R37FsJ8wA=w571-h381-no'
          ],
          "group": "Consultancy",
          "title": "Consultant for E.ON in Smart Electricity Meter Rollout Project",
          "time": "2016, Q2 - 3",
          "country": "Sweden",
          "topics": [
            "Scouting and Evaluation of technology trends in IoT"
          ]
        },
        {
          "pics": [
            'https://lh3.googleusercontent.com/GsBi4y3BT9K7nb857tjq1Lkb05XeAk2mSK7ZXTwmQXqyyJJePhAcqD8NgrPBRP4qGZ10FVevbgSk2n6pU9eu0QhsirxNY2-A7hcYuUH9FTcILhIr9xzVuc9E10WZy8rNYFaT9C5XIY6jzdbw9c1bJcbd0bosQMy5ypd00mgx_JO6esCXIKeTLZUoJ_gkegA14SfERWgU2z5jitOob5FH5MXy1lECKFGZ5JlHC6BubjP_RNC62IJubDCebiWHaJ379nLKDAenCaPr8pvFsraNcnQNDPRv9WSSILGB8xkKsHbe81VphJxQkypzsdTPXO8pctRUta93F5wxZbp8bAwCMbWnrR-fndfXmB56ThoB6HN_UPhcQLNR3LZKHG4KflGGJ80ASXLxy6DFpxRqHdGfHQMWgzBt_MnfCPa_wa8yMlIWV0gHdtZzvinl1u6BoHenIbQNKTUazZolRJoNz0reBZpaTheCkq2hq4jdViJ1Ao_5ijvpFlEloBJU6LV_DUpXUEj4DqMCUChrQi8oVsMGfXWi-EWilvG7yfydQ_ImJeLqu3YkdWHHuL-Aertc-we9zNatbP9VpiFIa_YARXFi3kAOo3cjPT2anIfpVPg1sQByE5R8Wa-ayze4NB6PtK4dOxwGQJUw-5j7W2qqp0YF0Nvglbi7gPM=w2561-h1253-no'
          ],
          "group": "Highest Education",
          "title": "M.Sc. Industrial Engineering (University Duisburg-Essen)",
          "time": "2012 - 2013",
          "country": "Germany",
          "topics": [
            "Energy, Economics and Engineering of Power Plants and Networks"
          ]
        },
        {
          "skill": "Languages:",
          "group": "Knowledge",
          "topics": [
            "Russian, Ukrainian, German, English - fluent",
            "Swedish - good",
          ]
        },
        {
          "skill": "Presentation:",
          "group": "Knowledge",
          "topics": [
            "Excellent presentations delivery - 3, 5, 15 or 30 minutes;",
            "Excellent power point conceptualisation;"
          ]
        },
        {
          "skill": "Management",
          "group": "Knowledge",
          "topics": [
            "Lean Business Development",
            "Lean Product Development",
            "Agile Project Management (SCUM, Function driven Development)",
            "Software-Tools: Trello, Git, Slack, MS Projekt, Jira"
          ]
        },
        {
          "skill": "Tools and Concepts:",
          "group": "Knowledge",
          "topics": []
        },
        {
          "skill": "Energy Business",
          "group": "Knowledge",
          "topics": [
            "Broad knowledge thanks to education and working experience",
            "Excellent knowledge in the most areas of Smart Metering",
            "Work experience in Sweden as the most advanced country in Smart Metering"
          ]
        },
        {
          "skill": "Handy-on experience in IT-Development:",
          "group": "Knowledge",
          "topics": [
            "Extensive knowledge in GIS-Solutions",
            "Python, JavaScript, MongoDB, Visual Basic",
            "AWS, DigitalOcean",
            "Tablue, Excel"
          ]
        },
        {
          "skill": "Hackathons:",
          "group": "Hobby",
          "topics": [
            "over 30.000 EUR in prices",
            "70% winning rate",
            "On 3 continents",
            "In the role as project manager, pitch master and programmer."
          ]
        }
      ]
    })

  }
</script>

<style scoped>

</style>