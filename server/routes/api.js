const express = require('express')
const router = express.Router()

const {Sequelize} = require('sequelize');
const { status } = require('express/lib/response');

//Attention la table utilisé ici est db_tp5 (avec articles et users à l'intérieur)
const sequelize = new Sequelize("db_MedicOnTech","Machin","MdpOfMachin", //Veuillez mettre le mot de passe de la base de donnée
{
  dialect: "mysql",
  host: "localhost",
  port: 3307 // Changer le port si vous utilisez un autre port que 3306

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

module.exports = router
