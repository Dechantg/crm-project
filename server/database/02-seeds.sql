



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

INSERT INTO crm_images (
  id,
  user_id,
  file_name,
  uuid_file_name,
  thumbnail,
  file_description
) VALUES 
(1,1, '502690.jpg	', 'ae2bf5f7-a7a1-4522-a192-41e48f375492.jpg', '4aa67035-cec2-4490-830b-2c3524e56d8d.jpg', 'Savian Cab Franc Bottle'),
(2,1,'Avanzi-cabernet-sauvignon-doc.jpg','996b7297-7a24-4785-9387-ab6aec267638.jpg', 'e10110e7-1a46-4c06-8922-054b1ef30e2f.jpg', 'Avanzi Bragagna'),
(3,1,'chairt.jpg','4d7c83e2-44f3-4196-a10b-7226f750f97a.jpg', '1c7aa71e-ed87-4890-94f2-0d4186169279.jpg', 'Avanzi Chiaretto'),
(4,1,'franc600800.jpg', '1a7b16e0-e629-4233-a306-ee6047ece9b4.jpg', '29047f32-5de0-43da-be8c-5c4320e92b11.jpg', 'Avanzi Franciacorta'),
(5,1, 'lugana-avanzi-sirmione.jpg', '9596c6a5-7f83-4b12-862c-c32c76d0e83d.jpg', '7a435e9b-1dea-4656-b955-fd8645050b0e.jpg', 'Avanzi Lugana'),
(6,1,'diabianco600x800.jpg', 'd6d06a29-61d3-4730-aa1c-9c7e302854f8.jpg', '9e8b1163-64ab-4f07-a420-44a4b03e7dac.jpg', 'Avanzi Dorobianco'),
(7,1, 'CHARDONNAY.JPG', 'c05ca140-481d-4b63-b63d-a33ce8386490.JPG', '622ce709-95e1-4b40-a79e-7f61edc30fc9.JPG', 'Savian Chardonnay'),
(8,1, 'CLASSICO.JPG', '4c535e23-8583-42f3-82e1-73df09ba4037.JPG', '9d7df9e3-784d-4dc9-8351-332bdf436224.JPG', 'Savian Classico'),
(9,1, 'logo-savian-footer.jpg', '85e1eeeb-5002-4de8-8fcd-fc312d6036e7.jpg', 'f861cd4c-cf7a-42a4-b842-c7cc2e449cde.jpg', 'Savian Logo'),
(10,1, 'PINOT GRIGIO.JPG', 'a18ea858-33f7-435f-86c3-92cc93b07d01.JPG', '2dc11f7f-902f-4178-a5c7-997d7547fb56.JPG', 'Savian Pinot Grigio'),
(11,1, 'MERLOT.JPG', '2fc5c21c-54e7-42ea-ac3f-5927ac5ac75b.JPG', '6c2b45b6-ec0b-4292-a611-59b3e05455c6.JPG', 'Savian Merlot'),
(12,1, 'index.png', '18be0138-db6f-45e3-a31b-44596a4b1f6c.png', '6ae9e837-31a9-416d-9487-368f28ec3cba.png', 'Avanzi Logo'),
(13,1, 'cerasuolo-2017.jpg', '2a497f12-8e4a-464d-94b8-0cbf5091afb1.jpg', '8d0931e1-cbf5-4021-921d-47e54dd861ac.jpg', 'Jasci Cerasuolo'),
(14,1, 'marchio-jem-kraft.png', 'e645a5c2-1661-4a9b-a5f6-3a4c29f23420.png', 'f23d9d22-f80c-44e8-b3a2-9c2195d45c51.png', 'Jasci Logo'),
(15,1, 'montepulciano-2017.jpg', '00dcc491-f4aa-47f2-b626-02f3c57801aa.jpg', 'c2e0bae2-368b-470d-aabb-1be598b3233d.jpg', 'Jasci Montepulciano'),
(16,1, 'nerube.jpg', '4e61d755-5653-4c60-8f40-2520c867d80b.jpg', '04af390f-a8ed-43a0-9f95-1b7175541738.jpg', 'Jasci Nerube'),
(17,1, 'trebbiano-2017.jpg', '67080bcb-8e6d-497d-95cc-a69ddd2a4273.jpg', 'ffe610f9-7b8b-45f0-b492-292033037b7d.jpg', 'Jasci Trebbiano'),
(18,1, 'rudhir-chardonnay.jpg', '883777ee-2a80-44e2-8275-0bbcd17dbc71.jpg', '69f6f29f-c6eb-48f0-a6c7-e1f8f037a1fd.jpg', 'Jasci Rudhir Chardonnay');



INSERT INTO crm_client_type (
  id,
  client_type
) VALUES
(1, 'Resturant'),
(2, 'Wine Bar'),
(3, 'Bar'),
(4, 'Club'),
(5, 'Coffee Shop'),
(6, 'Government LRS'),
(7, 'Private LRS'),
(8, 'Grocery Retail'),
(9, 'Boutique Retail');
