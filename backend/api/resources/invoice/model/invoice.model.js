import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate'
const schema = mongoose.Schema;
const InvoiceSchema = new schema({
  item: {type:String , required:true},
  qty: {type:Number , required:true},
  date: {type:Date , required:true},
  due: {type:Date , required:true},
  rate: {type:Number },
  tax: {type:Number},
  client: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: false
  },
}, {strict: false});
InvoiceSchema.plugin(mongoosePaginate);
export default mongoose.model('Invoice' , InvoiceSchema)
