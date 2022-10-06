import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error(error);
    }
}
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, "Error"))
// db.once('open', ()=>{

// })
export default connectDB;
