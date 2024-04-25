USE company_db
SELECT DISTINCT
    e2.first_name,
    e2.last_name,
    e2.id
FROM
    employee e1
    JOIN employee e2 ON e1.manager_id = e2.id;