import Vue from 'vue';
import Vuex from 'vuex';

import API from '@/api'
import router from '@/router'

//if subfolders exist with corresponding js file for each store elements
const files = require.context('./modules', true, /\index.js$/)
const modules = {}

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\index.js)/g, '').replace('/', '')] = files(
    key
  ).default(content)
})

//if files are in the modules folder separately and contain all the store elements
// const files = require.context('./modules', false, /\.js$/)
// const modules = {}

// files.keys().forEach((key) => {
//   modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default(content)
// })

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV != 'production'
})

store.$api = API
store.$router = router

export default store
