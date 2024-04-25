USE company_db
SELECT
    e.id AS 'id',
    e.first_name AS 'first',
    e.last_name AS 'last',
    r.id AS 'role_id',
    r.title AS 'role'
FROM
    employee e
    JOIN role r ON e.role_id = r.id