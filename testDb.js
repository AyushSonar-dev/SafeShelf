const mongoose = require('mongoose');

const MONGO_URI = process.env.DATABASE_URL;

async function testConnection() {
    try {
        if (!MONGO_URI) {
            throw new Error('DATABASE_URL environment variable is not set');
        }
        
        console.log('Testing MongoDB connection...');
        console.log('Connection string:', MONGO_URI);
        
        const connection = await mongoose.connect(MONGO_URI, {
            bufferCommands: false
        });
        
        console.log('✓ Database connection successful!');
        console.log('Connection readyState:', connection.connection.readyState);
        console.log('Connected to database:', connection.connection.name);
        
        await mongoose.disconnect();
        console.log('✓ Connection test completed and closed');
        process.exit(0);
    } catch (error) {
        console.error('✗ Database connection failed:', error.message);
        process.exit(1);
    }
}

testConnection();
