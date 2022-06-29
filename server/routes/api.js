const express = require('express')
const router = express.Router()

const data_db = require('./.data_db')

const {Sequelize} = require('sequelize');
const { status } = require('express/lib/response');

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { URLSearchParams } =  require ('url');
const config = require ('../../config');

var sdatas = {};
var sdatas_comp = [];
var mdatas = [];

//Attention au nom de la table
const sequelize = new Sequelize("db_medicontech",data_db.Username,data_db.Password, //Veuillez mettre le mot de passe de la base de donnée
{
  dialect: "mysql",
  host: "localhost",
  port: data_db.Port // Changer le port si vous utilisez un autre port que 3306
});

try 
{ 
  sequelize.authenticate();
  console.log('Connected to MySql database!');
}
catch (error)
{
  console.error('Unable to connect', error);
};

router.use((req, res, next) => {

  next();
})

router.post('/login-authorize', (req, res) => {
  //pick a random number between 1 and 30
  const randomNumber = Math.floor(Math.random() * 30) + 1;
  //Partie temporaire pour la connexion de l'utilisateur

  sequelize.query(`SELECT * FROM Person JOIN patient using(Id_Person) JOIN postal_address using (Id_Postal_address) WHERE Id_Person=${randomNumber}`).then(result => {
    req.session.Id_Person = result[0][0].Id_Person;
    req.session.function = "Patient";
    req.session.function_id = result[0][0].Id_Patient;
    res.status(200).json({
      message: 'Not Yet Implemented',
      connected: true,
      Id_Person: randomNumber,
      profession: {name:"Patient", id:result[0][0].Id_Patient},
      first_name: result[0][0].first_name,
      last_name: result[0][0].last_name,
      workplace_name: {door_number:result[0][0].door_number, road_number:result[0][0].number, road_name:result[0][0].road, zip_code:result[0][0].zip_code, town:result[0][0].town, country:result[0][0].country}, //Compacter l'addresse de la table postal_address
      mail: result[0][0].email_address,
    });
  })

  //Fin partie temporaire
  /*const { eidasLevel } = req.body;
  const scopes = Object.keys(req.body)
    .filter(key => key.startsWith('scope_'))
    .map(scope => scope.split('scope_').pop())
    .join(' ');

  const query = {
    scope: scopes || "openid given_name family_name gender preferred_username birthdate",
    redirect_uri: `${config.FS_URL}${config.LOGIN_CALLBACK_FS_PATH}`,
    response_type: 'code',
    client_id: config.AUTHENTICATION_CLIENT_ID,
    state: `state${crypto.randomBytes(32).toString('hex')}`,
    nonce: `nonce${crypto.randomBytes(32).toString('hex')}`,
  };

  // Save requested scopes in the session
  req.session.scopes = scopes;


  query.acr_values = eidasLevel || "eidas1";


  const url = `${config.FC_URL}${config.AUTHORIZATION_FC_PATH}`;
  const params = new URLSearchParams(query).toString();
  return res.redirect(`${url}?${params}`);*/
});

//PARTIE OBTENTION INFO SELON CONNEXION

router.post('/login', (req, res) => {
  const { mail, password } = req.body;
  sequelize.query(`SELECT professional.Id_Person FROM professional JOIN Person ON Person.Id_Person = professional.Id_Person WHERE email_address = '${mail}'`).then(result => {
    if (result[0].length == 0)
    {
      res.status(200).json({message:'Professionel inconnu', connected:false});
    }
    else
    {
      const Id_Person = result[0][0].Id_Person;
      sequelize.query(`SELECT first_name, last_name, workplace_name, password, Id_Doctor, Id_Pharmacist from professional LEFT JOIN doctor ON doctor.Id_Person = professional.Id_Person LEFT JOIN pharmacist ON pharmacist.Id_Person = professional.Id_Person LEFT JOIN Person ON Person.Id_Person = professional.Id_Person WHERE professional.Id_Person = '${Id_Person}'`).then(result2 => {
        if (bcrypt.compareSync(password, result2[0][0].password))
        {
          req.session.Id_Person = Id_Person;
          req.session.function = result2[0][0].Id_Doctor != null ? "Doctor" : "Pharmacist";
          req.session.function_id = result2[0][0].Id_Doctor != null ? result2[0][0].Id_Doctor : result2[0][0].Id_Pharmacist;
          res.status(200).json({
            message : 'Connexion réussie',
            connected : true,
            Id_Person : Id_Person, 
            first_name : result2[0][0].first_name,
            last_name : result2[0][0].last_name,
            workplace_name : result2[0][0].workplace_name, 
            profession : result2[0][0].Id_Doctor==null?
              {name:"Pharmacist",id:result2[0][0].Id_Pharmacist}:
              {name:"Doctor",id:result2[0][0].Id_Doctor}
          });
        }
        else
        {
          res.status(200).json({message:'Mot de passe incorrect', connected:false});
        }
      });
    }
  });
})

//PARTIE OBTENTIONS INFOS PERSONNES

router.get('/patient_comp_datas', (req,res) => {
  const Id_Patient = req.session.function_id;
  sequelize.query(`SELECT * from prescription WHERE Id_Patient = '${Id_Patient}'`).then(result => {
    res.status(200).json({
      message : 'Données récupérées',
      datas : result[0]
    });
  })
})

