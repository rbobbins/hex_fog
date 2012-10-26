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


function parse_hexes() {
  var all_text = $("#code_sample").val();
  var all_hexes = all_text.match(/(#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3})/g);
  uniques = $.unique(all_hexes);
  return unique(all_hexes);
}

function display_hexes(hexes) {
  console.log(hexes);
  for (var i=0; i< hexes.length ; i++) {
    //create the containing div
    var divId = "wrapper_" + (hexes[i].substring(1));
    newDiv = document.createElement('div');
    newDiv.setAttribute('id', divId);
    newDiv.setAttribute('class', 'row');
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

  }
}

function process_text() {
  $("#palette").html('');
  hexes = parse_hexes();
  display_hexes(hexes);
  $("#palette").show('fast');
}

// // $(document).ready(function() {
//   $("#submit-btn").live("click", function() {
//     // alert("recognize click");
//     console.log("clicked");
//   })
// // })

// (#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3})