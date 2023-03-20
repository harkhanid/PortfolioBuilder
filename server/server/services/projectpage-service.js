const request = require('express');
const response = require('express');

const db = require("../models");
const Projects = db.projects;
const ProjectPages = db.projectpages;



exports.createProjectPages = async(page) =>{
    const res = ProjectPages.create(page);
    return true;
}

exports.deleteProjectPageByProjectId = async(ProjectId) =>{
    const res = ProjectPages.destroy({where:{
        ProjectId:ProjectId
    }});
    return true;
}