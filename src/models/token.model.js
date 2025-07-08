import { Schema, model } from 'mongoose';

const blacklistedTokenSchema = new Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// Auto delete expired tokens
blacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default model('BlacklistedToken', blacklistedTokenSchema);
