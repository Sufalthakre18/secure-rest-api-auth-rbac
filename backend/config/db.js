import mongoose from 'mongoose'
// database connection
export default async function dbConnect() {
    if(mongoose.connections[0].readyState) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connection successful!");
        
    } catch (error) {
        console.error(error);
        throw new Error("database connection failed")
    }
}