//const { Sequelize } = require("sequelize/types");

module.exports = (sequelize,type) =>{
    return sequelize.define('Project',{
        id:{
            type:type.UUID,
            defaultValue:type.UUIDV1,
            primaryKey:true,
            autoIncrement:false
        },
        name:type.STRING(50),
        image:type.STRING(100),
        shortDesc:type.STRING(100),
        description:type.STRING(2000),
        technologies:type.STRING(200),
        project_created:{
            type:type.DATE,
            defaultValue:Date.now
        },
        project_updated:{
            type:type.DATE,
            defaultValue:Date.now
        }
    },{
        timestamps:false
    });
}