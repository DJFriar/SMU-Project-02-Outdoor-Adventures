module.exports = function(sequelize, DataTypes) {
  const Profile = sequelize.define("Profile", {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parkID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hasVisited: {
      type: DataTypes.BOOLEAN,
      default: 0
    }
  });

  return Profile;
};
