<template>
    <!--https://codersblock.com/blog/creating-glow-effects-with-css/-->
    <v-app>
        <v-container>

            <v-card pb-2>
                <v-card-text class="text-xs-center">
                    <h2>Hackathons participation statistic of Andrey Bogomolov</h2>

                    <v-divider color="orange"
                    ></v-divider>
                    <v-layout row class="body-2" justify-space-around align-center pt-3>

                        <v-flex
                                v-for="(value, stat) in {
                                Total:hackathons.length,
                                Won:hack_won,
                                Cities:hack_cities.length,
                                Countries: hack_countries.length,
                                Continents:hack_continents.length
                                }"
                                :key="stat"
                        >
                            {{stat}}: <span v-if="!loading_stat">
                                                            {{value}}

                            </span>
                            <v-progress-circular
                                    size="20"
                                    indeterminate
                                    width="3"
                                    color="orange"
                                    v-if="loading_stat"
                            ></v-progress-circular>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red" small block to="/app/planedhacks"> future hackathons. Check hier.
                    </v-btn>

                </v-card-actions>

            </v-card>

        </v-container>
        <v-layout align-center justify-center>
            <v-flex md1 lg2></v-flex>

            <v-flex grow>

                <v-timeline dense
                >
                    <v-timeline-item
                            v-for="(hack, index) in hackathons" :key="index"
                            color="white lighten-1"
                            small

                    >
                        <template v-slot:opposite>
                            <h3>{{hack.position}}</h3>
                        </template>
                        <template v-slot:icon>
                <span style="color:#ffa400;font-size: 12px;"
                >{{hackathons.length-index}}</span>
                        </template>


                        <v-sheet
                                :style="hack.position?
                                {
                                    'box-shadow': glow
                                }:
                                ''"
                        >
                            <v-card pt-2 class="elevation-2 "
                                    :style="hack.position?'border-width: 1px; border-style: solid; border-color:orange; box-shadow: orange':''"
                            >
                                <v-img
                                        v-if="hack.pics && hack.pics[0]"
                                        :src="hack.pics[0]"
                                        aspect-ratio="2.75"
                                ></v-img>
                                <v-card-text>
                                    <v-layout row>
                                        <v-flex grow>
                                            <h3>{{hack.titel}} </h3>
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-tooltip top>
                                                <template v-slot:activator="{ on }">
                                                    <div class="caption" v-if="hack.position>0">
                                                        <v-icon
                                                                :color="star_color[hack.position-1]" v-on="on">star
                                                        </v-icon>
                                                    </div>
                                                </template>
                                                <span>#{{hack.position}} Place</span>
                                            </v-tooltip>
                                        </v-flex>

                                    </v-layout>


                                    <v-layout row justify-space-between>
                                        <v-flex class="caption"> {{hack.city}}, {{hack.country}}</v-flex>
                                        <v-flex class="caption text-right">{{hack.date_start}}</v-flex>
                                    </v-layout>


                                </v-card-text>
                                <v-card-text>
                                    <v-layer align-center justify-center row fill-height>
                                        <v-flex xs12>
                                            <v-item-group>
                                                <v-chip small v-for="(chip,idx) in hack.tags" :key="idx">
                                    <span class="caption">
                                    {{chip}}

                                    </span>
                                                </v-chip>
                                            </v-item-group>

                                        </v-flex>


                                    </v-layer>

                                </v-card-text>

                            </v-card>

                        </v-sheet>


                    </v-timeline-item>
                </v-timeline>
            </v-flex>
            <v-flex md1 lg2></v-flex>

        </v-layout>

    </v-app>

</template>

