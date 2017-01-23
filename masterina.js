//============================================================================ btn func============================================================================

	var iMirror=0;
	var iLineThik=1;
	var iPieType=0;
	var iLineType=0;
	function funcNew()
	{
		historyUndo = new Array()
		context2.clearRect(-canvas2.width, -canvas2.height, canvas2.width*2, canvas2.height*2);
		context2.fillStyle ="#ffffff";
		context2.fillRect(-canvas2.width, -canvas2.height, canvas2.width*2, canvas2.height*2); 
		if (bitFill){
		funcFill();}
		
	}
	function funcLineThik()
	{
		if (bitFill){
		funcFill();}
		iLineThik+=1;
		lineThik=thikRa[iLineThik];
		document.getElementById("lineThikBtn").src  =lineThikArray[iLineThik].src;
		if (iLineThik==5)
		{
			iLineThik=-1;
			
		}
	}
	function funcPieType()
	{
		if (bitFill){
		funcFill();}
		iPieType+=1;
		pieType=pieTypeRA[iPieType];
		document.getElementById("pieTypeBtn").src  =pieTypeArray[iPieType].src;
		if (iPieType==5)
		{
			iPieType=-1;
			
		}
	}
	function funcMirror()
	{
		if (bitFill){
		funcFill();}
		iMirror+=1;
		mirror=mirrorRA[iMirror];
		document.getElementById("MirrorBtn").src  =mirrorArray[iMirror].src;
		if (iMirror==1)
		{
			iMirror=-1;
			
		}
	}
	function funcLineType()
	{
		if (bitFill){
		funcFill();}
		iLineType+=1;
		lineType=lineTypeRA[iLineType];
		document.getElementById("lineTypeBtn").src  =lineTypeArray[iLineType].src;
		if (iLineType==4)
		{
			iLineType=-1;
			
		}
	}
	function funcFillCir()
	{
		if (bitFill){
		funcFill();}
		toUndo();
		fillCir();
	}
	function funcCirLine()
	{
		if (bitFill){
		funcFill();}
		toUndo();
		CirLine();
	}
	function funcUndo()
	{
		if (bitFill){
		funcFill();}
		
		if (historyUndo.length > 0)
		{
			undo();	
		}
		
	}
	function funcSave()
	{
		if (bitFill){
		funcFill();}

		document.getElementById("saveCanvas").width=width*0.92;
		document.getElementById("saveCanvas").height=height*0.92;
		
		

		contextS.beginPath();
		contextS.fillStyle = "#acacac";
		contextS.fillRect(0, 0,width*0.92, height*0.92);
		
		
		contextS.drawImage(canvas2,width*0.1,height*0.1,width*0.8,height*0.8,width*0.01,height*0.01,width*0.90,height*0.90);
		contextS.beginPath();
		contextS.fillStyle = "#acacac";
		contextS.fillRect(0, 0,192, 76);
		contextS.beginPath();
		contextS.fillStyle = "#000000";
		context.lineWidth = 6;
		contextS.strokeRect(0,0,width*0.92,height*0.92);
//============================================================image to save canvas ==================================
	var imageSave = new Image();
	
	imageSave.crossOrigin = 'anonymous'; 
	imageSave.src = 'LOGO.png'+ '?' + new Date().getTime();
	imageSave.onload = function() 
	{
		contextS.drawImage(imageSave, 15, 15,162,46);
		canvasS.toBlob(function(blob) {
    	saveAs(blob, "masterina.jpg");
		});
	}
	//document.getElementById("saveCanvas").style.zIndex=10;
	
	//====================================================================================================================
		
	}
	function funcFill()
	{
		if (!(bitFill))
		{
			document.getElementById("Fill").src  ="fill2.png";
			bitFill=true;
		}
		else
		{
			document.getElementById("Fill").src  ="fill.png";
			bitFill=false;
		}
		
	}
 //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function piePoints(uX,uY)
{
	var pp=[];
	var ppX=[],ppY=[],ppXm=[],ppYm=[];
	for (var ui=0; ui < pieType; ui++)
	    	 {
	    		ppX[ui]=(uX*Math.cos(2*Math.PI/pieType*ui)+uY*Math.sin(2*Math.PI/pieType*ui))
	    		ppY[ui]=(uY*Math.cos(2*Math.PI/pieType*ui)-uX*Math.sin(2*Math.PI/pieType*ui))
				if (mirror==2)
	    			{
	    			if (pieType==1)
	    				{
	    				ppXm[ui]=(-(uX*Math.cos(2*Math.PI/pieType*ui)+uY*Math.sin(2*Math.PI/pieType*ui)))
	    				ppYm[ui]=(uY*Math.cos(2*Math.PI/pieType*ui)-uX*Math.sin(2*Math.PI/pieType*ui))

	    				}
	    			else{
	    				ppXm[ui]=(uY*Math.cos(2*Math.PI/pieType*ui)+uX*Math.sin(2*Math.PI/pieType*ui))
	    				ppYm[ui]=(uX*Math.cos(2*Math.PI/pieType*ui)-uY*Math.sin(2*Math.PI/pieType*ui))
	    				}
	    			}
	    	}
	    	pp=[ppX,ppY,ppXm,ppYm];
	    	
	    	return pp;
}	
//======================================================================DRAW LINES==============================================================================
function drawPieLine(drawX,drawY)
{
	
	if (!(bitDrawLine))
	{
		tX=piePoints(drawX,drawY)[0];
		tY=piePoints(drawX,drawY)[1];
		tXm=piePoints(drawX,drawY)[2];
		tYm=piePoints(drawX,drawY)[3];
		bitDrawLine=true;
	}
	pX=piePoints(drawX,drawY)[0];
	pY=piePoints(drawX,drawY)[1];
	pXm=piePoints(drawX,drawY)[2];
	pYm=piePoints(drawX,drawY)[3];

	for (var li=0; li < pieType; li++) {
    	
		context.beginPath();
	    context.lineWidth = lineThik;
	    context.moveTo(tX[li],tY[li]);
		context.lineTo(pX[li],pY[li]);
		context.lineCap = 'round';
	    context.strokeStyle = masterina.color;
	    context.stroke(); 
	    if (mirror==2){
		    context.beginPath();
		    context.lineWidth = lineThik;
		    context.moveTo(tXm[li],tYm[li]);
			context.lineTo(pXm[li],pYm[li]);
			context.lineCap = 'round';
		    context.strokeStyle = masterina.color;
		    context.stroke(); 
		}
	    } 
}

