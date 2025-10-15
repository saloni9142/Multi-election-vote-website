const {Schema, model, Types} =require('mongoose')


const electionSchema= new Schema({
    title: {type:String, required:true},
    description: {type:String, required: true},
    thumbnail: {type:String,required: true},
    candidates: [{type: Types.ObjectId,required:true, ref:"candidate"}],
    voters: [{type: Types.ObjectId,required:true, ref:"voter"}]

})

module.exports=model("Election", electionSchema)