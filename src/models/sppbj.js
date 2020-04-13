import mongoose from 'mongoose';

const SPPBJSchema = new mongoose.Schema(
    {
        template_id: String,
        data_pemenang: Object,
        data_form: Object,
        generated_document: {
            data: Buffer,
            data_type: {
                type: String,
                default: 'application/pdf',
            },
        },
    },
    { timestamps: true },
);

export default mongoose.model('SPPBJ', SPPBJSchema);
