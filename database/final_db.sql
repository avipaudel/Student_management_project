CREATE DATABASE stmg;

USE stmg;



CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    role ENUM('admin','student','teacher') NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

DESCRIBE users;


CREATE TABLE students (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id VARCHAR(20) UNIQUE NOT NULL,

    first_name VARCHAR(50) NOT NULL,

    last_name VARCHAR(50) NOT NULL,

    gender ENUM('Male','Female','Other'),

    dob DATE,

    email VARCHAR(100),

    phone VARCHAR(15),

    address TEXT,

    department VARCHAR(100),

    semester INT,

    roll_no VARCHAR(20),

    admission_date DATE,

    guardian_name VARCHAR(100),

    guardian_phone VARCHAR(15),

    profile_image VARCHAR(255) DEFAULT 'default.png',

    user_id INT UNIQUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,


    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);

desc students;


CREATE TABLE teachers (

    id INT AUTO_INCREMENT PRIMARY KEY,

    teacher_id VARCHAR(20) UNIQUE NOT NULL,

    first_name VARCHAR(50) NOT NULL,

    last_name VARCHAR(50) NOT NULL,

    email VARCHAR(100),

    phone VARCHAR(15),

    department VARCHAR(100),

    designation VARCHAR(100),

    hire_date DATE,

    profile_image VARCHAR(255) DEFAULT 'default.png',

    user_id INT UNIQUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,


    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);


