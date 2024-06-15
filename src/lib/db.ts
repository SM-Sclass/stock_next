import mysql from 'mysql2'
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"$UM!T376mysql",
    database:"userauth"
});


db.connect((err:Error | null)=>{
    if(err){
        console.error("Error has occured " , err);
    }else{
        console.log("successfully connected");
    }
});
export default db