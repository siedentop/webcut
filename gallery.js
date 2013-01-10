var serverurl = "http://localhost:8888"

function init() {
  console.log("init() called.");
};

$(document).ready(function(){
  console.log("Document is ready.");
  loadThumbnails("resources.jsonp");
  addThumbnail("images/img1.jpg");
});

function addThumbnail(url) {
  $("#gallery").prepend('<a tabindex="1"><img src="' + url + '"></a>');
}

function loadThumbnails(url) {
  console.log(url);
  $.getJSON(url, function(data) {
    $(data.clips).each( function() { addThumbnail(this.url) } );
  });
}
