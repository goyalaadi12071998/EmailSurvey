const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        googleId: { 
            type: String,
            required: true,
            unique: true
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