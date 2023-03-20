const dbConfig = require("../config/db-config-local");
const Sequelize = require("sequelize");

const userModel         = require('./user');
const portfolioModel    = require('./portfolio');
const projectModel      = require('./project');
const projectpageModel  = require('./projectpages');

const sequelize = new Sequelize(dbConfig.DB, process.env.db_username, process.env.db_password, {
// const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER, "Dbh1312017", {
    host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users      = userModel(sequelize, Sequelize);
db.portfolios = portfolioModel(sequelize,Sequelize);
db.projects    = projectModel(sequelize,Sequelize);
db.projectpages = projectpageModel(sequelize,Sequelize);

db.users.hasOne(db.portfolios,{foreignKey: {
  allowNull:false
}});

db.portfolios.hasMany(db.projects);
db.projects.belongsTo(db.portfolios,{foreignKey: {
  allowNull:true
}});

db.projects.hasMany(db.projectpages);
db.projectpages.belongsTo(db.projects,{foreignKey: {
  allowNull:true
}});

sequelize.sync();
module.exports = db;