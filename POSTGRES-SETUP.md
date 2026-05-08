# PostgreSQL Setup Guide for TVSA Academy

This guide will help you set up PostgreSQL with pgAdmin for the Thinker's Village Soccer Academy website.

## 🐘 Prerequisites

- PostgreSQL installed on your system
- pgAdmin 4 (recommended for database management)
- Node.js 18+
- npm or yarn

## 📋 Setup Steps

### 1. Install PostgreSQL

#### Windows:
```bash
# Download from https://www.postgresql.org/download/windows/
# Run the installer and remember your password
```

#### macOS:
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql

# Or download from https://www.postgresql.org/download/macosx/
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Install pgAdmin

#### Windows:
- Download from https://www.pgadmin.org/download/windows.php
- Run the installer

#### macOS:
```bash
# Using Homebrew
brew install --cask pgadmin4
```

#### Linux:
```bash
# Ubuntu/Debian
sudo apt install pgadmin4

# Or download from https://www.pgadmin.org/download/
```

### 3. Create Database in pgAdmin

1. **Open pgAdmin** and connect to your PostgreSQL server
2. **Right-click** on "Databases" → "Create" → "Database"
3. **Enter database name:** `tvs_academy`
4. **Click "Save"**

### 4. Configure Environment Variables

Create a `.env` file in your project root:

```env
# PostgreSQL Connection
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/tvs_academy

# Alternative formats:
# DATABASE_URL=postgresql://username:password@localhost:5432/tvs_academy?schema=public
# DATABASE_URL=postgres://username:password@localhost:5432/tvs_academy

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Other configurations
NODE_ENV=development
```

**Important:** Replace `your_password` with your actual PostgreSQL password.

### 5. Install Dependencies

```bash
npm install
```

### 6. Set Up Prisma

```bash
# Generate Prisma client
npx prisma generate

# Create database schema
npx prisma db push

# (Optional) View database in browser
npx prisma studio
```

### 7. Start the Development Server

```bash
npm run dev
```

## 🔧 Database Schema

The database includes the following tables:

### Users Table
- **id**: Primary key (UUID)
- **email**: Unique email address
- **password**: Hashed password
- **name**: User's full name
- **role**: MANAGER, FAN, or PLAYER
- **profileImage**: Profile picture URL
- **phoneNumber**: Contact number
- **address**: Physical address
- **dateOfBirth**: Birth date
- **isActive**: Account status
- **createdAt/updatedAt**: Timestamps

### Players Table
- **id**: Primary key (UUID)
- **userId**: Foreign key to users table
- **jerseyNumber**: Player's jersey number
- **position**: GOALKEEPER, DEFENDER, MIDFIELDER, FORWARD
- **skills**: Speed, shooting, passing, dribbling, defending, physical
- **team**: U_15, U_17, U_20, SENIOR
- **status**: ACTIVE, INJURED, SUSPENDED, TRANSFERRED
- **medicalInfo**: Allergies, medications, emergency contacts

### Coaches Table
- **id**: Primary key (UUID)
- **userId**: Foreign key to users table
- **specialization**: Areas of expertise
- **experience**: Years of coaching experience
- **certifications**: Coaching certifications
- **teams**: Teams they coach
- **availability**: Weekly schedule
- **status**: ACTIVE, ON_LEAVE, INACTIVE

### Gallery Table
- **id**: Primary key (UUID)
- **title**: Image title
- **description**: Image description
- **imageUrl**: Cloudinary URL
- **category**: MATCH, TRAINING, EVENT, AWARD, FACILITY, TEAM
- **tags**: Searchable tags
- **uploadedBy**: Foreign key to users table
- **likes/views**: Engagement metrics

## 🛠 Common Issues & Solutions

### Issue 1: Connection Failed
```
Error: Can't reach database server
```
**Solution:**
1. Check if PostgreSQL is running: `pg_isready`
2. Verify your DATABASE_URL format
3. Check firewall settings

### Issue 2: Permission Denied
```
Error: permission denied for database
```
**Solution:**
1. Grant permissions to your user:
   ```sql
   GRANT ALL PRIVILEGES ON DATABASE tvs_academy TO your_username;
   ```
2. Or use the postgres superuser account

### Issue 3: Prisma Migration Issues
```
Error: P2024: The database schema is not in sync
```
**Solution:**
```bash
npx prisma db push --force-reset
```

### Issue 4: Port Already in Use
```
Error: port 5432 is already in use
```
**Solution:**
1. Check what's using the port: `lsof -i :5432`
2. Kill the process or change PostgreSQL port

## 🗄 Database Management with pgAdmin

### View Tables
1. **Expand** your server → Databases → tvs_academy → Schemas → public → Tables
2. **Double-click** any table to view data

### Run Queries
1. **Right-click** on the database → "Query Tool"
2. **Write SQL queries** in the editor
3. **Click "Execute"** (F5) to run

### Backup Database
1. **Right-click** on tvs_academy database
2. **Select "Backup"**
3. **Choose format** (Custom recommended)
4. **Set filename** and click "Backup"

### Restore Database
1. **Right-click** on Databases → "Restore"
2. **Select your backup file**
3. **Click "Restore"**

## 📊 Sample Data

You can add sample data using pgAdmin's Query Tool:

```sql
-- Sample Manager
INSERT INTO users (id, email, password, name, role) VALUES 
('manager-001', 'manager@tvsacademy.org', '$2a$12$hashedpassword', 'Academy Manager', 'MANAGER');

-- Sample Player
INSERT INTO users (id, email, password, name, role) VALUES 
('player-001', 'player@tvsacademy.org', '$2a$12$hashedpassword', 'John Doe', 'PLAYER');

-- Sample Fan
INSERT INTO users (id, email, password, name, role) VALUES 
('fan-001', 'fan@tvsacademy.org', '$2a$12$hashedpassword', 'Jane Smith', 'FAN');
```

## 🚀 Next Steps

1. **Test the connection** by running `npm run dev`
2. **Register a manager account** at `/auth/register`
3. **Add players and coaches** through the manager dashboard
4. **Upload images** to the gallery
5. **Test all user roles** and permissions

## 📞 Support

If you encounter issues:
- Check PostgreSQL logs: `/var/log/postgresql/`
- Verify pgAdmin connection settings
- Ensure all environment variables are set correctly
- Check that all required ports are open

---

**Ready to go! 🎉 Your TVSA Academy website is now configured to use PostgreSQL with pgAdmin!**
