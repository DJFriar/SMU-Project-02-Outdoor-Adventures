module.exports = function(sequelize, DataTypes) {
  const Profile = sequelize.define("Profile", {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parkID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isWishlist: {
      type: DataTypes.BOOLEAN,
      default: 0
    },
    hasVisited: {
      type: DataTypes.BOOLEAN,
      default: 0
    }
  });

  return Profile;
};
