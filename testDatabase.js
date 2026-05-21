import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/smartwaste';
    console.log('\n📦 Connecting to MongoDB:', mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB Connected Successfully!\n');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

const testUsers = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/smartwaste';
    await mongoose.connect(uri);
    
    const userCollection = mongoose.connection.collection('users');
    const users = await userCollection.find({}).toArray();
    
    console.log('\n📋 Users in Database:\n');
    
    if (users.length === 0) {
      console.log('❌ No users found in database! Database might be empty.');
      return;
    }
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Password Hash: ${user.password?.substring(0, 30)}...`);
      console.log('');
    });
    
    // Test password comparison for each user
    console.log('\n🔐 Testing Passwords:\n');
    
    for (const user of users) {
      if (user.email === 'john@example.com') {
        const isValid = await bcrypt.compare('password123', user.password);
        console.log(`john@example.com + "password123": ${isValid ? '✅ WORKS' : '❌ FAILS'}`);
      }
      if (user.email === 'admin@smartwaste.com') {
        const isValid = await bcrypt.compare('admin123', user.password);
        console.log(`admin@smartwaste.com + "admin123": ${isValid ? '✅ WORKS' : '❌ FAILS'}`);
      }
      if (user.email === 'mike@gmail.com') {
        const isValid = await bcrypt.compare('worker123', user.password);
        console.log(`mike@gmail.com + "worker123": ${isValid ? '✅ WORKS' : '❌ FAILS'}`);
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

await connectDB();
await testUsers();
