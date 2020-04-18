import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema(
    {
        no_kontrak: String,
        id_sppbj: String,
        id_jamlak: String,
        template_id: String,
        form_data: Object,
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

export default mongoose.model('contract', contractSchema);
