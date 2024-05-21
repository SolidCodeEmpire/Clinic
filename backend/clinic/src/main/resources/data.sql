INSERT INTO Address (apartment_number, city, country, house_number, postal_code, street) VALUES
(1, 'New York', 'USA', '10B', '10001', 'Broadway'),
(2, 'Los Angeles', 'USA', '20A', '90001', 'Hollywood Boulevard'),
(3, 'Chicago', 'USA', '30', '60601', 'Michigan Avenue'),
(4, 'Houston', 'USA', '40C', '77001', 'Main Street'),
(5, 'Miami', 'USA', '50', '33101', 'Ocean Drive'),
(6, 'San Francisco', 'USA', '60', '94101', 'Market Street'),
(7, 'Seattle', 'USA', '70', '98101', 'Pike Place'),
(8, 'Boston', 'USA', '80D', '02101', 'Beacon Street'),
(9, 'Denver', 'USA', '90', '80201', 'Larimer Street'),
(10, 'Philadelphia', 'USA', '100', '19019', 'Chestnut Street'),
(11, 'Phoenix', 'USA', '110', '85001', 'Camelback Road'),
(12, 'Atlanta', 'USA', '120', '30301', 'Peachtree Street'),
(13, 'Dallas', 'USA', '130E', '75201', 'Elm Street'),
(14, 'Detroit', 'USA', '140', '48201', 'Woodward Avenue'),
(15, 'Washington D.C.', 'USA', '150', '20001', 'Pennsylvania Avenue'),
(16, 'San Diego', 'USA', '160F', '92101', 'Gaslamp Quarter'),
(17, 'Minneapolis', 'USA', '170', '55401', 'Hennepin Avenue'),
(18, 'Austin', 'USA', '180', '78701', 'Congress Avenue'),
(19, 'Portland', 'USA', '190G', '97201', 'Burnside Street'),
(20, 'Las Vegas', 'USA', '200', '89101', 'Fremont Street');

INSERT INTO Patient (first_name, middle_name, last_name, phone_number, social_security_number, insurance_number, sex, date_of_birth, place_of_birth, status, address_id) VALUES
('John', 'Edward', 'Doe', '555-1234', 123456789, 987654321, 'MALE', '1990-05-15 00:00:00', 'New York', 'ACTIVATED', 1),
('Alice', 'Marie', 'Smith', '555-5678', 987654321, 123456782, 'FEMALE', '1985-08-20 00:00:00', 'Los Angeles', 'DEACTIVATED', 2),
('Michael', 'William', 'Johnson', '555-4321', 234567890, 234567834, 'MALE', '1978-12-10 00:00:00', 'Chicago', 'ACTIVATED', 3),
('Emily', NULL, 'Brown', '555-8765', 345678901, 345678945, 'FEMALE', '1995-03-25 00:00:00', 'Houston', 'DEACTIVATED', 4),
('Daniel', 'Joseph', 'Wilson', '555-9876', 456789012, 456789056, 'MALE', '1982-07-03 00:00:00', 'Miami', 'ACTIVATED', 5),
('Olivia', 'Elizabeth', 'Martinez', '555-2345', 567890123, 567890123, 'FEMALE', '1993-09-12 00:00:00', 'San Francisco', 'DEACTIVATED', 6),
('William', 'Alexander', 'Taylor', '555-5432', 678901234, 678901234, 'MALE', '1987-06-30 00:00:00', 'Seattle', 'ACTIVATED', 7),
('Sophia', NULL, 'Anderson', '555-7890', 789012345, 789012345, 'FEMALE', '1980-01-08 00:00:00', 'Boston', 'DEACTIVATED', 8),
('James', 'Christopher', 'Garcia', '555-6543', 890123456, 890123456, 'MALE', '1991-11-20 00:00:00', 'Denver', 'ACTIVATED', 9),
('Emma', 'Nicole', 'Hernandez', '555-8765', 901234567, 901234567, 'FEMALE', '1976-04-05 00:00:00', 'Philadelphia', 'DEACTIVATED', 10),
('Benjamin', NULL, 'Lopez', '555-9876', 123450987, 123450987, 'MALE', '1989-02-14 00:00:00', 'Phoenix', 'ACTIVATED', 11),
('Ava', 'Michelle', 'Gonzalez', '555-3456', 234567890, 234567890, 'FEMALE', '1984-10-18 00:00:00', 'Atlanta', 'DEACTIVATED', 12),
('Logan', 'David', 'Perez', '555-6543', 345678901, 345678901, 'MALE', '1979-07-22 00:00:00', 'Dallas', 'ACTIVATED', 13),
('Mia', NULL, 'Jackson', '555-8901', 456789012, 456789012, 'FEMALE', '1997-08-28 00:00:00', 'Detroit', 'DEACTIVATED', 14),
('Elijah', 'Daniel', 'Miller', '555-2345', 567890123, 567890123, 'MALE', '1983-05-17 00:00:00', 'Washington D.C.', 'ACTIVATED', 15),
('Charlotte', 'Grace', 'White', '555-4321', 678901234, 678901234, 'FEMALE', '1992-12-03 00:00:00', 'San Diego', 'DEACTIVATED', 16),
('Carter', NULL, 'Thomas', '555-7890', 789012345, 789012345, 'MALE', '1988-03-10 00:00:00', 'Minneapolis', 'ACTIVATED', 17),
('Luna', 'Olivia', 'Harris', '555-0987', 890123456, 890123456, 'FEMALE', '1981-02-27 00:00:00', 'Austin', 'DEACTIVATED', 18),
('Mateo', 'Lucas', 'Walker', '555-3210', 901234567, 901234567, 'MALE', '1994-06-09 00:00:00', 'Portland', 'ACTIVATED', 19),
('Stella', NULL, 'King', '555-8765', 123456789, 123456789, 'FEMALE', '1977-09-14 00:00:00', 'Las Vegas', 'DEACTIVATED', 20);

