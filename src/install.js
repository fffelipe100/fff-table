import FTable from "./components/FTable";

const install = (Vue, options = {}) => {
  Vue.component("FTable", FTable);
};

// auto install
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
  // window.Vue.use(install)
}

export { install };
