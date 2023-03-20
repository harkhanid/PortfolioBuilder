var express = require('express');
const UserRouter = require('./users-route');
const PortfolioRouter = require('./portfolio-route');
const ProjectRouter = require('./project-route');
const FileRouter = require('./file-route');

module.exports = (app)=>{
  app.use('/',UserRouter);
  app.use('/',PortfolioRouter);
  app.use('/',ProjectRouter);
  app.use('/',FileRouter);
};