DROP TABLE IF EXISTS crm_images CASCADE;
DROP TABLE IF EXISTS crm_pdf CASCADE;
DROP TABLE IF EXISTS crm_document CASCADE;


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


UPDATE crm_pdf
SET thumbnail = 'df7106ab-ea2b-41e2-a1aa-36b33c497c9d.pdf.thumbnail.jpg'
WHERE id = 1;