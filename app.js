require("dotenv").config(); // Charger les variables d'environnement

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // ✅ Middleware de session
const logger = require('morgan');
const http = require('http');

const { connectToMongoDb } = require("./config/db");

// Importation des routes
const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
const osRouter = require('./routes/osRouter');
const commandeRouter = require('./routes/commandeRouter');
const produitRouter = require('./routes/produitRouter');
const paiementRouter = require("./routes/paiementRouter");
const panierRouter = require("./routes/panierRouter");

const app = express();

// Configuration des middlewares globaux
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Configuration de la session avant les routes
app.use(session({
    secret: process.env.SESSION_SECRET || 'net secret pfe', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true si HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 jour
    }
}));

// ✅ Middleware de debug session
app.use((req, res, next) => {
    console.log("✅ Session actuelle:", req.session);
    next();
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use('/commande', commandeRouter);
app.use('/produit', produitRouter);
app.use("/paiement", paiementRouter);
app.use("/panier", panierRouter);

// Gestion des erreurs 404
app.use(function (req, res, next) {
    next(createError(404, 'Not Found'));
});

// ✅ Gestionnaire d'erreurs global sans render (API friendly)
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || 'Internal Server Error'
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
    connectToMongoDb();
    console.log(`✅ App is running on port ${PORT}`);
});

module.exports = app;
