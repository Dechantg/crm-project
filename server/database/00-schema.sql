DROP TABLE IF EXISTS crm_images CASCADE;
DROP TABLE IF EXISTS crm_pdf CASCADE;
DROP TABLE IF EXISTS crm_document CASCADE;
DROP TABLE IF EXISTS crm_licence_list CASCADE;



CREATE TABLE crm_roles (
  role_id SERIAL PRIMARY KEY,
  role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE crm_permissions (
  permission_id SERIAL PRIMARY KEY,
  route_name VARCHAR(50) NOT NULL,
  table_name VARCHAR(50) NOT NULL,
  
  can_read BOOLEAN DEFAULT false,
  can_write BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false
);

CREATE TABLE crm_users (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE crm_images (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES crm_users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  file_name TEXT,
  uuid_file_name VARCHAR(60),
  thumbnail VARCHAR(60),
  file_description TEXT
);

CREATE TABLE crm_pdf (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES crm_users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  file_name TEXT,
  uuid_file_name VARCHAR(60),
  thumbnail VARCHAR(60),
  file_description TEXT
);

CREATE TABLE crm_document (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES crm_users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  file_name TEXT,
  uuid_file_name VARCHAR(60),
  file_description TEXT
);

CREATE TABLE crm_contacts (
  id SERIAL PRIMARY KEY,
  contact_classification VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_contact_name (
  id SERIAL PRIMARY KEY,
  contact_id VARCHAR(25),
  first_name VARCHAR(25),
  last_name VARCHAR(25),
  honorific VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE crm_phone (
  id SERIAL PRIMARY KEY,
  contact_id VARCHAR(25),
  phone_number_type VARCHAR(15),
  phone_number VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_address (
  id SERIAL PRIMARY KEY,
  contact_id VARCHAR(25),
  address_classification VARCHAR(25),
  street_address_one VARCHAR(250),
  street_address_two VARCHAR(250),
  address_city VARCHAR(100),
  address_province VARCHAR(100),
  address_country VARCHAR(50),
  address_postal_code VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_email (
  id SERIAL PRIMARY KEY,
  contact_id VARCHAR(25),
  email_type VARCHAR(15),
  email VARCHAR(250),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE crm_licencee_list (
  id SERIAL PRIMARY KEY,
  contact_id VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id VARCHAR(25),
  licence_number VARCHAR(10),
  licence_type VARCHAR(50),
  licence_sub_category_id VARCHAR(50),
  establishment VARCHAR(100),
  licensee VARCHAR(100),
  third_party_operator VARCHAR(100),
  active BOOLEAN
);

CREATE TABLE crm_social_media (
  id SERIAL PRIMARY KEY,
  contact_id VARCHAR(25),
  social_media_type VARCHAR(25),
  social_media VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE crm_client_list (
  id SERIAL PRIMARY KEY,
  contact_id VARCHAR(25),
  client_classification VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE crm_products (
  id SERIAL PRIMARY KEY,
  producer_id VARCHAR(50),
  product_name VARCHAR(100),
  product_image_thumbnail VARCHAR(50),
  product_image VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_alch_products (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(25),
  alcohol_percent DECIMAL(5,2),
  volume_litres DECIMAL(5,3),
  case_format SMALLINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_non_alch_products (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(25),
  volume_litres DECIMAL(5,3),
  case_format SMALLINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_products_bc_alcoholic (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(10),
  sku VARCHAR(10),
  status_code VARCHAR(5),
  vqa BOOLEAN DEFAULT false,
  active BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_producer (
  id SERIAL PRIMARY KEY,
  contact_id VARCHAR(25),
  producer_name VARCHAR(100),
  producer_logo VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


