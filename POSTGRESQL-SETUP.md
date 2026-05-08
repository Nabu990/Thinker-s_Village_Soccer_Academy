# PostgreSQL Setup Guide for TVSA Academy

Since MongoDB is not working, we've migrated to PostgreSQL with Prisma ORM. Here's how to set it up:

## Why PostgreSQL?

- **Free and open-source**
- **More reliable than cloud services**
- **Better performance with Prisma ORM**
- **Easy to install on Linux**
- **Professional-grade database**

## Step-by-Step Setup

### 1. Install PostgreSQL

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

#### CentOS/RHEL:
```bash
sudo yum install postgresql-server postgresql-contrib
sudo postgresql-setup initdb
```

### 2. Start PostgreSQL Service

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 3. Create Database and User

```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL shell:
CREATE DATABASE tvs_academy;
CREATE USER tvs_user WITH PASSWORD 'your_password_here';
GRANT ALL PRIVILEGES ON DATABASE tvs_academy TO tvs_user;
\q
```

### 4. Update Environment Variables

Update your `.env` file with your database credentials:

```env
DATABASE_URL=postgresql://tvs_user:your_password_here@localhost:5432/tvs_academy
```

### 5. Install Prisma Dependencies

```bash
npm install prisma @prisma/client
```

### 6. Generate Prisma Client

```bash
npx prisma generate
```

### 7. Create Database Schema

```bash
npx prisma db push
```

### 8. Start Development Server

```bash
npm run dev
```

## Alternative: Docker PostgreSQL

If you prefer using Docker:

```bash
# Pull PostgreSQL image
docker pull postgres:15

# Run PostgreSQL container
docker run --name tvs-postgres \
  -e POSTGRES_DB=tvs_academy \
  -e POSTGRES_USER=tvs_user \
  -e POSTGRES_PASSWORD=your_password_here \
  -p 5432:5432 \
  -d postgres:15

# Update .env with Docker connection string
DATABASE_URL=postgresql://tvs_user:your_password_here@localhost:5432/tvs_academy
```

## Troubleshooting

### Connection Refused
- Make sure PostgreSQL service is running: `sudo systemctl status postgresql`
- Check if port 5432 is open
- Verify database name and credentials

### Permission Denied
- Ensure the user has privileges on the database
- Check PostgreSQL logs: `sudo journalctl -u postgresql`

### Prisma Issues
- Run `npx prisma generate` after schema changes
- Use `npx prisma db push` to sync schema
- Check `prisma/schema.prisma` for errors

## Database Schema Overview

The application uses these tables:

- **users** - Authentication and user profiles
- **players** - Player profiles with skills and stats
- **coaches** - Coach profiles and schedules
- **gallery** - Image gallery with categories

## Security Best Practices

1. **Use strong passwords** for database users
2. **Limit database access** to specific users
3. **Regular backups** with `pg_dump`
4. **Monitor logs** for unusual activity
5. **Keep PostgreSQL updated** with security patches

## Backup and Restore

### Backup:
```bash
pg_dump -U tvs_user -h localhost tvs_academy > backup.sql
```

### Restore:
```bash
psql -U tvs_user -h localhost tvs_academy < backup.sql
```

## Next Steps

Once PostgreSQL is set up:

1. The application will automatically create the database structure
2. You can register users through the registration page
3. All data will be stored in your PostgreSQL database
4. Use `npx prisma studio` for a visual database browser

## Support

- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Prisma Documentation: https://www.prisma.io/docs/
- Stack Overflow: https://stackoverflow.com/questions/tagged/postgresql
