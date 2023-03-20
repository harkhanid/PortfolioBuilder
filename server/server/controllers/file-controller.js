const request = require('express');
const response = require('express');

const uploadService = require('../services/upload-service');
const singleUpload = uploadService.upload.single('imageFile');

const validationService = require('../services/validation-service');
const portfolioService = require('../services/portfolio-service');

exports.uploadFile = async(request,response) =>{
    await singleUpload(request,response,async(res)=>{ 
        response.status(200).send({name:request.file.originalname,key:request.file.key});
    })
    // response.status(400).send();
}

exports.getFile = async(request,response) =>{
    const res = await uploadService.get(request.params.fileId);
    response.status(200).send(res);
}
