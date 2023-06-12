
CREATE DATABASE invmana;

CREATE TABLE "users" (
    "id"            INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "fullname"      VARCHAR(255) NOT NULL,
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

ALTER TABLE "users" RENAME COLUMN "fullname" TO "name";

ALTER TABLE "users" ADD COLUMN "picture" VARCHAR(255);

CREATE TABLE "stock" (
  "id"            INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "product_id"    INT NOT NULL REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE,
  "users_id"      INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  "date"          TIMESTAMP NOT NULL,
  "type"          INT NOT NULL,      -- 1 = stock in, 2 = stock out, 3 = edit stock
  "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"     TIMESTAMPTZ
);
