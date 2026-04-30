'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: 'admin'
    }
  });

  
  Admin.beforeCreate(async (admin) => {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
  });

  return Admin;
};