
use db_medicontech;
/*Select Tables for Visualisation*/

SELECT * FROM postal_address;
SELECT * FROM Speciality;
SELECT * FROM Person;
SELECT * FROM Mutual_insurance;
SELECT * FROM Patient;
SELECT * FROM Drug;

SELECT * FROM Person WHERE Id_Person IN (3,4,9,20,21,25,28,30);

SELECT Person.first_name, Person.last_name, Person.phone, Person.email_address, Person.Id_Person FROM `Doctor` JOIN `Person` ON Person.Id_Person = Doctor.Id_Person;