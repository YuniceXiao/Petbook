<template>
  <v-container v-if="infiniteScrollPosts">
      
      <div v-for="post in infiniteScrollPosts.posts" :key="post._id">
          <img :src="post.imageUrl" height="200px" >
          <h3>{{post.title}}</h3>
      </div>
      <v-btn @click="showMorePosts" v-if="showMoreEnabled">Load More Posts</v-btn>
  </v-container>
</template>

<script>
import { INFINITE_SCROLL_POSTS } from "../../queries";

const pageSize = 2;

export default {
  name: "Posts",
  data() {
    return {
      pageNum: 1,
      showMoreEnabled: true
    };
  },
  apollo: {
    infiniteScrollPosts: {
      query: INFINITE_SCROLL_POSTS,
      variables: {
        pageNum: 1,
        pageSize
      }
    }
  },
  methods: {
    showMorePosts() {
      this.pageNum += 1;
      // fetch more data and transform original result
      this.$apollo.queries.infiniteScrollPosts.fetchMore({
        variables: {
          // pageNum incremented by 1
          pageNum: this.pageNum,
          pageSize
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          console.log("previous result", prevResult.infiniteScrollPosts.posts);
          console.log("fetch more result", fetchMoreResult);

          const newPosts = fetchMoreResult.infiniteScrollPosts.posts;
          const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore;
          this.showMoreEnabled = hasMore;

          return {
            infiniteScrollPosts: {
              __typename: prevResult.infiniteScrollPosts.__typename,
              // Merge previous posts with new posts
              posts: [...prevResult.infiniteScrollPosts.posts, ...newPosts],
              hasMore
            }
          };
        }
      });
    }
  }
};
</script>