router.get('/patient_mdatas', (req,res) => {
  const Id_Patient = req.session.function_id;
  mdatas = [];
  sequelize.query(`SELECT * from Patient JOIN Person USING (Id_Person) WHERE Id_Tutor = '${Id_Patient}'`).then(result => {
    result[0].forEach(pac => {
      let temp = {};
      sequelize.query(`SELECT * from prescription WHERE Id_Patient = '${pac.Id_Patient}'`).then(result2 => {
        temp.infos_pac = pac;
        temp.prescriptions = result2[0];
      })
      mdatas.push(temp);
    });
    res.status(200).json({
      message : 'Données récupérées',
      datas : mdatas
    });
  })
})

router.get('/doctor_mdatas', (req,res) => {
  const Id_Doctor = req.session.function_id;
  console.log(Id_Doctor);
  mdatas = [];
  sequelize.query(`SELECT person.*, patient.Id_Patient, prescription.*, drug.* from prescription join patient using (Id_Patient) join person using (Id_Person) right join prescription_drug Using (Id_Prescription) join drug using (Id_Drug) where Id_Patient IN (SELECT Id_Patient from assigned_doctor where Id_Doctor = '${Id_Doctor}');`).then(result => {
    //Obtain unique Patient
    let Id_Patients = [];
    result[0].forEach(row => {
      if (!Id_Patients.includes(row.Id_Patient))
      {
        Id_Patients.push(row.Id_Patient);
        mdatas.push({
          infos_patient : {
            Id_Person : row.Id_Person,
            first_name : row.first_name,
            last_name : row.last_name,
            birth_date : row.birth_date,
            email_address : row.email_address,
            phone : row.phone,
            Id_Postal_address : row.Id_Postal_address
          },
          prescriptions : []
        });
      }
    })
    //Obtain unique Prescription according to Id_Patient
    let Id_Prescriptions = [];
    Id_Patients.forEach((Id_Patient,index) => {
      Id_Prescriptions = [];
      result[0].filter(row => row.Id_Patient == Id_Patient).forEach((row,n) => {
        if (!Id_Prescriptions.includes(row.Id_Prescription))
        {
          Id_Prescriptions.push(row.Id_Prescription);
          mdatas[index].prescriptions.push({
            infos_prescription : {
              Id_Prescription : row.Id_Prescription,
              creation_date : row.creation_date,
              expiration_date : row.expiration_date,
              date_of_use : row.date_of_use,
              frequency_of_reuse : row.frequency_of_reuse,
              number_of_reuses : row.number_of_reuses,
              used : row.used,
              validity : row.validity,
              note : row.note,
              reported : row.reported,
              report_note : row.report_note,
            },
            drugs : [],
            services : []
          });
        }
        mdatas[index].prescriptions[Id_Prescriptions.length-1].drugs.push({
          Id_Drug : row.Id_Drug,
          drug_name : row.drug_name,
          drug_format : row.drug_format,
          drug_application : row.drug_application,
          autorisation_status : row.autorisation_status,
          comercialised : row.comercialised,
          comercialised_on : row.comercialised_on,
          warning_stock : row.warning_stock,
          comercialised_by : row.comercialised_by,
          drug_price : row.drug_price,
          reimbursement_rate : row.reimbursement_rate
        });
      })
    })
    res.status(200).json({
      message : 'Données récupérées',
      datas : mdatas
    });
  })
})

// PARTIE APPLICATION

router.get("/motapp", (req, res) => {
  res.status(200).json([
    {
      message: "Tu as réussi, hésite pas à me mp le code 59745 sur Discord",
      id: 1,
    },
    { message: "Hola Camron, como esta ?!", id: 2 },
    { message: "Hey, i can also talk english, what about you ?", id: 3 },
    { message: "WeshWesh, jai plus dinspi", id: 4 },
  ]);
});

router.get("/motapp/ordonnance/:id", (req, res) => {
  id = req.params.id;
  sequelize
    .query(
      `SELECT pp.last_name as patient_lastname, pp.first_name as patient_firstname, dp.last_name as doctor_lastname, dp.first_name as doctor_firstname, creation_date, Id_Prescription from prescription join patient using(Id_Patient) join doctor using (Id_Doctor) join person dp ON dp.Id_Person = Doctor.Id_Person Join person pp on pp.Id_Person = patient.Id_Person where  used= false and Id_Patient = ${id}`
    )
    .then((result) => {
      console.log(result[0]);
      res.status(200).json({ result: result[0] });
    });
});

router.get("/motapp/prescription/:id", (req, res) => {
  id = req.params.id;
  sequelize
    .query(
      `SELECT Id_Drug,drug_name,quantity from prescription
      join prescription_drug using (Id_Prescription) 
      join drug using(Id_Drug)
      where Id_Prescription = ${id}`
    )
    .then((result) => {
      console.log(result[0]);
      res.status(200).json({ result: result[0] });
    });
});

router.get("/motapp/historique/:id", (req, res) => {
  id = req.params.id;
  sequelize
    .query(
      `SELECT pp.last_name as patient_lastname, pp.first_name as patient_firstname, dp.last_name as doctor_lastname, dp.first_name as doctor_firstname, creation_date, Id_Prescription from prescription join patient using(Id_Patient) join doctor using (Id_Doctor) join person dp ON dp.Id_Person = Doctor.Id_Person Join person pp on pp.Id_Person = patient.Id_Person where  used= true and Id_Patient = ${id}`
    )
    .then((result) => {
      console.log(result[0]);
      res.status(200).json({ result: result[0] });
    });
});

router.get("/motapp/doctor", (req, res) => {
  sequelize
    .query(
      "SELECT Person.first_name, Person.last_name, Person.phone, Person.email_address, Person.Id_Person FROM `Doctor` JOIN `Person` ON Person.Id_Person = Doctor.Id_Person"
    )
    .then((result) => {
      console.log(result[0]);
      res.status(200).json({ result: result[0] });
    });
});

module.exports = router
