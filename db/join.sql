-- Want to make a multiple join, where I can see employee, department name, role, salary, and manager
-- CONCAT found here: https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_concat
SELECT
    d.name AS 'department',
    CONCAT(e1.first_name, ' ', e1.last_name) AS 'employee',
    r.title AS 'role',
    r.salary,
    CONCAT(e2.first_name, ' ', e2.last_name) AS 'manager'
FROM
    employee e1
    JOIN employee e2 ON e1.manager_id = e2.id
    JOIN role r ON e1.role_id = r.id
    JOIN department d ON r.department_id = d.id