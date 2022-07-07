use db_medicontech;
/*Select Tables for Visualisation*/

SELECT * FROM postal_address; /*bon*/
SELECT * FROM Speciality; /*bon*/
SELECT * FROM Person; /*bon*/
SELECT * FROM Mutual_insurance; /*bon*/
SELECT * FROM Patient; /*bon*/
SELECT * FROM Drug; /*bon*/
SELECT * FROM assigned_doctor; /*bon*/	
SELECT * FROM doctor; /*bon*/
SELECT * FROM doctor_service;
SELECT * FROM doctor_speciality; /*bon*/
SELECT * FROM pharmacist; /*bon*/
SELECT * FROM pharmacy_item;
SELECT * FROM prescription; /*bon*/
SELECT * FROM prescription_drug; /*bon*/
SELECT * FROM prescription_service; /*bon*/
SELECT * FROM professional; /*bon*/
SELECT * FROM service; /*bon*/
SELECT * from speciality; /*bon*/



-- DROP TABLE IF EXISTS postal_address;
-- DROP TABLE IF EXISTS Speciality;
-- DROP TABLE IF EXISTS Person;
-- DROP TABLE IF EXISTS Mutual_insurance;
-- DROP TABLE IF EXISTS Patient;
-- DROP TABLE IF EXISTS Drug;
-- DROP TABLE IF EXISTS assigned_doctor;
-- DROP TABLE IF EXISTS doctor;
-- DROP TABLE IF EXISTS doctor_service;
-- DROP TABLE IF EXISTS doctor_speciality;
-- DROP TABLE IF EXISTS pharmacist;
-- DROP TABLE IF EXISTS pharmacy_item;
-- DROP TABLE IF EXISTS prescription;
-- DROP TABLE IF EXISTS prescription_drug;
-- DROP TABLE IF EXISTS prescription_service;
-- DROP TABLE IF EXISTS professional;
-- DROP TABLE IF EXISTS service;
-- DROP TABLE IF EXISTS speciality;

SELECT person.*, patient.Id_Patient, prescription.*, drug.*, doctor_infos.email_address doctor_mail, doctor_infos.first_name doctor_first, doctor_infos.last_name doctor_last, doctor_infos.phone doctor_phone, professional.workplace_name, speciality.speciality_name, postal_address.* from prescription JOIN patient USING (Id_Patient) JOIN person USING (Id_Person) right join prescription_drug Using (Id_Prescription) join drug using (Id_Drug) join doctor Using (Id_Doctor) Join professional on doctor.Id_Person = professional.Id_Person Join person as doctor_infos On professional.Id_Person = doctor_infos.Id_Person Join postal_address on doctor_infos.Id_Postal_address = postal_address.Id_Postal_address join doctor_speciality using(Id_Doctor) join speciality using(Id_Speciality) WHERE Id_Prescription = 1 and Id_Patient = 1