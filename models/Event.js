const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    event_image: {
      type: DataTypes.BLOB,
    },  
    event_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_artists: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Array of strings for artists
      allowNull: true,
      defaultValue: [], // Default empty array
    },
    event_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    event_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    event_venue: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    event_description: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
   
    user_id: {
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
    modelName: 'event',
  }
);

module.exports = Event;
