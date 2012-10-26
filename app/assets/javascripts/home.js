 var unique = function(origArr) {
    var newArr = [],
        origLen = origArr.length,
        found,
        x = 0; y = 0;
        
    for ( x = 0; x < origLen; x++ ) {
        found = undefined;
        for ( y = 0; y < newArr.length; y++ ) {
            if ( origArr[x] === newArr[y] ) found = true;
        }
        if ( !found) newArr.push( origArr[x] );    
    }
   return newArr;
}

function camelCase(input) { 
    return input.toLowerCase().replace(/\s(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
}


function parseHexes(text) { 
  var all_hexes = text.match(/(#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3})/g);
  return unique(all_hexes);
}

function displayHexes(hexes) {
  for (var i=0; i< hexes.length ; i++) {
    //create the containing div
    var divId = "wrapper_" + (hexes[i].substring(1));
    newDiv = document.createElement('div');
    newDiv.setAttribute('id', divId);
    newDiv.setAttribute('class', 'row row-nomargin');
    $("#palette").append(newDiv);

    //create canvas
    var newCanvas = document.createElement('canvas')
    newCanvas.setAttribute('width', 60);
    newCanvas.setAttribute('height', 50);
    var ctx = newCanvas.getContext('2d');
    ctx.fillStyle = hexes[i];
    ctx.fillRect(0, 0, 50, 50);
    $("#" + divId).append(newCanvas);

    //create the label
    $("#" + divId).append('<h3>' + hexes[i] + "</h3>");
    console.log($("#palette"));
  }
}

function hexesAsNamelessText(hexs) {
  var list = "<ul id='simple-css'>"
  for (var i=0; i< hexes.length ; i++) {
    var index_name = ".color" + i;
    var name = ntc.name(hexes[i])[1];
    var str = '<li>' + index_name + " { color: " + hexes[i] + " }   /* " + name + " */ </li>";
    list = list + str;
  }
  list = list + "</ul>"
  
  $("#textPalette").append("<br /><h5>...or, use the same hex codes with more generic names</h5>");  
  $("#textPalette").append(list);

}

function hexesAsText(hexs) {
  var list = "<ul id='named-css'>"
  for (var i=0; i< hexes.length ; i++) {
    var name = camelCase(ntc.name(hexes[i])[1]);
    var str = '<li> .' + name + " { color: " + hexes[i] + " } </li>";
    list = list + str;
  }
  list = list + "</ul>"
  
  $("#textPalette").html('');
  $("#textPalette").append('<button id="toggler" class="btn btn-primary" onclick="togglePalette()">View with color swatches</button>');
  $("#textPalette").append("<h5>Now, you can copy and paste the CSS below into your stylesheet...</h5>");  
  $("#textPalette").append(list);

}

function process_text() {
  var text = $("#code_sample").val();
  // clear_everything();
  $("#palette").html('');
  $("#palette").append('<button id="toggler" class="btn btn-primary" onclick="togglePalette()">View as simple CSS</button>');
  hexes = parseHexes(text);
  displayHexes(hexes);
  hexesAsText(hexes);
  hexesAsNamelessText(hexes);
 
  $("#palette").show();
  $("#main").addClass('clear');
}

function clear_everything() {
  // $.location.reload(true);
  $("#palette").html('');
  $("#textPalette").html('');
  $("#main").removeClass('clear');
  $("textarea").val('');
}

function togglePalette() {
  if ($("#palette").is(":visible")) {
    $("#palette").hide();
    $("#textPalette").show();
  } else if ($("#textPalette").is(":visible")) {
    $("#textPalette").hide();
    $("#palette").show();
 }
}
