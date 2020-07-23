
$('#summary').on('click',function(){
  document.getElementById("loader2").style.display = "block";
  $.get({url:'/summary',success:function(res){
    console.log(res);
    document.getElementById("loader1").style.display = "none";
    //window.alert("Proceeding to results");

    $.get(
      {
        url:`/abc2`,success:function(res){
          console.log('abc2 get req complete');
          console.log(res);
          //window.alert("lets see");
          window.location=`/abc2`;
          }
      });

  }
})
});
document.getElementById("loader1").style.display = "none";
document.getElementById("loader2").style.display = "none";

$('#detectTopic').on('click',function(){
  document.getElementById("loader1").style.display = "block";
  // document.getElementById("note1").innerHTML= "Our model is generating results, this may take some time";
  // window.alert("Our model is generating results, this may take some time");
  $.ajax({

    url:'/topicDetection',
    type: 'POST',
    success:function(res){
      console.log(res);
      var text = "Topic detection complete. We identified ";
      text = text + res.data.toString();
      text = text+ " different topics.";
      console.log(text);
      document.getElementById("note1").innerHTML= text;
      document.getElementById("loader1").style.display = "none";
      // $.get(
      //   {
      //     url:`/abc`,success:function(res){
      //       console.log('abc get req complete');
      //       console.log(res);
      //       //window.alert("lets see");
      //       window.location=`/abc`;
      //       }
      //   });
        
      }});
});

$("form").submit(function(){
  alert("Submitted");
});























