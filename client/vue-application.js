const Home = window.httpVueLoader('./components/Home.vue')
const Annexe = window.httpVueLoader('./components/Annexe.vue')
const Annexe2 = window.httpVueLoader('./components/Bonchour.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/annexe', name:'Annexe', component: Annexe },
  { path: '/annexe2', name:'Annexe2', component: Annexe2 },
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
