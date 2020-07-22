
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
            //let whatsappChat = avatar.data.toString();
            avatar.mv('./uploads/' + avatar.name);

            var spawn = require("child_process").spawn;
            var process = spawn('python',["/Users/aishanyasingh/Desktop/BTP2/Multi-party-Conversation-Summarizer/Website-Code/chatsToJson/txt-json.py"] );
            process.stderr.on('data', function(data) {
                console.log(data.toString());
                res.send({
                    status: true,
                    message: 'File is NOT uploaded',
                    data: {
                        name: avatar.name,
                        mimetype: avatar.mimetype,
                        size: avatar.size
                    }
                });
            } )
        
            process.stdout.on('data', function(data) {
                console.log("yooooooo");
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: avatar.name,
                        mimetype: avatar.mimetype,
                        size: avatar.size
                    }
                });
            } )
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            
            console.log('uploaded file');
            //send response
            
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

async function callName2(req, res) {
	//console.log(req);
    //console.log(res);
    var spawn = require("child_process").spawn;

    //const process1 = spawn('source', ["/Users/aishanyasingh/Desktop/BTP2/Multi-party-Conversation-Summarizer/my_virtual_env/bin/activate"]);
    const process = spawn('python',["/Users/aishanyasingh/Desktop/BTP2/Multi-party-Conversation-Summarizer/Text-Summarization/Summarizer.py"] );
    //const process2 = spawn('deactivate');
    console.log(process.pid);
    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stderr.on('data', function(data) {
        console.log(data.toString());
		
    } )

    process.stdout.on('data', function(data) {
        console.log("yooooooobabe");
		data = data.toString();
        console.log(data);
        res.render('def',{arr:data});
    } )
}

app.get('/model', callName3);

function callName3(req, res) {
    var spawn = require("child_process").spawn;
    const process = spawn('python',["/Users/aishanyasingh/Desktop/BTP2/Multi-party-Conversation-Summarizer/Topic-Detection/Runner.py", "/Users/aishanyasingh/Desktop/BTP2/Multi-party-Conversation-Summarizer/Website-Code/FRONT END/chats.json"] );
    res.render('model');
}


// save code as start.js
