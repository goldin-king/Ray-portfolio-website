-- SQL script to create the necessary database tables for the portfolio website

-- Create database
CREATE DATABASE IF NOT EXISTS portfolio;
USE portfolio;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    project_url VARCHAR(255),
    github_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create project tags table
CREATE TABLE IF NOT EXISTS project_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    tag_name VARCHAR(50),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    skill_name VARCHAR(100) NOT NULL
);

-- Insert sample projects
INSERT INTO projects (title, description, image_url) VALUES
('E-Commerce API', 'RESTful API for e-commerce with authentication, payment processing, and order management', 'images/project1.jpg'),
('Health Tracking Dashboard', 'Real-time dashboard for monitoring health metrics with data visualization', 'images/project2.jpg'),
('Inventory Management System', 'Full-stack inventory system with barcode scanning and automated reporting', 'images/project3.jpg'),
('Mobile Banking App', 'Secure mobile banking application with biometric authentication and transaction history', 'images/project4.jpg'),
('AI Content Generator', 'Web application that leverages AI to generate marketing content and social media posts', 'images/project5.jpg'),
('DevOps Automation Tool', 'CLI tool for automating deployment workflows and infrastructure management', 'images/project6.jpg');

-- Insert cybersecurity projects
INSERT INTO projects (title, description, image_url) VALUES
('Security Vulnerability Scanner', 'Automated security scanner that identifies vulnerabilities in web applications and provides remediation recommendations', 'images/project7.jpg'),
('Secure Authentication System', 'Multi-factor authentication system with biometric verification and advanced threat detection', 'images/project8.jpg');

-- Insert sample project tags
INSERT INTO project_tags (project_id, tag_name) VALUES
(1, 'Node.js'), (1, 'Express'), (1, 'MongoDB'), (1, 'JWT'),
(2, 'React'), (2, 'D3.js'), (2, 'Firebase'), (2, 'Tailwind CSS'),
(3, 'JavaScript'), (3, 'PostgreSQL'), (3, 'Express'), (3, 'TypeScript'),
(4, 'JavaScript'), (4, 'HTML/CSS'), (4, 'Node.js'), (4, 'OAuth'),
(5, 'Python'), (5, 'Flask'), (5, 'OpenAI API'), (5, 'JavaScript'),
(6, 'Go'), (6, 'Docker'), (6, 'AWS'), (6, 'Terraform');

-- Insert project tags for cybersecurity projects
INSERT INTO project_tags (project_id, tag_name) VALUES
(7, 'Python'), (7, 'Security'), (7, 'Docker'), (7, 'REST API'),
(8, 'Node.js'), (8, 'Security'), (8, 'Biometrics'), (8, 'JWT');

-- Insert sample skills
INSERT INTO skills (category, skill_name) VALUES
('Programming Languages', 'JavaScript'),
('Programming Languages', 'TypeScript'),
('Programming Languages', 'Python'),
('Programming Languages', 'Java'),
('Programming Languages', 'HTML/CSS'),
('Frameworks & Libraries', 'React'),
('Frameworks & Libraries', 'Node.js'),
('Frameworks & Libraries', 'Express'),
('Frameworks & Libraries', 'Django'),
('Frameworks & Libraries', 'jQuery'),
('Tools & Technologies', 'Git'),
('Tools & Technologies', 'Docker'),
('Tools & Technologies', 'AWS'),
('Tools & Technologies', 'MongoDB'),
('Tools & Technologies', 'PostgreSQL');

-- Insert cybersecurity skills
INSERT INTO skills (category, skill_name) VALUES
('Cybersecurity', 'Vulnerability Assessment'),
('Cybersecurity', 'Penetration Testing'),
('Cybersecurity', 'Network Security'),
('Cybersecurity', 'Security Compliance'),
('Cybersecurity', 'Threat Analysis'),
('Cybersecurity', 'Incident Response'),
('Cybersecurity', 'Secure Coding Practices');

