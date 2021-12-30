var mongoose=require('mongoose');
var Schema=mongoose.Schema;

const options= {
    timestamps: {
        createAt:'create_at',
        updatedAt:'update_at'
    }
};
var myschema=new Schema({

    fileName: {type: 'String'},
    fieldMappingObject: [],
    filePath: {type: 'String'},
    skipFirstRow:{type: 'String'},
    totalRecords:{type: 'String'},
    duplicates:{type: 'String'},
    discarded:{type: 'String'},
    totalUploaded:{type: 'String'},
    uploadedBy:{type:mongoose.Schema.Types.ObjectId},
    status: {type: 'String'}
},options);

module.exports=mongoose.model('csvFileSchema',myschema);