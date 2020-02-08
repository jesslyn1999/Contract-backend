import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        nama: {
            type: String,
        },
        nim: {
            type: Number,
            index: true,
        },
        bidang: {
            type: String,
        },
        divisi: {
            type: String,
        },
        jabatan_struktural: {
            type: String,
        },
        jabatan_eventual: {
            type: String,
        },
        solidaritas: Number,

        password: String,
        role: {
            type: String,
            default: 'user',
        },
    },
    { timestamps: true },
);

export default mongoose.model('userModel', UserSchema);
