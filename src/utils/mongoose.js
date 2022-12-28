import {connect, connection} from 'mongoose';

const conn = {
    isConnected: false
}

async function dbConnect(){
    const db = connect(process.env.MONGODB_URL);
    
    conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", ()=>{
    console.log("Mongodb is connected")
})


connection.on("err", (err)=>{
    console.log(err)
})
