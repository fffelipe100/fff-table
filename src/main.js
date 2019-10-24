import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VueMoment from "vue-moment";
import moment from "moment-timezone";

Vue.config.productionTip = false;

Vue.use(VueMoment, {
  moment
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
