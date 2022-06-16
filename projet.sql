drop database if exists db_medicontech;
CREATE DATABASE db_medicontech;
use db_medicontech;

/*Create Tables*/

CREATE TABLE Postal_address(
   Id_Postal_address INT NOT NULL AUTO_INCREMENT,
   door_number VARCHAR(50),
   number VARCHAR(50),
   road VARCHAR(100),
   zip_code VARCHAR(50),
   town VARCHAR(50),
   country VARCHAR(50),
   PRIMARY KEY(Id_Postal_address)
);

CREATE TABLE Drug(
   Id_Drug INT NOT NULL,
   drug_name VARCHAR(50),
   drug_format VARCHAR(50),
   drug_application VARCHAR(50),
   autorisation_status VARCHAR(50),
   comercialised VARCHAR(50),
   warning_stock BOOLEAN,
   comercialised_by VARCHAR(100),
   drug_price DECIMAL(15,2),
   reimbursement_rate DECIMAL(15,2),
   PRIMARY KEY(Id_Drug)
);

CREATE TABLE Service(
   Id_Service INT NOT NULL AUTO_INCREMENT,
   service_name VARCHAR(50),
   PRIMARY KEY(Id_Service)
);

CREATE TABLE Mutual_insurance(
   Id_Mutual_insurance INT NOT NULL AUTO_INCREMENT,
   mutual_name VARCHAR(50),
   PRIMARY KEY(Id_Mutual_insurance)
);

CREATE TABLE Speciality(
   Id_Speciality INT NOT NULL AUTO_INCREMENT,
   speciality_name VARCHAR(50),
   PRIMARY KEY(Id_Speciality)
);

CREATE TABLE Person(
   Id_Person INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   birth_date DATE NOT NULL,
   email_address VARCHAR(50),
   password TEXT,
   Id_Postal_address INT NOT NULL,
   PRIMARY KEY(Id_Person),
   FOREIGN KEY(Id_Postal_address) REFERENCES Postal_address(Id_Postal_address)
);

CREATE TABLE Pharmacist(
   Id_Pharmacist INT NOT NULL AUTO_INCREMENT,
   Id_Person INT NOT NULL,
   PRIMARY KEY(Id_Pharmacist),
   FOREIGN KEY(Id_Person) REFERENCES Person(Id_Person)
);

CREATE TABLE Doctor(
   Id_Doctor INT NOT NULL AUTO_INCREMENT,
   Id_Person INT NOT NULL,
   PRIMARY KEY(Id_Doctor),
   FOREIGN KEY(Id_Person) REFERENCES Person(Id_Person)
);

CREATE TABLE Patient(
   Id_Patient INT NOT NULL AUTO_INCREMENT,
   Id_tutor INT,
   social_security_number VARCHAR(50),
   Id_Mutual_insurance INT,
   Id_Person INT NOT NULL,
   PRIMARY KEY(Id_Patient),
   FOREIGN KEY(Id_Mutual_insurance) REFERENCES Mutual_insurance(Id_Mutual_insurance),
   FOREIGN KEY(Id_Person) REFERENCES Person(Id_Person)
);

CREATE TABLE Prescription(
   Id_Prescription INT NOT NULL AUTO_INCREMENT,
   creation_date DATE,
   expiration_date DATE,
   date_of_use DATE,
   frequency_of_reuse INT,
   number_of_reuses INT,
   used BOOLEAN,
   validity BOOLEAN,
   note TEXT,
   reported BOOLEAN,
   report_note TEXT,
   Id_Doctor INT NOT NULL,
   Id_Patient INT NOT NULL,
   PRIMARY KEY(Id_Prescription),
   FOREIGN KEY(Id_Doctor) REFERENCES Doctor(Id_Doctor),
   FOREIGN KEY(Id_Patient) REFERENCES Patient(Id_Patient)
);

CREATE TABLE assigned_doctor(
   Id_Doctor INT,
   Id_Patient INT,
   PRIMARY KEY(Id_Doctor, Id_Patient),
   FOREIGN KEY(Id_Doctor) REFERENCES Doctor(Id_Doctor),
   FOREIGN KEY(Id_Patient) REFERENCES Patient(Id_Patient)
);

CREATE TABLE Pharmacy_item(
   Id_Pharmacist INT,
   Id_Drug INT,
   quantity INT,
   PRIMARY KEY(Id_Pharmacist, Id_Drug),
   FOREIGN KEY(Id_Pharmacist) REFERENCES Pharmacist(Id_Pharmacist),
   FOREIGN KEY(Id_Drug) REFERENCES Drug(Id_Drug)
);

CREATE TABLE Prescription_drug(
   Id_Prescription INT,
   Id_Drug INT,
   quantity VARCHAR(50),
   PRIMARY KEY(Id_Prescription, Id_Drug),
   FOREIGN KEY(Id_Prescription) REFERENCES Prescription(Id_Prescription),
   FOREIGN KEY(Id_Drug) REFERENCES Drug(Id_Drug)
);

CREATE TABLE Doctor_service(
   Id_Doctor INT,
   Id_Service INT,
   service_price DECIMAL(15,2),
   PRIMARY KEY(Id_Doctor, Id_Service),
   FOREIGN KEY(Id_Doctor) REFERENCES Doctor(Id_Doctor),
   FOREIGN KEY(Id_Service) REFERENCES Service(Id_Service)
);

