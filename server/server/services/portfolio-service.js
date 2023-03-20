const request = require('express');
const response = require('express');

const db = require("../models");
const Portfolios = db.portfolios;
const Projects = db.projects
exports.create = async(request)=>{
    Portfolios.create(request);
    return {
        flag:true,
        status:201,
        message:"Portfolio Created Successfully"
    }
}
exports.getPortfolio = async(projectid)=>{
    const promise = Portfolios.findAll({
        include:Projects
    });
    
    return promise;
}