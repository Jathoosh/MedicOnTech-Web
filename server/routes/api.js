const express = require("express");
const router = express.Router();

const data_db = require('./.data_db');
const configRoutes = require('./configRoutes');

const { Sequelize } = require("sequelize");
const { status } = require("express/lib/response");

const crypto = require("crypto");
const { URLSearchParams } = require("url");
const config = require("../../config");
const bcrypt = require('bcrypt');

var sdatas = {};
var sdatas_comp = [];
var mdatas = [];

//Attention au nom de la table
const sequelize = new Sequelize(
  "db_medicontech",
  data_db.Username,
  data_db.Password, //Veuillez mettre le mot de passe de la base de donnée
  {
    dialect: "mysql",
    host: "localhost",
    port: data_db.Port, // Changer le port si vous utilisez un autre port que 3306
  }
);

try {
  sequelize.authenticate();
  console.log("Connected to MySql database!");
} catch (error) {
  console.error("Unable to connect", error);
}

router.use((req, res, next) => {
  next();
});

router.post('/login-authorize', (req, res) => {
  const {given_name, family_name, birthdate} = req.body;

  sequelize.query(`SELECT * FROM Person JOIN patient using(Id_Person) WHERE birth_date='${birthdate}' and last_name='${family_name}' and first_name = '${given_name}'`).then(result => {
    if(result[0].length != 0){  
      req.session.Id_Person = result[0][0].Id_Person;
      req.session.function = "Patient";
      req.session.function_id = result[0][0].Id_Patient;
      console.log(configRoutes.MAIN_URL+'/login_retrieve');
      //redirect to youtube
      res.status(200).redirect(configRoutes.MAIN_URL+'/login_retrieve');
    }
    else{
      sequelize.query(`INSERT INTO postal_address (country) VALUES ("France")`).then(result => {
        sequelize.query(`INSERT INTO Person (first_name, last_name, birth_date, Id_Postal_address) VALUES ('${given_name}', '${family_name}', '${birthdate}', '${result[0]}')`).then(result2 => {
          sequelize.query(`INSERT INTO patient (Id_Person) VALUES ('${result2[0]}')`).then(result3 => {
            req.session.Id_Person = result2[0];
            req.session.function = "Patient";
            req.session.function_id = result3[0];
            console.log(configRoutes.MAIN_URL+'/login_retrieve');
            res.status(200).redirect(configRoutes.MAIN_URL+'/login_retrieve');
          })
        })
      })
    }
  })
});

//PARTIE OBTENTION INFO SELON CONNEXION

