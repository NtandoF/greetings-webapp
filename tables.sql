drop table users;

create table users(
	id serial not null primary key,
	name text not null unique,
	count int default 0
);

