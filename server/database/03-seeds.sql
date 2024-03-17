



INSERT INTO crm_users (
  first_name,
  last_name,
  email,
  password_hash
) VALUES
('bob', 'example', 'bob@example.com', 'test'),
('john', 'doe', 'john@example.com', 'test'),
('jane', 'smith', 'jane@example.com', 'test');

INSERT INTO crm_entity_class (id,
  entity_class_name
) VALUES
(1, 'Internal'),
(2, 'Client'),
(3, 'Supplier');

INSERT INTO crm_contact_class (
  id,
  contact_type,
  entity_class
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

INSERT INTO crm_supplier (
  id,
  supplier_name,
  supplier_type
) VALUES 
(1, 'Savian', 1),
(2, 'Jasci', 1),
(3, '54 Gin', 2),
(4, 'Avanzi', 1),
(5, 'Tassoni', 3),
(6, 'Scrappy''s', 4);

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

INSERT INTO crm_phone_type (
  id,
  phone_number_type
) VALUES 
(1, 'Work'),
(2, 'Home'),
(3, 'Cell');

INSERT INTO crm_email_type (
  id,
  email_type
) VALUES 
(1, 'Work'),
(2, 'Personal');

INSERT INTO crm_social_media_type (
  id,
  social_media_type
) VALUES 
(1, 'Instagram'),
(2, 'Twitter'),
(3, 'LinkedIn'),
(4, 'TikTok');


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

INSERT INTO crm_supplier_type (
  id,
  supplier_type
) VALUES
(1, 'Winnery'),
(2, 'Distillery'),
(3, 'Water'),
(4, 'Bitters'),
(5, 'Distributor');

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

INSERT INTO crm_country_code (id, country_two_letter, country_name)
VALUES
  (1, 'CA', 'Canada'),
  (2, 'US', 'United States'),
  (3, 'MX', 'Mexico'),
  (4, 'BS', 'Bahamas'),
  (5, 'CU', 'Cuba'),
  (6, 'JM', 'Jamaica'),
  (7, 'GB', 'United Kingdom'),
  (8, 'DE', 'Germany'),
  (9, 'FR', 'France'),
  (10, 'IT', 'Italy'),
  (11, 'ES', 'Spain'),
  (12, 'PT', 'Portugal'),
  (13, 'NL', 'Netherlands'),
  (14, 'BE', 'Belgium'),
  (15, 'SE', 'Sweden'),
  (16, 'NO', 'Norway'),
  (17, 'DK', 'Denmark'),
  (18, 'FI', 'Finland'),
  (19, 'IS', 'Iceland'),
  (20, 'IE', 'Ireland'),
  (21, 'AT', 'Austria'),
  (22, 'CH', 'Switzerland'),
  (23, 'GR', 'Greece'),
  (24, 'CZ', 'Czech Republic'),
  (25, 'PL', 'Poland'),
  (26, 'HU', 'Hungary'),
  (27, 'SK', 'Slovakia'),
  (28, 'SI', 'Slovenia'),
  (29, 'HR', 'Croatia'),
  (30, 'BA', 'Bosnia and Herzegovina'),
  (31, 'RS', 'Serbia'),
  (32, 'ME', 'Montenegro'),
  (33, 'MK', 'North Macedonia'),
  (34, 'AL', 'Albania'),
  (35, 'XK', 'Kosovo'),
  (36, 'BG', 'Bulgaria'),
  (37, 'RO', 'Romania'),
  (38, 'MD', 'Moldova'),
  (39, 'UA', 'Ukraine');

INSERT INTO crm_province_state (id, country_code, province_two_letter, province_state_name)
VALUES
  (1, '1', 'AB', 'Alberta'),
  (2, '1', 'BC', 'British Columbia'),
  (3, '1', 'MB', 'Manitoba'),
  (4, '1', 'NB', 'New Brunswick'),
  (5, '1', 'NL', 'Newfoundland and Labrador'),
  (6, '1', 'NS', 'Nova Scotia'),
  (7, '1', 'ON', 'Ontario'),
  (8, '1', 'PE', 'Prince Edward Island'),
  (9, '1', 'QC', 'Quebec'),
  (10, '1', 'SK', 'Saskatchewan'),
  (11, '1', 'NT', 'Northwest Territories'),
  (12, '1', 'NU', 'Nunavut'),
  (13, '1', 'YT', 'Yukon'),
  (14, '2', 'AL', 'Alabama'),
  (15, '2', 'AK', 'Alaska'),
  (16, '2', 'AZ', 'Arizona'),
  (17, '2', 'AR', 'Arkansas'),
  (18, '2', 'CA', 'California'),
  (19, '2', 'CO', 'Colorado'),
  (20, '2', 'CT', 'Connecticut'),
  (21, '2', 'DE', 'Delaware'),
  (22, '2', 'FL', 'Florida'),
  (23, '2', 'GA', 'Georgia'),
  (24, '2', 'HI', 'Hawaii'),
  (25, '2', 'ID', 'Idaho'),
  (26, '2', 'IL', 'Illinois'),
  (27, '2', 'IN', 'Indiana'),
  (28, '2', 'IA', 'Iowa'),
  (29, '2', 'KS', 'Kansas'),
  (30, '2', 'KY', 'Kentucky'),
  (31, '2', 'LA', 'Louisiana'),
  (32, '2', 'ME', 'Maine'),
  (33, '2', 'MD', 'Maryland'),
  (34, '2', 'MA', 'Massachusetts'),
  (35, '2', 'MI', 'Michigan'),
  (36, '2', 'MN', 'Minnesota'),
  (37, '2', 'MS', 'Mississippi'),
  (38, '2', 'MO', 'Missouri'),
  (39, '2', 'MT', 'Montana'),
  (40, '2', 'NE', 'Nebraska'),
  (41, '2', 'NV', 'Nevada'),
  (42, '2', 'NH', 'New Hampshire'),
  (43, '2', 'NJ', 'New Jersey'),
  (44, '2', 'NM', 'New Mexico'),
  (45, '2', 'NY', 'New York'),
  (46, '2', 'NC', 'North Carolina'),
  (47, '2', 'ND', 'North Dakota'),
  (48, '2', 'OH', 'Ohio'),
  (49, '2', 'OK', 'Oklahoma'),
  (50, '2', 'OR', 'Oregon'),
  (51, '2', 'PA', 'Pennsylvania'),
  (52, '2', 'RI', 'Rhode Island'),
  (53, '2', 'SC', 'South Carolina'),
  (54, '2', 'SD', 'South Dakota'),
  (55, '2', 'TN', 'Tennessee'),
  (56, '2', 'TX', 'Texas'),
  (57, '2', 'UT', 'Utah'),
  (58, '2', 'VT', 'Vermont'),
  (59, '2', 'VA', 'Virginia'),
  (60, '2', 'WA', 'Washington'),
  (61, '2', 'WV', 'West Virginia'),
  (62, '2', 'WI', 'Wisconsin'),
  (63, '2', 'WY', 'Wyoming'),
  (64, '3', 'AGU', 'Aguascalientes'),
  (65, '3', 'BCN', 'Baja California'),
  (66, '3', 'BCS', 'Baja California Sur'),
  (67, '3', 'CAM', 'Campeche'),
  (68, '3', 'CHP', 'Chiapas'),
  (69, '3', 'CHH', 'Chihuahua'),
  (70, '3', 'COA', 'Coahuila'),
  (71, '3', 'COL', 'Colima'),
  (72, '3', 'DIF', 'Ciudad de Mexico'),
  (73, '3', 'DUR', 'Durango'),
  (74, '3', 'GUA', 'Guanajuato'),
  (75, '3', 'GRO', 'Guerrero'),
  (76, '3', 'HID', 'Hidalgo'),
  (77, '3', 'JAL', 'Jalisco'),
  (78, '3', 'MEX', 'Mexico'),
  (79, '3', 'MIC', 'Michoacan'),
  (80, '3', 'MOR', 'Morelos'),
  (81, '3', 'NAY', 'Nayarit'),
  (82, '3', 'NLE', 'Nuevo Leon'),
  (83, '3', 'OAX', 'Oaxaca'),
  (84, '3', 'PUE', 'Puebla'),
  (85, '3', 'QUE', 'Queretaro'),
  (86, '3', 'ROO', 'Quintana Roo'),
  (87, '3', 'SLP', 'San Luis Potosi'),
  (88, '3', 'SIN', 'Sinaloa'),
  (89, '3', 'SON', 'Sonora'),
  (90, '3', 'TAB', 'Tabasco'),
  (91, '3', 'TAM', 'Tamaulipas'),
  (92, '3', 'TLA', 'Tlaxcala'),
  (93, '3', 'VER', 'Veracruz'),
  (94, '3', 'YUC', 'Yucatan'),
  (95, '3', 'ZAC', 'Zacatecas'),
  (96, '8', 'BW', 'Baden-Württemberg'),
  (97, '8', 'BY', 'Bavaria (Bayern)'),
  (98, '8', 'BE', 'Berlin'),
  (99, '8', 'BB', 'Brandenburg'),
  (100, '8', 'HB', 'Bremen'),
  (101, '8', 'HH', 'Hamburg'),
  (102, '8', 'HE', 'Hesse (Hessen)'),
  (103, '8', 'MV', 'Mecklenburg-Vorpommern'),
  (104, '8', 'NI', 'Lower Saxony (Niedersachsen)'),
  (105, '8', 'NW', 'North Rhine-Westphalia (Nordrhein-Westfalen)'),
  (106, '8', 'RP', 'Rhineland-Palatinate (Rheinland-Pfalz)'),
  (107, '8', 'SL', 'Saarland'),
  (108, '8', 'SN', 'Saxony (Sachsen)'),
  (109, '8', 'ST', 'Saxony-Anhalt (Sachsen-Anhalt)'),
  (110, '8', 'SH', 'Schleswig-Holstein'),
  (111, '8', 'TH', 'Thuringia (Thüringen)'),
  (112, '10', 'ABR', 'Abruzzo'),
  (113, '10', 'BAS', 'Basilicata'),
  (114, '10', 'CAL', 'Calabria'),
  (115, '10', 'CAM', 'Campania'),
  (116, '10', 'EMR', 'Emilia-Romagna'),
  (117, '10', 'FVG', 'Friuli Venezia Giulia'),
  (118, '10', 'LAZ', 'Lazio'),
  (119, '10', 'LIG', 'Liguria'),
  (120, '10', 'LOM', 'Lombardy (Lombardia)'),
  (121, '10', 'MAR', 'Marche'),
  (122, '10', 'MOL', 'Molise'),
  (123, '10', 'PMN', 'Piedmont (Piemonte)'),
  (124, '10', 'PUG', 'Apulia (Puglia)'),
  (125, '10', 'SAR', 'Sardinia (Sardegna)'),
  (126, '10', 'SIC', 'Sicily (Sicilia)'),
  (127, '10', 'TOS', 'Tuscany (Toscana)'),
  (128, '10', 'TAA', 'Trentino-Alto Adige/Südtirol'),
  (129, '10', 'UMB', 'Umbria'),
  (130, '10', 'VDA', 'Aosta Valley (Valle Aosta)'),
  (131, '10', 'VEN', 'Veneto'),
  (132, '9', 'ARA', 'Auvergne-Rhône-Alpes'),
  (133, '9', 'BFC', 'Bourgogne-Franche-Comté'),
  (134, '9', 'BRE', 'Brittany Bretagne'),
  (135, '9', 'CVL', 'Centre-Val de Loire'),
  (136, '9', 'COR', 'Corsica Corse'),
  (137, '9', 'GES', 'Grand Est'),
  (138, '9', 'HDF', 'Hauts-de-France'),
  (139, '9', 'IDF', 'Île-de-France'),
  (140, '9', 'NAQ', 'Nouvelle-Aquitaine'),
  (141, '9', 'OCC', 'Occitanie'),
  (142, '9', 'PDL', 'Pays de la Loire'),
  (143, '9', 'PAC', 'Provence-Alpes-Côte Azur'),
  (144, '11', 'AND', 'Andalusia (Andalucía)'),
  (145, '11', 'ARA', 'Aragon (Aragón)'),
  (146, '11', 'AST', 'Asturias (Asturias)'),
  (147, '11', 'CNR', 'Canary Islands (Canarias)'),
  (148, '11', 'CST', 'Cantabria (Cantabria)'),
  (149, '11', 'CAT', 'Catalonia (Cataluña)'),
  (150, '11', 'CLM', 'Castilla-La Mancha'),
  (151, '11', 'CYL', 'Castile and León (Castilla y León)'),
  (152, '11', 'CTM', 'Ceuta (Ceuta)'),
  (153, '11', 'EXT', 'Extremadura'),
  (154, '11', 'GAL', 'Galicia (Galicia)'),
  (155, '11', 'MAD', 'Community of Madrid (Comunidad de Madrid)'),
  (156, '11', 'MUR', 'Region of Murcia (Región de Murcia)'),
  (157, '11', 'NAV', 'Navarre (Navarra)'),
  (158, '11', 'PVA', 'Basque Country (País Vasco)'),
  (159, '11', 'VAL', 'Valencian Community (Comunidad Valenciana)');
