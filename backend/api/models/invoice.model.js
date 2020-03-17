import mongoose from 'mongoose';
const schema = mongoose.Schema;
const InvoiceSchema =  new schema({
  item: {type:String , required:true},
  qty: {type:Number , required:true},
  date: {type:Date , required:true},
  due: {type:Date , required:true},
  rate: {type:Number },
  tax: {type:Number}
});

export default mongoose.model('Invoice' , InvoiceSchema)
