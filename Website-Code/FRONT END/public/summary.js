

    window.onload = function WindowLoad(event) {
        var n = 0;
        $.ajax({

            url:'/abc6',
            type: 'GET',
            success:function(res){
              console.log(res); 
              window.alert("lets");
              n = res.data; 
              console.log(n);      
            var text = "yopopopo";
            for (let step = 0; step < n; step++) {
            //read from file and append in text 
            //temp = readfile()
            //text = text+" "+temp
             }
        
            document.getElementById('test').innerHTML = text;
                               
              }});
        
        
        
    }


    