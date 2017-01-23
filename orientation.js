


var first=0;


document.addEventListener("touchStart", touchStartFunc, true);//?misspelled
document.addEventListener("touchmove", touchmoveFunc, true);
document.addEventListener("touchend", touchEndFunc, true);


window.addEventListener("deviceorientation", function () {//gyro
    	
  	startZ=Math.cos(degToRad(event.beta))*L1;
    startY=Math.sin(degToRad(event.beta))*L1;
    first+=1;
    	
    processGyro(event.alpha, event.beta, event.gamma); 
    console.log(first);

    	}, true);

 


function processGyro(alpha,beta,gamma)
{ 
	deviceOrientationData.alpha=alpha;
	deviceOrientationData.beta=beta;
	deviceOrientationData.gamma=gamma;
	
	//drawMasterina();

	if (bitTouch)
	{
		
	}
	else
	{
		rotatePointViaGyroEulars(0,startY,startZ);
	}
	
	//positioning();		
	

}



function positioning()
{
	/*
	document.getElementById("lineThik").style.left  =-x-120+"px";
	document.getElementById("lineThik").style.top  = y+10+"px";	
	document.getElementById("spaceImg").style.left  =-x/10-300+"px";
	document.getElementById("spaceImg").style.top  = y/10-300+"px";	
	document.getElementById("sideImg").style.left  =-x+ 10%+"px";
	document.getElementById("sideImg").style.top  = y+0%+"px";
	document.getElementById("topImg").style.left  =-x+0%+"px";
	document.getElementById("topImg").style.top  = y+10%+"px";
	document.getElementById("lineThik").style.left  =-x+btnLineXpos+"px";
	document.getElementById("lineThik").style.top  =  y+btnLineYpos+"px";//same as img 1 top	
	document.getElementById("pieType").style.left  =-x+btnPyeXpos+"px";
	document.getElementById("pieType").style.top  =  y+btnPyeYpos+"px";//same as img 1 top	
	document.getElementById("Mirror").style.left  =-x+btnMirXpos+"px";
	document.getElementById("Mirror").style.top  =  y+btnMirYpos+"px";//same as img 1 top
	document.getElementById("Color").style.left  =-x/0.7+ width/2+imgWidth/2+60+"px";
	document.getElementById("Color").style.top  = y/0.7+height/2-imgHeight/2+"px";	
	*/
	//document.getElementById("Z").innerHTML =0;
}










function degToRad(deg)// Degree-to-Radian conversion
{
	 return deg * Math.PI / 180; 
}




//========================================================================================================================================================================
//======================================================================TOUCH==================================================================================================



function touchStartFunc(e)
{
	
}

function touchmoveFunc(e)
{
	
		if( navigator.userAgent.match(/Android/i) ) //stupid android bug cancels touch move if it thinks there's a swipe happening
		{   
		  e.preventDefault();
		}
		touchX=e.touches[0].clientX
		userX=e.touches[0].clientX-firstX;
		userY=e.touches[0].clientY-firstY;
		
		if (!(bitTouch))
		{
			
			firstX=e.touches[0].clientX;
			firstY=e.touches[0].clientY;
			
		}
		if (bitTouch){
			drawPie(userX+x,userY-y)
			
		}
		bitTouch=true;
	 
}

function touchEndFunc(e)
{
	
  
  userX=0;
	userY=0;
	bitTouch=false;
	startMove=false;
	
}



//============================================================================ btn func============================================================================

	
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
	//document.getElementById("alpha").innerHTML=oldZ;
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



