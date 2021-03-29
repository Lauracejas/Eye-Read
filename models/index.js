const User = require('./User');
const Book = require('./Book');

Book.belongsTo(User);

User.hasMany(Book, {
    foreignKey: 'reader_id',
    onDelete: 'CASCADE',
});



module.exports = { Book, User };