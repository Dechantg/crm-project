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

CREATE TABLE crm_licence_list (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id VARCHAR(25),
  licence_number VARCHAR(10),
  licence_type VARCHAR(50),
  licence_sub_category_id VARCHAR(50),
  establishment VARCHAR(100),
  establishment_address_street VARCHAR(250),
  establishment_address_city VARCHAR(100),
  establishment_address_postal_code VARCHAR(10),
  licensee VARCHAR(100),
  third_party_operator VARCHAR(100),
  active BOOLEAN
);



UPDATE crm_pdf
SET thumbnail = 'df7106ab-ea2b-41e2-a1aa-36b33c497c9d.pdf.thumbnail.jpg'
WHERE id = 1;