const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const schema = mongoose.Schema;
const InvoiceSchema = new schema({
  item: {type:String , required:true},
  qty: {type:Number , required:true},
  date: {type:Date , required:true},
  due: {type:Date , required:true},
  rate: {type:Number },
  tax: {type:Number},
  invoice_image: {type:String},
  client: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: false
  },
}, {strict: false});
InvoiceSchema.plugin(mongoosePaginate);
module.exports =  mongoose.model('Invoice' , InvoiceSchema)
