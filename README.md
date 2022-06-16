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
    
```bash
npm start
```

## Use the app

Then open the browser and go to http://localhost:3000/

You will access to the website where you can choose to connect with an account through France Connect authentication method.

There are three kind of accounts :
- Patient, which is the classic account of the application. He can consult his prescriptions.
- Doctor, which is the account of a doctor. He can consult the patients' prescriptions and create new ones.
- Pharmacist, which is the account of a pharmacist. He can access to a prescription through a barcode, mark a prescription as "done" or report a problem.