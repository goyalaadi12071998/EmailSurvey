const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        googleId: { 
            type: String,
            required: true,
            unique: true
        },
        credits: { 
            type: Number,
            default: 0
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