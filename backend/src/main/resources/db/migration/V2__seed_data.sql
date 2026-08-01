-- V2__seed_data.sql
-- Seed roles and sample emission factors. Admin user will be created by application initializer to ensure BCrypt hashing.

INSERT INTO roles (name) VALUES ('ROLE_ADMIN') ON CONFLICT DO NOTHING;
INSERT INTO roles (name) VALUES ('ROLE_USER') ON CONFLICT DO NOTHING;

-- Sample emission factors
INSERT INTO emission_factors (category, activity, unit, factor) VALUES
('transport','Car (petrol) per km','km',0.192),
('transport','Bus per km','km',0.089),
('electricity','Average grid per kWh','kWh',0.475),
('food','Beef per kg','kg',27.0),
('food','Chicken per kg','kg',6.9),
('shopping','Clothing per item','item',12.0)
ON CONFLICT DO NOTHING;
