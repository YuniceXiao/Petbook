<template>
  <v-container>
    <!-- Loading Spinner -->
    <v-layout row>
      <v-dialog v-model="loading" persistent fullscreen>
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular indeterminate :size="70" :width="7" color="secondary"></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>

    <!-- Posts Carousel -->
    <v-flex xs12>
      <v-carousel v-bind="{ cycle: true }" interval="3000">
        <v-carousel-item
          v-for="post in posts"
          :key="post._id"
          :src="post.imageUrl"
        >
          <h1 id="carousel__title">{{ post.title }}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>

    <!-- <div v-if="$apollo.loading">Loading</div>
    <ul  v-else v-for="post in getPosts" :key="post._id">
      <li>
        {{post.title}}
        {{post.imageUrl}}
        {{post.description}}
      </li>
      <li>{{post.likes}}</li>
    </ul> -->

    <!-- <ApolloQuery :query="getPostsQuery">
      <template slot-scope="{ result: { loading, data, error, networkStatus } }">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error! {{error.message}}</div>
        <div v-else-if="!loading">networkStatus: {{networkStatus}}</div>
        <ul v-else v-for="post in data.getPosts" :key="post._id">
          <li>
            {{ post.title }}
            {{ post.imageUrl }}
            {{ post.description }}
          </li>
        </ul>
      </template>
    </ApolloQuery> -->
  </v-container>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: "home",
  created(){
    this.handleGetCarouselPosts()
  },
  computed: {
    ...mapGetters(['posts', 'loading'])

    // posts() {
    //   return this.$store.getters.posts;
    // },
    // loading () {
    //   return this.$store.getters.loading;
    // }
  },
  methods: {
    handleGetCarouselPosts() {
      this.$store.dispatch("getPosts");
    },
  },
};
</script>

<style>
#carousel__title {
  position: absolute;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>
