const express =require("express")
const userRouter=require("./routes/user.routes")
const db=require("./DB/db")

const app=express()
db();
app.use(express.json());

app.use(userRouter)


const port=3000;

app.listen(port,()=>{
     console.log("listing port on 3000")
})
