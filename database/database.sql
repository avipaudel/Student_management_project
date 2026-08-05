CREATE DATABASE student_management_system;
USE student_management_system;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,

    student_id VARCHAR(20) NOT NULL UNIQUE,

    first_name VARCHAR(50) NOT NULL,

    last_name VARCHAR(50) NOT NULL,

    gender ENUM('Male','Female','Other') NOT NULL,

    dob DATE NOT NULL,

    email VARCHAR(100) UNIQUE,

    phone VARCHAR(15),

    address TEXT,

    department VARCHAR(100),

    semester INT,

    roll_no VARCHAR(20),

    admission_date DATE,

    guardian_name VARCHAR(100),

    guardian_phone VARCHAR(15),

    profile_image VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO users(full_name,email,password)
VALUES
(
'Administrator',
'admin@gmail.com',
'admin123'
);


SHOW TABLES;

SELECT * FROM users;

SELECT * FROM students;


CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    semester INT,
    credits INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);



CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id VARCHAR(20) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    department VARCHAR(50),
    designation VARCHAR(50),
    hire_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE teacher_courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT,
    course_id INT,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    status ENUM('Present','Absent','Late') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE,

    UNIQUE(student_id, course_id, attendance_date)
);

CREATE TABLE results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    teacher_id INT NOT NULL,
    semester INT NOT NULL,
    internal_marks DECIMAL(5,2),
    final_marks DECIMAL(5,2),
    total_marks DECIMAL(5,2),
    grade VARCHAR(2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY(teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);



DESCRIBE users;

SHOW COLUMNS FROM users;


SELECT id, email, password FROM users;



INSERT INTO users (full_name, email, password, role) VALUES
('Admin User', 'admin@studentms.com', 'admin123', 'admin'),
('System Manager', 'manager@studentms.com', 'manager123', 'admin'),
('John Administrator', 'john.admin@studentms.com', 'password123', 'admin'),
('Sarah Admin', 'sarah.admin@studentms.com', 'password123', 'admin'),
('David Admin', 'david.admin@studentms.com', 'password123', 'admin'),
('Michael Admin', 'michael.admin@studentms.com', 'password123', 'admin'),
('Emily Admin', 'emily.admin@studentms.com', 'password123', 'admin'),
('Robert Admin', 'robert.admin@studentms.com', 'password123', 'admin'),
('Linda Admin', 'linda.admin@studentms.com', 'password123', 'admin'),
('James Admin', 'james.admin@studentms.com', 'password123', 'admin');



INSERT INTO students 
(student_id, first_name, last_name, gender, dob, email, phone, address, department, semester, roll_no, admission_date, guardian_name, guardian_phone, profile_image)
VALUES

('STU001','Aarav','Sharma','Male','2004-05-15','aarav@gmail.com','9800000001','Kathmandu','Computer Science',5,'CS001','2022-08-10','Raj Sharma','9811111111','default.png'),

('STU002','Anisha','Karki','Female','2005-03-20','anisha@gmail.com','9800000002','Pokhara','Information Technology',3,'IT002','2023-08-12','Hari Karki','9811111112','default.png'),

('STU003','Bibek','Thapa','Male','2004-11-10','bibek@gmail.com','9800000003','Lalitpur','Computer Science',5,'CS003','2022-08-10','Ram Thapa','9811111113','default.png'),

('STU004','Sita','Gurung','Female','2005-01-25','sita@gmail.com','9800000004','Bhaktapur','Software Engineering',3,'SE004','2023-08-12','Maya Gurung','9811111114','default.png'),

('STU005','Rohan','Shrestha','Male','2004-07-08','rohan@gmail.com','9800000005','Kathmandu','Computer Science',7,'CS005','2021-08-15','Kamal Shrestha','9811111115','default.png'),

('STU006','Priya','Rai','Female','2005-09-18','priya@gmail.com','9800000006','Dharan','Information Technology',3,'IT006','2023-08-12','Suman Rai','9811111116','default.png'),

('STU007','Nabin','Adhikari','Male','2004-02-12','nabin@gmail.com','9800000007','Chitwan','Electronics',5,'EC007','2022-08-10','Bishnu Adhikari','9811111117','default.png'),

('STU008','Riya','Shah','Female','2005-06-30','riya@gmail.com','9800000008','Biratnagar','Software Engineering',3,'SE008','2023-08-12','Anil Shah','9811111118','default.png'),

('STU009','Sagar','Poudel','Male','2004-12-05','sagar@gmail.com','9800000009','Butwal','Computer Science',7,'CS009','2021-08-15','Hari Poudel','9811111119','default.png'),

('STU010','Kiran','Bhandari','Male','2005-04-22','kiran@gmail.com','9800000010','Pokhara','Information Technology',3,'IT010','2023-08-12','Mohan Bhandari','9811111120','default.png');




INSERT INTO courses
(course_code, course_name, department, semester, credits)
VALUES

('CS101','Database Management System','Computer Science',5,4),

('CS102','Operating System','Computer Science',5,3),

('CS103','Data Structure','Computer Science',3,4),

('IT101','Web Technology','Information Technology',3,3),

('IT102','Computer Network','Information Technology',5,4),

('SE101','Software Engineering','Software Engineering',3,3),

('SE102','Mobile Application Development','Software Engineering',5,4),

('EC101','Digital Logic','Electronics',3,3),

('CS201','Artificial Intelligence','Computer Science',7,4),

('IT201','Cloud Computing','Information Technology',7,3);





INSERT INTO teachers
(teacher_id, first_name,last_name,email,phone,department,designation,hire_date)
VALUES

('T001','Ram','Sharma','ram@college.com','9801000001','Computer Science','Professor','2018-05-10'),

('T002','Sita','Rai','sita@college.com','9801000002','Information Technology','Lecturer','2020-06-15'),

('T003','Hari','Thapa','hari@college.com','9801000003','Computer Science','Assistant Professor','2019-08-20'),

('T004','Maya','Gurung','maya@college.com','9801000004','Software Engineering','Lecturer','2021-01-12'),

('T005','Anil','Shah','anil@college.com','9801000005','Electronics','Professor','2017-03-18'),

('T006','Bikash','Karki','bikash@college.com','9801000006','Computer Science','Lecturer','2022-04-10'),

('T007','Nisha','Adhikari','nisha@college.com','9801000007','IT','Assistant Professor','2020-09-01'),

('T008','Ramesh','Poudel','ramesh@college.com','9801000008','Software Engineering','Professor','2016-07-05'),

('T009','Sunita','Bhandari','sunita@college.com','9801000009','Computer Science','Lecturer','2021-11-11'),

('T010','Deepak','KC','deepak@college.com','9801000010','Information Technology','Professor','2015-02-20');



INSERT INTO attendance
(student_id, course_id, attendance_date, status)
VALUES

(4, 1, '2026-01-10', 'Present'),
(4, 2, '2026-01-10', 'Absent'),
(4, 3, '2026-01-11', 'Present'),

(5, 4, '2026-01-10', 'Present'),
(5, 5, '2026-01-11', 'Late'),
(5, 4, '2026-01-12', 'Present'),

(6, 1, '2026-01-10', 'Present'),
(6, 3, '2026-01-11', 'Absent'),
(6, 2, '2026-01-12', 'Present'),

(7, 6, '2026-01-10', 'Late'),
(7, 7, '2026-01-11', 'Present'),

(8, 9, '2026-01-10', 'Present'),
(8, 2, '2026-01-11', 'Present'),

(9, 4, '2026-01-10', 'Absent'),
(9, 10, '2026-01-11', 'Present'),

(10, 8, '2026-01-10', 'Present'),
(10, 5, '2026-01-12', 'Late'),

(11, 6, '2026-01-10', 'Present'),
(11, 7, '2026-01-11', 'Absent'),

(12, 1, '2026-01-10', 'Present'),
(12, 9, '2026-01-11', 'Present'),

(13, 4, '2026-01-10', 'Late'),
(13, 10, '2026-01-11', 'Present');



INSERT INTO results
(
    student_id,
    course_id,
    teacher_id,
    semester,
    internal_marks,
    final_marks,
    total_marks,
    grade
)
VALUES

(4, 1, 1, 5, 25.00, 65.00, 90.00, 'A+'),

(4, 2, 3, 5, 22.00, 60.00, 82.00, 'A'),

(5, 4, 2, 3, 20.00, 58.00, 78.00, 'A'),

(5, 5, 7, 3, 18.00, 55.00, 73.00, 'B+'),

(6, 1, 1, 5, 24.00, 62.00, 86.00, 'A'),

(6, 3, 6, 3, 21.00, 60.00, 81.00, 'A'),

(7, 6, 4, 3, 23.00, 61.00, 84.00, 'A'),

(7, 7, 8, 5, 20.00, 63.00, 83.00, 'A'),

(8, 9, 9, 7, 25.00, 68.00, 93.00, 'A+'),

(8, 2, 3, 5, 22.00, 59.00, 81.00, 'A'),

(9, 4, 2, 3, 19.00, 56.00, 75.00, 'B+'),

(9, 10, 10, 7, 21.00, 60.00, 81.00, 'A'),

(10, 8, 5, 5, 20.00, 57.00, 77.00, 'A'),

(10, 6, 4, 3, 18.00, 58.00, 76.00, 'A'),

(11, 1, 1, 5, 25.00, 64.00, 89.00, 'A+'),

(11, 9, 9, 7, 23.00, 66.00, 89.00, 'A+'),

(12, 4, 2, 3, 20.00, 55.00, 75.00, 'B+'),

(12, 10, 10, 7, 22.00, 61.00, 83.00, 'A'),

(13, 5, 7, 3, 21.00, 59.00, 80.00, 'A'),

(13, 3, 6, 3, 19.00, 58.00, 77.00, 'A');


DESC students;
DESC teachers;

DESC courses;
DESC attendance;

DESC results;


DESC enrollments;


INSERT INTO enrollments
(student_id, course_id, enrollment_date)
VALUES

(4, 1, '2026-01-05'),
(4, 2, '2026-01-05'),

(5, 4, '2026-01-06'),
(5, 5, '2026-01-06'),

(6, 1, '2026-01-05'),
(6, 3, '2026-01-05'),

(7, 6, '2026-01-07'),
(7, 7, '2026-01-07'),

(8, 9, '2026-01-05'),
(8, 2, '2026-01-05'),

(9, 4, '2026-01-06'),
(9, 10, '2026-01-06'),

(10, 8, '2026-01-08'),
(10, 5, '2026-01-08'),

(11, 6, '2026-01-07'),
(11, 7, '2026-01-07'),

(12, 1, '2026-01-05'),
(12, 9, '2026-01-05'),

(13, 4, '2026-01-06'),
(13, 10, '2026-01-06');




ALTER TABLE users
MODIFY role ENUM('admin','teacher','student') NOT NULL DEFAULT 'student';


ALTER TABLE students
ADD COLUMN user_id INT NULL;

ALTER TABLE students
ADD CONSTRAINT fk_student_user
FOREIGN KEY (user_id)
REFERENCES users(id);


ALTER TABLE teachers
ADD COLUMN user_id INT NULL;

ALTER TABLE teachers
ADD CONSTRAINT fk_teacher_user
FOREIGN KEY (user_id)
REFERENCES users(id);



ALTER TABLE teachers
ADD COLUMN profile_image VARCHAR(255)
AFTER hire_date;




DESCRIBE courses;



SELECT * FROM users;



SELECT
    s.student_id,
    s.first_name,
    s.last_name,
    u.role,
    c.course_code,
    c.course_name
FROM enrollments e
INNER JOIN students s
    ON e.student_id = s.id
INNER JOIN users u
    ON s.user_id = u.id
INNER JOIN courses c
    ON e.course_id = c.id;



    SELECT id, student_id, first_name, user_id
FROM students;



SELECT *FROM teachers



ALTER TABLE teachers
ADD COLUMN password VARCHAR(255) AFTER email;




SELECT
    s.user_id,
    s.first_name,
    c.course_name
FROM students s
JOIN enrollments e
    ON s.id = e.student_id
JOIN courses c
    ON c.id = e.course_id;