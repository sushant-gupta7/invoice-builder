const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const schema = mongoose.Schema;
const ClientSchema = new schema({
  firstName: {type:String , required:true},
  lastName: {type:String , required:true},
  email: {type:String , required:true},
  mobile: {type:String , required:true},
}, {strict: false});
ClientSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Client' , ClientSchema);
