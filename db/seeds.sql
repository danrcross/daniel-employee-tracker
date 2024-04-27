-- Adds rows to company_db tables!
-- Makes sure company_db is being used
USE company_db;

-- Adds values to department's column 'name'
INSERT INTO
    department (name)
VALUES
    ('Human Resources'),
    ('Design'),
    ('Back-End'),
    ('Front-End'),
    ('Management'),
    ('Maintenance');

-- Adds values to role's columns 'title', 'salary', and 'department_id'
INSERT INTO
    role (title, salary, department_id)
VALUES
    ('Conflict Manager', 75000.50, 1),
    ('Hiring Manager', 65000.50, 1),
    ('Senior Designer', 120000.75, 2),
    ('Junior Designer', 70000.75, 2),
    ('Senior Back-End Developer', 145000.50, 3),
    ('Junior Back-End Developer', 85000.50, 3),
    ('Senior Front-End Developer', 14500.50, 4),
    ('Junior Front-End Developer', 85000.50, 4),
    ('Lead Manager', 90000.00, 5),
    ('Assistant Manager', 70000.00, 5),
    ('Network Technician', 70000.80, 6),
    ('Site Landscaper', 55000.50, 6);

-- Adds values to employee's columns 'id', 'first_name', 'last_name', 'role_id', and 'manager_id'
INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Bobby', 'Frederson', 9, NULL),
    ('Janice', 'Smith', 3, 1),
    ('Freddy', 'Polis', 4, 1),
    ('Georgey', 'Trehill', 7, 1),
    ('Dexter', 'Henderson', 10, 1),
    ('Sally', 'Rhodes', 11, 5),
    ('Polly', 'McCartney', 8, 5),
    ('Jimmy', 'Rainey', 12, 5),
    ('Lewis', 'Malcolm', 6, 5),
    ('Linda', 'Quest', 5, 1),
    ('Ulga', 'Rosenberg', 1, 1),
    ('Larry', 'Costanza', 2, 1),
    ('Zainab', 'Penderecki', 4, 5),
    ('Yusef', 'Abadi', 6, 5),
    ('Rebecca', 'Fortsmyer', 8, 5),
    ('Phillip', 'Bindleschaft', 6, 5);