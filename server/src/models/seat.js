export default (sequelize, DataTypes) => {
  const Seat = sequelize.define('seat', {
    status: {
      type: DataTypes.STRING,
    }
  });

  return Seat;
};