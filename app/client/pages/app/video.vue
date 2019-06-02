<!--

Requetes this librery:
https://sdk.amazonaws.com/js/aws-sdk-2.16.0.min.js
More info here:         // https://docs.aws.amazon.com/rekognition/latest/dg/image-bytes-javascript.html

Designed to work with Nuxt / Vue.js / AWS Rekognition and Lambda

-->


<template>
    <div>
        <v-app>
            <v-container>


                <aws-image-ai :loading="loading"
                              @finished="loading=false" :image-data="url"></aws-image-ai>
                <v-layout align-center justify-center row fill-height wrap>
                    <v-btn :disabled="loading" @click="go" v-if="!video_on">Start Video</v-btn>
                    <v-btn :disabled="loading" @click="stop_video" v-if="video_on">Stop Video</v-btn>
                    <v-btn :disabled="loading || !video_on" @click="make_photo">Show my Emotions</v-btn>
                </v-layout>
                <v-layout  justify-center fill-height wrap row>
                    <v-flex xs4 pl-2>

                        <video ref="video" width="100%" :height="video_height" autoplay></video>
                    </v-flex>
                    <v-flex xs4 pl-2 v-if="url">
                        <v-img contain width="100%" :height="video_height" :src="url"></v-img>

                    </v-flex>

                </v-layout>


                <canvas style="display: none" ref="canvas" width="320"
                        :height="video_height"></canvas>
            </v-container>


        </v-app>
    </div>


</template>

<script>
  import AwsImageAi from './aws_image_ai.vue';

  var the_stream = undefined;

  export default {
    name: "Video",
    components: {
      AwsImageAi,
    },
    data: () => ({
      stream: undefined,
      video: undefined,
      url: undefined,
      canvas: undefined,
      loading: false,
      video_width: 320,
      video_on: false,
      video_ratio: 320 / 240,

    }),
    methods: {
      //Playing Video

      stop_video: function () {
        this.video.srcObject.getVideoTracks().forEach(track => track.stop());
        this.video_on = false;
      },
      go: function () {
        if (process.client) {

          console.log('this.$navigator.mediaDevices.getUserMedia:');
          console.log(navigator);
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({
              video: true
            }).then(stream => {
              //video.src = window.URL.createObjectURL(stream);
              the_stream = stream;
              let tracks = stream.getTracks();
              for (let i = 0; i < tracks.length; i++) {
                this.video_ratio = tracks[i].getSettings().aspectRatio;
                console.log(tracks[i].getSettings());
              }
              this.video = this.$refs.video;

              this.video.srcObject = the_stream;
              this.video.play();
              this.video_on = true;
            });
          }
        }
      },
      //Making Photo
      make_photo: function () {

        this.loading = true;

        this.canvas = this.$refs.canvas;
        this.canvas.getContext('2d').drawImage(this.video, 0, 0, 320, this.video_height);
        // Get an image dataURL from the canvas.
        var imageDataURL = this.canvas.toDataURL('image/jpg');
        this.url = imageDataURL;
        console.log(this.video_width, this.video_height);
      }
    },
    computed: {
      device_horisontal: function () {
        return this.$vuetify.breakpoint.width / this.$vuetify.breakpoint.height > 1
      },
      video_height: function () {
        console.log(this.$vuetify.breakpoint.width, this.$vuetify.breakpoint.height);

        console.log(this.video_ratio);
        console.log(this.device_horisontal);
        if (this.device_horisontal) {
          return parseInt(320 / this.video_ratio)

        }
        else {
          return parseInt(320 * this.video_ratio)

        }
      }

    },
    created() {
      // Get access to the camera!


      // Trigger photo take
      // this.$refs.snap.addEventListener("click", function () {
      //   context.drawImage(video, 0, 0, 640, 480);
      // });

    }
  }
</script>

<style scoped>

</style>