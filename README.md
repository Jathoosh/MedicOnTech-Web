# MedicOnTech-Web
MedicOnTech : Partie site Web du Solution Factory 2022

## Prerequisites

This server use [nodejs version 16.14.2](https://nodejs.org/en/download/).

## Install
    
```bash
git clone git@github.com:Jathoosh/MedicOnTech-Web.git
cd MedicOnTech-Web
npm install
```

## Run the app (as dev)

In the file .data_db (available only on local) you need to modify Username and Password (and Port in some case) to connect to the database.

If you are running as dev (on local) you will need to launch Initialisation.sql file on your DBMS (Data Base Management System).

Also, as dev you will need to launch start_server.bat, a file which allows to start two servers, one for the main website, the otherone for France Connect, as a bridge website, (as we are in developping phase, France Connect connexion ID, public and private, are both for demonstration and integration purpose)

If, for any reason, you do not want to use start_server.bat file, you will need to be on the correct repertory and type :

```bash
npm start
```

## Use the app

Then open the browser and go to http://localhost:3030/

You will have an access to the website where you can choose to connect with an account through France Connect authentication method or alternative method, with a mail and a password (mainly for professional but also for some patients that, for any reason, do not have the possibility to use FC).

There are three kind of accounts :
- Patient, which is the classic account of the application. He can consult his prescriptions.
- Doctor, which is the account of a doctor. He can consult the patients' prescriptions and create new ones.
- Pharmacist, which is the account of a pharmacist. He can access to a prescription through a barcode, mark a prescription as "done" or report a problem.
