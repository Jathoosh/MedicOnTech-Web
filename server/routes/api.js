const express = require('express')
const router = express.Router()

const data_db = require('./.data_db')

const {Sequelize} = require('sequelize');
const { status } = require('express/lib/response');

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { URLSearchParams } =  require ('url');
const config = require ('../../config');

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

  sequelize.query(`SELECT * FROM Person WHERE Id_Person=${randomNumber}`).then(result => {
    res.status(200).json({
      message: 'Not Yet Implemented',
      connected: true,
      Id_Person: randomNumber,
      profession: {name:"Patient", id:1},
      first_name: result[0][0].first_name,
      last_name: result[0][0].last_name,
      workplace_name: "Not Yeeeeeeeet", //Compacter l'addresse de la table postal_address
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

router.get('/patients/:doctorId', (req, res) => {
  doctorId= req.params.doctorId;
  let toreturn = [];  

  sequelize.query(`SELECT Person.first_name, Person.last_name, Person.Id_Person, Person.birth_date, Person.email_address FROM assigned_doctor JOIN patient ON assigned_doctor.Id_Patient = Patient.Id_Patient JOIN Person ON Patient.Id_Person = Person.Id_Person WHERE Id_Doctor = ${doctorId}`)
  .then(function(result) {
    result[0].forEach(ligne => {
      toreturn.push({
        first_name: ligne.first_name,
        last_name: ligne.last_name,
        id: ligne.Id_Person,
        birth_date: ligne.birth_date,
        email_address: ligne.email_address
      });
    });
    res.status(200).json(toreturn);
  })
})

router.get("/doctor/:id", (req, res) => {
  id = req.params.id;
  sequelize.query(`SELECT Person.first_name, Person.last_name, Person.Id_Person, speciality.speciality_name FROM doctor JOIN doctor_speciality ON doctor_speciality.Id_Doctor = doctor.Id_Doctor JOIN speciality ON speciality.Id_Speciality = doctor_speciality.Id_Speciality JOIN Person ON doctor.Id_Person = Person.Id_Person WHERE doctor.Id_Doctor = ${id}`)
  .then(function(result) {
    res.status(200).json(result[0][0]);
  })
})

// PARTIE APPLICATION

router.get('/motapp', (req, res) => {
  res.status(200).json([{message:'Tu as réussi, hésite pas à me mp le code 59745 sur Discord',id:1},{message:'Hola Camron, como esta ?!',id:2},{message:'Hey, i can also talk english, what about you ?',id:3},{message:'WeshWesh, jai plus dinspi',id:4}]);
})

router.post('/motapp', (req, res) => {
  console.log(req.body);
  res.status(200).json({message:'Jai bien reçu ta requête en post et je lai affiché dans la console'});
})

router.get('/motapp/doctor', (req, res) => {
  sequelize.query('SELECT Person.first_name, Person.last_name, Person.phone, Person.email_address, Person.Id_Person FROM `Doctor` JOIN `Person` ON Person.Id_Person = Doctor.Id_Person').then(result => {
    console.log(result[0]);
    res.status(200).json({result:result[0]});
  })
})

module.exports = router
