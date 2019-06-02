<template>
  <v-app>
    <div>
      <v-list two-line subheader>
        <v-card v-for="(item, index) in cv" :key="item.title" avatar @click flat>
          <v-divider color="orange"></v-divider>

          <v-layout row align-center>
            <v-flex xs9>
              <v-card-title>
                <h3>{{item.skill}}</h3>
              </v-card-title>
              <v-card-text>
                <v-list-tile-sub-title v-for="(topic,idx) in item.topics" :key="idx" v-html="topic"></v-list-tile-sub-title>
              </v-card-text>
            </v-flex>

            <v-flex xs3>
              <v-img aspect-ratio="1.5" v-if="item.pics" :src="item.pics[0]"></v-img>
            </v-flex>
          </v-layout>
        </v-card>
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
        skill: "Languages",
        group: "Knowledge",
        topics: [
          "Russian, Ukrainian, German, English - fluent",
          "Swedish - good"
        ],
        pics: [
          "https://lh3.googleusercontent.com/bUDg9dvI0anJUv2L9JkFba5JRLLf5oIa96sCGeI01hcW4VSKMaUbeZg-rUJl3LKazfnZCNhMUx8YuBOZNKeFAvHMqLMKa9SmTNr6Z3dVQMahy5Wyi5WIg0rzTHbWh0NIMQYMfPEzFUjN1ZZmTylAPlXt0G6jEC0hr1kQ5Y6LLgvnqy2kZ9w5qLtar38D1xrKONgs2cvXj5UHUnS7oqJhgqDEzWF-tDhRxXPU5UsIUAHEksXCdad6xiZO3_hVi5mti0_ukDFu331DntcMvC1HXdyo_FRJ9899SiS1Bk_FSOsQLHES6dL1ggAOErkmLskMVqv953SpkNFYAhp_lbT1TOoK08vuJHkhfgKbRnAp0WAacYsVQGmksQ7iVFwDdnmZDseg0SohwXbLa8v9Moq8gLH9s9MZG3ZXTzokeZXXlPPQwKk8xFAXumpV8F9jzBTgGpV0gm3rpTdgZcDowH-mrwQiM9fR-xUexnZ7DpV__NCywqE9gL9CulOqrWMvEdA2VbXIaooekJfxD7MeZrL4cPygfbemhcGR7SlpkfQ6wtgUy55wApWCx7CWcOCaUpDILyB_Os9H8_0cmY3p_DefAaF7Nyom-zsKuafkL1vlUXkQOn6Zd9VDgWw5gxAQdXluuaLcB0W4JQQFZqQBO-0mxvMij6vnS7c=w1683-h1122-no"
        ]
      },
      {
        skill: "Presentation",
        group: "Knowledge",
        topics: [
          "Excellent presentations delivery - 3, 5, 15 or 30 minutes;",
          "Excellent power point conceptualisation;"
        ],
        pics: [
          "https://lh3.googleusercontent.com/ai0G47GdgDEmwG7nH3Vfz8ErV9_PbI3P3f-RQal7B0fsy7k__tbz1d8zvZt0_0L-oYrENRj9RpTF21FVrxxuifxHSYdBONHnDCUhcp8EzQ5hCU8vYvbsSDXjFr9CdclvmQnmSeSrjb6UUUbGR2qzxfIwlJ9ynloEIYTjsrPgAm2_pXJ-UY3UXWK9EILQp1eR-MG3x_vl-eSboZ4nH1TDa33UhoNg_HBLWbGfCrxytLM8EDgJgWfcfMMOSzkkOAyNuVV9Y-i9oXpXBNaqlSF0PPn4CcY7LJz9Nl-gMgFOWtjwY7qMi8EkaSGak4EyvtAp8eBkzrae2QaJi6WijPmii_LcjdT9leA8_mJeb2kbnj7mDSFgBdbVvIPeEColpXv1UZala--O8NIIHJhKMp8_19hElyHaH01OTSQ1ZB3EcScCxAcwZ1lVMSlGQH5yQLnMbGRiiBbJygJ52l12lC5hE3SU3OQhO5eqTRk6Sx74ub-hcbsfFnv4kV5Z_kGCqPWAsuczhZQNWmtUS1QA7KyY6HLvIXSAtKzDVogZo9LLER0tngvZD3Ag9Fa3ICXcsf2UR1GYvP1J0CxKwj80nShVj2T07367OZHsuMlhCR9Ku_g3tOHr7U0hIWmu3LOb3XvuzpxkIUn6FjVUWqL70IdbpmJNFgqsOG0=w1914-h1277-no"
        ]
      },
      {
        skill: "Management",
        group: "Knowledge",
        topics: [
          "Lean Business Development",
          "Lean Product Development",
          "Agile Project Management (SCUM, Function driven Development)",
          "Software-Tools: Trello, Git, Slack, MS Projekt, Jira"
        ],
        pics: [
          "https://lh3.googleusercontent.com/ZV7zDqOm9f8_4wu1FFX4UR0eB1rMurOdzwDUqraNm1BBaKBO0qjZ5f8-Ha9sDXbDNNx4f8_IoI2neFX3PZdUQZ5UgxegHQUZwV_LGZUS8M_IBe5rApGgfihsey62svwWpaCpNsrSEygY3xIfxauIHCduFsJefchgFhmttB9aZVGHvfzYJ-ls7JiUIGSxx-Ytq2kYrjiwZ7h9AX7rkwK6oQzPvmLiUP1AKIUxewUPG1s0gGJxiSqtXZYjO2leVN9Bsf7M6_HmizEjVI5Hst5Ikg1nBdkynSAk7ifbK3Gy25gr23ZPwQ2EoOR__JJJ-J-j6YkZW5z10nH6FBu7LysgE0cF62OcRQwgW9qX-6l3vcm95EAAtqBKssOcvejP3957jjg6eH-jcSy15K2ZtyJSACs04-XyZ0-A71xE_4vv7AgZYiaR6p3msLRG75Im9B0o-7txlecOdJfJsn1H21xGYufu63YeM8sAMNHwqZhm7ArSYkTFprMH-_MuXnzSrV0DckMh8GfoEDOC4-wD82i0Vgi7-NyV4ygXz90aK2iaoPkoL-wUbDEykNnGM_9jSY4bCvetpLwIQHTxqiNqpwGhSMTsgCwGTSCOHFrU6oEtTQMuElIlxX-7ImC8zq6D4cx5uzYaqre1wRtJFpzpLbQEF1MAKzrZvJw=w1076-h1275-no"
        ]
      },
      {
        skill: "Energy Business",
        group: "Knowledge",
        topics: [
          "Broad knowledge thanks to education and working experience",
          "Excellent knowledge in the most areas of Smart Metering",
          "Work experience in Sweden as the most advanced country in Smart Metering"
        ],
        pics: [
          "https://lh3.googleusercontent.com/VYSdXUp8ki8_GddQfz4Zp56aS8RnsqLV6DQteur-eWGZid5UMKaoaxOxepSl7LkwioBW-sfhXsMKqREHelRjBynGiNmY2zWKNHlXKzh23gnL5ViZI_gvZp9UoSpTLpViPKZ3kOMqEXLdX34c8vGVC0zHptzPuI77oabD4hTwBQY8MPkkOLsv8xrc6zWP5vQriFVXpul1r1fhuu35GqnB5J7jAjCFhTk1U91EgACjdO9PCzIC4Fuc_UAXJpY0tJqFsCpwrjGS6ej9j1LWVGuyduzk41hkYmVxyzRkuCDbOGBg0rRln-sFGA3Sig1QbjuqzrCqkspJdrddrpi91AlcmfzFzz3b1EbglvSdPcMJQ_LMlvyZvWws2Pmvb2pHd16E4e7KRjv-SXzHCAx8KXaodlzwOhbIB3AzjPvuiAqAqKy1_VXn6ldn8o52GNvEKr-6b3fhMdhAHKl9jwAqjtQKXuleXn6lRf9KfCwh5Y_b9cRV2NGgYdtVs0cX3MCUb4G3BKf5TpIkgSaBU4JatrNTzorGkuOPNCIV1vOqQYqtkLH3MPGa-V3Yg3Sqaty6km0R9ZEH1EzJ_ws2nRkglX5kVc2cLqqdP3-ZH-Mk4SUXnR37WVfXLs1CtLtbT_h9UDM5VAYQiW2_nouaXbT35Sh8SvJ9dEJfLjs=w2043-h1275-no"
        ]
      },
      {
        skill: "Handy-on experience in IT-Development",
        group: "Knowledge",
        topics: [
          "Extensive knowledge in GIS-Solutions",
          "Python, JavaScript, MongoDB, Visual Basic",
          "AWS, DigitalOcean",
          "Tablue, Excel"
        ],
        pics: [
          "https://lh3.googleusercontent.com/AxKkbPkXeVm5Ism4LSVpYjMLd4_ViGPUG4QRmEo-Y8JuAK7cWFa-bwh60zK1yWZpursloHgTB3zzpBPKJ4Col9PUV8UnnofWS-k_YHI5X7XGOCIgVgC9zvdEEB8Ygdx2ePMsXuCMztJD1Wmx1sViHJEao3JnG3eORASzCigvov1iMjKo90t0uTy-yjnENDOByOPxJB5AqENqeHjczIUjkdQo6mTpi4xd7uSBoOXRFruwbBhAGiIMvN7AeN8JUYrsmtcKszQl06S2Cp-ZEhSwPijgubwlvOBFh24SXVaeM5rlZwLorGSaNb1aXnGHqlK3JXrAR4GFsHRJMNtzJsGb-OqzmIWExkv8b3cDu44F5fMduT9opF1BtXidRNNq7HYw-4WKTf4LfYQu4HasOsBrDA75eE7zCVx5akVgS16DK7mIEIpUaMQ1wkYIaw_4SVWQEE-EHP-M-eK5_53DLcGu3sZhrVEYMxj65O6AqYOUVpz2cjc07JdMyqMRO5rAKMbFy6spNMg0NJA9-C4xTdWSfJAwHMBksvUotWtAAHNatjYnZBzMgdsLDGz9Aom33lDslNqoAAhVDDUahOLWb7inC54qw9EMTvU_XiOxGLCqn3ebTMjr-ELNvpMhzCbCI4kL4bfWUbIYsmWE1Yu8jrKpoa3Nvq4tS00=w2588-h1940-no"
        ]
      },
      {
        skill: "Hobby: Hackathons",
        group: "Hobby",
        topics: [
          "over 30.000 EUR in prices",
          "70% winning rate",
          "On 3 continents",
          "In the role as project manager, pitch master and programmer."
        ],
        pics: [
          "https://lh3.googleusercontent.com/2--3Lg5mdbN_4idIKwkMdcS8ICwgL-VqrzLlRJC0EVfLVqkA4VPp1ODKVJZYTY15iagI_H-d8dfC6xRq1bIUXq0mg91bQg1BX_IVv7w5ZUPdYoDTnyggViX0irkLz8RYT0nTE5G-DrhxamWBEBz4poGUvsF0i-EOtHiWTAFcNNTEFU3NEU_dYQHtFAU9UeVWz_I6ZDmgQQG0hasC2NS9yKWnpveOsKRTD80l-UKvgsCjuH7AHhM8lyVeR1niFMdc_0Ug_twnS0Wx_VYeZnaQaNtgB0cBe55MNdymNqm3Tn0wUJg8kwk71JYgEvoW6bGVCaID8nNgRxfqVKeWZJ2Ld0A2agaU0xx3KEiuOoALMqj6CxWVhF4sYthLqfoMbQt3-VebFVT0QKmY8tDuEmfvMmJxDHxSBe_2IIoTmFEXsWQqADd9xgVkWqpUW4EvzTy40NLdgqU_5E4vxoPnyZFuhSA0nPQpYO1wn7QVzVgqCX5Ia1dVDPoQQFNGMoWPrQRzDJA9V2dgp6NKyOXRVcaOf9RddK_mHAHtZW1qREOxFdCti2DRTMP0wbTJjHYSCYlpFbm3ztgh9MIrbufQQQ2izHGgROVFZ6LOhnoxcw6XzYrLEspIOB4ZXAF6Oah9qgzYdQ_VG2VWUGmaCjWgCuCueaWc2OXDodU=w1683-h1122-no"
        ]
      }
    ]
  })
};
</script>

<style scoped>
</style>