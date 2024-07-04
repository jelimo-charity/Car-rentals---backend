CREATE TABLE IF NOT EXISTS "Books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"year" integer NOT NULL
);
