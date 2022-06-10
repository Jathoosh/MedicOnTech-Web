const Home = window.httpVueLoader('./components/Home.vue')
const Annexe = window.httpVueLoader('./components/Annexe.vue')
const Medecin_home = window.httpVueLoader('./components/Medecin_home.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/annexe', name:'Annexe', component: Annexe },
  { path: '/Medecin_home', name:'Medecin', component: Medecin_home }
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
