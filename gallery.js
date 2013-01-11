var timeline = [];

function init() {
  console.log("init() called.");
};

$(document).ready(function(){
  console.log("Document is ready.");
  loadThumbnails("resources.jsonp");
  setupTimeline();
});

function addThumbnail(data) {
  var img = $('<img src="' + data.url + '"/>').attr("id", data.id).data("length",data.length);
  $('<a tabindex="1" class="thumbnail"></a>').append(img).append('<div class="length">'+data.length+'</div>').appendTo("#gallery");
}

function loadThumbnails(url) {
  $.getJSON(url, function(data) {
    $(data.clips).each( function() {
      addThumbnail(this);
    });
    $(".thumbnail").draggable({containment: 'document',
                              stack:'.thumbnail',
                              snap:'.timeline', snapMode: "inner",
                              helper:'clone',
                              stop: dropTimeline});
  });
}

// Function is called after user dropped thumbnail on timeline
function dropTimeline(event, ui) {
  var time = ui.offset.left;
  console.log("Time: ", time);
//   timeline.push();
}

// Function is called after user dropped thumbnail into timeline
function receiveThumbnail(event, ui) {
  console.log("Received.");
  var time = ui.offset.left;
  var clip = ui.draggable.children("img");
  var url = clip.attr("src");
  var length = clip.data("length")
  var id = clip.attr("id");
  var timelineclip = {'url':url, 'time':time, "length":length, "id":id};
  timeline.push(timelineclip);
  // Create new timelineClip
  addClipToTimeline(timelineclip);
}

// Initialise Timeline
function setupTimeline() {
  $(".timeline").droppable({
    accept: '.thumbnail',
    drop: receiveThumbnail,
  });
}

// add New TimelineClip to Timeline
function addClipToTimeline(clip) {
  var clipHandler =  $('<a class="clip"><img src="' + clip.url + '"/></a>');
  clipHandler.data("length", clip.length);
  clipHandler.attr("id", clip.id);
  clipHandler.width(clip.length);
  $(".timeline").append(clipHandler);
}
