const Home = window.httpVueLoader('./components/Home.vue')
const Annexe = window.httpVueLoader('./components/Annexe.vue')
const Doctor_home = window.httpVueLoader('./components/Doctor_home.vue') //Verifier TODO
const History_patient = window.httpVueLoader('./components/History_patient.vue') //Verifier TODO
const Edit_prescription = window.httpVueLoader('./components/Edit_prescription.vue') //Verifier TODO
const Annexe2 = window.httpVueLoader('./components/Bonchour.vue')
const Pharmacien = window.httpVueLoader('./components/Pharmacien.vue')
const Dependent_patient = window.httpVueLoader('./components/Dependent_patient.vue')



const routes = [
  { path: '/', component: Home },
  { path: '/annexe', name:'Annexe', component: Annexe },
  { path: '/Doctor_home', name:'Doctor', component: Doctor_home }, //Verifier TODO
  { path: '/History_patient', name:'History_patient', component: History_patient }, //Verifier TODO
  { path: '/Edit_prescription', name:'Edit_prescription', component: Edit_prescription }, //Verifier TODO
  { path: '/annexe2', name:'Annexe2', component: Annexe2 },
  { path: '/pharmacien', name:'Pharmacien', component: Pharmacien },
  { path: '/dependent_patient', name:'Dependent_patient', component: Dependent_patient }
]

const router = new VueRouter({
  routes
})

var app = new Vue( {
  router,
  el: '#app',
  data: 
  {
    doctors : [],
    patients : [],
    prescriptions : [],
  },
  components: 
  {
  },
  async mounted () 
  {

  },
  methods: 
  {
    async FCMethod()
    {
      const res = await axios.post('/login-authorize');
    }
  }
})
