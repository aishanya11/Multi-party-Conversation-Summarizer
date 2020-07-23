
var express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

var app = express();

var no_topics_input_chat = 0;

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
app.use('/topicDetection',express.static('views')); 
app.use('/summary',express.static('views'));




app.listen(3000, function() {
    console.log('server running on port 3000');
} )

app.post('/upload-avatar', async (req, res) => {
    try {
        if(!req.files) {
            res.sendFile('/Users/aishanyasingh/Desktop/BTP2/Multi-party-Conversation-Summarizer/Website-Code/FRONT END/public/index.html');
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            //let whatsappChat = avatar.data.toString();
            avatar.mv('./uploads/' + avatar.name);
            input_file = avatar.name
            var spawn = require("child_process").spawn;
            var process = spawn('python',["../../Website-Code/chatsToJson/txt-json.py", input_file] );
            process.stderr.on('data', function(data) {
                console.log(data.toString());
                // res.send({
                //     status: true,
                //     message: 'File is NOT uploaded',
                //     data: {
                //         name: avatar.name,
                //         mimetype: avatar.mimetype,
                //         size: avatar.size
                //     }
                // });
                res.sendFile('/Users/aishanyasingh/Desktop/BTP2/Multi-party-Conversation-Summarizer/Website-Code/FRONT END/public/index.html');
            } )
        
            process.stdout.on('data', function(data) {
                console.log("TEXT TO JSON CONVERSION DONE!!");
                res.sendFile('/Users/aishanyasingh/Desktop/BTP2/Multi-party-Conversation-Summarizer/Website-Code/FRONT END/public/index.html');
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
    
    res.render('topicDetection.hbs',{data:no_topics_input_chat});
}

app.get('/abc2', callName2);
function callName2(req, res) {
    
    res.render('summary.hbs',{data:no_topics_input_chat});
}

app.get('/abc6', callName6);
function callName6(req, res) {
    console.log("in abc6");
    var fs = require('fs');
    var data_object =[];
    for(let i=0;i<no_topics_input_chat;i++){
        let path1 = "../../Topic-Detection/Topics/topic-"+(i).toString()+".txt";
        let path2 = "../../Text-Summarization/output-"+(i).toString()+".txt";
        let para = fs.readFileSync(path1, 'utf8');
        let summary = fs.readFileSync(path2, 'utf8');
        data_object.push({para : para.toString(), summary: summary.toString()});
    }
    res.status(200).send({data : no_topics_input_chat,data_object : data_object});
}


app.get('/summary', callName3);

async function callName3(req, res) {
    console.log("summary route pe aagaye hai");
	//console.log(req);
    //console.log(res);
    var spawn = require("child_process").spawn;

    //const process1 = spawn('source', ["/Users/aishanyasingh/Desktop/BTP2/Multi-party-Conversation-Summarizer/my_virtual_env/bin/activate"]);
    // const process = spawn('python',["/Users/riyak/STUDY/BTP-2/git/Multi-party-Conversation-Summarizer/Text-Summarization/Summarizer.py", no_topics_input_chat] );
    const process = spawn('python',["../../Text-Summarization/Summarizer.py", no_topics_input_chat] );
    console.log(process.pid);
    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stderr.on('data', function(data) {
        console.log(data.toString());
		
    } )

    process.on('exit', (code) => {
           console.log("summary script chal gayi poori");
           res.status(200).send({data: no_topics_input_chat});
    });
    
    
}

app.post('/topicDetection', callName4);

async function callName4(req, res) {
    
    console.log("topicDetection route pe aagaye hai");
    
    var spawn = require("child_process").spawn;
    const process = spawn('python',["../../Topic-Detection/Runner.py","../../Website-Code/chatsToJson/chats2.json"] );
    console.log(process.pid);
    process.stderr.on('data', function(data) {
        console.log(data.toString());
		
    } )

    process.stdout.on('data', function(data) {
        //console.log("TOPIC DETECTION DONE!!");
		data = data.toString();
        console.log("no. of topics identified:"); 
        console.log(data);
        no_topics_input_chat = Number(data);
    } )
    
    process.on('exit', (code) => {
        console.log("topic detection script chal gayi poori");
        //res.render('topicDetection.hbs');
        res.status(200).send({data : no_topics_input_chat});
      });
      
}
