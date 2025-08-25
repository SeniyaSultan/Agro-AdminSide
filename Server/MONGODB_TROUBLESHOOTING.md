# MongoDB Connection Troubleshooting Guide

## Error: `querySrv EREFUSED _mongodb._tcp.seniya.ypfbx.mongodb.net`

This error indicates a DNS resolution issue with MongoDB Atlas SRV records.

## Quick Fixes

### 1. Check your .env file

Make sure you have a `.env` file in the Server directory with the correct MongoDB URI:

```bash
# Copy the example file
cp .env.example .env

# Edit the .env file and update the MONGODB_URI
```

### 2. Use Local MongoDB (Recommended for Development)

For local development, use a local MongoDB instance:

```env
MONGODB_URI=mongodb://localhost:27017/farmer_db
```

### 3. Fix DNS Issues for MongoDB Atlas

If you need to use MongoDB Atlas:

1. **Change DNS servers** to Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1)
2. **Use alternative connection string** (non-SRV format):
   ```
   MONGODB_URI=mongodb://username:password@cluster0-shard-00-00.mongodb.net:27017,cluster0-shard-00-01.mongodb.net:27017,cluster0-shard-00-02.mongodb.net:27017/farmer_db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
   ```

### 4. Install MongoDB Locally

If you don't have MongoDB installed:

**Windows:**

```bash
# Download from: https://www.mongodb.com/try/download/community
# Install MongoDB Compass for GUI management
```

**Mac:**

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**

```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
```

### 5. Test Connection

Test your MongoDB connection:

```bash
# Start MongoDB locally
mongod

# In another terminal, test connection
mongo
```

## Environment Variables

Create a `.env` file in the Server directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/farmer_db
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
```

## Common Issues and Solutions

1. **MongoDB not running**: Start MongoDB service
2. **Wrong credentials**: Check username/password in connection string
3. **Network issues**: Check internet connection and DNS settings
4. **Firewall blocking**: Allow MongoDB through firewall
5. **IP not whitelisted**: Add your IP to MongoDB Atlas whitelist

## Testing the Connection

After making changes, restart the server:

```bash
cd Server
npm run dev
```

The server should now start without the MongoDB connection error.