function drawPieLineTo2(drawX,drawY)
{
	for (var li=0; li < pieType; li++) {
    	
		context2.beginPath();
	    context2.lineWidth = lineThik;
	    context2.moveTo(tX[li],tY[li]);
		context2.lineTo(pX[li],pY[li]);
		context2.lineCap = 'round';
	    context2.strokeStyle = masterina.color;
	    context2.stroke(); 
	    if (mirror==2){
		    context2.beginPath();
		    context2.lineWidth = lineThik;
		    context2.moveTo(tXm[li],tYm[li]);
			context2.lineTo(pXm[li],pYm[li]);
			context2.lineCap = 'round';
		    context2.strokeStyle = masterina.color;
		    context2.stroke(); 
		}
	    } 
}
//============================================================================================DRAW CIRCLES==========================================================
function drawPieCir(drawX,drawY)
{
	
	if (!(bitDrawCir))
	{
		tX=piePoints(drawX,drawY)[0];
		tY=piePoints(drawX,drawY)[1];
		tXm=piePoints(drawX,drawY)[2];
		tYm=piePoints(drawX,drawY)[3];
		
		bitDrawCir=true;
	}
	pX=piePoints(drawX,drawY)[0];
	pY=piePoints(drawX,drawY)[1];
	pXm=piePoints(drawX,drawY)[2];
	pYm=piePoints(drawX,drawY)[3];
	

	for (var li=0; li < pieType; li++) {
    	
		context.beginPath();
		context.lineWidth = lineThik;
		context.arc(tX[li], tY[li], Math.sqrt(((pX[li]-tX[li])**2)+ (pY[li]-tY[li])**2), 0, 2 * Math.PI, false);
		context.strokeStyle = masterina.color;
		context.stroke(); 
	    if (mirror==2){
		    context.beginPath();
		    context.lineWidth = lineThik;
			context.arc(tXm[li], tYm[li], Math.sqrt(((pXm[li]-tXm[li])**2)+ (pYm[li]-tYm[li])**2), 0, 2 * Math.PI, false);
			context.strokeStyle = masterina.color;
			context.stroke();
		}
	    } 
}

