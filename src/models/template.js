import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema
(
    {
        title:
        {
            type: String,
            default: "",
        },
        description :
        {
            type: String,
            default: "",
        },
        content:
        {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true
    },
);

export default mongoose.model('templateModel', TemplateSchema);