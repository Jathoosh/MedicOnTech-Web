const express = require('express')
const router = express.Router()

const data_db = require('./.data_db')

const {Sequelize} = require('sequelize');
const { status } = require('express/lib/response');

const crypto = require('crypto');
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
  console.log("Not implemented yet");
  res.status(200).json({message:'Not implemented'});
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
