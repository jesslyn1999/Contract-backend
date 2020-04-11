import mongoose from 'mongoose';

const tagPanelSchema = new mongoose.Schema(
    {
        key: {
            type: String,
        },
        value: {
            type: String,
        },
    },
    { timestamps: true },
);

export default mongoose.model('tagModel', tagPanelSchema);