CREATE TABLE courses (

    id INT AUTO_INCREMENT PRIMARY KEY,

    course_code VARCHAR(20) UNIQUE NOT NULL,

    course_name VARCHAR(100) NOT NULL,

    department VARCHAR(100),

    semester INT,

    credits INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



CREATE TABLE enrollments (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT NOT NULL,

    course_id INT NOT NULL,

    enrollment_date DATE DEFAULT (CURRENT_DATE),

    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE,

    FOREIGN KEY (course_id)
    REFERENCES courses(id)
    ON DELETE CASCADE

);



INSERT INTO users
(
    full_name,
    email,
    password,
    role
)
VALUES
(
    'Admin User',
    'admin@gmail.com',
    'admin123',
    'admin'
);


INSERT INTO users
(
    full_name,
    email,
    password,
    role
)
VALUES

(
    'Ram Sharma',
    'ram@gmail.com',
    'ram123',
    'student'
),

(
    'Sita Thapa',
    'sita@gmail.com',
    'sita123',
    'student'
);

INSERT INTO students
(
    student_id,
    first_name,
    last_name,
    gender,
    dob,
    email,
    phone,
    address,
    department,
    semester,
    roll_no,
    admission_date,
    guardian_name,
    guardian_phone,
    profile_image,
    user_id
)
VALUES

(
    'ST001',
    'Ram',
    'Sharma',
    'Male',
    '2004-05-12',
    'ram@gmail.com',
    '9800000001',
    'Kathmandu',
    'Computer Engineering',
    5,
    'CE001',
    '2023-09-01',
    'Hari Sharma',
    '9800000011',
    'default.png',
    2
),

(
    'ST002',
    'Sita',
    'Thapa',
    'Female',
    '2004-08-20',
    'sita@gmail.com',
    '9800000002',
    'Pokhara',
    'Computer Engineering',
    5,
    'CE002',
    '2023-09-01',
    'Ram Thapa',
    '9800000022',
    'default.png',
    3
);

INSERT INTO users
(
    full_name,
    email,
    password,
    role
)
VALUES

(
    'John Smith',
    'john@gmail.com',
    'john123',
    'teacher'
),

(
    'Emily Brown',
    'emily@gmail.com',
    'emily123',
    'teacher'
);
INSERT INTO teachers
(
    teacher_id,
    first_name,
    last_name,
    email,
    phone,
    department,
    designation,
    hire_date,
    profile_image,
    user_id
)
VALUES

(
    'T001',
    'John',
    'Smith',
    'john@gmail.com',
    '9800000101',
    'Computer Engineering',
    'Lecturer',
    '2022-01-10',
    'default.png',
    4
),

(
    'T002',
    'Emily',
    'Brown',
    'emily@gmail.com',
    '9800000102',
    'Computer Engineering',
    'Assistant Professor',
    '2021-05-15',
    'default.png',
    5
);


INSERT INTO courses
(
    course_code,
    course_name,
    department,
    semester,
    credits
)
VALUES

(
    'CT401',
    'Web Technology',
    'Computer Engineering',
    5,
    3
),

(
    'CT402',
    'Database Management System',
    'Computer Engineering',
    5,
    3
),

(
    'CT403',
    'Operating System',
    'Computer Engineering',
    5,
    3
);

SELECT id,student_id FROM students;

SELECT id,course_code FROM courses;


INSERT INTO enrollments
(
    student_id,
    course_id
)
VALUES

(1,1),
(1,2),
(2,1),
(2,3);



SELECT id, full_name, email, role FROM users;

INSERT INTO users
(
    full_name,
    email,
    password,
    role
)
VALUES

('Amit Karki','amit@gmail.com','amit123','student'),
('Bikash Rai','bikash@gmail.com','bikash123','student'),
('Nisha Shrestha','nisha@gmail.com','nisha123','student'),
('Pooja Gurung','pooja@gmail.com','pooja123','student'),
('Suman Adhikari','suman@gmail.com','suman123','student');



INSERT INTO students
(
    student_id,
    first_name,
    last_name,
    gender,
    dob,
    email,
    phone,
    address,
    department,
    semester,
    roll_no,
    admission_date,
    guardian_name,
    guardian_phone,
    profile_image,
    user_id
)
VALUES

(
'ST003',
'Amit',
'Karki',
'Male',
'2004-03-15',
'amit@gmail.com',
'9800000003',
'Bhaktapur',
'Computer Engineering',
5,
'CE003',
'2023-09-01',
'Ramesh Karki',
'9800000033',
'default.png',
6
),

(
'ST004',
'Bikash',
'Rai',
'Male',
'2004-11-22',
'bikash@gmail.com',
'9800000004',
'Lalitpur',
'Computer Engineering',
5,
'CE004',
'2023-09-01',
'Deepak Rai',
'9800000044',
'default.png',
7
),

(
'ST005',
'Nisha',
'Shrestha',
'Female',
'2005-01-10',
'nisha@gmail.com',
'9800000005',
'Kathmandu',
'Computer Engineering',
5,
'CE005',
'2023-09-01',
'Sunil Shrestha',
'9800000055',
'default.png',
8
),

(
'ST006',
'Pooja',
'Gurung',
'Female',
'2004-07-18',
'pooja@gmail.com',
'9800000006',
'Pokhara',
'Computer Engineering',
5,
'CE006',
'2023-09-01',
'Manoj Gurung',
'9800000066',
'default.png',
9
),

(
'ST007',
'Suman',
'Adhikari',
'Male',
'2004-12-05',
'suman@gmail.com',
'9800000007',
'Chitwan',
'Computer Engineering',
5,
'CE007',
'2023-09-01',
'Krishna Adhikari',
'9800000077',
'default.png',
10
);


INSERT INTO users
(
    full_name,
    email,
    password,
    role
)
VALUES

('Michael Johnson','michael@gmail.com','michael123','teacher'),
('Sarah Wilson','sarah@gmail.com','sarah123','teacher'),
('David Miller','david@gmail.com','david123','teacher'),
('Emma Davis','emma@gmail.com','emma123','teacher'),
('Robert Taylor','robert@gmail.com','robert123','teacher');




INSERT INTO teachers
(
    teacher_id,
    first_name,
    last_name,
    email,
    phone,
    department,
    designation,
    hire_date,
    profile_image,
    user_id
)
VALUES

(
'T003',
'Michael',
'Johnson',
'michael@gmail.com',
'9800000203',
'Computer Engineering',
'Lecturer',
'2020-03-12',
'default.png',
11
),

(
'T004',
'Sarah',
'Wilson',
'sarah@gmail.com',
'9800000204',
'Computer Engineering',
'Assistant Professor',
'2019-07-20',
'default.png',
12
),

(
'T005',
'David',
'Miller',
'david@gmail.com',
'9800000205',
'Computer Engineering',
'Lecturer',
'2021-01-15',
'default.png',
13
),

(
'T006',
'Emma',
'Davis',
'emma@gmail.com',
'9800000206',
'Computer Engineering',
'Professor',
'2018-05-25',
'default.png',
14
),

(
'T007',
'Robert',
'Taylor',
'robert@gmail.com',
'9800000207',
'Computer Engineering',
'Lecturer',
'2022-09-10',
'default.png',
15
);



SELECT 
id,
student_id,
first_name,
last_name,
user_id
FROM students;


SELECT 
id,
teacher_id,
first_name,
last_name,
user_id
FROM teachers;



SELECT id, student_id, first_name, last_name FROM students;

SELECT id, course_code, course_name FROM courses;



INSERT INTO enrollments
(
    student_id,
    course_id,
    enrollment_date
)
VALUES
-- Ram Sharma
(1,1,'2026-01-10'),
(1,2,'2026-01-10'),
(1,3,'2026-01-10'),
-- Sita Thapa
(2,1,'2026-01-10'),
(2,3,'2026-01-10'),
-- Amit Karki
(5,1,'2026-01-10'),
(5,2,'2026-01-10'),
-- Bikash Rai
(6,2,'2026-01-10'),
(6,3,'2026-01-10'),
-- Nisha Shrestha
(7,1,'2026-01-10'),
(7,2,'2026-01-10'),
(7,3,'2026-01-10'),
-- Pooja Gurung
(8,1,'2026-01-10'),
(8,3,'2026-01-10'),
-- Suman Adhikari
(9,2,'2026-01-10'),
(9,3,'2026-01-10');


SELECT
    s.student_id,
    CONCAT(s.first_name,' ',s.last_name) AS student_name,
    c.course_code,
    c.course_name
FROM enrollments e

JOIN students s
ON e.student_id = s.id

JOIN courses c
ON e.course_id = c.id;


use stmg;
SELECT * FROM users

SELECT * FROM students;

SELECT 
    id,
    student_id,
    first_name,
    user_id
FROM students
WHERE first_name='Ram';



SELECT *
FROM enrollments
WHERE student_id = 1;

SELECT 
    c.*
FROM courses c

JOIN enrollments e
ON c.id = e.course_id

JOIN students s
ON e.student_id = s.id

WHERE s.user_id = 2;

use stmg;

show TABLES;

CREATE TABLE attendance (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT NOT NULL,

    course_id INT NOT NULL,

    attendance_date DATE NOT NULL,

    status ENUM('Present','Absent','Late') NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE,


    FOREIGN KEY (course_id)
    REFERENCES courses(id)
    ON DELETE CASCADE

);

INSERT INTO attendance
(
    student_id,
    course_id,
    attendance_date,
    status
)
VALUES
-- Ram Sharma
(1,1,'2026-08-01','Present'),
(1,2,'2026-08-01','Present'),
(1,3,'2026-08-01','Absent'),
(1,1,'2026-08-02','Present'),
(1,2,'2026-08-02','Late'),
(1,3,'2026-08-02','Present'),
(1,1,'2026-08-03','Absent'),
(1,2,'2026-08-03','Present'),
(1,3,'2026-08-03','Present'),
-- Sita Thapa
(2,1,'2026-08-01','Present'),
(2,3,'2026-08-01','Late'),
(2,1,'2026-08-02','Absent'),
(2,3,'2026-08-02','Present'),
-- Amit Karki
(5,1,'2026-08-01','Present'),
(5,2,'2026-08-01','Present'),
(5,1,'2026-08-02','Late'),
(5,2,'2026-08-02','Present'),
-- Bikash Rai
(6,2,'2026-08-01','Absent'),
(6,3,'2026-08-01','Present'),
(6,2,'2026-08-02','Present'),
(6,3,'2026-08-02','Late'),
-- Nisha Shrestha
(7,1,'2026-08-01','Present'),
(7,2,'2026-08-01','Present'),
(7,3,'2026-08-01','Present'),
(7,1,'2026-08-02','Late'),
-- Pooja Gurung
(8,1,'2026-08-01','Absent'),
(8,3,'2026-08-01','Present'),
(8,1,'2026-08-02','Present'),
(8,3,'2026-08-02','Present'),
-- Suman Adhikari
(9,2,'2026-08-01','Present'),
(9,3,'2026-08-01','Late'),
(9,2,'2026-08-02','Present'),
(9,3,'2026-08-02','Absent');



SELECT 
    a.id,
    s.first_name,
    s.last_name,
    c.course_name,
    a.attendance_date,
    a.status
FROM attendance a

JOIN students s
ON a.student_id = s.id

JOIN courses c
ON a.course_id = c.id

ORDER BY a.attendance_date DESC;

use stmg;
show TABLEs


CREATE TABLE results (

    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id INT NOT NULL,

    course_id INT NOT NULL,

    marks INT NOT NULL,

    grade VARCHAR(5),

    exam_date DATE NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE,


    FOREIGN KEY (course_id)
    REFERENCES courses(id)
    ON DELETE CASCADE

);

DESC results;




INSERT INTO results
(
    student_id,
    course_id,
    marks,
    grade,
    exam_date
)
VALUES
(1,1,85,'A','2026-08-05'),
(1,2,78,'B+','2026-08-05'),
(1,3,92,'A+','2026-08-05'),
(2,1,74,'B','2026-08-05'),
(2,2,88,'A','2026-08-05'),
(2,3,81,'A','2026-08-05'),
(5,1,69,'B','2026-08-05'),
(5,2,76,'B+','2026-08-05'),
(6,2,90,'A+','2026-08-05'),
(6,3,72,'B','2026-08-05'),
(7,1,95,'A+','2026-08-05'),
(7,3,89,'A','2026-08-05'),
(8,1,82,'A','2026-08-05'),
(8,2,79,'B+','2026-08-05'),
(9,2,67,'B','2026-08-05'),
(9,3,86,'A','2026-08-05');


use stmg;
SELECT id, student_id, first_name, user_id
FROM students;


SELECT *
FROM results;


SELECT

    results.id,
    courses.course_code,
    courses.course_name,
    results.marks,
    results.grade,
    results.exam_date

FROM results

JOIN students
ON results.student_id = students.id

JOIN courses
ON results.course_id = courses.id

WHERE students.user_id = 2;



SELECT * FROM users;

use stmg;
DESC teachers;


DESC courses


ALTER TABLE courses
ADD COLUMN teacher_id INT AFTER credits;


ALTER TABLE courses
ADD CONSTRAINT fk_course_teacher
FOREIGN KEY (teacher_id)
REFERENCES teachers(id)
ON DELETE SET NULL;




SELECT id, teacher_id, first_name, last_name, user_id
FROM teachers;



UPDATE courses
SET teacher_id = 1
WHERE id IN (1,2);


UPDATE courses
SET teacher_id = 2
WHERE id = 3;



SELECT 
    c.course_name,
    t.first_name,
    t.last_name

FROM courses c

JOIN teachers t

ON c.teacher_id = t.id;




SELECT id, teacher_id, first_name, last_name, user_id
FROM teachers;



SELECT id, course_name, teacher_id
FROM courses;



SELECT * FROM results;

ALTER TABLE results
ADD UNIQUE(student_id, course_id);

show tables;

SELECT * FROM teachers


SELECT * FROM students


SELECT * FROM attendance;



SELECT 

results.id,
results.student_id,
students.user_id,
students.first_name

FROM results

JOIN students

ON results.student_id = students.id;


use stmg;


show tables;