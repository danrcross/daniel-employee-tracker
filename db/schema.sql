-- Initializes database and creates table templates!
-- if company_db database already exists, it is deleted
DROP DATABASE IF EXISTS company_db;

-- creates new database 'company_db'
CREATE DATABASE company_db;

-- selects 'company_db' to be used as current database
USE company_db;

-- creates a new table within the database, called 'department'; 
-- adds row id, which will contain integer value as a non-null primary key; each new row's id value will automatically increment by one
CREATE TABLE
    department (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL
    );

-- creates a new table within the database, called 'role'; 
-- adds row id, which will contain integer value as a non-null primary key; each new row's id value will automatically increment by one
-- other rows: title, with non-null string value no greater than 30 characters (variable length); salary, with number value no longer than 20 places, with capacity for 2 decimal places; department_id, with integer value
-- department_id set as foreign key that corresponds to id value of 'department' table's rows
CREATE TABLE
    role (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(30) NOT NULL,
        salary DECIMAL(20, 2) NOT NULL,
        department_id INT,
        FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE SET NULL
    );

-- creates a new table within the database, called 'employee'; 
-- adds row id, which will contain integer value as a non-null primary key; each new row's id value will automatically increment by one
-- other rows: first_name, with non-null string value no greater than 30 characters (variable length); last_name, with non-null string value no greater than 30 characters (variable length); role_id, with integer value; manager_id, with integer value
-- 2 foreign keys: role_id corresponds to value of id of table 'role'; manager_id corresponds to value of id of THIS table 'employee'
CREATE TABLE
    employee (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INT,
        manager_id INT,
        FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE SET NULL,
        FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL
    );