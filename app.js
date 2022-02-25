const express = require('express');
const {engine} = require('express-handlebars')
const path = require("path");
const { pool } = require('./utils/db');
const { TodoRecord } = require('./records/todoRecord');
const {homeRouter} = require("./routers/homeRouter");
const {urlencoded} = require("express");
const methodOverride = require('method-override');
const app = express();
const port = 3000;

//handlebars
app.engine('.hbs', engine({
  extname: '.hbs',
  helpers:{}
}));
app.set('view engine', '.hbs');

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
//routes
app.use('/', homeRouter);


//app start
app.listen(process.env.PORT || port);
