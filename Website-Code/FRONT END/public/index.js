$('#chatLogInp').on('click',function(){
  //document.getElementById("myFile").value
  $.get({url:'/abc',success:function(){
	alert('recording done');
    window.location='/';
	
  }
})

});


$('#local').on('click',function(){
  $.get({url:'/def',success:function(){
    window.location='/def';
  }
})
});

$('#model').on('click',function(){
  $.get({url:'/model',success:function(){
    window.location='/model';
  }
})
});























