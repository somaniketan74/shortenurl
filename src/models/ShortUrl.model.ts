import mongoose from '../providers/Database';
const { Schema } = mongoose;
const ShortUrlSchema = new mongoose.Schema({
	userId: { type: Schema.Types.ObjectId, required: true},
    pages: { type: Array, required: true},
    shortUrl: { type: String, required: true, unique: true},
    identifier: { type: String, required: true, index: true, unique: true},
    deleted: { type: Boolean, default: false }
}, {
	timestamps: true
});
const ShortUrl = mongoose.model('ShortUrl', ShortUrlSchema);

export default ShortUrl;