function drawPieCirTo2(drawX,drawY)
{
	for (var li=0; li < pieType; li++) {
    	
		context2.beginPath();
		context2.lineWidth = lineThik;
		context2.arc(tX[li], tY[li], Math.sqrt(((pX[li]-tX[li])**2)+ (pY[li]-tY[li])**2), 0, 2 * Math.PI, false);
		context2.strokeStyle = masterina.color;
		context2.stroke();
	    if (mirror==2){
			context2.beginPath();
			context2.lineWidth = lineThik;
			context2.arc(tXm[li], tYm[li], Math.sqrt(((pXm[li]-tXm[li])**2)+ (pYm[li]-tYm[li])**2), 0, 2 * Math.PI, false);
			context2.strokeStyle = masterina.color;
			context2.stroke();
		}
	    } 
}
//============================================================================================DRAW CIRCLES Fill==========================================================
function drawPieCirFill(drawX,drawY)
{
	if (!(bitDrawCirFill))
	{
		tX=piePoints(drawX,drawY)[0];
		tY=piePoints(drawX,drawY)[1];
		tXm=piePoints(drawX,drawY)[2];
		tYm=piePoints(drawX,drawY)[3];
		
		bitDrawCirFill=true;
	}
	pX=piePoints(drawX,drawY)[0];
	pY=piePoints(drawX,drawY)[1];
	pXm=piePoints(drawX,drawY)[2];
	pYm=piePoints(drawX,drawY)[3];

	for (var li=0; li < pieType; li++) {
    	
		context.beginPath();
		context.arc(tX[li], tY[li], Math.sqrt(((pX[li]-tX[li])**2)+ (pY[li]-tY[li])**2), 0, 2 * Math.PI, false);
		context.fillStyle = masterina.color;
		context.fill(); 
	    if (mirror==2){
		    context.beginPath();
		context.arc(tXm[li], tYm[li], Math.sqrt(((pXm[li]-tXm[li])**2)+ (pYm[li]-tYm[li])**2), 0, 2 * Math.PI, false);
		context.fillStyle = masterina.color;
		context.fill();
		}
	    } 
}

