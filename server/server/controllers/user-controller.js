const request = require('express');
const response = require('express');
const userService = require('../services/user-service');
const validationService = require('../services/validation-service');
const portfolioService = require('../services/portfolio-service');
exports.getUser = async(request,response) =>{
    response.status(200).send({
        "message":"User"
    });
}
exports.create = async(request,response) =>{
    
    res = await userService.createUser(request);
    if (res.flag == false ){
        response.status(res.status).send(res.message);
        return
    }
    // creating portfolio object
    portfolio_body = {
        "name":request.body.first_name + " "+ request.body.last_name,
        "UserId":res.id
    }
    // making portfolio service call
    await portfolioService.create(portfolio_body);
    response.status(res.status).send(res.message);
}

exports.login = async(request,response) =>{

    auth = await validationService.authenticateUser(request);

    if(!auth.status){
        response.status(401).send({"validity":false});
    }else{
        response.status(200).send({"validity":true})    
    }
}