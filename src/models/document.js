import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
{
    no_lampiran:
    {
        type: String,
        default: '',
    },
    tanggal_terbit:
    {
        type: String,
        default: '',
    },
    nama_pemenang:
    {
        type: String,
        default: '',
    },
    nilai_kontrak:
    {
        type: Number.
        default: 0,
    }
},
{
    timestamps: true,
});

export default mongoose.model('documentModel', documentSchema);
