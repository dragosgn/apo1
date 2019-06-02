<template>
    <v-sheet v-if="skills">

        Frontend Developer Skills
        <MultiSelectEdit
                v-model="skills.front_dev.sel"
                :items_param="skills.front_dev.opt"
        ></MultiSelectEdit>
        Backend Developer Skills
        <MultiSelectEdit
                v-model="skills.back_dev.sel"
                :items_param="skills.back_dev.opt"
        ></MultiSelectEdit>
        Designer Skills
        <MultiSelectEdit
                v-model="skills.designer.sel"
                :items_param="skills.designer.opt"
        ></MultiSelectEdit>
        Teamwork Skills
        <MultiSelectEdit
                v-model="skills.designer.sel"
                :items_param="skills.designer.opt"
        ></MultiSelectEdit>
        Product Designer Skills
        <MultiSelectEdit
                v-model="skills.designer.sel"
                :items_param="skills.designer.opt"
        ></MultiSelectEdit>
    </v-sheet>

</template>

<script>
  import MultiSelectEdit from './test1.vue';

  export default {
    name: "friends",
    components: {
      MultiSelectEdit,
    },
    props: {
      data_set: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        loading:false,
        skills: {
          'front_dev': {
            'opt': ['javascript', 'SASS', 'Bootstrap', 'TypeScript', 'java', 'php', 'html', 'css', 'vue', 'angular', 'node.js', 'react'],
            'sel': [],
          },
          'back_dev': {
            'opt': ['python', 'C', 'java', 'node.js', 'linux', 'git', 'AWS', 'Google Cloud', 'Azure', 'IBM Cloud'],
            'sel': [],
          },
          'designer': {
            'opt': ['Photoshop', 'Illustrator', 'Skatch', 'Qt', 'Dreamviewer', 'HTML/CSS'],
            'sel': [],
          }
        },
      }
    },
    watch: {
      skills: function () {
        this.$emit('finished', this.skills)
      }
    },
    mounted: function () {
      console.log('TEST');
      this.$nextTick(function () {
        for (var i = 0; i < this.skills["front_dev"].length; i++) {
          this.items.push({
            'text': this.skills["front_dev"][i],
            'color': this.colors[Math.floor(Math.random() * (6 - 0 + 1) + 0)],
          });
        }
        this.$emit('finished', this.skills);

      });
    }
  }
</script>

<style scoped>

</style>