// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: '<App/>'
  // render: (c) => c(App),
  render(createElementFn) {
    console.log(App)
    console.log(createElementFn(App))
    return createElementFn(App) // !App 是通过 webpack+vue-loader生成的符合render的js代码
    // return createElementFn('div', { // !传入的参数 tag(string | Class<Component> | Function | Object), data, children, normalizationType
    //   attrs: {
    //     id: 'app'
    //   }
    // }, this.msg)
  },
  data(vm) {
    console.log(this)
    console.log(vm)
    return {
      msg: 'hello'
    }
  },
  mounted() {
    console.log(this.msg)
    console.log(this._data.msg)
  }
})
