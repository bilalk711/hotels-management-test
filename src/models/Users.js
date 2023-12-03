const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database'); 
const bcrypt = require('bcrypt');

class Users extends Model {
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async isValidPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

Users.init({
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'users',
  hooks: {
    beforeCreate: async (user) => {
      user.password = await Users.hashPassword(user.password);
    }
  }
});

module.exports = Users;
