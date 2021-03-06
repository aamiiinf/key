const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const app = express() ;
const metaget = require('metaget');
mongoose.connect("mongodb://localhost/metatags") ;

const Schema = mongoose.Schema;
var userSchema = new Schema({
    meta : String
}) ;
var metaTags = mongoose.model("Meta" , userSchema ) ;

app.use(morgan('common')) ;
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({ extended:true })) ;

app.get('/', function (req, res, next) {
   res.sendFile(__dirname + '/public/index.html');
});

app.post('/', function (req, res, next) {
    metaget.fetch(req.body.adress, (err, metaResponse) => {
        if (req.body.adress.length>=2) {
            if(err){
                console.log(err);
            }else{
                console.log(metaResponse);
                var newMeta = new metaTags({ 
                    meta : req.body.adress
                }) ;
                newMeta.save() ;
                }
                res.json(newMeta);
        }else{
            res.json('لطفا آدرس مورد نظر را وارد');
        }
    });
});

app.listen(3000);
console.log("app running on port 3000") ;


