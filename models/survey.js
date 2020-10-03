const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        body: {
            type: String
        },
        subject: {
            type: String
        },
        recipients: {
            type: [String]
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

module.exports = mongoose.model('Survey',surveySchema);