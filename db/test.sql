USE company_db;

SELECT
    e.id,
    d.name
FROM
    department d
    JOIN role r ON d.id = r.department_id
    JOIN employee e ON r.id = e.role_id