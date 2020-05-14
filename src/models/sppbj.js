import mongoose from 'mongoose';

const SPPBJSchema = new mongoose.Schema(
    {
        no_sppbj: String,
        template_id: String,
        data_pemenang: Object,
        data_form: Object,
        generated_document: {
            data: Buffer,
            data_type: {
                type: String,
                default:
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            },
        },
    },
    { timestamps: true },
);

export default mongoose.model('SPPBJ', SPPBJSchema);
