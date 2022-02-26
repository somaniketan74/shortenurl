import mongoose from '../providers/Database';
const { Schema } = mongoose;
const UrlClickSchema = new mongoose.Schema({
	identifier: { type: String, required: true, index: true},
    data: { type: Array }
}, {
	timestamps: true
});
const UrlClick = mongoose.model('UrlClick', UrlClickSchema);

export default UrlClick;