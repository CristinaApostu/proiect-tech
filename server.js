var express = require("express");
var Sequelize = require("sequelize");
var nodeadmin = require("nodeadmin");
var connection = require("express-myconnection");
var mysql = require("mysql2");


//conectare la baza de date

var sequelize = new Sequelize('lista_carti','root', '', {
    dialect: 'mysql',
    host: 'localhost',
    operatorsAliases: false
});

//sequelize.sync();
sequelize.authenticate().then(function(){
    console.log('Conectat cu succes!');
});

var Categories = sequelize.define('categories', {
    denumire: Sequelize.STRING,
    descriere: Sequelize.STRING
});

var Books = sequelize.define('books', {
    titlu_carte: Sequelize.STRING,
    id_categorie: Sequelize.INTEGER,
    autor: Sequelize.STRING,
    descriere_carte: Sequelize.STRING,
    imagine_carte: Sequelize.STRING
});

Books.belongsTo(Categories, {foreignKey: 'id_categorie', targetKey: 'id'});

var app = express();
//Create sql connection
app.use(connection( mysql, {
    host: "localhost",
    user: "root",
    password: "root",
    database: "lista_carti"
}, 'request'));

app.use(nodeadmin(app));

app.use(express.static('public'));
app.use('/admin', express.static('admin'));

app.use(express.json());
app.use(express.urlencoded());

//returneaza o lista de categorii
app.get('/categories', function(request, response) {
    Categories.findAll().then(function(c){
        response.status(200).send(c);
    });
});

//returneaza o categorie in functie de id
app.get('/categories/:id', function(request, response) {
    Categories.findOne({where: {id:request.params.id}}).then(function(c) {
        if(c) {
            response.status(200).send(c);
        } else {
            response.status(404).send();
        }
    });
});

app.post('/categories', function(request, response) {
    Categories.create(request.body).then(function(c) {
        response.status(201).send(c);
    });
});

app.put('/categories/:id', function(request, response) {
    Categories.findById(request.params.id).then(function(c) {
        if(c) {
            c.update(request.body).then(function(c){
                response.status(201).send(c);
            }).catch(function(error) {
                response.status(200).send(error);
            });
        } else {
            response.status(404).send('Not found');
        }
    });
});

app.delete('/categories/:id', function(request, response) {
    Categories.findById(request.params.id).then(function(c) {
        if(c) {
            c.destroy().then(function(){
                response.status(204).send();
            });
        } else {
            response.status(404).send('Not found');
        }
    });
});

app.get('/books', function(request, response) {
    Books.findAll(
        {
            include: [{
                model: Categories,
                where: { id: Sequelize.col('books.id_categorie') }
            }]
        }
        
        ).then(
            function(book) {
                response.status(200).send(book);
            }
        );
});  

app.get('/books/:id', function(request, response) {
    Books.findById(request.params.id).then(
            function(book) {
                response.status(200).send(book);
            }
        );
});

app.post('/books', function(request, response) {
    Books.create(request.body).then(function(book) {
        response.status(201).send(book);
    });
});

app.put('/books/:id', function(request, response) {
    Books.findById(request.params.id).then(function(book) {
        if(book) {
            book.update(request.body).then(function(book){
                response.status(201).send(book);
            }).catch(function(error) {
                response.status(200).send(error);
            });
        } else {
            response.status(404).send('Not found');
        }
    });
});

app.delete('/books/:id', function(request, response) {
    Books.findById(request.params.id).then(function(book) {
        if(book) {
            book.destroy().then(function(){
                response.status(204).send();
            });
        } else {
            response.status(404).send('Not found');
        }
    });
});

app.get('/categories/:id/books', function(request, response) {
    Books.findAll({where:{id_categorie: request.params.id}}).then(
            function(book) {
                response.status(200).send(book);
            }
        );
});

app.listen(3000);

