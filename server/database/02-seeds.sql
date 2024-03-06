



INSERT INTO crm_users (
  first_name,
  last_name,
  email,
  password_hash
) VALUES
('bob', 'example', 'bob@example.com', 'test'),
('john', 'doe', 'john@example.com', 'test'),
('jane', 'smith', 'jane@example.com', 'test');

INSERT INTO crm_contact_type (id,
  contact_type_name
) VALUES
(1, 'Internal'),
(2, 'Client'),
(3, 'Supplier');

INSERT INTO crm_contact_class (
  id,
  contact_class,
  contact_type
) VALUES
(1, 'Sales Manager', '1'),
(2, 'Territory Manager', '1'),
(3, 'Territory Rep', '1'),
(4, 'Sales Agent', '1'),
(5, 'Bar Manager', '2'),
(6, 'General Manager', '2'),
(7, 'Wine Director', '2'),
(8, 'Owner', '2'),
(9, 'Winery Rep', '3'),
(10, 'Distilery Rep', '3'),
(11, 'Whatever the fuck Alex is', '3');

INSERT INTO crm_alch_classes (
  id,
  alch_type
) VALUES
(1, 'Gin'),
(2, 'Vodka'),
(3, 'Red Wine'),
(4, 'White Wine'),
(5, 'Rose Wine');

INSERT INTO crm_non_alch_classes (
  id,
  non_alch_type
) VALUES
(1, 'Ginger Beer'),
(2, 'Citrus'),
(3, 'Tonic');

