var doc = activeDocument;
var selx = doc.selection;

if(selx.length ==0){ alert("You need a object!"); }
else{ makeGrid(selx); }


function makeGrid(sel)
{
	var fanmearr = new Array;
	for(var i=0, ilen=sel.length;i<ilen;i++) {
		var fanme;
		fanme = sel[i].file.name;
		fanmearr[i] = fanme.replace('.png','');
	}

	fanmearr.sort(compare);

    var objectsCentered = true;
    if(objectsCentered){
         var newGroup = app.activeDocument.groupItems.add();
    }

    var maxW = maxH = currentX = currentY  = maxRowH = 0;
    var wpadding = Number(prompt("Please fill width(unit: mm))\n","0"));
    var hpadding = Number(prompt("Please fill height(unit: mm))\n","0"));
	var gridCols = Number(prompt("Please fill count of each line","must be number..."));

    //var gridCols =  Math.round(Math.sqrt(sel.length)) ;

	for(var j=0, jlen=fanmearr.length;j<jlen;j++) {
		var nfname = fanmearr[j]+'.png';

		for(var e=0, slen=sel.length;e<slen;e++)
		{
			if(nfname == sel[e].file.name) {
					// ::Add to group
				if(objectsCentered) {
					sel[e].moveToBeginning( newGroup );
				}

			}

			//   :::SET POSITIONS:::
			sel[e].top = currentY;
			sel[e].left = currentX;

			//  :::DEFINE X POSITION:::
			currentX += (sel[e].width + wpadding);

			var itembottom = (sel[e].top-sel[e].height);
			maxRowH = itembottom <  maxRowH ? itembottom : maxRowH;

			if((e % gridCols) == (gridCols - 1)) {
				currentX = 0;
				maxH =  (maxRowH);

				//  :::DEFINE Y POSITION:::
				currentY  = maxH-hpadding;
				maxRowH=0;
			}
		}
	}

	for(var n = 0;n<newGroup.length;n++) {
		alert(newGroup[n].name);
	}

    if(objectsCentered) {
		newGroup.top = -(2*2.8346);
        newGroup.left = 6.55*2.8346;

        //:::UNGROUP:::
        var sLen=sel.length;

        while(sLen--) {
            sel[sLen].moveToBeginning( doc.activeLayer );
        }
    }
}

function compare(value1, value2) {
    if (Number(value1) > Number(value2)) {
        return -1;
    } else if (Number(value1) < Number(value2)) {
        return 1;
    } else {
        return 0;
    }
}
