drop database if exists docencia;

create database docencia;

use docencia;

create table dni_profe(
    dni varchar(9) primary key
);

insert into dni_profe values
("45289658J"),
("28656830A"),
("64370675T"),
("57121139H"),
("43242995M"),
("93342984Z"),
("47779297V"),
("31775555C"),
("30527787W"),
("33166233A");

create table users(
    id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(20) not null unique,
    password varchar(40) not null,
    full_name varchar(100),
    avatar blob
) engine=InnoDB;


create table professor(
    id_profe int PRIMARY KEY,
    departament varchar(20) not null,
    constraint FK_profe_user foreign key (id_profe) references users(id) on delete cascade on update cascade
)engine=InnoDB;


create table alumne(
    id_alumne int PRIMARY KEY,
    repetidor boolean,
    curs varchar(10),
    constraint FK_alu_user foreign key (id_alumne) references users(id) on delete cascade on update cascade
)engine=InnoDB;

create table missatgeria(
	id_alumne int,
    id_profe int,
    moment timestamp default current_timestamp,
    missatge text not null,
    imatge varchar(50),
    constraint pk_missatgeria primary key(id_alumne,id_profe,moment)
) engine=InnoDB;

create table assignatura(
	id_assig int auto_increment primary key,
    cod_assig varchar(3) not null,
    nom_assig varchar(30) not null,
    modul varchar(4),
    curs tinyint,
    hores int
) engine=InnoDB;

create table notes(
		id_alumne int,
        id_profe int,
        id_assig int not null,
        nota numeric(4,2),  
        constraint PK_notes primary key(id_alumne,id_assig),
        constraint CK_nota check (nota between 0 and 10),
        constraint FK_nota_alu foreign key (id_alumne) references alumne(id_alumne) on delete cascade on update cascade,
        constraint FK_nota_profe foreign key (id_profe) references professor(id_profe) on delete cascade on update cascade,
        constraint FK_nota_assig foreign key (id_assig) references assignatura(id_assig) on delete cascade on update cascade
);



insert into users(username,password,full_name) values
("Pepe",md5("123456"),"Pepito Perez"),
("Joange",md5("toor"),"Joan Gerard Camarena"),
("Ferran",md5("beni"),"Ferran Cunyat"),
("Ambros",md5("nomelase"),"Ambrosio el del osio"),
("Puyi",md5("ninguna"),"Carles Puyol"),
("Bilbo",md5("password"),"Bilbo Bolson");

INSERT INTO `docencia`.`professor` (`id_profe`, `departament`) VALUES ('1', 'Ciències');
INSERT INTO `docencia`.`professor` (`id_profe`, `departament`) VALUES ('2', 'Informàtica');
INSERT INTO `docencia`.`professor` (`id_profe`, `departament`) VALUES ('3', 'Informàtica');

INSERT INTO `docencia`.`alumne` (`id_alumne`, `repetidor`, `curs`) VALUES ('4', '1', '1');
INSERT INTO `docencia`.`alumne` (`id_alumne`, `repetidor`, `curs`) VALUES ('5', '0', '2');
INSERT INTO `docencia`.`alumne` (`id_alumne`, `repetidor`, `curs`) VALUES ('6', '1', '1');

/*
-- Query: SELECT * FROM docencia.assignatura
-- Date: 2021-02-07 17:18
*/
INSERT INTO `assignatura` (`id_assig`,`cod_assig`,`nom_assig`,`modul`,`curs`,`hores`) VALUES (1,'PRG','Programació','DAM',1,8);
INSERT INTO `assignatura` (`id_assig`,`cod_assig`,`nom_assig`,`modul`,`curs`,`hores`) VALUES (2,'EDD','Entorns de Desevolupament','DAM',1,3);
INSERT INTO `assignatura` (`id_assig`,`cod_assig`,`nom_assig`,`modul`,`curs`,`hores`) VALUES (3,'LMI','Llenguatge de Marques','DAM',1,3);
INSERT INTO `assignatura` (`id_assig`,`cod_assig`,`nom_assig`,`modul`,`curs`,`hores`) VALUES (4,'BD','Bases de Dades','DAM',1,5);
INSERT INTO `assignatura` (`id_assig`,`cod_assig`,`nom_assig`,`modul`,`curs`,`hores`) VALUES (5,'SI','Sistemes Informàtics','DAM',1,6);


INSERT INTO `docencia`.`notes` (`id_alumne`, `id_profe`, `id_assig`, `nota`) VALUES ('4', '2', '1', '7.6');
INSERT INTO `docencia`.`notes` (`id_alumne`, `id_profe`, `id_assig`, `nota`) VALUES ('5', '2', '4', '4');
INSERT INTO `docencia`.`notes` (`id_alumne`, `id_profe`, `id_assig`, `nota`) VALUES ('4', '3', '3', '3');
INSERT INTO `docencia`.`notes` (`id_alumne`, `id_profe`, `id_assig`, `nota`) VALUES ('6', '3', '5', '6');
INSERT INTO `docencia`.`notes` (`id_alumne`, `id_profe`, `id_assig`, `nota`) VALUES ('6', '2', '1', '9.4');