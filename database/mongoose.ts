import mongoose from "mongoose";

const MONGO_URI = process.env.DATABASE_URL;


declare global{
    var mongoosecache: { conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
    };
}

const cache=global.mongoosecache;
if(!cache){
    global.mongoosecache={conn:null,promise:null};
}

async function dbConnect(){
    if (!MONGO_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}
    if(cache.conn){
        return cache.conn;
    }
    if(!cache.promise){
        cache.promise=mongoose.connect(MONGO_URI,{bufferCommands:false})

    }
    try {
        cache.conn=await cache.promise;
        return cache.conn;
    } catch (error) {
        cache.promise=null;
        throw error;
        
    }
    console.log(`MongoDB connected to ${MONGO_URI}`);

}

export default dbConnect;
