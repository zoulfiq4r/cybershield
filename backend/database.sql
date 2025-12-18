-- Create database
CREATE DATABASE IF NOT EXISTS cybershield;

USE cybershield;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role TINYINT DEFAULT 0, -- 0 = user, 1 = admin
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages from users to admins
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  reviewed TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Optional: Add some test data
-- INSERT INTO users (name, email, password) VALUES 
-- ('Test User', 'test@example.com', '$2a$10$hashedpassword');
