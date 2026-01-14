import dbConnect from './mongoose.js';

async function testConnection() {
    try {
        console.log('Testing MongoDB connection...');
        const connection = await dbConnect();
        console.log('✓ Database connection successful!');
        console.log('MongoDB URI:', process.env.DATABASE_URL);
        console.log('Connection readyState:', connection.connection.readyState);
        process.exit(0);
    } catch (error) {
        console.error('✗ Database connection failed:', error);
        process.exit(1);
    }
}

testConnection();
