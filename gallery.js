var timeline = [];

function init() {
  console.log("init() called.");
};

$(document).ready(function(){
  console.log("Document is ready.");
  loadThumbnails("resources.jsonp");
  setupTimeline();
});

function addThumbnail(url, id) {
  $("#gallery").append('<a tabindex="1"><img class="thumbnail" src="' + url + '"/></a>');
}

function loadThumbnails(url) {
  $.getJSON(url, function(data) {
    $(data.clips).each( function() {
      addThumbnail(this.url, this.id);
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
  var url = ui.draggable.attr("src");
  var timelineclip = {'url':url, 'time':time};
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
  $(".timeline").append('<a class="clip"><img src="' + clip.url + '"/></a>');
}
