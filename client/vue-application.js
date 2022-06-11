const Home = window.httpVueLoader('./components/Home.vue')
const Annexe = window.httpVueLoader('./components/Annexe.vue')
const PatientHome = window.httpVueLoader('./components/PatientHome.vue')
const Ordonnance = window.httpVueLoader('./components/Ordonnance.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/annexe', name:'Annexe', component: Annexe },
  { path: '/patientHome', name:'PatientHome', component: PatientHome },
  { path: '/ordonnance', name:'Ordonnance', component: Ordonnance }
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
