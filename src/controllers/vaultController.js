import VaultEntry from '../models/VaultEntry.js';
import { encrypt, decrypt, deriveKey } from '../utils/encryptor.js';

export async function createVaultEntry(req, res) {
  try {
    const { label, username, secret } = req.body;
    const keyHex = deriveKey(req.user.passwordHash);
    const { ciphertext, iv } = encrypt(secret, keyHex);
    const entry = await VaultEntry.create({
      owner: req.user._id,
      label,
      username,
      secret: ciphertext,
      iv
    });
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getVaultEntries(req, res) {
  try {
    const entries = await VaultEntry.find({ owner: req.user._id });
    const keyHex = deriveKey(req.user.passwordHash);
    const decrypted = entries.map(e => ({
      _id: e._id,
      label: e.label,
      username: e.username,
      secret: decrypt(e.secret, keyHex, e.iv),
      createdAt: e.createdAt
    }));
    res.json(decrypted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
