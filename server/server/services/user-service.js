const request = require('express');
const response = require('express');
const bcrypt = require('bcrypt');

const db = require("../models");
const Users = db.users;

exports.createUser = async(request) =>{
    if(! request.body){
        return {
            "flag":false,
            "status":400,
            "message":"Request Body is not passed"
        }
    }

    if( !request.body.username || !request.body.first_name  || !request.body.last_name
        || !request.body.password){
            return {
                "flag":false,
                "status":400,
                "message":"some fields are missing"
            }
    }else{
        find1 = await Users.findAll();
        if (find1.length > 0){
            return {
                "flag":false,
                "status":400,
                "message":"admin already exits"
            }
        }


        find = await Users.findAll({
            where:{
                username:request.body.username
            }
        });

         if(find.length != 0){
                return {
                    "flag":false,
                    "status":400,
                    "message":"Username is already taken."
                }
            }else{

                if(!validateEmail(request.body.username)){
                    return {
                        "flag":false,
                        "status":400,
                        "message":"Username is not valid."
                    }
                    return
                }else if(!validatePassword(request.body.password)){
                    return {
                        "flag":false,
                        "status":400,
                        "message":"Password is not valid"
                    }
                }else{
                    hashPassword = bcrypt.hashSync(request.body.password,bcrypt.genSaltSync(10));
                    const user = {
                    username:request.body.username,
                    first_name:request.body.first_name,
                    last_name:request.body.last_name,
                    password:hashPassword,
                }
                
                let date2 = new Date();
                res = await Users.create(user);
                        // response.status(201)
                        // .send({
                        //     "id" : res.id,
                        //     "first_name":res.first_name,
                        //     "last_name":res.last_name,
                        //     "username":res.username,
                        //     "account_created" : new Date(res.account_created),
                        //     "account_updated":  new Date(res.account_updated)
                        // });
                        //sns.PublishTopic("User is created");
                if (res){
                    return {
                        "flag":true,
                        "status":400,
                        "id":res.id,
                        "message":"user added successfully"
                    }
                }
                       
            }
        }
     
    }

}


const comparePassword =  async(password,hashPassword) =>{
    return bcrypt.compareSync(password,hashPassword);
}

const validateEmail = (email) =>{
    if (email.match(/(\S+)@(\S+\.\S+)/gi) != null){
    return true;
  }else{
    return false;
  }
}

const validatePassword = (password) =>{
    if (password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/) != null){
    return true;
  }else{
    return false;
  }
}
