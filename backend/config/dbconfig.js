const  mongoose= require("mongoose");


const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("Db is connected");

    }
         catch (error) {
        console.log(error);
    }
};

module.exports = dbConnect;
 