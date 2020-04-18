import mongoose from 'mongoose';
import moment from 'moment';

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

// Before saving user, make sure to hash and salt password
JamlakSchema.pre('save', function(next) {
    moment.locale('id');
    this.tgl_pembuatan = moment(this.tgl_pembuatan, moment.ISO_8601).format(
        'LL',
    );
    this.tgl_jatuh_tempo = moment(this.tgl_jatuh_tempo, moment.ISO_8601).format(
        'LL',
    );

    next();
});

export default mongoose.model('jamlakModel', JamlakSchema);
