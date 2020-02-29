import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        content: {
            type: String,
        },
    },
    { timestamps: true },
);

export default mongoose.model('sectionModel', SectionSchema);
