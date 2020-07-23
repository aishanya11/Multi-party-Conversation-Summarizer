

    window.onload = function WindowLoad(event) {
        const fs = require('fs') 
  
        fs.readFile('/Users/aishanyasingh/Desktop/BTP2/Multi-party-Conversation-Summarizer/Text-Summarization/output-0.txt', (err, data) => { 
        if (err) throw err; 
        document.getElementById('test').innerHTML = data.toString();
        console.log(data.toString());

    }) 
    }