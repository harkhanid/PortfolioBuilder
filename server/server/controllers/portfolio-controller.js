const request = require('express');
const response = require('express');

const validationService = require('../services/validation-service');
const portfolioService = require('../services/portfolio-service');

exports.getPortfolio = async(request,response) =>{
    res = await portfolioService.getPortfolio();
    response.status(200).send(res[0]);
}

exports.updatePortfolio = async(request,response) =>{

    auth = await validationService.authenticateUser(request);

    if(!auth.status){
        response.status(401).send({"validity":false});
    }else{
        response.status(200).send({"validity":true})    
    }
}