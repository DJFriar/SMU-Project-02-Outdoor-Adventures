module.exports = function(sequelize, DataTypes) {
  const VisitedPark = sequelize.define("VisitedPark", {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parkID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return VisitedPark;
};