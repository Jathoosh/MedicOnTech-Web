const Home = window.httpVueLoader('./components/Home.vue')
const Annexe = window.httpVueLoader('./components/Annexe.vue')
const Doctor_home = window.httpVueLoader('./components/Doctor_home.vue')
const History_patient = window.httpVueLoader('./components/History_patient.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/annexe', name:'Annexe', component: Annexe },
  { path: '/Doctor_home', name:'Doctor', component: Doctor_home },
  { path: '/History_patient', name:'History_patient', component: History_patient },
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