router.post('/login', (req, res) => {
  const { mail, password } = req.body;
  sequelize.query(`SELECT professional.Id_Person FROM professional JOIN Person ON Person.Id_Person = professional.Id_Person WHERE email_address = '${mail}'`).then(result => {
    if (result[0].length == 0)
    {
      sequelize.query(`SELECT patient.Id_Person FROM patient JOIN Person ON Person.Id_Person = patient.Id_Person WHERE email_address = '${mail}'`).then(result2 => {
        if (result2[0].length == 0){
          res.status(200).json({
            message: "Utilisateur non trouvé",
            connected : false
          });
        }
        else{
          const Id_Person = result2[0][0].Id_Person;
          sequelize.query(`SELECT first_name, last_name, password, birth_date, email_address, Id_Patient, postal_address.* FROM patient JOIN Person USING(Id_Person) JOIN postal_address USING (Id_Postal_address) WHERE Id_Person = '${Id_Person}'`).then(result3 => {
            if (bcrypt.compareSync(password, result3[0][0].password || "Blank"))
            {
              req.session.Id_Person = Id_Person;
              req.session.function = "Patient";
              req.session.function_id = result3[0][0].Id_Patient;
              sdatas = {
                Id_Person: Id_Person,
                first_name: result3[0][0].first_name,
                last_name: result3[0][0].last_name,
                profession : {name: "Patient", id: result3[0][0].Id_Patient},
                birth_date : result3[0][0].birth_date,
                mail : result3[0][0].email_address,
                workplace_name : {door_number:result3[0][0].door_number, road_number:result3[0][0].number, road_name:result3[0][0].road, zip_code:result3[0][0].zip_code, town:result3[0][0].town, country:result3[0][0].country},
              }
              res.status(200).json({
                message: "Connexion réussie",
                connected : true,
                sdatas: sdatas
              });
            }
            else{
              res.status(200).json({
                message: "Mot de passe incorrect",
                connected : false
              });
            }
          });
        }
      })
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
          sdatas = {
            Id_Person : Id_Person, 
            first_name : result2[0][0].first_name,
            last_name : result2[0][0].last_name,
            workplace_name : result2[0][0].workplace_name, 
            profession : result2[0][0].Id_Doctor==null?
              {name:"Pharmacist",id:result2[0][0].Id_Pharmacist}:
              {name:"Doctor",id:result2[0][0].Id_Doctor},
            mail : mail
          }
          res.status(200).json({
            message : 'Connexion réussie',
            connected : true,
            sdatas : sdatas
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

router.get('/retrieve_person', (req, res) => {
  const Id_Person = req.session.Id_Person;
  const function_id = req.session.function_id;
  const function_name = req.session.function;
  if (Id_Person != null){
    sequelize.query(`SELECT * FROM Person JOIN postal_address using (Id_Postal_address) WHERE Id_Person = '${Id_Person}'`).then(result => {
      sdatas = {
        Id_Person: Id_Person,
        first_name : result[0][0].first_name,
        last_name : result[0][0].last_name,
        birth_date : result[0][0].birth_date,
        mail : result[0][0].email_address,
        profession: {name:function_name, id:function_id},
        workplace_name : {door_number:result[0][0].door_number, road_number:result[0][0].number, road_name:result[0][0].road, zip_code:result[0][0].zip_code, town:result[0][0].town, country:result[0][0].country},
      }
      res.status(200).json({
        connected : true,
        sdatas : sdatas
      });
    })
  }
  else{
    res.status(200).json({connected:false});
  }
})

router.get('/patient_comp_datas', (req,res) => {
  const Id_Patient = req.session.function_id || req.body.Id_Patient;
  sdatas_comp = [];
  sequelize.query(`SELECT prescription.*, drug.*, professional.workplace_name, person.* from prescription right join prescription_drug Using (Id_Prescription) join drug using (Id_Drug) join doctor using (Id_Doctor) join professional using (Id_Person) join person Using (Id_Person) WHERE Id_Patient = '${Id_Patient}'`).then(result => {
    
    let Id_Prescriptions = [];
    result[0].forEach((row,n) => {
      if (!Id_Prescriptions.includes(row.Id_Prescription))
      {
        Id_Prescriptions.push(row.Id_Prescription);
        sdatas_comp.push({
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
            doctor_workplace_name : row.workplace_name,
            doctor_first_name : row.first_name,
            doctor_last_name : row.last_name,
            doctor_mail : row.email_address,
            doctor_phone_number : row.phone,
          },
          drugs : [],
          services : []
        });
      }
      sdatas_comp[Id_Prescriptions.length-1].drugs.push({
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
    
    res.status(200).json({
      message : 'Données ordonnances patients récupérées',
      datas : sdatas_comp
    });
  })
})

router.get('/patient_comp_datas_services', (req,res) => {
  const Id_Patient = req.session.function_id || req.body.Id_Patient;
  let toReturn = [];
  sequelize.query(`SELECT prescription.Id_Prescription, service.* from prescription right join prescription_service Using (Id_Prescription) join service using (Id_Service) WHERE Id_Patient = '${Id_Patient}'`).then(result => {
    //Separate each service by Id_Prescription
    let Id_Prescriptions = [];
    result[0].forEach((row,n) => {
      if (!Id_Prescriptions.includes(row.Id_Prescription))
      {
        Id_Prescriptions.push(row.Id_Prescription);
        toReturn.push({
          Id_Prescription : row.Id_Prescription,
          services : []
        });
      }
      toReturn[Id_Prescriptions.length-1].services.push({
        Id_Service : row.Id_Service,
        service_name : row.service_name,
      });
    })
    res.status(200).json({
      message : 'Données services patients récupérées',
      datas : toReturn
    });
  })
})

router.get('/patient_mdatas', (req,res) => {
  const Id_Patient = req.session.function_id || req.body.Id_Patient;
  mdatas = [];

  sequelize.query(`SELECT person.*, patient.Id_Patient, prescription.*, drug.*, doctor_infos.email_address doctor_mail, doctor_infos.first_name doctor_first, doctor_infos.last_name doctor_last, doctor_infos.phone doctor_phone, professional.workplace_name from prescription JOIN patient USING (Id_Patient) JOIN person USING (Id_Person) right join prescription_drug Using (Id_Prescription) join drug using (Id_Drug) join doctor Using (Id_Doctor) Join professional on doctor.Id_Person = professional.Id_Person Join person as doctor_infos On professional.Id_Person = doctor_infos.Id_Person WHERE Id_Patient IN (SELECT Id_Patient from Patient WHERE Id_Tutor = '${Id_Patient}')`).then(result => {
    let Id_Pac = [];
    result[0].forEach(row => {
      if (!Id_Pac.includes(row.Id_Patient))
      {
        Id_Pac.push(row.Id_Patient);
        mdatas.push({
          infos_pac : {
            Id_Person : row.Id_Person,
            first_name : row.first_name,
            last_name : row.last_name,
            birth_date : row.birth_date,
            email_address : row.email_address,
            phone : row.phone,
            Id_Postal_address : row.Id_Postal_address,
          },
          prescriptions_pac : []
        });
      }
    })
    //Obtain unique Prescription according to Id_Patient
    let Id_Prescriptions_pac = [];
    Id_Pac.forEach((Id_Patient_pac,index) => {
      Id_Prescriptions_pac = [];
      result[0].filter(row => row.Id_Patient == Id_Patient_pac).forEach((row,n) => {
        if (!Id_Prescriptions_pac.includes(row.Id_Prescription))
        {
          Id_Prescriptions_pac.push(row.Id_Prescription);
          mdatas[index].prescriptions_pac.push({
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
              doctor_workplace_name : row.workplace_name,
              doctor_first_name : row.doctor_first,
              doctor_last_name : row.doctor_last,
              doctor_mail : row.doctor_mail,
              doctor_phone_number : row.doctor_phone,
            },
            drugs : [],
            services : []
          });
        }
        mdatas[index].prescriptions_pac[Id_Prescriptions_pac.length-1].drugs.push({
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
      message : 'Données patients à charges récupérées',
      datas : mdatas
    });
  })
})

router.get('/patient_mdatas_services', (req,res) => {
  const Id_Patient = req.session.function_id || req.body.Id_Patient;
  let toReturn = [];
  sequelize.query(`SELECT prescription.Id_Prescription, service.* from prescription right join prescription_service Using (Id_Prescription) join service using (Id_Service) WHERE Id_Patient IN (SELECT Id_Patient from Patient WHERE Id_Tutor = '${Id_Patient}')`).then(result => {
    //Separate each service by Id_Prescription
    let Id_Prescriptions = [];
    result[0].forEach((row,n) => {
      if (!Id_Prescriptions.includes(row.Id_Prescription))
      {
        Id_Prescriptions.push(row.Id_Prescription);
        toReturn.push({
          Id_Prescription : row.Id_Prescription,
          services : []
        });
      }
      toReturn[Id_Prescriptions.length-1].services.push({
        Id_Service : row.Id_Service,
        service_name : row.service_name,
      });
    })
    res.status(200).json({
      message : 'Données services patients à charges récupérées',
      datas : toReturn
    });
  })
})

router.get('/doctor_mdatas', (req,res) => {
  const Id_Doctor = req.session.function_id;
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

router.get('/doctor_mdatas_services', (req,res) => {
  const Id_Doctor = req.session.function_id;
  let toReturn = [];
  sequelize.query(`SELECT prescription.Id_Prescription, service.*, prescription_service.quantity from prescription right join prescription_service Using (Id_Prescription) join service using (Id_Service) WHERE Id_Patient IN (SELECT Id_Patient from assigned_doctor where Id_Doctor = '${Id_Doctor}')`).then(result => {
    //Separate each service by Id_Prescription
    let Id_Prescriptions = [];
    result[0].forEach((row,n) => {
      if (!Id_Prescriptions.includes(row.Id_Prescription))
      {
        Id_Prescriptions.push(row.Id_Prescription);
        toReturn.push({
          Id_Prescription : row.Id_Prescription,
          services : []
        });
      }
      toReturn[Id_Prescriptions.length-1].services.push({
        Id_Service : row.Id_Service,
        service_name : row.service_name,
        quantity : row.quantity
      });
    })
    res.status(200).json({
      message : 'Données services patients à charges récupérées',
      datas : toReturn
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

router.get("/motapp/doctor/:id", (req, res) => {
  id = req.params.id;
  sequelize
    .query(
      "SELECT Person.first_name, Person.last_name, Person.phone, Person.email_address, Person.Id_Person FROM `Doctor` JOIN `Person` ON Person.Id_Person = Doctor.Id_Person INNER JOIN `assigned_doctor` ON assigned_doctor.Id_Doctor = Doctor.Id_Doctor WHERE assigned_doctor.Id_Patient = " +id
    )
    
    .then((result) => {
      console.log(result[0]);
      res.status(200).json({ result: result[0] });
    });
});

module.exports = router;
