<template>
  <v-app style="background: #E3E3EE">
    <!-- side navbar-->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar color="accent">
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">PetBook</h1>
        </router-link>
      </v-toolbar>

      <v-divider></v-divider>

      <!-- side navbar links-->
      <v-list>
        <v-list-item
          ripple
          v-for="item in sideNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item ripple v-if="user" @click="handleSignoutUser">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- horizontal navbar-->
    <v-card flat height="200px" tile>
      <v-toolbar dense color="primary">
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>

        <v-toolbar-title class="hidden-xs-only">
          <router-link to="/" tag="span" style="cursor: pointer">
            PetBook
          </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field placeholder="Search posts..." color="accent">
        </v-text-field>

        <v-spacer></v-spacer>

        <!-- horizontal navbar links-->
        <v-toolbar-items>
          <v-btn
            text
            v-for="item in horizontalNavItems"
            :key="item.title"
            :to="item.link"
          >
            {{ item.title }}
          </v-btn>

          <!-- Profile Button -->
          <v-btn text to="/profile" v-if="user">
            <v-badge
              right
              color="purple darken-1"
            >
              <span slot="badge">1</span>
              Profile
            </v-badge>
          </v-btn>

          <!-- Signout Button -->
          <v-btn text v-if="user" @click="handleSignoutUser">
            Logout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card>

    <!-- app content-->
    <main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      sideNav: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    horizontalNavItems() {
      let items = [
        { icon: "home", title: "Posts", link: "/posts" },
        { icon: "event", title: "Sign In", link: "/signin" },
        { icon: "info", title: "Sign Up", link: "/signup" },
      ];
      if (this.user) {
        items = [
          { icon: "home", title: "Posts", link: "/posts" },
          // { icon: "chat", title: "Create Post", link: "/post/add" },
          // { icon: "chat", title: "Profile", link: "/profile" }
        ];
      }
      return items;
    },
    sideNavItems() {
      let items = [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        { icon: "create", title: "Sign Up", link: "/signup" },
      ];
      if (this.user) {
        items = [
          { icon: "home", title: "Posts", link: "/posts" },
          { icon: "chat", title: "Create Post", link: "/post/add" },
          { icon: "chat", title: "Profile", link: "/profile" },
        ];
      }
      return items;
    },
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
    handleSignoutUser(){
      this.$store.dispatch("signoutUser")
    }
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateX(-25px);
}
</style>
