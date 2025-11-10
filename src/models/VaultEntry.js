import mongoose from 'mongoose';

const vaultSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  label: { type: String, required: true },
  username: { type: String },
  secret: { type: String, required: true },
  iv: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('VaultEntry', vaultSchema);
