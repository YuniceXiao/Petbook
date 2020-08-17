<template>
  <v-container>
    <!-- Signin Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome Back!</h1>
      </v-flex>
    </v-layout>

    <!-- Error Alert -->
    <v-layout v-if="error" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>

    <!-- Signin Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="secondary" dark>
          <v-container>
            <v-form
              lazy-validation
              v-model="isFormValid"
              ref="form"
              @submit.prevent="handleSigninUser"
            >
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    v-model="username"
                    label="Username"
                    type="text"
                    required
                    :rules="usernameRules"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="passwordRules"
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-btn color="accent" type="submit" :disabled="!isFormValid">
                    Signin
                  </v-btn>
                  <h3>
                    Don't have an account?
                    <router-link to="/signup">Signup</router-link>
                  </h3>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import mapGetter, { mapGetters } from "vuex";

export default {
  name: "Signin",
  data() {
    return {
      isFormValid: true,
      username: "",
      password: "",
      usernameRules: [
        //check if username in input
        (username) => !!username || "username is required",
      ],
      passwordRules: [
        (password) =>
          password.length >= 2 || "password must be at least 2 characters",
      ],
    };
  },
  computed: {
    ...mapGetters(["user", "error"]),
  },
  watch: {
    //watch for changes for the computed property : user
    user(value) {
      //if user values changes, redirect to home page
      if (value) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    handleSigninUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signinUser", {
          username: this.username,
          password: this.password
        });
      }
    },
  },
};
</script>
