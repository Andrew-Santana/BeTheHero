const express = require('express');
const { celebrate, Segments, Joi } = require ('celebrate');

const ctrlOng = require('./controllers/ctrlOng');
const ctrlIncident = require('./controllers/ctrlIncident');
const ctrlProfile = require('./controllers/ctrlProfile');
const ctrlSession = require('./controllers/ctrlSession'); 

const routes = express.Router();

routes.post('/sessions',ctrlSession.create);

routes.get('/ongs', ctrlOng.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(13),
        city: Joi.string().required(),
        uf: Joi.string().required().lenght(2),
    })
}), ctrlOng.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ctrlProfile.index);

routes.get('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), ctrlIncident.index);

routes.post('/incidents', ctrlIncident.create); 

routes.delete('/incidents/:id' ,celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),ctrlIncident.delete);

module.exports = routes;