INSERT INTO Clinic_User (username, email, password, user_Type, is_Active) VALUES
('EmiWil', 'labsupervisor1@example.com', 'password1', 'LAB_SUPERVISOR', true),
('DanTay', 'labsupervisor2@example.com', 'password2', 'LAB_SUPERVISOR', true),
('OliJoh', 'labsupervisor3@example.com', 'password3', 'LAB_SUPERVISOR', true);

INSERT INTO Clinic_User (username, email, password, user_Type, is_Active) VALUES
('SopAnd', 'labtechnician1@example.com', 'password4', 'LAB_TECHNICIAN', true),
('LiaMar', 'labtechnician2@example.com', 'password5', 'LAB_TECHNICIAN', true),
('EmmGar', 'labtechnician3@example.com', 'password6', 'LAB_TECHNICIAN', true),
('NoaRob', 'labtechnician4@example.com', 'password7', 'LAB_TECHNICIAN', true),
('AvaLee', 'labtechnician5@example.com', 'password8', 'LAB_TECHNICIAN', true),
('WilCla', 'labtechnician6@example.com', 'password9', 'LAB_TECHNICIAN', true),
('IsaRod', 'labtechnician7@example.com', 'password10', 'LAB_TECHNICIAN', true),
('JamLew', 'labtechnician8@example.com', 'password11', 'LAB_TECHNICIAN', true),
('MiaHal', 'labtechnician9@example.com', 'password12', 'LAB_TECHNICIAN', true);

INSERT INTO Clinic_User (username, email, password, user_Type, is_Active) VALUES
('JohSmi', 'doctor1@example.com', 'password13', 'DOCTOR', true),
('EmiJoh', 'doctor2@example.com', 'password14', 'DOCTOR', true),
('MicWil', 'doctor3@example.com', 'password15', 'DOCTOR', true),
('SarBro', 'doctor4@example.com', 'password16', 'DOCTOR', true),
('DavJon', 'doctor5@example.com', 'password17', 'DOCTOR', true),
('JenMil', 'doctor6@example.com', 'password18', 'DOCTOR', true),
('MatDav', 'doctor7@example.com', 'password19', 'DOCTOR', true);

INSERT INTO Clinic_User (username, email, password, user_Type, is_Active) VALUES
('AnnTay', 'registrar1@example.com', 'password20', 'MEDICAL_REGISTRAR', true),
('ChrMar', 'registrar2@example.com', 'password21', 'MEDICAL_REGISTRAR', true),
('JesLop', 'registrar3@example.com', 'password22', 'MEDICAL_REGISTRAR', true),
('RyaGar', 'registrar4@example.com', 'password23', 'MEDICAL_REGISTRAR', true),
('AmaHer', 'registrar5@example.com', 'password24', 'MEDICAL_REGISTRAR', true);

