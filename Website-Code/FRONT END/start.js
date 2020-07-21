
var express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

var app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/',express.static('public'));

app.set('view engine','hbs' );
app.set('views','views');
app.use('/def',express.static('views')); 
app.use('/model',express.static('views'));




app.listen(3000, function() {
    console.log('server running on port 3000');
} )

app.post('/upload-avatar', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + avatar.name);
            console.log('uploaded file');
            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        console.log(req.files);
        console.log(req.files.avatar);
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/abc', callName);

function callName(req, res) {

    console.log(req.body);
    //var spawn = require("child_process").spawn;

  
    //var process = spawn('python',["./script_audio.py"] );

   
    //process.stdout.on('data', function(data) {
      //  res.send(data.toString());
   // } )
}

app.get('/def', callName2);

function callName2(req, res) {
	//console.log(req);
    //console.log(res);
    var spawn = require("child_process").spawn;

  
    var process = spawn('python',["./script_run.py"] );

    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stdout.on('data', function(data) {
		data = data.toString().split('%');
		data.pop();
        res.render('def',{arr:data});
    } )
}

app.get('/model', callName3);

function callName3(req, res) {

    
    res.render('model');
}


// save code as start.js
