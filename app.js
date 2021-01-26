const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Information = require('./models/information');
const Anecdote = require('./models/anecdote');

const app = express();
app.use(bodyParser.json());

//===   Headers - CORS   ======================================================================================================
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
//=============================================================================================================================

//====  Connexion à la base de données  ====================================================================================
mongoose.connect('mongodb+srv://PBBM:351426@cluster0.lxbk2.mongodb.net/DbTestAnecdotes?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
//===========================================================================================================================





//========================   Get all informations   ======================================
app.get('/informations', (req, res, next) => {
    Information.find()
        .then(informations => res.status(200).json(informations))
        .catch(error => res.status(404).json({ error }))
});
//========================================================================================

//========================   Get one information by Id   =================================
app.get('/informationsById/:id', (req, res, next) => {
    Information.findOne({ _id : req.params.id })
        .then(informations => res.status(200).json(informations))
        .catch(error => res.status(404).json({ error }))
});
//========================================================================================

//================   Get One information by description content    =======================
app.get('/informationsByDescriptionContent/:description', (req, res, next) => {
    Information.find({description : {$regex : ".*"+req.params.description+".*", $options: 'i'} })
        .then(informations => res.status(200).json(informations))
        .catch(error => res.status(400).json({ error }))
});
//========================================================================================

//================   Get One information by title content    =======================
app.get('/informationsByTitleContent/:description', (req, res, next) => {
    Information.find({title : {$regex : ".*"+req.params.description+".*", $options: 'i'} })
        .then(informations => res.status(200).json(informations))
        .catch(error => res.status(400).json({ error }))
});
//========================================================================================





//========================   Get all anecdotes   =========================================
app.get('/anecdotes', (req, res, next) => {
    Anecdote.find()
        .then(anecdotes => res.status(200).json(anecdotes))
        .catch(error => res.status(404).json({ error }))
});
//========================================================================================

//========================   Get one anecdote by Id   ====================================
app.get('/anecdotesById/:id', (req, res, next) => {
    Anecdote.findOne({ _id : req.params.id })
        .then(anecdotes => res.status(200).json(anecdotes))
        .catch(error => res.status(404).json({ error }))
});
//========================================================================================

//================   Get anecdotes by description content    =============================
app.get('/anecdotesByDescriptionContent/:descriptionContent', (req, res, next) => {
    Anecdote.find({description : {$regex : ".*"+req.params.descriptionContent+".*", $options: 'i'} })
        .then(anecdotes => res.status(200).json(anecdotes))
        .catch(error => res.status(400).json({ error }))
});
//========================================================================================


//===== Request test - Default ==================================
app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue ! Serveur en fonction, mais requête erronée' }); 
 });
 //==============================================================


module.exports = app;