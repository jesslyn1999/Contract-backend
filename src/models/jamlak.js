import mongoose from 'mongoose';

const JamlakSchema = new mongoose.Schema(
    {
        no_jamlak: {
            type: String,
        },
        tgl_pembuatan: {
            type: String,
        },
        tgl_jatuh_tempo: {
            type: String,
        },
        nama_bank: {
            type: String,
        },
        alamat_bank: {
            type: String,
        },
        nominal_garansi: {
            type: Number,
        },
        no_sppbj: {
            type: String,
        },
    },
    { timestamps: true },
);

export default mongoose.model('jamlakModel', JamlakSchema);
