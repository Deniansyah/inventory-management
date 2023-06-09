CREATE DATABASE invmana

CREATE TABLE "users" (
    "id"            INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "fullname"      VARCHAR(255) NOT NULL,
    "email"         VARCHAR(255) NOT NULL,
    "password"      VARCHAR(255) NOT NULL,
    "role"          INT NOT NULL,
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

ALTER TABLE "users" ALTER COLUMN "fullname" TYPE character varying(255);
ALTER TABLE "users" ALTER COLUMN "fullname" SET NOT NULL;
ALTER TABLE "users" RENAME COLUMN "fullname" TO "name";