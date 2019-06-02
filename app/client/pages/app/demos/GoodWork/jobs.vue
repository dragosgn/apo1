<template>
    <v-app>
        <v-sheet flat>


            <v-layout align-center justify-space-between row>
                <v-flex xs1>
                </v-flex>

                <v-flex>
                    <v-progress-linear color="blue" :indeterminate="loading" v-if="loading"></v-progress-linear>

                    <v-btn
                            v-if="!loading"
                            small
                            block
                            color="info"
                            @click="check_fit"
                    >
                        CHECK YOU JOB-SKILL FIT
                    </v-btn>

                </v-flex>
                <v-flex xs1>
                </v-flex>
            </v-layout>
            <v-card :flat="false" elevation="3" raised class=" grey darken-2 "
                    v-for="(job, index) in positions.zeiss.open_positions" :key="index">
                <v-card-title purple darken-2 text-xs-center v-html="job.titel"></v-card-title>
                <v-card-body>
                    <v-layout row wrap>
                        <v-flex xs12>

                            <v-list-tile>
                                Skill match:
                                <v-chip color="primary" text-color="white" label small
                                        v-for="(word,index1) in matching_words[index]" :key="index1">
                                    {{ word }}
                                </v-chip>

                            </v-list-tile>
                        </v-flex>
                        <v-flex xs12>
                            <v-list-tile>
                                <span v-if="true">Cities:</span>
                                <v-chip label small v-for="(location,index1) in job.location" :key="index1">
                                    {{ location }}
                                </v-chip>
                            </v-list-tile>
                        </v-flex>
                    </v-layout>
                    <v-divider color="orange"
                    ></v-divider>
                    <v-layout class="grey darken-2">
                        <v-expansion-panel>
                            <v-expansion-panel-content lazy class="grey darken-2"

                            >
                                <template v-slot:actions>
                                    <v-icon color="orange">keyboard_arrow_down</v-icon>
                                </template>
                                <template v-slot:header>
                                    <div class=" text-xs-center" style="font-size: 12px"> Show job
                                        details
                                    </div>
                                </template>
                                <v-btn small color="red darken-3">apply</v-btn>
                                <v-container>
                                    <p v-html="job.description"></p>
                                    <p v-html="job.benefits"></p>
                                </v-container>

                                <v-btn color="red darken-4">apply</v-btn>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-layout>
                </v-card-body>


            </v-card>

        </v-sheet>
    </v-app>


</template>

