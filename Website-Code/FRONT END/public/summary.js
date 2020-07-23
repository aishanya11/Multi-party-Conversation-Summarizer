window.onload = function WindowLoad(event) {
  var n = 0;
  $.ajax({
    url:'/abc6',
    type: 'GET',
    success:function(res){
      console.log(res); 
      
      n = res.data; 
      console.log("No : " + n);  
      var text = `<div class = "row">`;
      for (let step = 0; step < n; step++) {
        text += `<hr><div class = "row"><div class = "col l6"><div class="card-panel  blue-grey"><span class="white-text"> PARA ${(step+1).toString()} :  ${res.data_object[step].para}</span></div></div>`;
        text += `<div class = "col l6"><div class="card-panel"  style="background:#26a69a"><span class="white-text">SUMMARY ${(step+1).toString()} :  ${res.data_object[step].summary}</span></div></div></div>`;
      }
      text += `</div>`;
    document.getElementById('test').innerHTML = text; 
    
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elems, options);
    });               
  }});
}


    