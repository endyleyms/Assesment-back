const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
UserSchema.pre('save', async function (next) {
  const user = this;
  try {
    if (!user.isModified('password')) {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (error) {
    next();
    return null;
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  const result = await bcrypt.compare(candidatePassword, user.password);
  return result;
};

UserSchema.virtual('profile').get(function () {
  const { email, _id } = this;
  return { email, _id };
});



module.exports = mongoose.model('User', UserSchema);