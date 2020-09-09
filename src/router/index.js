import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import demo from '@/views/demo'
import test from '@/views/test'
import cropper from '@/views/cropper'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'demo',
      component: demo
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/cropper',
      name: 'cropper',
      component: cropper
    }
  ]
})
