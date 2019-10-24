import * as components from "./components";

const install = (Vue, options = {}) => {
  Vue.component("fffTable", component);
};

// auto install
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
  // window.Vue.use(install)
}

export { install };
