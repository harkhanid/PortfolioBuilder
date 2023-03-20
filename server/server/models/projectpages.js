//const { Sequelize } = require("sequelize/types");

module.exports = (sequelize,type) =>{
    return sequelize.define('Projectpage',{
        id:{
            type:type.UUID,
            defaultValue:type.UUIDV1,
            primaryKey:true,
            autoIncrement:false
        },
        title:type.STRING(50),
        key:type.STRING(200),
        description:type.STRING(10000),
        projectpage_created:{
            type:type.DATE,
            defaultValue:Date.now
        },
        projectpage_updated:{
            type:type.DATE,
            defaultValue:Date.now
        }
    },{
        timestamps:false
    });
}