CREATE SEQUENCE crm_images_id_seq START WITH 50;
CREATE SEQUENCE crm_roles_seq START WITH 50;
CREATE SEQUENCE crm_permissions_seq START WITH 50;
CREATE SEQUENCE crm_users_seq START WITH 50;
CREATE SEQUENCE crm_pdf_seq START WITH 50;
CREATE SEQUENCE crm_document_seq START WITH 50;
CREATE SEQUENCE crm_entities_seq START WITH 50;
CREATE SEQUENCE crm_contact_seq START WITH 50;
CREATE SEQUENCE crm_phone_seq START WITH 50;
CREATE SEQUENCE crm_phone_type_seq START WITH 50;
CREATE SEQUENCE crm_address_seq START WITH 50;
CREATE SEQUENCE crm_email_seq START WITH 50;
CREATE SEQUENCE crm_email_type_seq START WITH 50;
CREATE SEQUENCE crm_licencee_list_seq START WITH 50;
CREATE SEQUENCE crm_social_media_seq START WITH 50;
CREATE SEQUENCE crm_social_media_type_seq START WITH 50;
CREATE SEQUENCE crm_client_list_seq START WITH 50;
CREATE SEQUENCE crm_products_seq START WITH 50;
CREATE SEQUENCE crm_alch_products_seq START WITH 50;
CREATE SEQUENCE crm_non_alch_products_seq START WITH 50;
CREATE SEQUENCE crm_products_bc_alcoholic_seq START WITH 50;
CREATE SEQUENCE crm_supplier_seq START WITH 50;
CREATE SEQUENCE crm_supplier_type_seq START WITH 50;
CREATE SEQUENCE crm_alch_classes_seq START WITH 50;
CREATE SEQUENCE crm_non_alch_classes_seq START WITH 50;
CREATE SEQUENCE crm_contact_class_seq START WITH 50;
CREATE SEQUENCE crm_entity_class_seq START WITH 50;
CREATE SEQUENCE crm_supplier_contact_seq START WITH 50;
CREATE SEQUENCE crm_client_type_seq START WITH 50;
CREATE SEQUENCE crm_client_seq START WITH 50;
CREATE SEQUENCE crm_client_contact_seq START WITH 50;
CREATE SEQUENCE crm_sales_rep_assignment_seq START WITH 50;
CREATE SEQUENCE crm_products_bc_seq START WITH 50;
CREATE SEQUENCE crm_sales_call_seq START WITH 50;
CREATE SEQUENCE crm_product_tasting_seq START WITH 50;
CREATE SEQUENCE crm_country_code_seq START WITH 100;
CREATE SEQUENCE crm_province_state_seq START WITH 250;
CREATE SEQUENCE crm_product_class_seq START WITH 50;


