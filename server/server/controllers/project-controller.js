const request = require('express');
const response = require('express');

const validationService = require('../services/validation-service');
const projectService = require('../services/project-service');

exports.getProject = async(request,response) =>{
    
    
    res = await projectService.getProject(request.params.project_id);
    // converting technologies to array
    if(res.length > 0 && res[0].technologies != undefined){
        const techString = res[0].technologies
        res[0].technologies = techString.split(",");
    }
    response.status(200).send(res[0]);
}

exports.getAllProjects = async(request,response) =>{
    
    res = await projectService.getAllProject();
    response.status(200).send(res);
}


exports.createProject = async(request,response) =>{

    auth  = await validationService.authenticateUser(request)
    if(!auth.status){
        response.status(401).send();
        return 
    }
    
    res = await projectService.createProject(request);
    response.status(res.status).send(res.message);
}

exports.updateProject = async(request,response) =>{

    auth = await validationService.authenticateUser(request);
   
    if(!auth.status){
        response.status(401).send({"validity":false});
        return
    }      

    res = await projectService.updateProject(request);
    response.status(200).send({"validity":true});
}

exports.deleteProject = async(request,response) =>{

    auth = await validationService.authenticateUser(request);

    if(!auth.status){
        response.status(401).send({"validity":false});
        return
    }
    res = await projectService.deleteProject(request);
    response.status(200).send({"validity":true});
}