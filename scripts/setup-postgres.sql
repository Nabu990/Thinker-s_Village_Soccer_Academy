-- PostgreSQL Database Setup Script for TVSA Academy
-- Run this script in pgAdmin or PostgreSQL to create the database and initial setup

-- Create database (if it doesn't exist)
-- Note: You may need to run this as a superuser
-- CREATE DATABASE tvs_academy;

-- Connect to the database
-- \c tvs_academy;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the database schema (this will be handled by Prisma migrations)
-- The following is for reference only - Prisma will create these tables

/*
-- Users table (created by Prisma)
CREATE TABLE users (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'FAN' CHECK (role IN ('MANAGER', 'FAN', 'PLAYER')),
    profile_image TEXT,
    phone_number VARCHAR(50),
    address TEXT,
    date_of_birth TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Players table (created by Prisma)
CREATE TABLE players (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    jersey_number INTEGER NOT NULL,
    position VARCHAR(50) NOT NULL CHECK (position IN ('GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD')),
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    preferred_foot VARCHAR(10) DEFAULT 'RIGHT' CHECK (preferred_foot IN ('LEFT', 'RIGHT', 'BOTH')),
    speed INTEGER DEFAULT 50 CHECK (speed >= 0 AND speed <= 100),
    shooting INTEGER DEFAULT 50 CHECK (shooting >= 0 AND shooting <= 100),
    passing INTEGER DEFAULT 50 CHECK (passing >= 0 AND passing <= 100),
    dribbling INTEGER DEFAULT 50 CHECK (dribbling >= 0 AND dribbling <= 100),
    defending INTEGER DEFAULT 50 CHECK (defending >= 0 AND defending <= 100),
    physical INTEGER DEFAULT 50 CHECK (physical >= 0 AND physical <= 100),
    achievements TEXT[],
    allergies TEXT,
    medications TEXT,
    emergency_contact TEXT,
    emergency_phone TEXT,
    team VARCHAR(20) DEFAULT 'U_15' CHECK (team IN ('U_15', 'U_17', 'U_20', 'SENIOR')),
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INJURED', 'SUSPENDED', 'TRANSFERRED')),
    joining_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contract_expiry TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coaches table (created by Prisma)
CREATE TABLE coaches (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    specialization TEXT[] NOT NULL,
    experience INTEGER NOT NULL,
    certifications TEXT[],
    qualifications TEXT[],
    coaching_license VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    achievements TEXT[],
    teams VARCHAR(20)[],
    hourly_rate DECIMAL(10,2),
    monday_available BOOLEAN DEFAULT false,
    monday_start TIME,
    monday_end TIME,
    tuesday_available BOOLEAN DEFAULT false,
    tuesday_start TIME,
    tuesday_end TIME,
    wednesday_available BOOLEAN DEFAULT false,
    wednesday_start TIME,
    wednesday_end TIME,
    thursday_available BOOLEAN DEFAULT false,
    thursday_start TIME,
    thursday_end TIME,
    friday_available BOOLEAN DEFAULT false,
    friday_start TIME,
    friday_end TIME,
    saturday_available BOOLEAN DEFAULT false,
    saturday_start TIME,
    saturday_end TIME,
    sunday_available BOOLEAN DEFAULT false,
    sunday_start TIME,
    sunday_end TIME,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'ON_LEAVE', 'INACTIVE')),
    joining_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contract_expiry TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery table (created by Prisma)
CREATE TABLE gallery (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_public_id VARCHAR(255) NOT NULL,
    category VARCHAR(20) DEFAULT 'TRAINING' CHECK (category IN ('MATCH', 'TRAINING', 'EVENT', 'AWARD', 'FACILITY', 'TEAM')),
    tags TEXT[],
    uploaded_by TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    featured BOOLEAN DEFAULT false,
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_players_user_id ON players(user_id);
CREATE INDEX idx_players_team ON players(team);
CREATE INDEX idx_players_status ON players(status);
CREATE INDEX idx_coaches_user_id ON coaches(user_id);
CREATE INDEX idx_coaches_status ON coaches(status);
CREATE INDEX idx_gallery_uploaded_by ON gallery(uploaded_by);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_gallery_featured ON gallery(featured);
CREATE INDEX idx_gallery_date ON gallery(date);

-- Create trigger for updated_at (Prisma handles this automatically)
*/

-- Sample data for testing (optional)
-- Note: Insert sample data after running Prisma migrations

-- Sample Manager User (password will be hashed by the application)
-- INSERT INTO users (id, email, password, name, role) VALUES 
-- ('sample-manager-id', 'manager@tvsacademy.org', 'hashed_password_here', 'Academy Manager', 'MANAGER');

-- Sample Player User
-- INSERT INTO users (id, email, password, name, role) VALUES 
-- ('sample-player-id', 'player@tvsacademy.org', 'hashed_password_here', 'Sample Player', 'PLAYER');

-- Sample Fan User
-- INSERT INTO users (id, email, password, name, role) VALUES 
-- ('sample-fan-id', 'fan@tvsacademy.org', 'hashed_password_here', 'Sample Fan', 'FAN');

COMMIT;

-- Instructions:
-- 1. Create a PostgreSQL database named 'tvs_academy' in pgAdmin
-- 2. Run this script or let Prisma handle the schema creation
-- 3. Update your .env file with the correct DATABASE_URL
-- 4. Run 'npx prisma generate' to create the Prisma client
-- 5. Run 'npx prisma db push' to create the database schema
-- 6. Run 'npx prisma studio' to view the database in your browser
