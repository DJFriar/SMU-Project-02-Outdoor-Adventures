module.exports = function(sequelize, DataTypes) {
  const Parks = sequelize.define("Parks", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Parks;
};
