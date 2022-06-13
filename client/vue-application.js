const Home = window.httpVueLoader('./components/Home.vue')
const Annexe = window.httpVueLoader('./components/Annexe.vue')
const Pharmacien = window.httpVueLoader('./components/Pharmacien.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/annexe', name:'Annexe', component: Annexe },
  { path: '/pharmacien', name:'Pharmacien', component: Pharmacien }
]

const router = new VueRouter({
  routes
})

var app = new Vue( {
  router,
  el: '#app',
  data: 
  {
  },
  components: 
  {
  },
  async mounted () 
  {

  },
  methods: 
  {

  }
})
