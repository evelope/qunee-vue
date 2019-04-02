import QuneeVue from './qunee-vue.vue'

const install = function(Vue) {
  Vue.component('QuneeVue', QuneeVue);
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { QuneeVue }

export default {
  version: '0.0.1',
  install,
  QuneeVue,
  QuneeVue: QuneeVue
}