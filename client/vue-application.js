const Home = window.httpVueLoader('./components/Home.vue')
const Annexe = window.httpVueLoader('./components/Annexe.vue')
const PatientHome = window.httpVueLoader('./components/PatientHome.vue')
const Ordonnance = window.httpVueLoader('./components/Ordonnance.vue')
const Doctor_home = window.httpVueLoader('./components/Doctor_home.vue') //Verifier TODO
const History_patient = window.httpVueLoader('./components/History_patient.vue') //Verifier TODO
const Edit_prescription = window.httpVueLoader('./components/Edit_prescription.vue') //Verifier TODO
const Pharmacien = window.httpVueLoader('./components/Pharmacien.vue')
const Dependent_patient = window.httpVueLoader('./components/Dependent_patient.vue')

// Header and Footer
const Head_comp = window.httpVueLoader('./includes/header.vue');
const Foot_comp = window.httpVueLoader('./includes/footer.vue');

// Components
const InfoCard = window.httpVueLoader('./components/InfoCard.vue');

const routes = [
  { path: '/login', component: Home },
  { path: '/annexe', name:'Annexe', component: Annexe },
  { path: '/patientHome', name:'PatientHome', component: PatientHome }, //Verifier TODO
  { path: '/Doctor_home', name:'Doctor', component: Doctor_home }, //Verifier TODO
  { path: '/History_patient', name:'History_patient', component: History_patient }, //Verifier TODO
  { path: '/Edit_prescription', name:'Edit_prescription', component: Edit_prescription }, //Verifier TODO
  { path: '/pharmacien', name:'Pharmacien', component: Pharmacien }, //Verifier TODO
  { path: '/dependent_patient', name:'Dependent_patient', component: Dependent_patient } //Verifier TODO
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
    doctorId : 1,
    doctor : {},
    patients : [],
    prescriptions : [],
  },
  components: 
  {
    head_comp : Head_comp,
    foot_comp : Foot_comp,
  },
  async mounted () 
  {
    this.reloadData();
  },
  methods: 
  {
    async reloadData()
    {
      this.patients = await this.getPatientsForDoctor();
      this.doctor = await this.getDoctor();
    },
    //TODO Partie DEVELOPMMENT, à supprimer
    modif_id_doctor(para)
    {
      this.doctorId = para.id;
      console.log(this.doctorId);
      this.reloadData();
    },
    //FIN TODO
    async FCMethod()
    {
      const res = await axios.post('api/login-authorize');
      alert(res.data.message);
    },
    async getPatientsForDoctor()
    {
      const res = await axios.get('api/patients/'+this.doctorId);
      return res.data;
    },
    async getDoctor()
    {
      const res = await axios.get('api/doctor/'+this.doctorId);
      return res.data;
    }
  }
})
