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
const Profil_PAC = window.httpVueLoader('./components/Profil_PAC.vue')
const Contact = window.httpVueLoader('./components/Contact.vue')
const A_propos = window.httpVueLoader('./components/A_propos.vue')
const Faq = window.httpVueLoader('./components/Faq.vue')

// Header and Footer
const Head_comp = window.httpVueLoader('./includes/header.vue');
const Foot_comp = window.httpVueLoader('./includes/footer.vue');

// Components
const InfoCard = window.httpVueLoader('./components/InfoCard.vue');
const Profil = window.httpVueLoader('./components/Profil.vue');
const LoginPar = window.httpVueLoader('./components/LoginPar.vue');
const LoginPro = window.httpVueLoader('./components/LoginPro.vue');

// Page de fonctionnalités
const LoginRetrieve = window.httpVueLoader('./pages/LoginRetrieve.vue');

const routes = [
  { path: '/login', component: Home },
  { path: '/annexe', name:'Annexe', component: Annexe },
  { path: '/patient_home', name:'PatientHome', component: PatientHome }, //Verifier TODO
  { path: '/doctor_home', name:'Doctor', component: Doctor_home }, //Verifier TODO
  { path: '/history_patient', name:'History_patient', component: History_patient }, //Verifier TODO
  { path: '/edit_prescription', name:'Edit_prescription', component: Edit_prescription }, //Verifier TODO
  { path: '/pharmacist_home', name:'Pharmacien', component: Pharmacien }, //Verifier TODO
  { path: '/dependent_patient', name:'Dependent_patient', component: Dependent_patient }, //Verifier TODO
  { path: '/profil', name:'Profil', component: Profil },
  { path: '/Profil_PAC', name:'Profil_PAC', component: Profil_PAC }, //Verifier TODO
  { path: '/ordonnance', name:'Ordonnance', component: Ordonnance }, //Verifier TODO  
  { path: '/patientInCharge', name:'PatientInCharge', component: PatientInCharge }, //Verifier TODO  
  { path: '/Contact', name:'Contact', component: Contact }, //Verifier TODO  
  { path: '/A_propos', name:'A_propos', component: A_propos }, //Verifier TODO  
  { path: '/Faq', name:'Faq', component: Faq },
  { path: '/login_retrieve', name:'login-retrieve', component: LoginRetrieve } //Verifier TODO

]

const router = new VueRouter({
  routes
})

var app = new Vue( {
  router,
  el: '#app',
  data: 
  {
    sdatas: {
      Id_Person:0, 
      first_name:'', 
      last_name:'', 
      profession:{id:0,name:""}, 
      mail:'', 
      workplace_name:''
    },
    sdatas_comp: [], //Liste uniquement utilisé pour le patient (contient ces ordonnances)
    mdatas: [],
    //==========================================================
    //Séparation entre les données obtenues de la base de données et les données utilisées dans les différentes pages
    //==========================================================
    index_history_patient: 0,
    index_pac: 0,
    tutor_bool: true,
    index_ordonnance: 0,
  },
  components: 
  {
    head_comp : Head_comp,
    foot_comp : Foot_comp,
    
  },
  async mounted () 
  {
    this.notConnected();
  },
  methods: 
  {
    //==========================================================
    //Méthode pour récupérer les données de la base de données
    //==========================================================
    
    async login(data)
    {
      var res = await axios.post('api/login', data);
      if(res.status == 200 && res.data.connected)
      {
        this.sdatas = res.data.sdatas;
        this.reloadData();
      }
      else
      {
        alert("Login ou mot de passe incorrect");
      }
    },
    async FCMethod()
    {
      window.location.href = "http://localhost:3000/login";
    },
    async getSdatas_Comp()
    {
      if (this.sdatas.profession.name == "Patient")
      {
        const res = await axios.get('api/patient_comp_datas');
        const res2 = await axios.get('api/patient_comp_datas_services');
        res.data.datas.forEach(element => {
          element.services = res2.data.datas.filter(service => service.Id_Prescription == element.infos_prescription.Id_Prescription);
        });
        return res.data.datas;
      }
    },
    async getMdatas()
    {
      if (this.sdatas.profession.name == "Patient")
      {
        const res = await axios.get('api/patient_mdatas');
        const res2 = await axios.get('api/patient_mdatas_services');
        res.data.datas.forEach(element => {
          element.prescriptions_pac.forEach(prescription => {
            prescription.services = res2.data.datas.filter(service => service.Id_Prescription == prescription.infos_prescription.Id_Prescription);
          });
        });
        return res.data.datas;
      }
      else if (this.sdatas.profession.name == "Doctor")
      {
        const res = await axios.get('api/doctor_mdatas');
        const res2 = await axios.get('api/doctor_mdatas_services');
        res.data.datas.forEach(element => {
          element.prescriptions.forEach(prescription => {
            prescription.services = res2.data.datas.filter(service => service.Id_Prescription == prescription.infos_prescription.Id_Prescription)[0].services;
          });
        });
        return res.data.datas;
      }
    },
    async loadDataFcCallback(data)
    {
      const res = await axios.get('api/retrieve_person');
      if (res.data.connected)
      {
        this.sdatas = res.data.sdatas;
        this.reloadData();
      }
      else
      {
        alert("Veuillez réessayer la connexion");
        //redirect to login
        this.$router.push('/login');
      }
    },

    //==========================================================
    //Fonctions pour le bon fonctionnement des pages
    //==========================================================
    async reloadData()
    {
      this.sdatas_comp = await this.getSdatas_Comp();
      this.mdatas = await this.getMdatas();
      this.goToPage('/'+this.sdatas.profession.name+'_home');
    },
    footertobottom(height)
    {
      var main = document.getElementById("main");
      main.style.paddingBottom = height;
    },
    goToPage(page){
      var current_url = window.location.href;
      current_url = current_url.substring(current_url.lastIndexOf('/'), current_url.length);
      if(page != current_url){
        this.$router.push(page);
      }
    },
    async notConnected()
    {
      const res = await axios.get('api/connected');
      if(res.data.connected)
      {
        this.sdatas = res.data.sdatas;
        this.reloadData();
      }
      else
      {
        this.goToPage('/login');
      }
    },

    //==========================================================
    //Fonctions concernant les Emits
    //==========================================================
    getPrescriptions(data)
    {
      this.patientID = data;
    },
    sendPrescription(data){
      
    },
    infos_patient(data)
    {
      this.index_history_patient = data.index;
    },
    save_index_pac(data){
      this.index_pac = data.index;
    },
    tutor_false(){
      this.tutor_bool = false;
    },
    tutor_true(){
      this.tutor_bool = true;
    },
    save_index_ordonnance(data){
      this.index_ordonnance = data.index;
    }
  }
})