<script>
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  export default {
    name: "Timeline",
    data: () => ({
      glow: '0px 0px 4px 0px rgba(255, 164, 0, 1)',
      star_color: ['yellow darken-2', 'gray', 'organge darken-3'],
      hackathons: [
          {
          titel: 'LE BLOCKATHON DE LA MUSIQUE',
          date_start: '2019.04.29',
          date_end: '2019.05.01',
          text: 'Blockchain and Music',
          cover: 'Some travel reimbursment',
          city: 'Köln',
          country: 'Germany',
          prize: ["1000 EUR"],
          currency: 'EUR',
          challenges: 'a ton. flexible.',
          tags: ['music', 'blockchain', 'metha data'],
          overnight: false,
          url: ['https://le-blockathon-de-la-musique.com/english'],
            position:0
        },
        {
          titel: 'Hacktival',
          date_start: '2019.05.11',
          date_end: '2019.05.12',
          text: 'A standard university hosted hackathon. But with quite good prizes. Also a typical short duration of 24 hours.',
          cover: 'none',
          city: 'Karlsruhe',
          country: 'Germany',
          prize: ["3000 EUR", "2000 EUR", "1000 EUR"],
          currency: 'EUR',
          challenges: 'BE YOUR BEST. NO CHALLENGE. I think it is very cool.',
          tags: ['uni', 'free'],
          overnight: true,
          url: ['https://hacktival.io'],
          position:3
        },
        {
          titel: 'Bosch Connect Hackathon',
          date_start: '2019.05.13',
          date_end: '2019.05.15',
          text: 'Hard core technical event! NEED to apply for a free ticket. Otherwise it is 350 EUR.',
          cover: 'none. But you can get free ticket if you apply',
          city: 'Berlin',
          country: 'Germany',
          prize: ['? no prizes ?'],
          currency: 'EUR',
          overnight: 'undefined',
          challenges: '6 Challenges. Around IoT, Smart City/Home, E-Mobility',
          tags: ['e-mobility', 'IoT', 'Smart Cities', 'Industry 4.0'],

          url: ['https://bosch-connected-world.com/hackathon/'],
          location: {
            google_maps: 'https://goo.gl/maps/jQNicmfg8fR6LFf49',
            address: 'Luckenwalder Straße 3, 10963 Berlin'
          },
          position:0
        },
        {
          titel: 'Hacking Engineering Hackathon',
          date_start: '2019.05.17',
          date_end: '2019.05.19',
          text: 'Hard core technical event! ',
          cover: 'none.',
          city: 'Berlin',
          country: 'Germany',
          prize: ['5.000 EUR à challenge'],
          currency: 'EUR',
          overnight: true,

          challenges: '4 Challenges. Around IoT and Industry 4.0',
          tags: ['image recognition', 'IoT', 'data analysis', 'industry 4.0'],

          url: ['http://www.hackingengineering.de/hackathon/'],
          position:0
        },
        {
          titel: 'Improving student live Hackathon',
          date_start: '2019.04.12',
          date_end: '2019.04.13',
          text: 'Use of a raspberry pi to monitor quality of engament at lectures.',
          city: 'Berlin',
          country: 'Germany',
          position: 0,
          tags: ['EdTech', 'azure', 'raspberry pi', 'cognitive services', 'power bi'],
          pics: [
            'https://lh3.googleusercontent.com/IxwJCci8NrMfdCUQmlIPwCWJW925a7IogApvzk6Z7_UYm6kzqYdkCQyfrlo1wQOK7yZdIYXgxk6e9B5ViGiY1Ed9or9uF4RjrM0m3Ni54u35oCLhJQBqCJCl2y-vYAS05fCTLD_gMj9oPyTlXOPEx0s4V4uGihp20Y4G8fH5KUyKQs1NHYoXRzHIrjdVB5CnZX5oZM5LGTjw1kuzcUn-x5-TVwEuhE7hdWGw7Cm3nDdJoil663QNZPEgMo6aRBmeDEbIYsA7jiT74iD4mgoJRvPNj67cz2VVDDgiyFvak62E51GznSC631cBiK1_qtRjywTNosptUMbr8K4xAOsKEP1XU8ieziZo4vSNy8Nea5iD0z1qaQ64HSKiej6I-T769uEPJpzI2AN1Z_yrZGGxzbR7NopHouMHydaMQI5wRy5Yqn6CoDcmUHaNGiSMtClZAaC3tfQ7x-PlmIsZIvPiyMrS43f1cRyCvXMLrQX_humnI7Bgnr4wdqCv8JUxQ-8JpWMp9TDAdWscquF6xQKgtLh2xPT3zQSLDw_YQ39CesIqMqCV4CyQ4inLgj3eMIyO8ke24y3T8C6h84Db6zX17L--qoEO0WSuwU8deeVlzOvZMGVPiSei9sIyBBvGXHgECBqbNcA-u61-c3oFdsYEZLOziMl7jRg=w2046-h975-no'
          ]
        },
        {
          titel: 'Transportation Hackathon',
          date_start: '2019.04.09',
          date_end: '2019.04.12',
          text: 'Use of Social media to collect feedback about the quality of the ride.',
          city: 'Menden',
          country: 'Germany',
          position: 1,
          tags: ['social media', 'trains', 'preventive maintenance', 'accelerometer'],
          url: [
            'https://www.facebook.com/1916174505079131/photos/a.1955381334491781/2624950090868232/?type=3&__xts__%5B0%5D=68.ARBC7PWrrAxA3umr7zhvM9HPTCdfQXUH0WOq2dmtJrhzVSGwJZiwlxQJcrkQiXGRwYGH4LtaJZwjHBDmZBBm4OqEkpL0n8VRqj8oUP7F1qsibVzZCh4trgzATJ6sF3PLXoLZghjHG1JGUJf-T3vgCEsYPSZ5j_lMzH7AD6qcplLzEWSJnMmH_9EywGJPkXwuGcTuJaowU7xjh84FGo11ZPTg5FDuCSeu1oiaXqbr7GX4WUNKKR8q-6Byig_-ma21d8l3N4HSi0fC0jWN_soLRKJbFuVWElZIXK5ezTdVODMgnKLi-d2sXtkCZQNpBris2oBkfGMZTvYUenpcpXh0Qn-QuYAFxuQRJosaXTcgBFP21GTOBCWeNJccQozErGOShj0143Mi7M6amRFUddwKWnJn_n-W07LfEjmewh0xxxDG8q1dVNoZ&__tn__=-R'
          ],
          pics: [
            'https://lh3.googleusercontent.com/0wE0l7NCfCMcjrucjkC-eGKwgyH67Cd34_WZ9tegOqsFlEVf3krK2L8En8VvgWPQggwIGmUeRr3TenyYdJnv738O42BykzKETMrP19nFPL1zcBCCo6w_lL84N9adE8fekjPzyNFt7pj422CZxtd7GmstfQF-h654SIzkZA6kOimLtNFxCmSq91xWXhKICf4Xf2kEMILzBhIzskWag44KA4WNOy7iYqfQoXR59aFmEEp09abkVilPOhBZ_TEq4adA0yjefMBFwPi_qCs1cjq0y0jvkXRhjB4aSJKPTcbVm0AG4Pu16S2AKy3EeR_MhW_hTbOZfUNADEqj3nOyxv2nydWvNXRtqIfTKxU54pReHSzXFM2wWEzEp3qjbvqpI0NJdvqz_WZVBzoMZQ065N8wlp8w9CYRj7OrFPuyDJKkV7uUycern6ymuZkB9TLGCuiL1eXWcq4hHZyYYSo7Jb_rnQIth9H3RRIyiNx9u7sT04yEyVF8aJEplnvGZcAqnCvHi5XSECtkCkjPC_jLbkCwBL11O4Iu2EVDsIIVZduiEcDUaA0BF5D3KFFCDEFm23wZL9TDs8_M2uyMfpxu-sBaPwi7-YnT8E1TNhg9nGwpzzPGYVIBYRfeb0BAKcBe7VYqKzbThnoEDMUbu5G4jqFmrFZXlhz6xvt--sNVj16G4Etv1wZg5tBKc5olxY1gP9J2dgQMack1fv3CDBH_q4mVNjp_=w1600-h1067-no'
          ]
        },
        {
          titel: 'Energy and Blockchain',
          date_start: '2019.04.05',
          date_end: '2019.04.07',
          text: 'Use of Blockchain for micro-payments and micro-credits in Africa.',
          city: 'Essen',
          country: 'Germany',
          position: 1,
          organizer: 'e.on and innogy',
          tags: ['energy', 'blockchain', 'micro-payments', 'sms', 'factom'],
          pics: [
            'https://lh3.googleusercontent.com/9WbvAdgFUoEg9Fd8S8QUjw6Yy0L4LboIyoG6-7bgV6IBvgjuRiT3oXJhP4W0wCaR9WsrWtlmzcfQ4viYr9vAA-8Jw2GwCtGuH6UYz-72oeAQFVekM63TkghKyb8Xhq_VWp0lLHqW4qdP9yzwx0HVGmPrXkI9cM5iMHjhhu8glzi5D_pLqsVBRYFM0oOqy-cKedjyb6mZ5xsKU1p1Nu3stt83lscssJovp1x67MFH-GIFGJR-SauX-NzsqPPDKV0tdCeDqEN0f2bDb3Oqvex-UP9CiVCHc1zg3Aa77gWGE8rYAIcko1yPsWHnDqt9kEeVcaQ-o6J9L3Yttc2QuuF1WGNvXbSW9OFJEIhGTr4sOMerLkytCm4n4MJ3Z3Gu35D7eJrZYgm3e1zDXbRwvo-LJbPMX_cqQFNykyWWAvU5ilEi0V_vS7pjp2tOXYmv5tISMxMHFXiYLAcvBs2t9nCxZHSnGYZyaZ6apAXbKWvSJqXJlKfav7cC79ghnT7wnw2No7FpbL3WQwSPdyJz1jdXU2SvXmelTug8pZ6z61wl3KbiR_gXa0OQ-wKHCg6MYRnknzLnK9drp5D_KDvMyrMInJml6BFPrVAf8v6jy9y-I4hkWsh_o5riTQqIj3bN0lo9aqXIVdZQzLndZky4jxztCrOXwrFPMAI=w2200-h1238-no'
          ]
        },
        {
          titel: 'Flights and Passanger Hackathon',
          date_start: '2019.04.02',
          date_end: '2019.04.04',
          text: 'AR solution for advertisement at Airports.',
          city: 'Hamburg',
          country: 'Germany',
          position: 0,
          tags: ['augment reality', 'flight', 'airport', 'retail'],
          url: [
            'https://paxtechhack.bemyapp.com/'
          ],
          pics: [
            'https://lh3.googleusercontent.com/Df5oBaQTeRdPkTZWUHeDxg2C0pbEwhpAFNBPPbuJ8XufdKSIaeA3np0TOXNA0tIPMbQ_3O51YPl4trXzAYjPvFOJZTofDJu1j03_dqALPPzhNNfjOFurJlCxcLTSUWC3cxFyiNiRRupPh3Ny1l_taNhh3dI7R67Ic-lZWXqLSsJdz7uekspVWiTlWXNK9P587kjC_huEUsL7OPApRVNjM7EDd9Jxng6kD2wijMoAYgsXk5ch9dtCmVgZ8nfrIoDwch3c-O6NJB1QipMjgpBfWMeTYX1viy_TwxGu1JsOXKb-R58W53CkJp54IXeGRMhPPhks3zZNKdilXVEyBkG6loPuS1VKLLHX1DAQto2P7-4nwgezaGwQwxB4PmANdxJzBPUy1t6OQ4gVrl8L36ftRIJTFdUlaetlIXVITTi3jXE9NnH5THuvvZS0fuW1MtqUMifh6OPkppboBztk-BOxdDqNByURksPEd0d9GcLeLs-mCcyb5xw9Dk48FfL9gz3ThSeGpgeHZ77278FG3MP7ytWoxMZpp7nSdnvVQodaBqfnqLgRqmk1vvqtGKEWJNVGdP9Lrlz8YSj9BO3cD8s1kdN8Z63Pm9BCvfiNl1Gysogc3woOf9iG13NGS-WhpOrvMSFQO-vRt8fwhE825cN60esLxh0lpA4=w2560-h1440-no'
          ]
        },
        {
          titel: 'Contraception Hackathon',
          date_start: '2019.03.29',
          date_end: '2019.03.31',
          text: '',
          city: 'Paris',
          country: 'France',
          position: 0,
          tags: ['HealthTech', 'contraception', 'natural language processing'],
          pics: [
            'https://lh3.googleusercontent.com/YueaKS76e49Z-g_BL7Kh1_51QLDcgUZGdvQhuniwW9IvAyJaf8IBlXsWQlHk7mlXj5CLYMexLHfz_eyLTnMCt6HprjUHkMoyQIydQbYZ5u_R4JZS0vvgEnigAtfOhbpf3GKnVNXFI3u7IzWXHteRptIiyY7AzQVgtULm7ov-LHnvwyYs1M7ph7NCPlhr5gNJK-X6qG_tNE3X6R5xBbnBWByJlYp1DnG7oTWvSAvsILKs3gI75u-q7dj8WEggs7t3DO6q5zqGwAUEL5RMAGiILV1hpX5eScyLLxTH2Fw6G2_Cyl3iSvR6ExUSuEZOtKR4m33Ki4AaFrqlQIIyaciJi_lmcmkocQGNu3D23LnTLMjeZAD5JKFQdsz5DAKz1FLDBPTKFkj5ewHpj0Tp-FOcslphpR6HDbX-4YuMujyNsHyEwtxny7ba0rwVC5Lm9GlKjIsuN5hDZeSevhv7KcJSFhv-4UTH6pei-NzhO0m9uD3FO5-4louV-4mFLWUAoEIrKWra-gS05WlGWeouwQuz5c4ZL73RytdWPznpRhArhumEQ08WcGrPOPfLoN3GahDaleQArDHRxV-on9qE8dN1HXM2JcdtSIrr24TUc3lfW5Rz5_eRpNcNIiOyl_RI_AU6crUwPDOfvacmzeNI9AcF89DjlY2vC6s=w1630-h1941-no'
          ]

        },
        {
          titel: 'Banking Hackathon',
          date_start: '2019.03.15',
          date_end: '2019.03.17',
          text: '',
          city: 'Berlin',
          country: 'Germany',
          position: 0,
          tags: ['FinTech', 'contraception', 'natural language processing'],
          pics: [
            'https://lh3.googleusercontent.com/XJFVLIAv7BrrUeePjTQDIwf6eT9dVwz4kakXM2rc6mdsbShkBaMAZWBippDP0vEsFddQa_8YtK4PMfkGRLLKPKqXpm-i_oguQx9H76XRuy_JuUL9f7OHIqtmHXNmhiz6xbRHwq_GH8GtXEwo1XVtP05X3jeGC-FnFOW2oGZsqpH6gdBu5D0w4WU59LCjQNlrBl042GBbku32GpT9i6cggn5BCNXyTiHh70xQX1QGb8aoVM2CVBn4Lu6QEy11hjHJSTbh5Vhcki0PhGKa9WhgSZUqWsi4WjQ8jrmEE9mRTQwLHSsHTKVkLA7ehhDO7lMN-Vs4r9riRAf6QWIrYYdYJQ_fNljLc80U3sNuwj_08HmfOqQ8PVRssLI6uWYwE6PjLLa-imIgcDPziX9vR0CUjJVvIRk-_RupPT-kNOnWmgOfpfY7z3JNP4nGIiGEfa42rphuMM5WKZT-QUDcOYpvEUPRSve0Hnw5SnuF16-nz2cVPMDtz4ktMqy0Cv_3j8Fi7Bk5E-JIHrl3dP8DDcWU1DoF5JweBPnlaP0pfjYF2_-IJeOuCO9pa4xurxVYVryRPwOvAq9EnT5ykhHvKWw-faWpPC91gaNPOFte-F4iPwGwHWFcxpIroFgj9UbHTU3XL4IW2d9KFpzZpynUiyFEteaGOW7vy9Y=w1600-h900-no'
          ]

        },
        {
          titel: 'Insurance Hackathon',
          date_start: '2019.03.07',
          date_end: '2019.03.09',
          text: '',
          city: 'Munich',
          country: 'Germany',
          position: 2,
          tags: ['InsureTech', 'social media', 'artificial intelligence'],
          pics: [
            'https://lh3.googleusercontent.com/_5lQ7eTn9WcVEFEJAKMT9UD69AhWmOgEm75Ybtfju5aDZGLF-8HgGO3tkEvMQpflXD7r0lOZqvFUo7HBDv78RYGi-g56f4im-o__LtuHAChw3xspren2IzByJRCiBpm5NLS8xKXUnEWTI4CnfDYguevLQedJWRNTKQAqOu1ZsvQ7cmaf6qkMqh5c4bl1EN4CVnRdAAWmDgNq90iMHLn9XYlBPOXicJYOOoWHlFhBF1u-Y_YRUq1_XHFmh7VNLP-UG87POZhGUUg2nV451zzex_xRyzSwz7ZOasx-axZw0rrSOZtaax16HofsUjKCvcRfe6wH67CTMj54xYLodsxu4fd7ZNS6E89zmESuPk2H9i2FA26Xvis1_QFl419dwRRV6Mnn1zFw6tMwG96A78qo5IkWjj6US4N0GJMvdfiszgas2-cmL1oyAMbw48uYrevyn2Eq9fY2Wxj_bnFdXaimoE9mk2gEBRWaNL0gYVjxZJDunBkFtQCn9C4zM6kRJWXG03dIam4Sgo4wLFfqSZbnhq4X038LN88_iCudRmQ0ZiFUXi9VMqYJYOHNX3rcKngJi0y60t-mrNQfnGq_aash2ZE_rEUp0NmODFYgCg9IQKKWtzs6RP9UAO073XJOcA4zPmcIqRwlpAGcEvAfW8q4U7S1wTLeWhY=w2588-h1940-no'
          ]
        },
        {
          titel: 'Medical Hackathon',
          date_start: '2019.02.15',
          date_end: '2019.02.17',
          text: '',
          city: 'Berlin',
          country: 'Germany',
          position: 0,
          tags: ['HealthTech'],
          pics: [
            'https://lh3.googleusercontent.com/gvsj2XgzHROB4ZwHo-DUkvGp84pcd7sV3ggXMu-V8N9imrI24tDBN7MuX5ADitlg3Kp9oBsuKwcNUVpgq-9jxwizdJI9Io0cK4PQDncOyY8hE7H382woFFXn5lLSnJCb1hesJGYHXWSDOBMrsYDH2c0BkAltMCNaGGHrt-Rod2HnU8TC5dKsy0y8oUcgdnrVBaIX_jUlFAb2kjoVpHYXHbg_JI7efeYBPhYAm8NCqocr_Y0WMwFT0UHxWK-PDJ7-kRlR5C2A31QpObR2B-O8v3N8C99EvR-cN9uZ2yxISsyWXzs498mt3ITRUDtC8DjyfrvX7yu2Dz9lkOTD0Mm6dBc9bBnfyDnen6pabXCNv3hNbiKRml4jEZSWu8e0JR-EIoGlXcQIAJhIVy0cM048Pa8dqRgCGnLudzcvAPnPj6URDALkXvcEb8EUGvhbk4RXNvkNE2I2FuzZuJGA0l8OFT1GfeyroUa_3JSUMn02RVIz3_Gc9HYby_eFKuUL1JkxvIz9wbvH2QR5Dr0A5QwflJAoKUCnWuZYrM52BwW3iN5gIzyIdisV1hoCtDz63RmKFsMuNUKmK1IY-sJ2q_PDEqkh4_oaO8O5YcxdqI5VhWpQJK0-eJOacWxkpDyn_Sx9p4VhpfXEBjyLUQRG97fQHLNuDE2e2K0=w2560-h1707-no'
          ]

        },

        {
          titel: 'Zeiss Hackathon',
          date_start: '2019.02.08',
          date_end: '2019.02.10',
          text: '',
          city: 'Munich',
          country: 'Germany',
          position: 2,
          tags: ['HealthTech', 'computer vision', 'artificial intelligence'],
          pics: [
            'https://lh3.googleusercontent.com/8eV5wI-BVNCfLPgE7I0rY2d8Qi5CkuRAs0ZElB2hdlfDKY3F_GSpnyysMMOucooi8P2WJmkg3tmVIN0eHLLVue7Vd4VWzbPh4jjavdi-7K83ppJzfV-0-CGqBdsGQOEcRU9jO9-uiYh4TW4mFYQFu5mKozTLWDIN0mqXXy_l7MbQQTvE0ped0EF4JOCSHeiypRSSK45uI32zE3SWFxhCkmwgNp-ioDHpNm1v60K4b9cyR1EUjZ-iJ4XlR6i2BpVmW30thS2h3_f6FIwcsOlDyklMLu-ZngqEaKTZH1Gb80Ia1BVUlQ28ZmkWmVRocsd2dfgomeM2CM4bhvTykILeie3j2CTQsH8eA7OLuyzOg18GNn5qYiSJtyOj2kGdWKoYCin-qShZEoZnWTL1DjhLsBhOGz9yp3UTaLn5H0tC4D7VCwys1P4_tQ3rK56I97UgEzCeR3Fw5AeS5zqU_JWi4qAaZKMdUG_XoiCmSXyM1VL-pL8bN4uI_ak7Lw-dE0jC69grUokw9l0jxHDr2daSZolH0FuhJf-dciQl25qQxwFrDOjEUQ8fmAIZ4xuEMsV7qkhTCliMwKzXRWt7rYtpBnWP4cOrs6CYeBPiWY_NxJNxprQrbKQOQvhCd5jbPcIdneRTJOo9ZLvrfKSEZMTcSNQUb8KmoSE=w1683-h1122-no'
          ]

        },
        {
          titel: 'Knauf BE5 Hackathon',
          date_start: '2019.02.01',
          date_end: '2019.02.03',
          text: '',
          city: 'Munich',
          country: 'Germany',
          position: 1,
          tags: ['ContractionTech', 'augment reality vision', 'CAD'],
          pics: [
            'https://lh3.googleusercontent.com/Eoi2ChJFk90MXN6UlfwhCxCBAzNk7VJqHS2-6Xg3hEK73P6WJx5awdL3l4x8HM2V_nr5k8b-6Smcl4s0JMJjs2o50uWAzKuxjcCNLrQLgPU1KxzPAEpl1blEBbn5k8T9UaDCTsguQXe1LHjdCbPR8ppV0K9mCdce9Fx3w3AxdF58fRiGk-QHmZ3YZBKmdySKTpzRWu-dgX4ERx7xZYRLZwFhujCVVnAzVvQHLucK7NTpTeldmaokasfC_wVlxWb5ELjSKQBZwD4uOs0AwBGVIk5uqSUXHK6bftjfKK_6uaKJ51L9ombuSElrSOC-jn1721ak7RNpeow1fyQIt9rDWvTfT88AXTmIT60e0i_3AhTbqd8jbuuDwmvine-KKwyp5NTJ6KQ9QGKAHFpr0XvKlp6tByHlj7lhIfpRA1vtf6UmrY0icRpmxlbSTFko9fWp5zEM7Q-oVgI7dzI8F5nYV-7L-hAkiTzpCdYATcIlSTMwsz-r5kwhVcPtxJVSr0vHTgTtgeIZwP9O7Lsup7o32XbaN88vzyZFnR7ClIA56qHNSrrISz3hwzFxAr1f5dxOOCVOLRv3qIeVwLagEmSetzAp4F6g5EdX0MMJGA6Vp5Yf0EheMV3DKQIwXN-wLmebwS8sSeF1upPeyTM2BQJO7AzIial4104=w960-h536-no'
          ]

        },
        {
          titel: 'Sport Clubs Hackathon',
          date_start: '2018.12.11',
          date_end: '2018.12.12',
          text: '',
          city: 'Frankfurt',
          country: 'Germany',
          position: 1,
          tags: ['route planing'],
          pics: [
            'https://lh3.googleusercontent.com/iS-ELYMrMRh_zYC80PMxjfm2-WeNDx6qNKsgTqCVpY-Ys-SlbTL_Bk4YUBeMoSYXN4pzXMjOmZN9VKV2A-xlPQbDza9JPfGz2WOyj-oczaQ0DFFmAkSSzIm3Q-jm3X_0Fp-2ttd_I6thA6Ik0rJn6Glz07IQLWR72mWhqXW3AqKOSHgv1YmzvLJQNjiajolVQbUKKaY-2NocEq-CcCImxsa8Nmq49Zp40lzNfXS3Z9aIOcH14mr8awn3CzBbFOgpgFRmOxEe6dyzfqt5mDmJQGbk_VxD02dX_PaUmj64-MnPTuPK8cZrBvBRADdw8Q6Uy4OmUa2a338__aN5I9txHmcYDtv4SRbnfqkbT2GJNYHptu9xroLDRBzb0MB7hn4hcVRr6vHr_UFskKhHB0X5ERP1CCnM2kQeHx5zWcR35pQZ6yc-WrzOLzIw8FJt3odUlEGuwxRkzKemdmM0n3-FhjjBC9EpFbbcEr-hYAXT_0dqMRQ6I90OFY_wlY_0LIATRXdJil-r3b6kWfyrS6irt1V0GcTZwdJ4_1sy2nkBNPxWPOCyVdmutythVRAmIwLnE-f4zXfx5-cZ9GLK1JwNBX_xI2MMa4NCV7iA_m5hcbHRCUlxwLfpS2sTyi-u9kONoSaQP1h37NGX-U_o6vetQZEbe5_xmpI=w1296-h972-no'
          ]

        },
        {
          titel: 'Smart City Hackathon',
          date_start: '2018.11.22',
          date_end: '2018.11.23',
          text: '',
          city: 'Krefeld',
          country: 'Germany',
          position: 0,
          tags: ['Slack', 'communication platform', 'blockchain'],
          pics: [],
          git: [
            'https://gitlab.com/kasper747/wirbuddeln'
          ],
          url: [
            'https://www.facebook.com/events/283074352307152/'
          ]

        },
        {
          titel: 'Mobility Hackathon',
          date_start: '2018.11.16',
          date_end: '2018.11.17',
          text: '',
          city: 'Den Haag',
          country: 'Netherlands',
          position: 0,
          tags: ['mobility', 'artificial route planing'],
          pics: [
            'https://lh3.googleusercontent.com/Y6Pk5s6mEwXspdJTD20cS4BW3dBoZElZzdO_82-hquczhJVnSayOfnkwbrbPB75oxMwbYGy4zuKKPXVpuI1rNWBG-O8WDwjl-TOLCN_YOoyl68o-X-MfOdc4uPJUzoljsEwLI9u20r83uKobm34ai7P3MSiAgRzQkCUWZ6NE4imN0uw26tCvNnqnEe0_zJGFjZuW-hB5LF5wGrhtj_X-5EN2vp0mbDducaqVpcnpXbGFjccOEETXOV_2IE9WN2vtTDo8rtQog3H2KTHl4eJ9p6asZyJPRYrzicp1UdA4OPmSEoD2JfR7X_dG282C4V3_HemcEkYV45UC8q8cOOFM2LLp2ltDDwe_uOtN2eOI4TAQgsAnuYHs1eKpjyIIWuahZjgm0siwgmS8tCbaPviZYpINTDBTxIlqyyLsXq70G_a6pANNZPSSbMMwSfII9eOVNaxuHrJVzkfluXu2XVaam3GbK9Rd-g7vUsygucYmfngiKuGRoQ1CFFKZqR3zYk75GlMCOTkkvnhzrRpI6g3NAUb4HUtkrnwdByg4hLjdOniwQEb6iuN5ZNSwuoriktadiUXdsU4PNpBZzCRuqZHOfuMr2HqGPYaXxrT83ZNFimqkssEejg7wT9Cr_STOVbCmNsLzBZnQAKsP5mbm62xDsaPtSUru-wo=w322-h346-no'
          ]

        },
        {
          titel: 'Blockchain Hackathon',
          date_start: '2018.09.28',
          date_end: '2018.09.30',
          text: '',
          city: 'Chicago',
          country: 'US',
          position: 2,
          tags: ['PropTech', 'blockchain', 'factom'],
          pics: [
            'https://lh3.googleusercontent.com/qrkpwQMUi0knf0G1KrBpqfDma0iSc4J5xY5euZQgmvnzFKFzwI-0kD7PDMGj4sVBa1IrnlR07T1oSgMeDgXbmrEQBNj4P2LPy3KIw5Qx42IetyMnqhXjH_ABKjWW2W_P8ZD2zFqA4YLr2KJfW6zwKLtRKmLmebRJX8LxuCwKXUlqFC3fY-M4080PjBGYRfaAXAMa-y2ajU9RvOCBGiva8bQBofQWM2snbsz4zEkfWUMNhddWnjVhuMErw78Jsb402evjr7EuT3WwOpp_uf1N81lOuMY18vpsuW-Y_80FVNlBVI1WltX0ZBpJBZs3p4StwIejRNP7vTTQFCOvtDWWSDM3rdLRkQ_3LFFjK9GvtU7fOvS2VyG9a3myJ7w3B18xZnjwornrneLwi2j6rTVExYwlaOpgQMO76AGUL990dYjzO-xFndwwbGAEqP68_qp_ccWSQw5YzSN4yZlOk1_D1WGoq6xl448sA5Nb9vzvOJahMAl8ZkmSaL30xUG7hO39hl-5bZOP1cv5quYSAZAsPm8gaYgJvOGYqr8rf4VPsmqLLOLUTtJXNepsT8HXwsxyqUoqIREu44RJQaesndXimLpb0htzl2Cd_nQAoCiDGVZdBakTiMgrJqJU0NCpUZvWDrBZPR1EHelZxlPkdRYanCw7BauB-Wg=w1440-h1080-no'
          ]
        },

        {
          titel: 'Blockchain Hackathon',
          date_start: '2018.09.07',
          date_end: '2018.09.09',
          text: '',
          city: 'Shanghai',
          country: 'China',
          position: 1,
          tags: ['PropTech', 'blockchain', 'factom'],
          pics: [
            'https://lh3.googleusercontent.com/k9IdvOVs2fNRy_-BAGKa_cd8JhuFl4x2T-F5YQKy1TnI9XGGzodb7P_lwy3h_SxXtCc4OQXx1UgHiCwTI7nTypev3inGADAokRH6fZSH_viqQ-_UxOaAdnfSV-iY87eCitPgrrOCuC8MMySLKXC3apNh9QahDwLJJttumUtekRvVIMuSRWTAIExp6YUrJKkDU1U6TSZ6Mdy0W0CtHlg-peIwLOgI88Wzv22-CYGMmcvkpa5vHFQINycJIAy345naQN5x06HwUCbIuhDPjuBAgnmU2rqn11nE07c0TOA2cO2N42aWWqYtN63OMk-74OjjyWz5fnIVpL1InH2LMsVZ9fVSRaavrRXWpRP3JVVT2uf8qVzR69Htl-H6yl3BtyaYI4ajIAv6Ii_oFMFlP3Ihs7bNE8hp5uf57dxV4mufsJkTBQ798zcasDcayFjUEaxqFe4n-ZLFvKyF7D-ZPP6iYS7LL5om9drTsGzQ5Na0tZxErlOZE1i5ymxbubw6gcSgMq8c9XzhSGQHxGQBBiTeDmKZAeHPo9xBHOqL_lOTJ4lXRSx8mI9SQ26X2BtXuj-LimvZwI05fw85fX_sHArajXRvzQF7zqbP3t26cR6bQsCnpJ27qccS8tXpyIM-tCn_RMp8hUMZ3PnGsyZGh20t2VpZYRj9jP8=w478-h318-no'
          ]

        },
        {
          titel: 'E-Mobility Hackathon',
          date_start: '2018.05.25',
          date_end: '2018.05.26',
          text: '',
          city: 'Essen',
          country: 'Germany',
          position: 0,
          tags: ['e-mobility', 'tableau']

        },
        {
          titel: 'Insurance Hackathon',
          date_start: '2018.01.12',
          date_end: '2018.01.13',
          text: '',
          city: 'Münster',
          country: 'Germany',
          position: 1,
          tags: ['InsureTech', 'dashboard'],
          organiser: 'Provinzial',
          pics: [
            'https://lh3.googleusercontent.com/WwAnsRQyuoup2R82fYFiqLuDkgSVSwnRKDrh20Ylb94fiZJObKvhZZFfjn_4qbhS3vUR_TkZElN6EhFX3N3KLTVe9I7HUpiCgSv3u6HWvKFEmN3u2-etUvIIvKd6EfeYYDVVyFyQLLfTrnL5pVsNmSfhjsAMl1ZTAS67oBxvOwvdxOD5IkkP4JNcOs6RHuA1s4CBTVC5gWo9ljQNDR_4BaWW8YrDGyQre8Tirc_ID6Ig-XcOnTojSG4DyjdGpUwdu4h0d9XCD-Z4DzCmJedYc-EKoAS_Tb9nOVgiFfUHftSDuZicLwSoks83jUvIqR8EY_4euCFW_Gou6Geg3YTe_rSdn8SKfS7O-y0DUTNI3AeYLY5z5jikS4ND8nAe25C-C_rk9-4IpYQ-brVAMP8SbmdhiZV43ASB7HzcFt6P-BOi_3o1VJOZdIFBAXyZWKPu6lXL8RK08bR1fwz01saaBPajQpPwvKYBGvgQEeC5jFK4uWc8MB-XcIM7Fqek0hsvirVOl-172o_sJPExxAm4BeIriIXdRJBG8Vs0IV53F8dOhj6ns6rWbewKKU1Tr0IA1QqRlY6Xieq3G_XDPiTlWJi6EEOXgb_FYFBzrEzOXavZltc4AoBvNV7Ana5JNzZRNlYH8gvGdhEpm8dikkpYiBls9GokH5Q=w1047-h720-no'
          ]
        },
        {
          titel: 'City Development Hackathon',
          date_start: '2017.11.18',
          date_end: '2017.11.19',
          text: 'Evaluation of logistc attractivness',
          city: 'Oberhausen',
          country: 'Germany',
          position: 1,
          organiser: 'RAG',
          tags: ['PropTech', 'artificial route planing'],
          pics: [
            'https://lh3.googleusercontent.com/W1jvgAj7AYmY7UhERkLyA4OxAiZDyysJgZAOLOZDL9ZIcHCLpt10gjLUDnhdsDCRILUarE8BUXhXcEb6_u5f-ZzsDMU40RBrCyA4EYyFS2gH5qmB_6amgg-F2_WVqRmuJgLLUrMxP7QrNbWNRPvXRrrpGcvi-izY8LvADltyAEqaE9p840gtqsL4krvvR5_rfzWcq8_V9n-Ggbsuxa2yu4gb5GLR1zmdFdXYwt50frmTgOekS0SmEJVV1TwulfG3OpO4IC3yuA4FMANEtQfYBiZewXwDPias45AQvZZNqjefelgx8KYOdmV5oDocHyP4_UysJD7NZqA44u_E882MUnbgMuUAJ-d2AgsWMH_k6NE4LDDKTvkDqmc1nYU3f2Xr6cCb61nWPPDGPxheoramwOy5C0wP2TjA8SrgrKD2tP27UyVtWyTsVE6Z5goHip17LPUqqSNe2a4ooJn0PBpZb_1hmgGReWQN8ZDpQ_FEt6J-8Dwbn7aBrJGsvAS3fHSluJlD9nuktJ-HdbQ6ymp39_xNusItj0T_zicOi-jOxh2kIStnFanVqf4PcXabVy39_hQMGfS4qrAI7973S_wxAYVsogXR_KuThJO1d2WkKrdAy5KBclsteMeZm5-okOvmvjxpRNgBoK_nwdNE_CxUdEphEMxWyU8=w800-h534-no'
          ]
        },
        {
          titel: 'Ticketing Blockchain Hackathon',
          date_start: '2017.11.04',
          date_end: '2017.11.05',
          text: '',
          city: 'Prag',
          country: 'Czech',
          position: 0,
          organiser: 'TIXX',
          url: [
            'https://www.hackathon.com/event/hack-tixx--blockchain-ticketing-hackathon-38626826879',
          ],
          tags: ['blockchain', 'ticketing'],
          pics: [
            'https://lh3.googleusercontent.com/Vfvnw04JR6yRJh2LX-zDHO5GVwCkn_xEi3xYiX762yWq4MkJlVIHH3QwZ5zAY-Dt2Mx5wijtTcK9SF1zNlQF8e3L1-quRDetXmlyPZyoGKRC61EoPN11HZyBGbyNxfOIZjA6ZstN913cQ3tbIQJtyaMc5W6UPKoWSkfz17LCuSEmjw7n-BwNh9caTp4jMZs4hyqxqWv-3BeRrU_u8lEQkqPi193eDSrLR4MvzO8jZIaQJzol-ccfrgj02tTcwkji8vRjTv7mjY1RWHxetMwpPiEF-GqBv52y5Awi4xa7knCPC4RAQ67nTu_DYhKIbnXNWg9pfvIsmIzotOFAeLAOKBh5O8DGx6s3JILU8Nm62aANAvXVB0A-Wic6HRXFOSELTOacYeHMnFqwpmjJYyJ9bKqYwtI4dsi8f7RXpAnD1DlRj3KSPqkrckEc8xpRtulKiItKR0IUf4KuWZn2j3LYsg_ueJmEDqIesvhKNnqCJ0hutY3hBK-4smNUka2QWK6XZGIOUExpmk6-NRQWJKwUxTYTbuu8nd9DuQyIqGNntF4XbVa3SDgx6_UFpnCAC2Qn1llK2YmLGWYT3U34NC5AdEtpMKR-AqT_HEQCMMy33mhPwrJxsBy_wREtdXK-9ho5iyeZ7rCil47n-lBZcnRhiG55CDPv4ik=w1200-h528-no'
          ]
        },
        {
          titel: 'Infrastructure Hackathon',
          date_start: '2017.10.28',
          date_end: '2017.10.29',
          text: '',
          city: 'Essen',
          country: 'Germany',
          position: 0,
          organiser: 'Climathon',
          tags: ['InfraTech', 'artificial route planing'],
          pics: [
            'https://lh3.googleusercontent.com/TzK-1zI6SomY4fUFn9CsDDrP7bdi_1XuzeSjSefLnfWcF_6lJt5OdeaqtF-t1-5RRG1JUZmuv2hfflL-6OlTHF_zVV1l3Ou06PNh58dNLdPhFnsx1BWxx_gus08b9i3vE2X5bhD7bLFb7joH2iNQzp3ddkIH58j-jzsJcXiwwDlaJo0--XEKjppDSL6s5qcKXE0nr2OLAT8DFLvD_HHo3JD_T-NFGEF_tnFOoNsAwc2V_3N6fKfW7rPIhRHfXxNm_0J-YjEZ5cOXP7hfucX5CBVbCq6hEynTA9pNUTp3VGCXRsAafdxY6uJ123mnKu5TGTVd8HN-pEmVhEPTyAhVN_pA_mbYz8HBtZsQKUxgD7U-QwVHLZh96EgNHODoa9jl-syDGYLU0rfYlbp_dRrFs1FZxPGaym8LcQjWEwsJWSgj8aeXIlYKmVmhrfhu5pyRNUDo4I0vJb7C3bl1T14wMKE69vQedtHEd-C8CXqfRMnXLSIeivP93S3RlArxfOzIoQJZJUBCXSTLIGD-SVjSvQCQSOfpPpSz1Uf2Bmfgu6IO1OpLesLav8kS6EMswTuTr-njY4Hl4jWUeiQUoFwk4rc8pfrWVNYwM-TwtBCFTUqA0hkkdNJ0A-KsRF785Qfp4wmXuPNr2MuJn8-DMWjPRkoJFuQhqnk=w2588-h1940-no'
          ]

        },
        {
          titel: 'Elder Care Hackathon',
          date_start: '2017.05.21',
          date_end: '2017.05.22',
          text: '',
          city: 'Helsingborg',
          country: 'Sweden',
          position: 0,
          organiser: 'Hemtjänst Helsingborg',
          tags: ['HealthTech'],
          pics: [
            'https://lh3.googleusercontent.com/x86X_QQwdy8lvS-eq_jMKPTcyILcV5Bjg9a0U1CZX3mb72Oxnj9kTtVFwXJ1izgqspaR2vOYztIWkyLrfIxjoXqvXted_U_i8-lTuAlnjVXtw4yhUJ8RiLELS11wh2L4sygmjUF9qE1KLaT6PPtol1Vo8jn_qk2Q1YxY8WJbAoZtqnabI8iTGKoGe5-A4C_DirVFI29jtKvX8RESe-cnzzHIg8WGNaZyOihrl1P4i8HmDL7hosnxmWkM7y0zzJF64TlBMGi8mxltSPoQF37zYoAKCgEnbI3B53PkgUY5JvWyU2UXpSVfnzOuK-L5cMwAuFRwshp1KtkXHCyGrsz8Bi-Se2lAz3KTUND-5R7hrXND0ma1O8DN50_eidn8k98m9h2q1DkLgHfa1eKcKP-nJunMNluND3S5eg5-fi5BpMSAvGCv6wzMnOxMEBXxESSEETfxPxFISuKfUQU8kUrHna-uAQ7dk406vYlMcH1SV3CEkaqRnlBg0UhpvDC4qopOzhdGqUXGSBLn7mMqS1Z3Q2j0S7ekY0fXg0AQv27G0BSWcDZ1z6ktmLYIlVEzMHsKNbuVg6fhr-bb6icQBdPsw7Bqzv3JODupyVKLS0UHrjt6U96NZ9AxlSQ3cpF3I9qWmrqIaGPwQS0lLckOQL3PUhxt4IeRfVc=w2588-h1940-no'
          ]

        },
        {
          titel: 'Elder Care Hackathon',
          date_start: '2016.11.26',
          date_end: '2016.11.27',
          text: '',
          city: 'Stockholm',
          country: 'Sweden',
          position: 2,
          organiser: 'Tieto',
          tags: ['HealthTech'],
          pics: [
            'https://lh3.googleusercontent.com/RE9i03lMVEMTWSwnse6Dn-mxnORuQOFwPff_D2ZjR_tl4tjRzAtoS2T5zNIcMcBeUnxEiP7SAHYgG7GF03nAr9yhbWYZFX6eTo0KydYu4WWU1TGqDquSeWlQO8gC3VnXwvnWoxkKbvWOU5rbL42AFgjqY-noGShlXDwtn2vOlZHtoEpOUTR11IKlb8K50zNdbmsi_tWn2E9rOthdiul8vBM2KxT1tdWYEO4aTkGWqnWMU8Lt5JrPbjDe6zTDZsQ-d4Qd6XiiQ2lUABlAWru19Z6mzB40NhlIijXkH9mmoAfv7dg-2RO2jgiwGwhQebSioYsv9C0i3vWidBk0yPnUo4aTfhDzT2ZWtdKtzJkF2qc_RaTXSXrQmCvnwdm13gtbAxKyp39PnTvkcZ1M2LERcXBFi3xRodpiFBjbJPrFQ837XaISYCaRiHXDUbnqyK-Yx1x5PFJ6-OdZKEOOl0tyD0RjcoahXTVR9pONv-HRJqmPvBJc5Z2uM1pKzTrXikaTq9RiMU-DGaydunkJkrhzzajHqwXbqt2dTcu6XO83oACWjiyi2RumjxIPUKwcYzaIXmzTbMQHGvSJDTR5aqV_Vxv8br7LirHGk3EeAgf6coTPmOq7VcvaibhMjmR5xOv5a9uCrVCtVmZYP9qXbydcAdnuAj9r5zk=w1500-h858-no'
          ]

        },
        {
          titel: 'Energy IoT Hackathon',
          date_start: '2016.09.03',
          date_end: '2016.09.04',
          text: 'Elder Care Solution',
          city: 'Berlin',
          country: 'Germany',
          position: 0,
          organiser: 'E.ON',
          tags: ['energy', 'IoT'],
          pics: [
            'https://lh3.googleusercontent.com/AxKkbPkXeVm5Ism4LSVpYjMLd4_ViGPUG4QRmEo-Y8JuAK7cWFa-bwh60zK1yWZpursloHgTB3zzpBPKJ4Col9PUV8UnnofWS-k_YHI5X7XGOCIgVgC9zvdEEB8Ygdx2ePMsXuCMztJD1Wmx1sViHJEao3JnG3eORASzCigvov1iMjKo90t0uTy-yjnENDOByOPxJB5AqENqeHjczIUjkdQo6mTpi4xd7uSBoOXRFruwbBhAGiIMvN7AeN8JUYrsmtcKszQl06S2Cp-ZEhSwPijgubwlvOBFh24SXVaeM5rlZwLorGSaNb1aXnGHqlK3JXrAR4GFsHRJMNtzJsGb-OqzmIWExkv8b3cDu44F5fMduT9opF1BtXidRNNq7HYw-4WKTf4LfYQu4HasOsBrDA75eE7zCVx5akVgS16DK7mIEIpUaMQ1wkYIaw_4SVWQEE-EHP-M-eK5_53DLcGu3sZhrVEYMxj65O6AqYOUVpz2cjc07JdMyqMRO5rAKMbFy6spNMg0NJA9-C4xTdWSfJAwHMBksvUotWtAAHNatjYnZBzMgdsLDGz9Aom33lDslNqoAAhVDDUahOLWb7inC54qw9EMTvU_XiOxGLCqn3ebTMjr-ELNvpMhzCbCI4kL4bfWUbIYsmWE1Yu8jrKpoa3Nvq4tS00=w2588-h1940-no'
          ]


        },
        {
          titel: 'Energy Hackathon',
          date_start: '2015.12.09',
          date_end: '2015.12.10',
          text: '',
          city: 'Berlin',
          country: 'Germany',
          position: 1,
          organiser: 'E.ON',
          tags: ['energy', 'IoT'],
          pics: [
            'https://lh3.googleusercontent.com/zQTWMp4k6-j383U0-CwVH7wESx7RY2zQxCE3rsxIfsa1tcFKcFtLyf-m34kR4-i-DM5KldSISmbBusrNCP9njVpbtYpgr5G-1L9ifLWXZqTFJcLMQ3ikqcTQZR57yBClkXoWlRohvqTlLsKVL0fkmLlc5llEnLZdgxyOThj5wjq817gw2a7qzwUPqCqgEIK6vil6-8vlBSIHMYUCoVy8gQbbkOYsH3ElyOZve3s64ei74MlIwgbcWWGFAaGcfbnaGcdl8tdit51tj7RUDmaMVbQ4VtXQBHcKZdeADMh0VM_2O80r9K5r8V96IL3YOvCZy-PbyUiidWwhxEtGIoy0IXjrtLoHTVVnNTYE38sxXV4ab3eYfx_3KYnuttA90FfhKsnDTp93jAvwuljvNd3pz8vS3WyXUq7ivvKnlEfEOCsJpVCGsc0uNesFWrXJ3du-JiVylEvP9Br8GwvilN0J2pguASfBOP9NDpgUMP0KDpIDhERMao1fGaODF7tdHzpLngY8M6DKHXoDLzmVSKW-ber6P4OzM08dYXrLc0JMqHNS4-UxPUDlhCmrKb7g0ZfUecNyPFNGD6PpPyN1Iy3mNVs3NRjWMxkXASVU4d_uQIOAxE9M7omc671Xev6osWWhsZPM-c58koF7hNY-jcqrTU0433KDmS4=w3450-h1942-no'
          ]

        },
        {
          titel: 'Energy Hackathon',
          date_start: '2015.06.09',
          date_end: '2015.06.10',
          text: 'Fireprevention',
          city: 'Düsseldorf',
          country: 'Germany',
          position: 1,
          organiser: 'E.ON',
          tags: ['energy', 'IoT'],
          pics: [
            'https://lh3.googleusercontent.com/8_LdDfaStnCn3L9libuZZcU3iFnADHQ7ypp-iCfnCX8qDLbODECU5qC_VawQz9rEmvGgQzTG1pZeJM7uVqNiShZj8h_ffIa0BQvP422XF7sPzRV4RGmtxIp7iRgvYa9UFraVMYl78UafjMQoLEmVr0ErvYw54E4Z2ncEGWIwmPqIOdfVFys99_fT9zPvuX8jtI5Ex-Z2t8ftIQtm7dKihuGZ-iE6RvLAw20mesQOPbat5KIgaaM5GquC0Dd_cMRxOX3K2ner4HAnKc8KeQdpj9MR9SzXe0g-LY-D8pNdkPDlLsgqXK0DO8t-_ix87_u9kNkkLGx54MSmk0LtVrSaVG16hWD9Xq3L2TWQV2-zZOzSNWSE85q6BGRifqNrQkEXerblr2ydDii3MJMrDroVjRddDDxQwuVcndMgAWPtqUnLj6ix21RX1y6KUMMIYInQNfzc5Grr-6lQqqBPzUrRljYZwakV0eYAaN8ITJU9q3eGHeAAKzNPx3WUWQvz_aK4MnLI02gfugbcKaJnqR9V1UIOYZ6ZskcOo5oh_LMGlEoTKHEFCpUEMJRdwNQaF5XPwvLR754SK5RpSYKvfXRLgXcuZvMkXonGZj5HtIDmZMRNC2FeLQhhj1p8GYuaRE01-ncmLTxqSUCiKvnHjG6WVQuFpFJcYdQ=w820-h462-no'
          ]

        },
      ],
      hack_won: null,
      hack_cities: [],
      hack_countries: [],
      hack_continents: ['North America', 'Europe', 'Asia'],
      loading_stat: true,
    }),
    mounted: function () {
      this.load_stat();
      this.make_glow();
    },
    methods: {
      make_glow: async function () {
        let n = 1;
        let min = 0.4;
        let max = 1;
        let step = 0.1;
        let growing = true;
        let left = '0px 0px 6px 0px rgba(255, 164, 0, ';
        let right = ')';
        while (true) {
          await sleep(500);
          this.glow = left + n + right;
          // console.log('glow scleepp:', this.glow);

          if (growing) {
            n += step
          } else {
            n -= step
          }
          if (n >= max) {
            growing = false;
          } else if (n <= min) {
            growing = true;
          }
        }
      },
      load_stat: async function () {
        this.loading_stat = true;
        this.hack_id = null;
        await sleep(800);
        this.loading_stat = false;
        this.get_won_hacks();
      },
      get_won_hacks: function () {
        if (!this.hack_won) {
          console.log("1");
          for (let i = 0; i < this.hackathons.length; i++) {
            let hack = this.hackathons[i];
            console.log("2:", i, hack.position);
            if (hack.position && hack.position < 3) {
              this.hack_won += 1;
            }
            if (!this.hack_cities.includes(hack.city.toLowerCase())) {
              this.hack_cities.push(hack.city.toLowerCase());

              console.log("31", hack.city.toLowerCase());
            }
            if (!this.hack_countries.includes(hack.country.toLowerCase())) {

              this.hack_countries.push(hack.country.toLowerCase());
              console.log("32", hack.city);

            }


          }
        }
        // console.log(this.hack_countries,this.hack_cities);
        return this.hack_won

      }
    }
  }
</script>
<style>
    .winningShine {
        -webkit-box-shadow: 0px 0px 4px 0px rgba(255, 164, 0, 1);
        -moz-box-shadow: 0px 0px 4px 0px rgba(255, 164, 0, 1);
        box-shadow: 0px 0px 4px 0px rgba(255, 164, 0, 1);
    }
</style>