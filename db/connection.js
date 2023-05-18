import mongoose from "mongoose";
import colors from 'colors'

const connectDB = async() =>{
    try {
       
        const mongourl = process.env.DB;

        const connectDB = await mongoose.connect(mongourl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName:'ecommerce'
          })
        console.log(`MongoDB Connected: ${connectDB.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`Error in MongoDB ${error}`.bgRed.white)
    }
}

export default connectDB