INSERT INTO Doctor (first_name, last_name, license_number) VALUES
('John', 'Smith', '123456'),
('Emily', 'Johnson', '234567'),
('Michael', 'Williams', '345678'),
('Sarah', 'Brown', '456789'),
('David', 'Jones', '567890'),
('Jennifer', 'Miller', '678901'),
('Matthew', 'Davis', '789012');

INSERT INTO Doctor_user(id, user_id) VALUES
(1, 13),
(2, 14),
(3, 15),
(4, 16),
(5, 17),
(6, 18),
(7, 19);

INSERT INTO Medical_Registrar (first_name, last_name) VALUES
('Anna', 'Taylor'),
('Christopher', 'Martinez'),
('Jessica', 'Lopez'),
('Ryan', 'Garcia'),
('Amanda', 'Hernandez');
INSERT INTO Medical_Registrar_user(id, user_id) VALUES
(1, 20),
(2, 21),
(3, 22),
(4, 23),
(5, 24);

INSERT INTO Appointment (description, diagnosis, status, registered_date, finished_date, patient_id, medical_registrar_id, doctor_id)
VALUES
('Regular check-up', 'None', 'REGISTERED', '2024-04-25 10:00:00', NULL, 1, 1, 1),
('Dental cleaning', 'None', 'ENDED', '2024-04-25 11:00:00', '2024-06-25 11:00:00', 2, 2, 2),
('MRI scan', 'None', 'CANCELLED', '2024-04-25 12:00:00', NULL, 3, 3, 3),
('Blood test', 'Anemia', 'REGISTERED', '2024-04-25 13:00:00', NULL, 4, 4, 4),
('Physical therapy', 'Back pain', 'REGISTERED', '2024-04-25 14:00:00', NULL, 5, 5, 5),
('Eye examination', 'None', 'REGISTERED', '2024-04-25 15:00:00', NULL, 6, 1, 6),
('Vaccination', 'None', 'CANCELLED', '2024-04-26 10:00:00', NULL, 7, 2, 7),
('Ultrasound', 'Pregnancy', 'ENDED', '2024-04-26 11:00:00', '2024-06-26 11:00:00', 8, 3, 1),
('Heart check-up', 'None', 'REGISTERED', '2024-04-26 12:00:00', NULL, 9, 4, 2),
('Colonoscopy', 'None', 'REGISTERED', '2024-04-26 13:00:00', NULL, 10, 5, 3),
('Dermatology consultation', 'Rash', 'REGISTERED', '2024-04-26 14:00:00', NULL, 11, 1, 4),
('X-ray', 'Fracture', 'ENDED', '2024-04-26 15:00:00', '2024-06-26 15:00:00', 12, 2, 5),
('Counseling session', 'Depression', 'REGISTERED', '2024-04-27 10:00:00', NULL, 13, 3, 6),
('Orthopedic examination', 'Sprain', 'REGISTERED', '2024-04-27 11:00:00', NULL, 14, 4, 7),
('Endoscopy', 'None', 'ENDED', '2024-04-27 12:00:00', '2024-07-27 12:00:00', 15, 5, 1),
('Gynecology consultation', 'Irregular periods', 'REGISTERED', '2024-04-27 13:00:00', NULL, 16, 1, 2),
('Neurology consultation', 'Migraine', 'REGISTERED', '2024-04-27 14:00:00', NULL, 17, 2, 3),
('Psychiatry evaluation', 'Anxiety', 'REGISTERED', '2024-04-27 15:00:00', NULL, 18, 3, 4),
('Dietitian appointment', 'Weight loss', 'REGISTERED', '2024-04-28 10:00:00', NULL, 19, 4, 5),
('Pulmonology consultation', 'Asthma', 'REGISTERED', '2024-04-28 11:00:00', NULL, 20, 5, 6);

INSERT INTO Lab_Supervisor (first_name, last_name) VALUES
('Emily', 'Williams'),
('Daniel', 'Taylor'),
('Olivia', 'Johnson');

INSERT INTO Lab_Supervisor_user (id, user_id) VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO Lab_Technician (first_name, last_name) VALUES
('Sophia', 'Anderson'),
('Liam', 'Martinez'),
('Emma', 'Garcia'),
('Noah', 'Robinson'),
('Ava', 'Lee'),
('William', 'Clark'),
('Isabella', 'Rodriguez'),
('James', 'Lewis'),
('Mia', 'Hall');

