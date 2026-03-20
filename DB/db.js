const mongoose =require("mongoose")


const dbConnection=async()=>{
try {
          mongoose.connect("mongodb+srv://rajankumarg301_db_user:rajan123@nodeinterview.iw5sz6c.mongodb.net/")
          console.log("connect to db")
} catch (error) {
      console.log(error)
}

}

module.exports=dbConnection;