--Department seeds
INSERT INTO department (name) VALUES
("Executive"),
("Information Technology"),
("Sales"),
("Engineering"),
("Manufacturing"),
("Assembly");

--Role seeds
INSERT INTO role (title, salary, department_id) VALUES
("CEO", 260000, 1),
("IT Manager", 175000, 2),
("Sales Manager", 140000, 3),
("Salesperson", 90000, 3),
("Engineering Manager", 135000, 4),
("Engineer", 90000, 4),
("Manufacturing Manager", 130000, 5),
("Machinist", 70000, 5),
("Fabricator", 70000, 5),
("Assembly Manager", 100000, 6),
("Assembler", 65000, 6);

--Employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Mark", "Krauzowicz", 1, null),
("Albert", "Einstein", 2, 1),
("Niels", "Bohr", 3, 1),
("Paul", "Dirac", 4, 3),
("Marie", "Curie", 5, 1),
("Enrico", "Fermi", 6, 5),
("Richard", "Feynman", 7, 1),
("Max", "Planck", 8, 7),
("Erwin", "Schrödinger", 9, 7),
("Werner", "Heisenberg", 10, 1),
("Michael", "Faraday", 11, 10);
