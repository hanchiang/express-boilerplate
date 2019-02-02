const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const routeController = require('../controllers');


module.exports = router;