const request = require('express');
const response = require('express');

const ProjectPageService = require('./projectpage-service');

const db = require("../models");
const Projects = db.projects;
const ProjectPages = db.projectpages;

exports.createProject = async(request)=>{

    requestJSON = Object.assign({},request.body);
    requestJSON.PortfolioId = request.params.portfolio_id;
    
    let techString = request.body.technologies;
    requestJSON.technologies = techString.join(",");
    delete requestJSON.pages;
    //project creation
    const res = await Projects.create(requestJSON);
    
    //creating pages
    request.body.pages.forEach(pages=>{
        pages.ProjectId = res.id;
        ProjectPageService.createProjectPages(pages);
    });
    
    return {
        flag:true,
        status:201,
        message:"Project Created Successfully"
    }
}

exports.updateProject = async(request)=>{

    requestJSON = Object.assign({},request.body);
    requestJSON.PortfolioId = request.params.portfolio_id;
    const projectId = request.params.project_id;
    let techString = request.body.technologies;
    requestJSON.technologies = techString.join(",");
    delete requestJSON.pages;
    //project creation
    const res = await Projects.update(requestJSON,{
        where:{
            id:projectId
        }
    });

    //Delete every project page in a project
    const res1 = await ProjectPageService.deleteProjectPageByProjectId(projectId);

    // add new project pages
    request.body.pages.forEach(pages=>{
        pages.ProjectId = projectId;
        ProjectPageService.createProjectPages(pages);
    });
    
    return {
        flag:true,
        status:200,
        message:"Project Created Successfully"
    }
}


exports.getProject = async(projectid)=>{
    const promise = Projects.findAll({
        where:{id:projectid},
        include:ProjectPages
    });
    return promise;
}

exports.getAllProject = async()=>{
    const promise = Projects.findAll({
    });
    return promise;
}

exports.deleteProject = async(request)=>{
    const portfolioId = request.params.portfolio_id;
    const projectId = request.params.project_id;
    const res1 = await ProjectPageService.deleteProjectPageByProjectId(projectId);
    
    const res = await Projects.destroy({where:{
        id:projectId,
        PortfolioId:portfolioId
    }})
    
    return {
        flag:true,
        status:201,
        message:"Portfolio Created Successfully"
    }
}
