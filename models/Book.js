const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // description: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    image_link: {
      type: DataTypes.TEXT('medium'),
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // publish_date: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    reader_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book',
  }
);

module.exports = Book;
