require('dotenv').config();
const mongoose = require('mongoose');
const seedTestData = require('./test-data');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await mongoose.connection.dropDatabase();
    console.log('Dropped existing database');

    // Seed new test data
    await seedTestData();
    console.log('Successfully seeded test data');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}