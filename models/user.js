const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        },
        credits: { 
            type: Number,
            default: 10
        }
    },
    {
        toJSON: {
            transform(doc,ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

module.exports = mongoose.model('User',userSchema);