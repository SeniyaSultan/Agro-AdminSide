const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGODB_URI exists
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }

    console.log('Attempting to connect to MongoDB...');
    
    // Configure mongoose options
    const options = {
      dbName: 'farmer_db',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('querySrv EREFUSED')) {
      console.error('\n🔧 SOLUTION: This is a DNS resolution issue.');
      console.error('1. Check your internet connection');
      console.error('2. Try using a different DNS server (8.8.8.8 or 1.1.1.1)');
      console.error('3. Use the alternative connection string format');
      console.error('4. Check if your firewall is blocking DNS queries');
    }
    
    // Don't exit the process, just log the error
    throw error;
  }
};

module.exports = connectDB;
