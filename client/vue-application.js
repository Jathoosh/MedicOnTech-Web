const Home = window.httpVueLoader('./components/Home.vue')
const Annexe = window.httpVueLoader('./components/Annexe.vue')
const PatientHome = window.httpVueLoader('./components/PatientHome.vue')
const Ordonnance = window.httpVueLoader('./components/Ordonnance.vue')
const Doctor_home = window.httpVueLoader('./components/Doctor_home.vue') //Verifier TODO
const History_patient = window.httpVueLoader('./components/History_patient.vue') //Verifier TODO
const Edit_prescription = window.httpVueLoader('./components/Edit_prescription.vue') //Verifier TODO
const Pharmacien = window.httpVueLoader('./components/Pharmacien.vue')
const Dependent_patient = window.httpVueLoader('./components/Dependent_patient.vue')
const PatientInCharge = window.httpVueLoader('./components/PatientInCharge.vue')

// Header and Footer
const Head_comp = window.httpVueLoader('./includes/header.vue');
const Foot_comp = window.httpVueLoader('./includes/footer.vue');

// Components
const InfoCard = window.httpVueLoader('./components/InfoCard.vue');
const Profil = window.httpVueLoader('./components/Profil.vue');
const LoginPar = window.httpVueLoader('./components/LoginPar.vue');
const LoginPro = window.httpVueLoader('./components/LoginPro.vue');

const routes = [
  { path: '/login', component: Home },
  { path: '/annexe', name:'Annexe', component: Annexe },
  { path: '/patientHome', name:'PatientHome', component: PatientHome }, //Verifier TODO
  { path: '/Doctor_home', name:'Doctor', component: Doctor_home }, //Verifier TODO
  { path: '/History_patient', name:'History_patient', component: History_patient }, //Verifier TODO
  { path: '/Edit_prescription', name:'Edit_prescription', component: Edit_prescription }, //Verifier TODO
  { path: '/pharmacien', name:'Pharmacien', component: Pharmacien }, //Verifier TODO
  { path: '/dependent_patient', name:'Dependent_patient', component: Dependent_patient }, //Verifier TODO
  { path: '/profil', name:'Profil', component: Profil },
  { path: '/Ordonnance', name:'Ordonnance', component: Ordonnance }, //Verifier TODO  
  { path: '/PatientInCharge', name:'PatientInCharge', component: PatientInCharge } //Verifier TODO  
]

const router = new VueRouter({
  routes
})

var app = new Vue( {
  router,
  el: '#app',
  data: 
  {
    sdatas: {id:0, firstname:'', lastname:'', function_name:'', function_id:0, email_address:'', work_home:''},
    sdatas_comp: [], //???????????!
    mdatas: []
  },
  components: 
  {
    head_comp : Head_comp,
    foot_comp : Foot_comp,
    
  },
  async mounted () 
  {
    //this.reloadData();
  },
  methods: 
  {
    async reloadData()
    {
      this.sdatas_comp = await this.getSdatas_Comp();
      this.mdatas = await this.getMdatas();
    },
    async login(data)
    {
      var res = await axios.post('api/login', data);
      if(res.status == 200 && res.data.connected)
      {
        this.sdatas.id = res.data.Id_Person;
        this.sdatas.function_name = res.data.profession.name;
        this.sdatas.function_id = res.data.profession.id;
        this.sdatas.firstname = res.data.first_name;
        this.sdatas.lastname = res.data.last_name;
        this.sdatas.email_address = data.mail;
        this.sdatas.work_home = res.data.workplace_name;
      }
      else
      {
        alert("Login ou mot de passe incorrect");
      }
    },
    async FCMethod()
    {
      const res = await axios.post('api/login-authorize');
      alert(res.data.message);
      if (res.data.connected)
      {
        this.sdatas.id = res.data.Id_Person;
        this.sdatas.function_name = res.data.profession.name;
        this.sdatas.function_id = res.data.profession.id;
        this.sdatas.firstname = res.data.first_name;
        this.sdatas.lastname = res.data.last_name;
        this.sdatas.email_address = res.data.mail;
        this.sdatas.work_home = res.data.workplace_name;
      }
      else
      {
        alert("C vrmt pas normal la");
      }
    },
    async getSdatas_Comp()
    {
      if (this.sdatas.function_name == "Patient")
      {
        const res = await axios.get('api/patient_comp_datas');
        this.sdatas_comp = res.data;
      }
    },
    async getMdatas()
    {
      if (this.sdatas.function_name == "Patient")
      {
        const res = await axios.get('api/patient_mdatas');
        this.mdatas = res.data;
      }
      else if (this.sdatas.function_name == "Doctor")
      {
        const res = await axios.get('api/doctor_mdatas');
        this.mdatas = res.data;
      }
    },
  }
})
