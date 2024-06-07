-- Create a new database
CREATE DATABASE IF NOT EXISTS nest_mysql;

-- Create a new user with a specified password
CREATE USER 'myuser'@'%' IDENTIFIED BY 'mypassword';

-- Grant all privileges on the new database to the new user
GRANT ALL PRIVILEGES ON nest_mysql.* TO 'myuser'@'%';

-- Apply the changes
FLUSH PRIVILEGES;
