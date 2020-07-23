
$('#summary').on('click',function(){
  $.get({url:'/summary',success:function(res){
    console.log(res);
    window.alert("summary generation complete, show summary?");

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

$('#detectTopic').on('click',function(){
  $.ajax({

    url:'/topicDetection',
    type: 'POST',
    success:function(res){
      console.log(res);
      window.alert("topic detection complete");
      $.get(
        {
          url:`/abc`,success:function(res){
            console.log('abc get req complete');
            console.log(res);
            //window.alert("lets see");
            window.location=`/abc`;
            }
        });
        
      }});
});

























