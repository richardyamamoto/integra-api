module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: 'postgres',
  password: 'integra',
  database: 'postgres',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
