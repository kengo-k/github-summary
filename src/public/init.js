import { loadModule } from "https://cdn.jsdelivr.net/npm/vue3-sfc-loader@0.8.4/dist/vue3-sfc-loader.esm.js";

const loaderOption = {
  moduleCache: {
    vue: Vue,
  },
  getFile(url) {
    url = /.*?\.js|.mjs|.css|.less|.vue$/.test(url) ? url : `${url}.vue`;
    const type = /.*?\.js|.mjs$/.test(url)
      ? ".mjs"
      : /.*?\.vue$/.test(url)
      ? ".vue"
      : /.*?\.css$/.test(url)
      ? ".css"
      : ".vue";
    const getContentData = (asBinary) =>
      fetch(url).then((res) =>
        !res.ok
          ? Promise.reject(url)
          : asBinary
          ? res.arrayBuffer()
          : res.text()
      );
    return { getContentData: getContentData, type: type };
  },
  addStyle(textContent) {
    let styleElement = document.createElement("style");
    document.head.insertBefore(
      Object.assign(styleElement, { textContent }),
      document.head.getElementsByTagName("style")[0] || null
    );
  },
  handleModule(type, getContentData, path, options) {
    switch (type) {
      case ".css":
        return options.addStyle(getContentData(false));
      case ".less":
        console.error(".......");
    }
  },
};

const componentList = [
  ["my-languages", "./my-languages.vue"],
  ["active-projects", "./active-projects.vue"],
];

const components = {};
componentList.forEach((comp) => {
  components[comp[0]] = Vue.defineAsyncComponent(() =>
    loadModule(comp[1], loaderOption)
  );
});

console.log(components);

const app = Vue.createApp({
  el: "#app",
  components,
});

app.mount("#app");