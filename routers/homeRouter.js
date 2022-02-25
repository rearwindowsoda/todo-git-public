const express = require('express');
const {TodoRecord} = require("../records/todoRecord");

const homeRouter = express.Router();

homeRouter
    .get ('/', async (req, res) => {
        try{
            const toDoListEntries = await TodoRecord.findAll();
            res.render('home/home', {
                toDoListEntries,
            });
        }catch(e){
            console.error(e);
        }


    })
    .post('/', async(req, res) => {
        try{
            const insertEntry = await new TodoRecord(req.body);
            await insertEntry.insert();
            const toDoListEntries = await TodoRecord.findAll();
            res.status(201).render('home/home', {
                toDoListEntries,
            });
        }catch(e){
            console.error(e);
            res.render('errors/validationError', {error: e.message})
        }

    })
    .delete ('/:id', async (req, res) => {
        try{
            await TodoRecord.delete(req.params.id);
            const toDoListEntries = await TodoRecord.findAll();
            res.render('home/home', {
                toDoListEntries,
            });
        }catch(e){
            console.error(e);
        }

    })

    .put('/:id', async (req, res) => {
        try{
            const editedEntry = await TodoRecord.find(req.params.id);
            editedEntry.title= req.body.title;
            console.log(editedEntry)
            await editedEntry.update();
            const toDoListEntries = await TodoRecord.findAll();
            res.render('home/home', {
                toDoListEntries,
            });
        }catch (e) {
            console.error(e);
            res.render('errors/validationError', {error: e.message})
        }

    })

module.exports = {
    homeRouter,
}

