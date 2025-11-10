import VaultItem from "../models/VaultItem.js";
import { encrypt, decrypt } from "../utils/crypto.js";

export const savePassword = async (req, res) => {
  try {
    const { label, username, password } = req.body;
    const encryptedPassword = encrypt(password);
    const newItem = new VaultItem({ label, username, password: encryptedPassword });
    await newItem.save();
    res.json({ message: "Password saved securely ✅" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save password ❌" });
  }
};

export const getPasswords = async (req, res) => {
  try {
    const items = await VaultItem.find();
    const decrypted = items.map(i => ({
      label: i.label,
      username: i.username,
      password: decrypt(i.password)
    }));
    res.json(decrypted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch passwords ❌" });
  }
};
