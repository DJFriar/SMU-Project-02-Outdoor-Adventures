module.exports = function(sequelize, DataTypes) {
  const Park = sequelize.define("Park", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parkid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    states: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    long: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Park;
};
