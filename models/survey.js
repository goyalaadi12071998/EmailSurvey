const mongoose = require('mongoose');
const recipientSchema = require('./recipient');

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
            type: [recipientSchema]
        },
        yes: {
            type: Number,
            default: 0
        },
        no: {
            type: Number,
            default: 0
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        dateSent: {
            type: Date
        },
        lastResponded: {
            type: Date
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