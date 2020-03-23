import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate'
const schema = mongoose.Schema;
const ClientSchema = new schema({
  firstName: {type:String , required:true},
  lastName: {type:String , required:true},
  email: {type:String , required:true},
  mobile: {type:String , required:true},
}, {strict: false});
ClientSchema.plugin(mongoosePaginate);
export default mongoose.model('Client' , ClientSchema)
