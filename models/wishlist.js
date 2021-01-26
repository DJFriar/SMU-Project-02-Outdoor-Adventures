module.exports = function(sequelize, DataTypes) {
  const WishlistPark = sequelize.define("WishlistPark", {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parkID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return WishlistPark;
};