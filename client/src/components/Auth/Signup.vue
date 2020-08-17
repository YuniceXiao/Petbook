<template>
  <v-container text-xs-center mt-5 pt-5>
    <!-- Signup Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Sign up</h1>
      </v-flex>
    </v-layout>

    <!-- Error Alert -->
    <v-layout v-if="error" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>

    <!-- Signup Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="accent" dark>
          <v-container>
            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="handleSignupUser"
            >
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="usernameRules"
                    v-model="username"
                    label="Username"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="emailRules"
                    v-model="email"
                    label="Email"
                    type="email"
                    required
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
                  <v-text-field
                    :rules="passwordRules"
                    v-model="passwordConfirmation"
                    label="Confirm Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-btn
                    :disabled="!isFormValid"
                    color="info"
                    type="submit"
                  >
                    Signup
                  </v-btn>
                  <h3>
                    Already have an account?
                    <router-link to="/signin">Signin</router-link>
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
import { mapGetters } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      isFormValid: true,
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      usernameRules: [
        username => !!username || "Username is required"
      ],
      emailRules: [
        email => !!email || "Email is required",
        email => /.@+./.test(email) || "Email must be valid"
      ],
      passwordRules: [
        password => !!password || "Password is required",
        password =>
          password.length >= 2 || "Password must be at least 2 characters",
        confirmation => confirmation === this.password || "Passwords must match"
      ]
    };
  },
  watch: {
    user(value) {
      // if user value changes, redirect to home page
      if (value) {
        this.$router.push("/");
      }
    }
  },
  computed: {
    ...mapGetters(["error", "user"])
  },
  methods: {
    handleSignupUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signupUser", {
          username: this.username,
          email: this.email,
          password: this.password
        });
      }
    }
  }
};
</script>