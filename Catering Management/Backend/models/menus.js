const mongoose=require('mongoose')

const Schema = mongoose.Schema

const menuSchema =  new Schema({

Caterer_name:{

    type:String,
    required:true
},
    
Menu_name:{

    type:String,
    required:true
},

Menu_items:{

    type:String,
    required:true
},
price:{
    type:Number,
    required:true
}

}, {timestamps:true})

module.exports=mongoose.model('Menu',menuSchema)