function drawPieCirFillTo2(drawX,drawY)
{
	for (var li=0; li < pieType; li++) {
    	
		context2.beginPath();
		context2.arc(tX[li], tY[li], Math.sqrt(((pX[li]-tX[li])**2)+ (pY[li]-tY[li])**2), 0, 2 * Math.PI, false);
		context2.fillStyle = masterina.color;
		context2.fill();
	    if (mirror==2){
		context2.beginPath();
		context2.arc(tXm[li], tYm[li], Math.sqrt(((pXm[li]-tXm[li])**2)+ (pYm[li]-tYm[li])**2), 0, 2 * Math.PI, false);
		context2.fillStyle = masterina.color;
		context2.fill();
		}
	    } 
}
//=============================================================================Fill Cir==============================================================
function fillCir()
{
	context2.beginPath();
	context2.lineWidth = lineThik;
	context2.arc(0, 0, masterina.radius1-lineThik/2, 0, 2 * Math.PI, false);
	context2.fillStyle = masterina.color;
	context2.fill();
	
	
}
//============================================================================= Cir Line==============================================================
function CirLine()
{
	context2.beginPath();
	context2.lineWidth = lineThik;
	context2.arc(0, 0, masterina.radius1-masterina.line/2, 0, 2 * Math.PI, false);
	context2.strokeStyle = masterina.color;
	context2.stroke();
	
	
}
//============================================================================DRAW PIE==============================================================
function drawPie(drawX,drawY)
{

	if (startMove==false)
	{
		lastPointX=piePoints(drawX,drawY)[0];
		lastPointY=piePoints(drawX,drawY)[1];
		lastPointXm=piePoints(drawX,drawY)[2];
		lastPointYm=piePoints(drawX,drawY)[3];
	}
	   
	pointsX=piePoints(drawX,drawY)[0];
	pointsY=piePoints(drawX,drawY)[1];
	pointsXm=piePoints(drawX,drawY)[2];
	pointsYm=piePoints(drawX,drawY)[3];

 for (var iiii=0; iiii < pieType; iiii++) {
    	
		context2.beginPath();
	    context2.lineWidth = lineThik;
	    context2.moveTo(lastPointX[iiii],lastPointY[iiii]);
		context2.lineTo(pointsX[iiii],pointsY[iiii]);
		context2.lineCap = 'round';
	    context2.strokeStyle = masterina.color;
	    context2.stroke(); 
	    if (mirror==2){
		    context2.beginPath();
		    context2.lineWidth = lineThik;
		    context2.moveTo(lastPointXm[iiii],lastPointYm[iiii]);
			context2.lineTo(pointsXm[iiii],pointsYm[iiii]);
			context2.lineCap = 'round';
		    context2.strokeStyle = masterina.color;
		    context2.stroke(); 
		}
	    } 
	for (var iiiii=0; iiiii < pieType; iiiii++) {
	    lastPointX[iiiii]=pointsX[iiiii];
	    lastPointY[iiiii]=pointsY[iiiii];
	    if (mirror==2){
	    	
	    	lastPointXm[iiiii]=pointsXm[iiiii];
	    	lastPointYm[iiiii]=pointsYm[iiiii];
	    }
	   startMove=true;
	}

}
function drawPieDots(drawX,drawY)
{

	
	   
	pointsX=piePoints(drawX,drawY)[0];
	pointsY=piePoints(drawX,drawY)[1];
	pointsXm=piePoints(drawX,drawY)[2];
	pointsYm=piePoints(drawX,drawY)[3];

 for (var iiii=0; iiii < pieType; iiii++) {
    	
		context2.beginPath();
	    context2.lineWidth = lineThik;
	    context2.moveTo(pointsX[iiii],pointsY[iiii]);
		context2.lineTo(pointsX[iiii],pointsY[iiii]);
		context2.lineCap = 'round';
	    context2.strokeStyle = masterina.color;
	    context2.stroke(); 
	    if (mirror==2){
		    context2.beginPath();
		    context2.lineWidth = lineThik;
		    context2.moveTo(pointsXm[iiii],pointsYm[iiii]);
			context2.lineTo(pointsXm[iiii],pointsYm[iiii]);
			context2.lineCap = 'round';
		    context2.strokeStyle = masterina.color;
		    context2.stroke(); 
		}
	 } 
	

}	
function drawCross(drawX,drawY)
{
	drawMasterina();
	pointsXc=piePoints(drawX,drawY)[0];
	pointsYc=piePoints(drawX,drawY)[1];
	pointsXmc=piePoints(drawX,drawY)[2];
	pointsYmc=piePoints(drawX,drawY)[3];
	
 for (var iiii=0; iiii < pieType; iiii++) {
    	if (bitFill)
		{
			context.beginPath();
		    context.lineWidth = 1;
		    context.moveTo(pointsXc[iiii]-5,pointsYc[iiii]);
			context.lineTo(pointsXc[iiii]+5,pointsYc[iiii]);
			context.moveTo(pointsXc[iiii],pointsYc[iiii]-5);
			context.lineTo(pointsXc[iiii],pointsYc[iiii]+5);
			context.lineCap = 'round';
		    context.strokeStyle = '#eeaaaa';
		    context.stroke(); 
		}
		else
		{
			context.beginPath();
			context.arc(pointsXc[iiii], pointsYc[iiii], lineThik/2, 0, 2 * Math.PI, false);
			context.fillStyle = '#eeaaaa';
			context.fill(); 
		}

	    if (mirror==2){
	    	if (bitFill)
			{
			    context.beginPath();
			    context.lineWidth = 1;
			    context.moveTo(pointsXmc[iiii]-5,pointsYmc[iiii]);
				context.lineTo(pointsXmc[iiii]+5,pointsYmc[iiii]);
				context.moveTo(pointsXmc[iiii],pointsYmc[iiii]-5);
				context.lineTo(pointsXmc[iiii],pointsYmc[iiii]+5);
				context.lineCap = 'round';
			    context.strokeStyle =  '#eebbbb';
			    context.stroke();
			}
			else
			{
				context.beginPath();
			context.arc(pointsXmc[iiii], pointsYmc[iiii], lineThik/2, 0, 2 * Math.PI, false);
			context.fillStyle = '#eeaaaa';
			context.fill(); 
			}
		}
	    } 

}

