import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors'
import {router} from './config/routes';

// mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Sushant-gupta7:sushant7@cluster0-hv5jx.mongodb.net/test', 
{ useNewUrlParser: true , useUnifiedTopology: true}).then(
    console.log('Mongo DB Connected')
).catch(err=>{
    console.log(err)
});
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(logger('dev'))
app.use('/api' , router)

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.message = 'Invalid aRoute';
    error.status = '404'
    next(error);
})
app.use((error,req,res,next)=>{
    return res.json({
        error:{
            message:error.message 
        }
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