INSERT INTO Lab_Technician_user (id, user_id) VALUES
(1, 4),
(2, 5),
(3, 6),
(4, 7),
(5, 8),
(6, 9),
(7, 10),
(8, 11),
(9, 12);

INSERT INTO Examination_Dictionary (code, examination_type, examination_name) VALUES
('BPM', 'PHYSICAL', 'Blood Pressure Measurement'),
('HRM', 'PHYSICAL', 'Heart Rate Measurement'),
('TMP', 'PHYSICAL', 'Temperature Measurement'),
('HGT', 'PHYSICAL', 'Height Measurement'),
('WGT', 'PHYSICAL', 'Weight Measurement'),
('CBC', 'LABORATORY', 'Complete Blood Count (CBC)'),
('URI', 'LABORATORY', 'Urinalysis'),
('BGT', 'LABORATORY', 'Blood Glucose Test'),
('LPT', 'LABORATORY', 'Lipid Profile Test'),
('LFT', 'LABORATORY', 'Liver Function Test');

INSERT INTO Physical_Examination (result, appointment_id, examination_dictionary_code) VALUES
('120/80 mmHg', 1, 'BPM'),
('75 bpm', 2, 'HRM'),
('37.0°C', 3, 'TMP'),
('180 cm', 4, 'HGT'),
('75 kg', 5, 'WGT'),
('122/82 mmHg', 6, 'BPM'),
('73 bpm', 7, 'HRM'),
('37.2°C', 8, 'TMP'),
('178 cm', 9, 'HGT'),
('76 kg', 10, 'WGT');

INSERT INTO Laboratory_Examination (doctors_notes, order_date, result, finished_date, appointment_id, status, lab_technician_id, lab_supervisor_id, examination_dictionary_code, validation_date, supervisors_notes) VALUES
('Within normal range.', '2024-04-25 10:00:00', 'Normal', '2024-04-25 10:30:00', 1, 'DONE', 1, 1, 'CBC', '2024-04-25 11:00:00', 'All results look good.'),
('No abnormalities detected.', '2024-04-25 11:00:00', 'Normal', '2024-04-25 11:45:00', 2, 'DONE', 2, 2, 'URI', '2024-04-25 12:15:00', 'Patient is healthy.'),
('Normal blood sugar levels.', '2024-04-25 12:00:00', 'Normal', '2024-04-25 12:45:00', 3, 'DONE', 3, 3, 'BGT', '2024-04-25 13:30:00', 'Patient has good glucose levels.'),
('Results consistent with healthy liver function.', '2024-04-25 13:00:00', 'Normal', '2024-04-25 13:30:00', 4, 'DONE', 4, 1, 'LFT', '2024-04-25 14:00:00', 'Liver function appears normal.'),
('Normal lipid profile.', '2024-04-25 14:00:00', 'Normal', '2024-04-25 14:45:00', 5, 'DONE', 5, 2, 'LPT', '2024-04-25 15:15:00', 'Patient has a healthy lipid profile.'),
('Within normal range.', '2024-04-26 10:00:00', 'Normal', '2024-04-26 10:30:00', 6, 'DONE', 6, 3, 'CBC', '2024-04-26 11:00:00', 'All results are within expected range.'),
('No abnormalities detected.', '2024-04-26 11:00:00', 'Normal', '2024-04-26 11:45:00', 7, 'DONE', 7, 1, 'URI', '2024-04-26 12:15:00', 'Patient is in good health.'),
('Normal blood sugar levels.', '2024-04-26 12:00:00', 'Normal', '2024-04-26 12:45:00', 8, 'DONE', 8, 2, 'BGT', '2024-04-26 13:30:00', 'Patient has optimal blood glucose levels.'),
('Results consistent with healthy liver function.', '2024-04-26 13:00:00', 'Normal', '2024-04-26 13:30:00', 9, 'DONE', 9, 3, 'LFT', '2024-04-26 14:00:00', 'Liver function looks good.'),
('Normal lipid profile.', '2024-04-26 14:00:00', 'Normal', '2024-04-26 14:45:00', 10, 'DONE', 1, 1, 'LPT', '2024-04-26 15:15:00', 'Patient has healthy lipid levels.');
