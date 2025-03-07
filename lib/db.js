const mongoose = require('mongoose')

module.exports = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL,{
            dbName: "beta-house"
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
};


// module.exports = async () => {
//     try {
//       const conn = await mongoose.connect(process.env.DB_URL, {
//         dbName: "beta-house",
//       });
//       console.log(`MongoDB connected: ${conn.connection.host}`);
//     } catch (error) {
//       console.error(`Error connecting to MongoDB: ${error.message}`);
//       process.exit(1);
//     }
//   };
