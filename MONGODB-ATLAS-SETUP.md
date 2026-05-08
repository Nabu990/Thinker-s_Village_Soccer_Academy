# MongoDB Atlas Setup Guide

Since MongoDB is not installed locally, we'll use MongoDB Atlas - a free cloud-based MongoDB service.

## Why MongoDB Atlas?

- **Free tier available** (512MB storage)
- **No local installation required**
- **Cloud-based and accessible from anywhere**
- **Automatic backups and security**
- **Easy to set up and manage**

## Step-by-Step Setup

### 1. Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" or "Sign Up"
3. Sign up with your email or Google account
4. Verify your email address

### 2. Create a New Cluster

1. After logging in, click "Build a Database"
2. Choose the **FREE** tier (M0 Sandbox)
3. Select a cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to you (e.g., "US East (Virginia)")
5. Name your cluster (e.g., "TVSA-Academy")
6. Click "Create"

### 3. Create Database User

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username: `tvsacademy` (or your preferred username)
5. Enter password: Use a strong password (save this!)
6. Set privileges: "Read and write to any database"
7. Click "Add User"

### 4. Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 5. Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select Node.js version
5. Copy the connection string (it will look like):
   ```
   mongodb+srv://tvsacademy:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 6. Update Your .env File

Replace the connection string in your `.env` file with your actual MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://tvsacademy:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/tvs-academy?retryWrites=true&w=majority
```

**Important:**
- Replace `YOUR_PASSWORD` with your actual database password
- Replace `cluster0.xxxxx` with your actual cluster name
- Keep the connection string secure - don't share it publicly

### 7. Test the Connection

1. Save the `.env` file
2. Start your development server:
   ```bash
   npm run dev
   ```

The application should now connect to MongoDB Atlas successfully.

## Alternative: Use MongoDB Compass (Optional)

MongoDB Compass is a GUI tool for managing your MongoDB database:

1. Download from [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)
2. Install and open MongoDB Compass
3. Paste your connection string
4. Click "Connect"
5. You can now view and manage your database visually

## Troubleshooting

### Connection Timeout
- Check your network connection
- Verify the IP whitelist includes 0.0.0.0/0
- Ensure your username and password are correct

### Authentication Failed
- Double-check your username and password
- Make sure the user has proper database permissions
- Try creating a new database user

### Cluster Not Ready
- Wait a few minutes after creating the cluster
- Check the cluster status in MongoDB Atlas dashboard
- Some clusters take 2-3 minutes to initialize

## Security Best Practices

1. **Never commit .env files** to version control
2. **Use strong passwords** for database users
3. **Limit IP access** in production (not 0.0.0.0/0)
4. **Enable MongoDB Atlas alerts** for monitoring
5. **Regular backups** are automatic with Atlas

## Next Steps

Once your MongoDB Atlas is set up and connected:

1. The application will automatically create the database structure
2. You can register users through the registration page
3. All data will be stored in your MongoDB Atlas cluster
4. Access your data anytime through MongoDB Compass or Atlas dashboard

## Support

If you encounter issues:
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/
- MongoDB Community Forums: https://www.mongodb.com/community/forums/
- Stack Overflow: https://stackoverflow.com/questions/tagged/mongodb-atlas
