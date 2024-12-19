import mongoose from "mongoose";


export const connectDB = async(MONGODB_URI) => {
   try {
    const conn = await mongoose.connect(MONGODB_URI)
    console.log(`Database Connected: ${conn.connection.host}`)
   } catch (error) {
    console.log('Error connection to Mongodb:', error.message)
    process.exit(1); //failure
   }
}