CREATE TABLE crm_roles (
  id INTEGER DEFAULT nextval('crm_roles_seq') PRIMARY KEY,
  role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE crm_permissions (
  id INTEGER DEFAULT nextval('crm_permissions_seq') PRIMARY KEY,
  route_name VARCHAR(50) NOT NULL,
  table_name VARCHAR(50) NOT NULL,
  
  can_read BOOLEAN DEFAULT false,
  can_write BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false
);

CREATE TABLE crm_users (
  id INTEGER DEFAULT nextval('crm_users_seq') PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);


CREATE TABLE crm_images (
  id INTEGER DEFAULT nextval('crm_images_id_seq') PRIMARY KEY,
  user_id VARCHAR(10),
  file_name VARCHAR(100),
  uuid_file_name VARCHAR(50),
  thumbnail VARCHAR(50),
  file_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_pdf (
  id INTEGER DEFAULT nextval('crm_pdf_seq') PRIMARY KEY,
  user_id INTEGER REFERENCES crm_users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  file_name TEXT,
  uuid_file_name VARCHAR(60),
  thumbnail VARCHAR(60),
  file_description TEXT
);

CREATE TABLE crm_document (
  id INTEGER DEFAULT nextval('crm_document_seq') PRIMARY KEY,
  user_id INTEGER REFERENCES crm_users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  file_name TEXT,
  uuid_file_name VARCHAR(60),
  file_description TEXT
);

CREATE TABLE crm_entities (
  id INTEGER DEFAULT nextval('crm_entities_seq') PRIMARY KEY,
  entity_class VARCHAR(25),
  entity_type VARCHAR(50),
  establishment BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_contact (
  id INTEGER DEFAULT nextval('crm_contact_seq') PRIMARY KEY,
  entity_id VARCHAR(25),
  contact_class VARCHAR(25),
  first_name VARCHAR(25),
  last_name VARCHAR(25),
  honorific VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE crm_phone (
  id INTEGER DEFAULT nextval('crm_phone_seq') PRIMARY KEY,
  entity_id VARCHAR(25),
  phone_number_type VARCHAR(15),
  phone_number VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_phone_type (
  id INTEGER DEFAULT nextval('crm_phone_type_seq') PRIMARY KEY,
  phone_number_type VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_address (
  id INTEGER DEFAULT nextval('crm_address_seq') PRIMARY KEY,
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
  id INTEGER DEFAULT nextval('crm_email_seq') PRIMARY KEY,
  entity_id VARCHAR(25),
  email_type VARCHAR(15),
  email VARCHAR(250),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_email_type (
  id INTEGER DEFAULT nextval('crm_email_type_seq') PRIMARY KEY,
  email_type VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE crm_licencee_list (
  id INTEGER DEFAULT nextval('crm_licencee_list_seq') PRIMARY KEY,
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
  id INTEGER DEFAULT nextval('crm_social_media_seq') PRIMARY KEY,
  entity_id VARCHAR(25),
  social_media_type VARCHAR(10),
  social_media TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_social_media_type (
  id INTEGER DEFAULT nextval('crm_social_media_type_seq') PRIMARY KEY,
  social_media_type VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE crm_client_list (
  id INTEGER DEFAULT nextval('crm_client_list_seq') PRIMARY KEY,
  entity_id VARCHAR(25),
  client_classification VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE crm_products (
  id INTEGER DEFAULT nextval('crm_products_seq') PRIMARY KEY,
  supplier_id VARCHAR(50),
  product_name VARCHAR(100),
  product_image VARCHAR(25),
  product_type VARCHAR(25),
  volume_litres DECIMAL(5,3),
  case_format SMALLINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_product_class (
  id INTEGER DEFAULT nextval('crm_product_class_seq') PRIMARY KEY,
  product_class_name VARCHAR(25)
);

CREATE TABLE crm_alch_products (
  id INTEGER DEFAULT nextval('crm_alch_products_seq') PRIMARY KEY,
  product_id VARCHAR(25),
  alcohol_percent DECIMAL(5,2),
  alch_class VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_non_alch_products (
  id INTEGER DEFAULT nextval('crm_non_alch_products_seq') PRIMARY KEY,
  product_id VARCHAR(25),
  non_alch_class VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_products_bc_alcoholic (
  id INTEGER DEFAULT nextval('crm_products_bc_alcoholic_seq') PRIMARY KEY,
  product_id VARCHAR(10),
  sku VARCHAR(10),
  status_code VARCHAR(5),
  vqa BOOLEAN DEFAULT false,
  active BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_supplier (
  id INTEGER DEFAULT nextval('crm_supplier_seq') PRIMARY KEY,
  entity_id VARCHAR(25),
  supplier_name VARCHAR(100),
  supplier_type VARCHAR(25),
  supplier_logo VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE crm_supplier_type (
  id INTEGER DEFAULT nextval('crm_supplier_type_seq') PRIMARY KEY,
  supplier_type VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  active BOOLEAN DEFAULT true
);

CREATE TABLE crm_alch_classes (
  id INTEGER DEFAULT nextval('crm_alch_classes_seq') PRIMARY KEY,
  alch_type VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_non_alch_classes (
  id INTEGER DEFAULT nextval('crm_non_alch_classes_seq') PRIMARY KEY,
  non_alch_type VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE crm_contact_class (
  id INTEGER DEFAULT nextval('crm_contact_class_seq') PRIMARY KEY,
  entity_class VARCHAR(25),
  contact_type VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_entity_class (
  id INTEGER DEFAULT nextval('crm_entity_class_seq') PRIMARY KEY,
  entity_class_name VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_supplier_contact (
  id INTEGER DEFAULT nextval('crm_supplier_contact_seq') PRIMARY KEY,
  supplier_entity_id VARCHAR(25),
  contact_entity_id VARCHAR(25),
  created_by VARCHAR(25),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_client_type (
  id INTEGER DEFAULT nextval('crm_client_type_seq') PRIMARY KEY,
  client_type VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  active BOOLEAN DEFAULT true
);

CREATE TABLE crm_client (
  id INTEGER DEFAULT nextval('crm_client_seq') PRIMARY KEY,
  entity_id VARCHAR(25),
  client_name VARCHAR(100),
  client_type VARCHAR(25),
  client_logo VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_client_contact (
  id INTEGER DEFAULT nextval('crm_client_contact_seq') PRIMARY KEY,
  client_id VARCHAR(25),
  contact_entity_id VARCHAR(25),
  created_by VARCHAR(25),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_sales_rep_assignment (
  id INTEGER DEFAULT nextval('crm_sales_rep_assignment_seq') PRIMARY KEY,
  client_entity_id VARCHAR(25),
  sales_entity_agent_id VARCHAR(25),
  active BOOLEAN DEFAULT true,
  created_by VARCHAR(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_products_bc (
  id INTEGER DEFAULT nextval('crm_products_bc_seq') PRIMARY KEY,
  product_id VARCHAR(25),
  wholesale_price SMALLINT,
  bclrs_reatail_price SMALLINT,
  bcldb_sku SMALLINT,
  bcldb_status SMALLINT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_sales_call (
  id INTEGER DEFAULT nextval('crm_sales_call_seq') PRIMARY KEY,
  client_id VARCHAR(10),
  sales_call_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_product_tasting (
  id INTEGER DEFAULT nextval('crm_product_tasting_seq') PRIMARY KEY,
  sales_call_id VARCHAR(10),
  product_if VARCHAR(10),
  tasting_feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_country_code (
  id INTEGER DEFAULT nextval('crm_country_code_seq') PRIMARY KEY,
  country_two_Letter VARCHAR(2),
  country_name VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crm_province_state (
  id INTEGER DEFAULT nextval('crm_province_state_seq') PRIMARY KEY,
  country_code VARCHAR(5),
  province_two_letter VARCHAR(5),
  province_state_name VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
