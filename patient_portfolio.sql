-- ============================================================================
-- Patient Portfolio Database Initialization Script
-- ============================================================================
-- This script has TWO steps:
--   STEP 1: Connect to the default "postgres" database and create the
--           "patient_portfolio" database (if it doesn't exist).
--   STEP 2: Connect to "patient_portfolio" and create tables / indexes.
--
-- HOW TO RUN (choose one method):
--
--   Option A  – psql (recommended):
--       psql -U postgres -f patient_portfolio.sql
--
--   Option B  – pgAdmin:
--       1. Connect to the "postgres" database, run STEP 1 only.
--       2. Then connect to "patient_portfolio", run STEP 2 only.
-- ============================================================================


-- ============================================================================
-- STEP 1: Create the database  (run while connected to "postgres" database)
-- ============================================================================
-- NOTE: CREATE DATABASE cannot run inside a transaction block.
-- If using psql, the lines below work directly.
-- If using pgAdmin, run this block first against the "postgres" database.

-- Check if database exists before creating
SELECT 'CREATE DATABASE patient_portfolio'
WHERE NOT EXISTS (
    SELECT FROM pg_database WHERE datname = 'patient_portfolio'
)\gexec

-- ============================================================================
-- STEP 2: Create tables  (run while connected to "patient_portfolio" database)
-- ============================================================================
-- If using psql with the full file, uncomment the next line:
-- \c patient_portfolio

-- Create UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM type for Gender (safe to re-run)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_enum') THEN
        CREATE TYPE gender_enum AS ENUM ('Male', 'Female', 'Other', 'PreferNotToSay');
    END IF;
END
$$;

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    gender gender_enum,
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create indexes (IF NOT EXISTS is implicit for CREATE INDEX IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_patients_first_name ON patients(first_name);
CREATE INDEX IF NOT EXISTS idx_patients_last_name ON patients(last_name);
CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
CREATE INDEX IF NOT EXISTS idx_patients_created_at ON patients(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_patients_updated_at ON patients(updated_at DESC);

-- Add constraint for email format (skip if already exists)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'check_email_format'
    ) THEN
        ALTER TABLE patients
        ADD CONSTRAINT check_email_format
        CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$');
    END IF;
END
$$;

-- Create alembic_version table for migration tracking
CREATE TABLE IF NOT EXISTS alembic_version (
    version_num VARCHAR(32) NOT NULL,
    CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);

-- Sample data (optional - uncomment if needed)
-- INSERT INTO patients (first_name, last_name, dob, gender, phone, email, address, notes)
-- VALUES ('John', 'Doe', '1990-01-15', 'Male', '555-1234', 'john.doe@example.com', '123 Main St', 'Sample patient');

-- ============================================================================
-- Done! The "patient_portfolio" database and all tables are ready.
-- ============================================================================
