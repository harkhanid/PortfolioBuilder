//const { Sequelize } = require("sequelize/types");

module.exports = (sequelize,type) =>{
    return sequelize.define('Portfolio',{
        id:{
            type:type.UUID,
            defaultValue:type.UUIDV1,
            primaryKey:true,
            autoIncrement:false
        },
        name:type.STRING(50),
        portfolio_created:{
            type:type.DATE,
            defaultValue:Date.now
        },
        portfolio_updated:{
            type:type.DATE,
            defaultValue:Date.now
        }
    },{
        timestamps:false
    });
}