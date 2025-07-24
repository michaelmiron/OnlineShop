const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024';
    
    await mongoose.connect(uri);
    
    console.log('Connected to MongoDB via Mongoose');
    
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to application termination');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    console.log('\nTo fix this, please:');
    console.log('1. Create a new MongoDB Atlas cluster at https://cloud.mongodb.com');
    console.log('2. Get your connection string');
    console.log('3. Update the MONGODB_URI in your .env file');
    console.log('4. Make sure your IP address is whitelisted in Atlas\n');
    process.exit(1);
  }
};

module.exports = connectDB;
