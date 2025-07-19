const mongoose = require('mongoose');

const mongoUrl = 'mongodb://127.0.0.1:27017/mydatabase';

async function run() {
  console.log("🚀 Starting script...");

  try {
    // connect to mongodb
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected!');

    // define schema
    const userSchema = new mongoose.Schema({
      name: String,
      age: Number,
      email: String,
      createdAt: { type: Date, default: Date.now },
    });

    const User = mongoose.model('User', userSchema);

    // create documents
    await User.insertMany([
      { name: 'Alice', age: 25, email: 'alice@example.com' },
      { name: 'Bob', age: 30, email: 'bob@example.com' },
      { name: 'Charlie', age: 22, email: 'charlie@example.com' },
    ]);
    console.log('✅ Users inserted.');

    const allUsers = await User.find();
    console.log('All Users:', allUsers);

    const olderUsers = await User.find({ age: { $gt: 24 } });
    console.log('Users older than 24:', olderUsers);

    const updateResult = await User.updateOne(
      { name: 'Bob' },
      { $set: { age: 35 } }
    );
    console.log('Update result:', updateResult);

    const bob = await User.findOne({ name: 'Bob' });
    console.log('Updated Bob:', bob);

    const deleteResult = await User.deleteOne({ name: 'Charlie' });
    console.log('Delete result:', deleteResult);

    const remainingUsers = await User.find();
    console.log('Remaining Users:', remainingUsers);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected.');
    process.exit();
  }
}

run();
