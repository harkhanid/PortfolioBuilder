const request = require('express');
const response = require('express');

const snsService = require('../services/sns-service');

exports.createFeedBack = async(request,response) =>{

    res = await snsService.PublishTopic(JSON.stringify(request.body));
    response.status(200).send(res);
}
