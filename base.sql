
CREATE DATABASE invmana;

CREATE TABLE "users" (
    "id"            INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture"       VARCHAR(255),
    "name"          VARCHAR(255) NOT NULL,
    "email"         VARCHAR(255) NOT NULL,
    "password"      VARCHAR(255) NOT NULL,
    "role"          INT NOT NULL,     -- 1 = Admin & 2 = Operator
    "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "product" (
    "id"            INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture"       VARCHAR(255),
    "name"          VARCHAR(255) NOT NULL,
    "description"   TEXT,
    "price"         BIGINT NOT NULL,
    "stock"         BIGINT DEFAULT 0,
    "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "stock" (
  "id"            INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "product_id"    INT NOT NULL,
  "users_id"      INT NOT NULL,
  "quantity"      BIGINT NOT NULL,
  "date"          TIMESTAMP NOT NULL,
  "type"          INT NOT NULL,
  "remark"        TEXT,      -- 1 = stock in, 2 = stock out, 3 = edit stock
  "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"     TIMESTAMPTZ
);


SELECT
    s.id AS stock_id,
    p.name AS product_name,
    u.name AS user_name,
    s.quantity,
    s.date,
    s.type,
    s.remark,
    s."createdAt",
    s."updatedAt"
FROM
    stock s
LEFT JOIN
    product p ON s.product_id = p.id
LEFT JOIN
    users u ON s.users_id = u.id
WHERE 
    p.name ILIKE '%ge%' 
AND 
    ('1'::INT IS NULL OR s.type = '1'::INT) 
ORDER BY 
    s."createdAt" ASC
LIMIT 
    5 
OFFSET 
    0;



SELECT
    COUNT(p.name) AS "totalData"
FROM
    stock s
LEFT JOIN
    product p ON s.product_id = p.id
LEFT JOIN
    users u ON s.users_id = u.id
WHERE 
    p.name ILIKE '%ge%' 
AND 
    ('1'::INT IS NULL OR s.type = '1'::INT);








