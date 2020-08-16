import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";


Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#AC9FBB",
        secondary: "#9C7EA0",
        accent: "#DDBDD5",
        error: "#634B66",
        warning: "#725775",
        info: "#F7EBEC",
        success: "#CFA5B4",
      },
    },
  },
});