function drawMasterina()
{
	context.save();
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.restore();

	context.beginPath();
	context.lineWidth = 1;
	context.moveTo(-masterina.radius1,0);
	context.lineTo(masterina.radius1, 0);
	context.moveTo(0,masterina.radius1);
	context.lineTo(0,-masterina.radius1);
	context.strokeStyle = '#ffbbbb';
	context.stroke(); 
	context.beginPath();
	context.lineWidth = masterina.line;
	context.arc(0, 0,masterina.radius1, 0, 2 * Math.PI, false);
	context.strokeStyle = '#ababab';
	context.stroke(); 
	context.beginPath();
	context.arc(0, 0, masterina.radius2, 0, 2 * Math.PI, false);
	context.strokeStyle = '#000000';
	context.stroke(); 
	
	
	
}	
	function rotatePointViaGyroEulars(a,b,c) //rotates 3d point based on eular angles
{
	var oldX=0;
	var oldY=-startY;
	var oldZ=startZ;
	
	//order here is important - it must match the processing order of the device
	
	//rotate about z axis
	var newX = oldX * Math.cos(-degToRad(deviceOrientationData.alpha)) - oldY * Math.sin(-degToRad(deviceOrientationData.alpha));
	var newY = oldY * Math.cos(-degToRad(deviceOrientationData.alpha)) + oldX * Math.sin(-degToRad(deviceOrientationData.alpha));
	
	//rotate about x axis
	oldY=newY;
	newY = oldY * Math.cos(-degToRad(deviceOrientationData.beta)) - oldZ * Math.sin(-degToRad(deviceOrientationData.beta));
	var newZ = oldZ * Math.cos(-degToRad(deviceOrientationData.beta)) + oldY * Math.sin(-degToRad(deviceOrientationData.beta));

	
	//rotate about y axis
	oldZ=newZ;
	oldX=newX;

	newZ = oldZ * Math.cos(-degToRad(deviceOrientationData.gamma)) - oldX * Math.sin(-degToRad(deviceOrientationData.gamma));
	newX = oldX * Math.cos(-degToRad(deviceOrientationData.gamma)) + oldZ * Math.sin(-degToRad(deviceOrientationData.gamma));
	document.getElementById("alpha").innerHTML=oldZ;
	x=newX;
	y=newY;
	z=newZ;

	
}
function computeQuaternionFromEulers(alpha,beta,gamma)//Alpha around Z axis, beta around X axis and gamma around Y axis intrinsic local space in that order(each axis moves depending on how the other moves so processing order is important)
{
	var qx = degToRad(beta) ; // beta value
	var qy = degToRad(gamma) ; // gamma value
	var qz = degToRad(alpha) ; // alpha value

	//precompute to save on processing time
	var cX = Math.cos( x/2 );
	var cY = Math.cos( y/2 );
	var cZ = Math.cos( z/2 );
	var sX = Math.sin( x/2 );
	var sY = Math.sin( y/2 );
	var sZ = Math.sin( z/2 );

	var qw = cX * cY * cZ - sX * sY * sZ;
	var qx = sX * cY * cZ - cX * sY * sZ;
	var qy = cX * sY * cZ + sX * cY * sZ;
	var qz = cX * cY * sZ + sX * sY * cZ;

	x=qx;
	y=qy;
	z=qz;	  
}
window.addEventListener('orientationchange', function () {
    if (window.orientation == -90) {
        document.getElementById('orient').className = 'orientright';
    }
    if (window.orientation == 90) {
        document.getElementById('orient').className = 'orientleft';
    }
    if (window.orientation == 0) {
        document.getElementById('orient').className = '';
    }
}, true);

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255];
        //return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Bad Hex');
}

//=====================================================================================================================================================================================
//============================================================================  ORIENTATION ===========================================================================================
	//===================================================================================================================================== 




function degToRad(deg)// Degree-to-Radian conversion
{
	 return deg * Math.PI / 180; 
}




//========================================================================================================================================================================
//======================================================================TOUCH==================================================================================================



