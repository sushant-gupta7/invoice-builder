import express from 'express';
import {devConfig} from './api/config/env/development'
import mongoose from 'mongoose';
import {setGlobalMiddleware} from './api/middleware/global-middleware'
import routes from '../backend/api/index.route'

// mongoose.Promise = global.Promise;
mongoose.connect(devConfig.database, 
{ useNewUrlParser: true , useUnifiedTopology: true}).then(
    console.log('Mongo DB Connected')
).catch(err=>{
    console.log(err)
});
const PORT = devConfig.port;
const app = express();
setGlobalMiddleware(app);
app.use('/api' , routes)
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
