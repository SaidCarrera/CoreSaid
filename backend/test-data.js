const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Book = require('./models/Book');

async function seedTestData() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await User.create({
    name: 'Admin User',
    email: 'admin@library.com',
    password: adminPassword,
    role: 'admin'
  });

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  await User.create({
    name: 'Test User',
    email: 'user@library.com',
    password: userPassword,
    role: 'user'
  });

  // Create sample books
  await Book.create([
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      ISBN: '978-0743273565',
      publicationYear: 1925,
      language: 'English',
      category: 'fiction',
      available: true
    },
    {
      title: '1984',
      author: 'George Orwell',
      ISBN: '978-0451524935',
      publicationYear: 1949,
      language: 'English',
      category: 'fiction',
      available: true
    },
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      ISBN: '978-0132350884',
      publicationYear: 2008,
      language: 'English',
      category: 'technology',
      available: true
    }
  ]);
}

module.exports = seedTestData;