import mongoose from "mongoose";

const vaultSchema = new mongoose.Schema({
  label: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("VaultItem", vaultSchema);
