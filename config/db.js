// const mongoose = require('mongoose')
// import mongoose from 'mongoose';
// const { connect } = mongoose;    // with this you can directly use 'connect()' instead of 'mongoose.connect()'

const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB connected: ${conn.connection.host}`)

    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}


// export default connectDB
module.exports = connectDB