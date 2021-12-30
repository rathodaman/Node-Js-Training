module.exports = function (mongoose) {

    var options = {
        collection: 'users',
        timestamps: {
            createdAt: true,
            updatedAt: true
        },
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        },
        versionKey: false
    };

    var usersSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String
        },
        password: {
            type: String
        },
        status: {
            type: String,
            enum: ['active', 'in_active'],
            default: 'active'
        },
        deleted: {
            type: Boolean,
            default: '0'
        }
    }, options);

    return usersSchema;
};
