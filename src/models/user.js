import mongoose from 'mongoose';
import constants from '../config/constants';

const UserSchema = new mongoose.Schema(
    {
        nama: {
            type: String,
        },
        username: String,
        password: String,
        role: {
            type: Number,
            default: constants.ROLE_ADMIN,
        },
    },
    { timestamps: true },
);

export default mongoose.model('userModel', UserSchema);
