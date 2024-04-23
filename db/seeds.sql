INSERT INTO
    department (name)
VALUES
    ('Human Resources'),
    ('Design'),
    ('Back-End'),
    ('Front-End'),
    ('Management'),
    ('Maintenance');

INSERT INTO
    role (title, salary, department_id)
VALUES
    ('Conflict Manager', 75000.50, 1),
    ('Hiring Manager', 65000.50, 1),
    ('Senior Designer', 120000.75, 2),
    ('Junior Designer', 70000.75, 2),
    ('Senior Back-End Developer', 14500.50, 3),
    ('Junior Back-End Developer', 85000.50, 3),
    ('Senior Front-End Developer', 14500.50, 4),
    ('Junior Front-End Developer', 85000.50, 4),
    ('Lead Manager', 90000.00, 5),
    ('Assistant Manager', 70000.00, 5),
    ('Network Technician', 70000.80, 6),
    ('Site Landscaper', 55000.50, 6);

INSERT INTO
    employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'Bobby', 'Frederson', 9, NULL),
    (2, 'Janice', 'Smith', 3, 1),
    (3, 'Freddy', 'Polis', 4, 1),
    (4, 'Georgey', 'Trehill', 7, 1),
    (5, 'Dexter', 'Henderson', 10, 1),
    (6, 'Sally', 'Rhodes', 11, 5),
    (7, 'Polly', 'McCartney', 8, 5),
    (8, 'Jimmy', 'Rainey', 12, 5),
    (9, 'Lewis', 'Malcolm', 6, 5),
    (10, 'Linda', 'Quest', 5, 1),
    (11, 'Ulga', 'Rosenberg', 1, 1),
    (12, 'Larry', 'Costanza', 2, 1),
    (13, 'Zainab', 'Penderecki', 4, 5),
    (14, 'Yusef', 'Abadi', 6, 5),
    (15, 'Rebecca', 'Fortsmyer', 8, 5),
    (16, 'Phillip', 'Bindleschaft', 6, 5);