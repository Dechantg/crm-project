

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
  user_id VARCHAR(10),
  file_name VARCHAR(100),
  uuid_file_name VARCHAR(40),
  thumbnail VARCHAR(40),
  file_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

CREATE TABLE crm_entities (
  id SERIAL PRIMARY KEY,
  entity_class VARCHAR(25),
  entity_type VARCHAR(25),
  establishment BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_contact_name (
  id SERIAL PRIMARY KEY,
  entity_id VARCHAR(25),
  first_name VARCHAR(25),
  last_name VARCHAR(25),
  honorific VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE crm_phone (
  id SERIAL PRIMARY KEY,
  entity_id VARCHAR(25),
  phone_number_type VARCHAR(15),
  phone_number VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_phone_type (
  id SERIAL PRIMARY KEY,
  phone_number_type VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_address (
  id SERIAL PRIMARY KEY,
  entity_id VARCHAR(25),
  establishment BOOLEAN,
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
  entity_id VARCHAR(25),
  email_type VARCHAR(15),
  email VARCHAR(250),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_email_type (
  id SERIAL PRIMARY KEY,
  email_type VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE crm_licencee_list (
  id SERIAL PRIMARY KEY,
  entity_id VARCHAR(25),
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
  entity_id VARCHAR(25),
  social_media_type VARCHAR(10),
  social_media TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_social_media_type (
  id SERIAL PRIMARY KEY,
  social_media_type VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE crm_client_list (
  id SERIAL PRIMARY KEY,
  entity_id VARCHAR(25),
  client_classification VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE crm_products (
  id SERIAL PRIMARY KEY,
  supplier_id VARCHAR(50),
  product_name VARCHAR(100),
  product_image VARCHAR(25),
  product_type VARCHAR(25),
  volume_litres DECIMAL(5,3),
  case_format SMALLINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_alch_products (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(25),
  alcohol_percent DECIMAL(5,2),
  alch_class VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_non_alch_products (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(25),
  non_alch_class VARCHAR(10),
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

CREATE TABLE crm_supplier (
  id SERIAL PRIMARY KEY,
  entity_id VARCHAR(25),
  supplier_name VARCHAR(100),
  supplier_type VARCHAR(25),
  supplier_logo VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE crm_supplier_type (
  id SERIAL PRIMARY KEY,
  supplier_type VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  active BOOLEAN DEFAULT true
);

CREATE TABLE crm_alch_classes (
  id SERIAL PRIMARY KEY,
  alch_type VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_non_alch_classes (
  id SERIAL PRIMARY KEY,
  non_alch_type VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE crm_contact_class (
  id SERIAL PRIMARY KEY,
  entity_class VARCHAR(25),
  contact_type VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_entity_class (
  id SERIAL PRIMARY KEY,
  entity_class_name VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_supplier_contact (
  id SERIAL PRIMARY KEY,
  supplier_id VARCHAR(25),
  entity_id VARCHAR(25),
  created_by VARCHAR(25),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_client_type (
  id SERIAL PRIMARY KEY,
  client_type VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  active BOOLEAN DEFAULT true
);

CREATE TABLE crm_client (
  id SERIAL PRIMARY KEY,
  entity_id VARCHAR(25),
  client_name VARCHAR(100),
  client_logo VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_client_contact (
  id SERIAL PRIMARY KEY,
  client_id VARCHAR(25),
  entity_id VARCHAR(25),
  created_by VARCHAR(25),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_sales_rep_assignment (
  id SERIAL PRIMARY KEY,
  client_id VARCHAR(25),
  sales_agent_id VARCHAR(25),
  active BOOLEAN DEFAULT true,
  created_by VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_products_bc (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(25),
  wholesale_price SMALLINT,
  bclrs_reatail_price SMALLINT,
  bcldb_sku SMALLINT,
  bcldb_status SMALLINT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_sales_call (
  id SERIAL PRIMARY KEY,
  client_id VARCHAR(10),
  sales_call_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_product_tasting (
  id SERIAL PRIMARY KEY,
  sales_call_id VARCHAR(10),
  product_if VARCHAR(10),
  tasting_feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_country_code (
  id SERIAL PRIMARY KEY,
  country_two_Letter VARCHAR(2),
  country_name VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_province_state (
  id SERIAL PRIMARY KEY,
  country_code VARCHAR(5),
  province_two_letter VARCHAR(5),
  province_state_name VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