CREATE TABLE Doctor_speciality(
   Id_Doctor INT,
   Id_Speciality INT,
   PRIMARY KEY(Id_Doctor, Id_Speciality),
   FOREIGN KEY(Id_Doctor) REFERENCES Doctor(Id_Doctor),
   FOREIGN KEY(Id_Speciality) REFERENCES Speciality(Id_Speciality)
);

CREATE TABLE Prescription_service(
   Id_Prescription INT,
   Id_Service INT,
   quantity VARCHAR(50),
   PRIMARY KEY(Id_Prescription, Id_Service),
   FOREIGN KEY(Id_Prescription) REFERENCES Prescription(Id_Prescription),
   FOREIGN KEY(Id_Service) REFERENCES Service(Id_Service)
);

/*Insert Fictive Values For Testing TODO*/
INSERT INTO Postal_address(number, road, zip_code, town, country) VALUES
(15,"Chemin de la Vallée",27500,"Saint-Symphorien","France"),
(35,"Route de Rouen",27140,"Gisors","France"),
(23,"Rue du Prieurs",27110,"Le Neubourg","France"),
(6,"Route de Balines",27130,"Piseux","France"),
(8,"Lotissement les Longues Pieces",27810,"Marcilly-sur-Eure","France"),
(29,"Impasse des Frêines",27500,"Pont-Audemer","France"),
(437,"Le Mont Crocq",27500,"Triqueville","France"),
(4,"Ruelle aux Loups",27700,"Frenelles-en-Vexin","France"),
(9,"Lotissement La Torse Rue",27260,"Cormeilles","France"),
(8,"Rue des Marronniers",27000,"Evreux","France"),
(38,"Rue du Commandant Le Foll",27210,"Beuzeville","France"),
(1,"Place des Tilleuls",27320,"La Madeleine-de-Nonancourt","France"),
(32,"Route de la Vallee",27390,"Saint-Pierre-de-Cerniéres","France"),
(1,"Rue de la Troesne",27140,"Gisors","France"),
(9,"Impasse de la Forêt",27430,"Saint-Etienne-du-Vauvray","France"),
(116,"Rue de la Briqueterie Duval",27210,"Beuzeville","France"),
(34,"Le Village",27800,"La Haye-de-Calleville","France"),
(3,"Chemin du Roi",27590,"Pîtres","France"),
(17,"Rue Rembrandt",27950,"Saint-Marcel","France"),
(12,"Rue des Bruyéres",27780,"Garennes-sur-Eure","France"),
(36,"Chemin des Bouchers",51000,"Reims","France"),
(37,"Boulevard John Fitzgerald Kennedy",51000,"Châlons-en-Champagne","France"),
(19,"Rue Pierre Curie",51480,"Damery","France"),
(2,"Rue du Général de Mitry",51700,"Igny-Comblizy","France"),
(7,"Rue Saint-Julien",51530,"Pierry","France"),
(32,"Boulevard des Fossés de Ronde",51150,"Ambonnay","France"),
(16,"Rue d'écueil",51500,"Villers-aux-Noeuds","France"),
(8,"Rue de la Mairie",51500,"Sacy","France"),
(25,"Rue Belin",51000,"Reims","France"),
(23,"Rue Alfred Nobel",51200,"Epernay","France"),
(3,"Rue Alexandre Dumas",51110,"Bazancourt","France"),
(11,"Rue de l'église",51290,"Outines","France"),
(62,"Rue de Châlons",51260,"Anglure","France"),
(11,"Rue de la Halle",51150,"Tours-sur-Marne","France"),
(54,"Rue Gabriel Lippmann",51430,"Bezannes","France"),
(35,"Rue Thiers",51000,"Reims","France"),
(13,"Rue de Châtillon",51290,"Giffaumont-Champaubert","France"),
(13,"Rue de la Grangette",51800,"Sainte-Menehould","France"),
(7,"Impasse de la Croix Saint-Jean",51480,"Boursault","France"),
(20,"Impasse des Sorbiers",51510,"Saint-Gibrien","France");

INSERT INTO Postal_address(door_number, number, road, zip_code, town, country) VALUES
(12,106,"Avenue Philippe Auguste",75011,"Paris","France"),
(15,12,"Rue d'Aligre",75012,"Paris","France"),
(8,96,"Rue de Reuilly",75012,"Paris","France"),
(6,99,"Rue de Reuilly",75012,"Paris","France"),
(4,54,"Rue Lemercier",75017,"Paris","France"),
(13,193,"Rue de Belleville",75019,"Paris","France"),
(26,116,"Rue de Lourmel",75015,"Paris","France"),
(51,27,"Rue de Terre-Neuve",75020,"Paris","France"),
(10,32,"Rue Viala",75015,"Paris","France"),
(13,27,"Rue Fortuny",75017,"Paris","France"),
(22,57,"Rue Docteur Blanche",75016,"Paris","France"),
(41,8,"Rue des Nanettes",75011,"Paris","France"),
(1,14,"Boulevard Lefebvre",75015,"Paris","France"),
(1,5,"Rue Bellini",75016,"Paris","France"),
(1,1,"Avenue de Taillebourg",75011,"Paris","France"),
(23,38,"Rue Vieille du Temple",75004,"Paris","France"),
(7,84,"Rue du Château",75014,"Paris","France"),
(8,3,"Rue Edouard VII",75009,"Paris","France"),
(9,59,"Avenue de la Motte-Picquet",75015,"Paris","France"),
(4,45,"Boulevard Saint-Michel",75005,"Paris","France");




/*Select Tables for Visualisation*/
