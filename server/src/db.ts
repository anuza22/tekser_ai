import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // await mongoose.connect('mongodb+srv://anuza:918273645@spotify-nfact.mtnb11d.mongodb.net/');
        await mongoose.connect('mongodb+srv://anuza:918273645@tekser-ai.ecx5gdu.mongodb.net/');

        console.log('MongoDB connected...');
    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;