<script>
  export default {
    name: "jobs",
    props: {
      data_set: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        loading: false,
        selected_skills: [],
        matching_words: [],
        testing: [],
        positions_text: [
          'Software Engineer Frontend  m w x  ' +
          'Munich ' +
          'As a ZEISS initiative  we are building and operating a revolutionary online platform for the microscopy science community  The platform provides a market place for image processing modules and various collaboration functionalities in the cloud  It hosts everything from simple post-processing features to complex machine learning solutions  You will be part of an exciting dynamic and cross-functional team  Based in Munich we are driven by creativity and a strong desire to shape the digital future  ' +
          'Your job ' +
          'You will play a crucial role in bringing our new revolutionary online platform to the next level and actively contribute to the success of this new venture at ZEISS  In this challenging function you will innovate and contribute to a sustainable and scalable web-based platform  Your main task will be to translate business requirements into a high-quality working product in fast iterations with your fellow team members  You will drive adoption of best practices of development  testing and integration  Communicating and collaborating with international stakeholders and peer engineers is also part of your job   ' +
          ' ' +
          'Take responsibility for building a revolutionary online platform and shape the future of microscopy! ' +
          'Our requirements ' +
          'An university degree  bachelor or above  in software engineering  computer science or a similar specialization is a plus ' +
          'At least 3 years of web frontend development experience ' +
          'Hands-on experience developing SPAs in Angular 2-5 with TypeScript ' +
          'Proficiency in HTML5  CSS3  JavaScript ' +
          'Working knowledge in Bootstrap  RxJS and CSS preprocessors  e g  Sass  ' +
          'Familiarity with standard tool chain of Angular  e g  Angular CLI  Jasmine  Karma  webpack  ' +
          'Familiarity with source control  git  ' +
          'Knowledge of at least one backend language - C# ASP NET a plus ' +
          'Fluent English  German knowledge a plus ' +
          'Fun working in agile  interdisciplinary teams ' +
          'At ZEISS we encourage creative thinking and innovation  We work in dynamic and interdisciplinary teams and offer individual development perspectives as well as flexibility in organizing your work  We care about our employees and take particular responsibility for improving society and preserving our environment  These core values have shaped our corporate culture at ZEISS for over 170 years '
          ,
          'You will play a crucial role in expanding our new Digital Innovation Partners unit and actively contribute to the success of the digital transformation at ZEISS. In this challenging function you will be part of an agile, interdisciplinary team of frontend and backend software developers, UX designers and product owners that ensures the further development of our customer-facing solutions.\n' +
          '\n' +
          'You will be working with a state-of-the-art stack based on React and a GraphQL API, developing completely new services with high-quality UI components based on customer feedback as well as improving existing features together with your colleagues. With your extensive knowledge, you will also be contributing to further improvements in our development processes and shaping best practices within the team.\n' +
          'You have:\n' +
          'excellent skills in modern JavaScript\n' +
          'experience in at least one modern front-end framework , preferably React\n' +
          'experience with typed JavaScript (e.g. TypeScript or Flow)\n' +
          'experience with GraphQL\n' +
          'experience in creating clean, cross-browser compatible CSS\n' +
          'fluent English language skills, written and spoken, and preferably basic understanding of German'
        ],
        positions: {
          'zeiss': {
            'company_info': 'As a ZEISS initiative, we are building and operating a revolutionary online platform for the microscopy science community. The platform provides a market place for image processing modules and various collaboration functionalities in the cloud. It hosts everything from simple post-processing features to complex machine learning solutions. You will be part of an exciting dynamic and cross-functional team. Based in Munich we are driven by creativity and a strong desire to shape the digital future.',
            'open_positions': [
              {
                'titel': 'Software Engineer Frontend (m/w/x)',
                'location': ['Munich'],
                'description': '<div class="text">\n' +
                '\t\t\t\t\t\t\t\t\t\t<h3 class="subtitle">Your job</h3>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="subtext">You will play a crucial role in bringing our new revolutionary online platform to the next level and actively contribute to the success of this new venture at ZEISS. In this challenging function you will innovate and contribute to a sustainable and scalable web-based platform. Your main task will be to translate business requirements into a high-quality working product in fast iterations with your fellow team members. You will drive adoption of best practices of development, testing and integration. Communicating and collaborating with international stakeholders and peer engineers is also part of your job. <br><br>Take responsibility for building a revolutionary online platform and shape the future of microscopy!</div>\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<div class="text">\n' +
                '\t\t\t\t\t\t\t\t\t\t<h3 class="subtitle">Our requirements</h3>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>An university degree (bachelor or above) in software engineering, computer science or a similar specialization is a plus</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>At least 3 years of web frontend development experience </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Hands-on experience developing SPAs in Angular 2-5 with TypeScript</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Proficiency in HTML5, CSS3, JavaScript</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Working knowledge in Bootstrap, RxJS and CSS preprocessors (e.g. Sass)</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Familiarity with standard tool chain of Angular (e.g. Angular CLI, Jasmine, Karma, webpack)</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Familiarity with source control (git)</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Knowledge of at least one backend language - C#/ASP.NET a plus</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Fluent English.  German knowledge a plus</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Fun working in agile, interdisciplinary teams</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n' +
                '\t\t\t\t\t\t\t\t\t</div>',
                'benefits': '<div class="text portrait">At ZEISS we encourage creative thinking and innovation. We work in dynamic and interdisciplinary teams and offer individual development perspectives as well as flexibility in organizing your work. We care about our employees and take particular responsibility for improving society and preserving our environment. These core values have shaped our corporate culture at ZEISS for over 170 years.<br><br><b>Help us shape the future!</b></div>',
                'url': 'https://live.solique.ch/microsites/showPublication/f19dd24c-b9f8-4170-bd53-a1f61971cd75',

              },
              {
                'titel': 'Frontend Developer - Digital Products (f/m/x)',
                'location': ['Munich', 'Oberkochen'],
                'description': '<h3 class="subtitle">Your role at ZEISS Digital Innovation Partners:</h3>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="subtext">You will play a crucial role in expanding our new Digital Innovation Partners unit and actively contribute to the success of the digital transformation at ZEISS. In this challenging function you will be part of an agile, interdisciplinary team of frontend and backend software developers, UX designers and product owners that ensures the further development of our customer-facing solutions.<br><br>You will be working with a state-of-the-art stack based on React and a GraphQL API, developing completely new services with high-quality UI components based on customer feedback as well as improving existing features together with your colleagues. With your extensive knowledge, you will also be contributing to further improvements in our development processes and shaping best practices within the team.</div>\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<div class="text">\n' +
                '\t\t\t\t\t\t\t\t\t\t<h3 class="subtitle">You have:</h3>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>excellent skills in modern JavaScript</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>experience in at least one modern front-end framework , preferably React</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>experience with typed JavaScript (e.g. TypeScript or Flow)</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>experience with GraphQL</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>experience in creating clean, cross-browser compatible CSS</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>fluent English language skills, written and spoken, and preferably basic understanding of German</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n' +
                '\t\t\t\t\t\t\t\t\t</div>',
                'benefits': '<div class="text portrait">At ZEISS we encourage creative thinking and innovation. We work in dynamic and interdisciplinary teams and offer individual development perspectives as well as flexibility in organizing your work. We care about our employees and take particular responsibility for improving society and preserving our environment. These core values have shaped our corporate culture at ZEISS for over 170 years.<br><br><b>Help us shape the future!</b></div>',
                'url': 'https://live.solique.ch/microsites/showPublication/08739ee6-d64c-4490-891d-d33446e84b08',

              },
              {
                'titel': 'Senior Java Developer Front-End (m/w/d)',
                'location': ['Munich'],
                'description': '<div class="text">\n' +
                '\t\t\t\t\t\t\t\t\t\t<h3 class="subtitle">Sie werden</h3>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>In einem Multi-disziplinären Umfeld aus Product Owner, SCRUM Master, Entwicklern, Testern und UX Spezialisten agil anspruchsvolle Software für medizinische Applikationen entwickeln </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Zusammen mit anderen im Team Zielarchitekturen und –plattformen definieren, aktiv umsetzen und das implementierte System dabei stetig weiter entwickeln und verbessern. </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>bei der Umsetzung von Architekturentscheidungen im Design und in der Implementierung in enger Zusammenarbeit mit den Projektteams tätig sein und die Verantwortung für entsprechende Design Qualities übernehmen. </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Auf sehr hohem Niveau qualitativ hochwertige Software entwickeln und durch entsprechende qualitätssichernde Maßnahmen in der Software (Unittests, Testautomatisierung, TDD) begleiten. </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Software Code- und Design Reviews durchführen und als SW-Coach Wissen im Team aufbauen und verbreiten. </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Aktiv zu unserer Continuous Build/-Integration/-Release Story beitragen.</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t</ul>\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<div class="text">\n' +
                '\t\t\t\t\t\t\t\t\t\t<h3 class="subtitle">Sie haben</h3>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>einen Abschluss als Diplom-Informatiker oder vergleichbarer Abschluss </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Langjährige Erfahrung mit Java 8 und höher </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Nachweislich sehr gute Kenntnisse in der Front-End Entwicklung, vorzugsweise mit JavaFX, mindestens Swing oder ein vergleichbares UI Toolkit </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Erfahrung mit einschlägigen professionellen Java Frameworks, insb. Spring größer 4 und Eclipse 4 / OSGi (nice to have) </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>nachweislich Erfahrung mit Testframeworks und Mocking Frameworks </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>einen sicheren Umgang mit Git, SVN, Maven und Tools wie TeamCity oder Jenkins und generell ein tiefes Verständnis der Prinzipien von Continuous Integration und –Build Umgebungen. </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Nachweislich sehr gute Kenntnisse im Design und der eigenverantwortlichen Umsetzung von komplexen Software Modulen inkl. systemweiter Design Qualities im Team. Erfahrungen in Multi-Threaded Kontexten und Thread-safe Design. </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Nachweislich gute Erfahrung in der Erstellung und Dokumentation von SW Architekturen und sicherer Umgang mit Design Pattern. </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>Spaß an Brownfield-Projekten mit einem hohen Anteil an Re-Faktorisierung und Re-Design </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>eine sehr ausgeprägte Eigenmotivation, Kommunikations- und Teamfähigkeit </li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>sehr gute Deutsch- und Englischkenntnisse</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n' +
                '\t\t\t\t\t\t\t\t\t</div>',
                'benefits': '<div class="text portrait">At ZEISS we encourage creative thinking and innovation. We work in dynamic and interdisciplinary teams and offer individual development perspectives as well as flexibility in organizing your work. We care about our employees and take particular responsibility for improving society and preserving our environment. These core values have shaped our corporate culture at ZEISS for over 170 years.<br><br><b>Help us shape the future!</b></div>',
                'url': 'https://live.solique.ch/microsites/showPublication/975e1b34-5faf-4cd4-88ed-64b3761f9294',

              },
              {
                'titel': 'Frontend Developer - Digital Products (f/m/x)',
                'location': ['Munich', 'Oberkochen'],
                'description': '<div class="text">\n' +
                '\t\t\t\t\t\t\t\t\t\t<h3 class="subtitle">Your role at ZEISS Digital Innovation Partners:</h3>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="subtext">You will play a crucial role in expanding our new Digital Innovation Partners unit and actively contribute to the success of the digital transformation at ZEISS. In this challenging function you will be part of an agile, interdisciplinary team of frontend and backend developers, UX designers and product owners that ensures the creation and improvement of our customer-facing digital services.<br><br>You will take ownership in developing new services and features based on customer feedback in an ongoing manner while also shaping and advancing our development methods and establishing best practices. You will be working closely with your colleagues as an integrated member of a high-performing team with a DevOps – mindset, not only developing, but also testing and documenting your solutions.</div>\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<div class="text">\n' +
                '\t\t\t\t\t\t\t\t\t\t<h3 class="subtitle">You have:</h3>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ul>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>excellent skills in software development with node.js, Elixir or the .NET Core platform</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>a proven track record in creating scalable cloud-based (micro)services</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>experience working with Azure, AWS or GCE and running services in a container-based infrastructure</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>strong people skills and readiness to go the extra mile</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<li>fluent English, written and spoken, and preferably basic understanding of German</li>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n' +
                '\t\t\t\t\t\t\t\t\t</div>',
                'benefits': '<div class="text portrait">At ZEISS we encourage creative thinking and innovation. We work in dynamic and interdisciplinary teams and offer individual development perspectives as well as flexibility in organizing your work. We care about our employees and take particular responsibility for improving society and preserving our environment. These core values have shaped our corporate culture at ZEISS for over 170 years.<br><br><b>Help us shape the future!</b></div>',
                'url': 'https://live.solique.ch/microsites/showPublication/d11db886-9dfd-4863-b153-c752a017029a',

              },
            ]
          }
        }
      }
    },
    methods: {
      check_fit: function () {
        this.loading = true;
        this.matching_words = [];
        this.testing = [];
        this.selected_skills = this.data_set.designer.sel.concat(
            this.data_set.back_dev.sel.concat(
                this.data_set.front_dev.sel.concat(
                )));
        //for (let i = 0; i < this.positions_text.length; i++) {
        for (let i = 0; i < this.positions.zeiss.open_positions.length; i++) {

          this.matching_words.push([]);
          let words = this.positions.zeiss.open_positions[i].description.replace(",", " ");
          words = words.split(" ");
          for (let y = 0; y < this.selected_skills.length; y++) {

            for (let x = 0; x < words.length; x++) {
              console.log('#' + words[x].toLowerCase() + '#');
              console.log('#' + words[x].substring(0, words[x].length - 1).toLowerCase() + '#');
              console.log('|' + this.selected_skills[y].toLowerCase() + '|');
              if (
                  words[x].toLowerCase() === this.selected_skills[y].toLowerCase()
                  || words[x].substring(0, words[x].length - 1).toLowerCase() === this.selected_skills[y].toLowerCase()
                  || words[x].substring(0, words[x].length - 2).toLowerCase() === this.selected_skills[y].toLowerCase()
              ) {
                this.matching_words[i].push(this.selected_skills[y]);
                this.testing.push(this.selected_skills[y]);
                break

              }
            }
          }
        }
        this.loading = false;
        return this.matching_words
      }

    }
  }
</script>

<style scoped>
    .v-card {
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .v-expansion-panel__header {
        padding: 3px 6px;
        font-size: 12px;
    }

    .v-list__tile {
        padding: 0 3px;
        font-size: 13px !important;
        height: 30px;
    }

    .html {
        font-size: 14px !important;
    }
</style>