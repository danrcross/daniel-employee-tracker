USE company_db;

SELECT
    *
FROM
    department d
    JOIN role r ON d.id = r.department_id
    JOIN employee e ON r.id = e.role_id