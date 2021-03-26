const User = require('./User');
const Book = require('./Book');

User.hasMany(Book, {
    foreignKey: 'reader_id',
    onDelete: 'CASCADE'
});

Book.belongsTo(User);

module.exports = { Book, User };