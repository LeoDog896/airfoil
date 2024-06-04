const pi = 3.1415926;
   


function getVelocity(){

    var stringVelocity = document.getElementById("speedText").value;
    var velocity = parseFloat(stringVelocity);

    return velocity;
} 
   

function getAltitude(){


    var stringAlt = document.getElementById("altitudeText").value;
    var altitude = parseFloat(stringAlt);

    return altitude;

}

function getAngle(){

    var stringAngle = document.getElementById("angleText").value;
    var angle = parseFloat(stringAngle);

    return angle;
}

function getCamber(){

    var stringcamber = document.getElementById("camberText").value;
    var camber = parseFloat(stringcamber);

    return camber;


}

function getThickness(){

    var stringThickness = document.getElementById("thicknessText").value;
    var thickness = parseFloat(stringThickness);

    return thickness;

}



function getWingArea(){

    var stringWing = document.getElementById("wingText").value;
    var wingArea = parseFloat(stringWing);

    return wingArea;

}



function calculateTempTrop(altitude){

    var tempTrop = 59 - 0.00356 * altitude;

    return tempTrop;

}

function calculateTempStrat(){

    var tempStrat = -70;

    return tempStrat;


}

function calculatePressureTrop(tempTrop){

    var pressureTrop = 2116 * Math.pow(((tempTrop + 459.7) / 518.6),5.256);

    return pressureTrop;


}

function calculatePressureStrat(altitude){

    var pressureStrat = 473.1 * Math.exp((1.73 - 0.000048  * altitude));
    return pressureStrat;


}


function calculateDensityTroposphere(altitude){

    var tempTrop = calculateTempTrop(altitude);
    var pressureTrop = calculatePressureTrop(tempTrop);
    var densityTrop = pressureTrop / (1718 * (tempTrop + 459.7));

    return densityTrop;


}


function calculateDensityStratosphere(altitude){

    var tempStrat = calculateTempStrat();
    var pressureStrat = calculatePressureStrat(altitude);

    var densityStrat = pressureStrat / (1718 * (tempStrat + 459.7));

    return densityStrat;

}



function calculateQ0T(velocity,vconv,altitude){

    var densityTrop = calculateDensityTroposphere(altitude);

    q0T = 0.5 * densityTrop * Math.pow(velocity,2) / (vconv * vconv);

    return q0T;

}

function calculateQ0S(velocity,vconv,altitude){

    var densityStrat = calculateDensityStratosphere(altitude);
    q0S = 0.5 * densityStrat * Math.pow(velocity,2) / (vconv * vconv);

    return q0S;

}

function getConvdr(){

    const pi = 3.1415926;
    var convdr = pi / 180;

    return convdr;

}

function getxcVal(){
    
    var ycval = getycVal();
    var rval = getrVal();
    var xcval = 1.0 - Math.sqrt(rval * rval - ycval * ycval);

    return xcval;

}

function getycVal(){

    
    var camber = getCamber() / 25.0;
    var ycval = camber / 2.0;

    return ycval;


}

function getrVal(){

    var stringThickness = document.getElementById("thicknessText").value;
    var thickness = parseFloat(stringThickness) / 25.0;
    var ycval = getycVal();
    var rval = thickness/4.0 + Math.sqrt((thickness*thickness)/(16.0) + (ycval*ycval) + 1.0);

    return rval;

}

function getBeta(){

    var rval = getrVal();
    var ycval = getycVal();
    var convdr = getConvdr();
    var beta = Math.asin(ycval / rval)/convdr;

    return beta;

}

function getGamVal(){

    var stringAngle = document.getElementById("angleText").value;
    var angle = parseFloat(stringAngle);
    var beta = getBeta();
    var convdr = getConvdr();
    var rval = getrVal();
    var gamval = 2.0 * rval * Math.sin((angle + beta) * convdr);

    return gamval;

}

function calculateLiftCoefficient(){


     //obtain the inputs 
     const pi = 3.1415926;
   
     var angle = getAngle();
     
      
     //Juokowski geometry
     var liftCoefficient;
     var convdr = getConvdr();
     var ycval = getycVal();
     var rval = getrVal();
     var xcval = getxcVal();
     var beta = getBeta();
     var gamval = getGamVal();
  
     // calculate lift coefficient
     var vconv = 0.6818;
     var leg = xcval - Math.sqrt(rval * rval - ycval * ycval);
     var teg = xcval + Math.sqrt(rval * rval - ycval * ycval);
     var lem = leg + 1.0 / leg;
     var tem = teg + 1.0 / teg;
     var chrd = tem - lem;
     liftCoefficient = gamval * 4.0 * pi / chrd; 
 
     var stfact;
     
     if(angle > 10.0)
         stfact = 0.5 + 0.1 * angle - 0.005 * angle * angle;
     else if(angle < -10)
         stfact = 0.5 - 0.1 * angle - 0.005 * angle * angle;
     else
         stfact = 1.0;    
 
     liftCoefficient  = liftCoefficient * stfact;    
 
 
     liftCoefficient = liftCoefficient / (1.0 + Math.abs(liftCoefficient) / (pi * 4.0));

     stringLiftCoefficient = liftCoefficient.toFixed(4);
     document.getElementById("cLiftBox").value = stringLiftCoefficient;

     return liftCoefficient;



}



function calculateLift(){


    //obtain the inputs 
    const pi = 3.1415926;
    var velocity = getVelocity();
    var altitude = getAltitude();
    var wingArea = getWingArea();
    var angle = getAngle();
    var radians = (angle * pi) / 180;
    var lift;
     
   
 
    // calculate lift coefficient
    var vconv = 0.6818;
    var liftCoefficient = calculateLiftCoefficient();
    
    //calculate q0
    var q0T = calculateQ0T(velocity,vconv,altitude);
    var q0S = calculateQ0S(velocity,vconv,altitude);

    

    //calculate Lift
    if (altitude <= 36000){

        lift =   q0T * wingArea * liftCoefficient ;
        
        
    }


    else if (altitude > 36000){

        lift = q0S * wingArea * liftCoefficient ;
       
       
    }
    
    
    stringLift = lift.toFixed(0);
    

    document.getElementById("liftBox").value = stringLift;
    


   
    return lift;
    

}



function calculateDragCoefficient(camd,thkd,alfd){

   
   
    

   
    // calculate Drag Coefficient
    var dragCam0Thk5 = -9e-07*Math.pow(alfd,3) + 0.0007*Math.pow(alfd,2) + 0.0008*alfd + 0.015;
    var dragCam5Thk5 = 4E-08*Math.pow(alfd,5) - 7E-07*Math.pow(alfd,4) - 1E-05*Math.pow(alfd,3) + 0.0009*Math.pow(alfd,2) + 0.0033*alfd + 0.0301;
    var dragCam10Thk5 = -9E-09*Math.pow(alfd,6) - 6E-08*Math.pow(alfd,5) + 5E-06*Math.pow(alfd,4) + 3E-05*Math.pow(alfd,3) - 0.0001*Math.pow(alfd,2) - 0.0025*alfd + 0.0615;
    var dragCam15Thk5 = 8E-10*Math.pow(alfd,6) - 5E-08*Math.pow(alfd,5) - 1E-06*Math.pow(alfd,4) + 3E-05*Math.pow(alfd,3) + 0.0008*Math.pow(alfd,2) - 0.0027*alfd + 0.0612;
    var dragCam20Thk5 = 8E-9*Math.pow(alfd,6) + 1E-8*Math.pow(alfd,5) - 5E-6*Math.pow(alfd,4) + 6E-6*Math.pow(alfd,3) + 0.001*Math.pow(alfd,2) - 0.001*alfd + 0.1219;
                    
    var dragCam0Thk10 = -1E-08*Math.pow(alfd,6) + 6E-08*Math.pow(alfd,5) + 6E-06*Math.pow(alfd,4) - 2E-05*Math.pow(alfd,3) - 0.0002*Math.pow(alfd,2) + 0.0017*alfd + 0.0196;
    var dragCam5Thk10 = 3E-09*Math.pow(alfd,6) + 6E-08*Math.pow(alfd,5) - 2E-06*Math.pow(alfd,4) - 3E-05*Math.pow(alfd,3) + 0.0008*Math.pow(alfd,2) + 0.0038*alfd + 0.0159;
    var dragCam10Thk10 = -5E-09*Math.pow(alfd,6) - 3E-08*Math.pow(alfd,5) + 2E-06*Math.pow(alfd,4) + 1E-05*Math.pow(alfd,3) + 0.0004*Math.pow(alfd,2) - 3E-05*alfd + 0.0624;
    var dragCam15Thk10 = -2E-09*Math.pow(alfd,6) - 2E-08*Math.pow(alfd,5) - 5E-07*Math.pow(alfd,4) + 8E-06*Math.pow(alfd,3) + 0.0009*Math.pow(alfd,2) + 0.0034*alfd + 0.0993;
    var dragCam20Thk10 = 2E-09*Math.pow(alfd,6) - 3E-08*Math.pow(alfd,5) - 2E-06*Math.pow(alfd,4) + 2E-05*Math.pow(alfd,3) + 0.0009*Math.pow(alfd,2) + 0.0023*alfd + 0.1581;

     var dragCam0Thk15 = -5E-09*Math.pow(alfd,6) + 7E-08*Math.pow(alfd,5) + 3E-06*Math.pow(alfd,4) - 3E-05*Math.pow(alfd,3) - 7E-05*Math.pow(alfd,2) + 0.0017*alfd + 0.0358;
     var dragCam5Thk15 = -4E-09*Math.pow(alfd,6) - 8E-09*Math.pow(alfd,5) + 2E-06*Math.pow(alfd,4) - 9E-07*Math.pow(alfd,3) + 0.0002*Math.pow(alfd,2) + 0.0031*alfd + 0.0351;
     var dragCam10Thk15 = 3E-09*Math.pow(alfd,6) + 3E-08*Math.pow(alfd,5) - 2E-06*Math.pow(alfd,4) - 1E-05*Math.pow(alfd,3) + 0.0009*Math.pow(alfd,2) + 0.004*alfd + 0.0543;
     var dragCam15Thk15 = 3E-09*Math.pow(alfd,6) + 5E-08*Math.pow(alfd,5) - 2E-06*Math.pow(alfd,4) - 3E-05*Math.pow(alfd,3) + 0.0008*Math.pow(alfd,2) + 0.0087*alfd + 0.1167;
     var dragCam20Thk15 = 3E-10*Math.pow(alfd,6) - 3E-08*Math.pow(alfd,5) - 6E-07*Math.pow(alfd,4) + 3E-05*Math.pow(alfd,3) + 0.0006*Math.pow(alfd,2) + 0.0008*alfd + 0.1859;

     var dragCam0Thk20 = -3E-09*Math.pow(alfd,6) + 2E-08*Math.pow(alfd,5) + 2E-06*Math.pow(alfd,4) - 8E-06*Math.pow(alfd,3) - 4E-05*Math.pow(alfd,2) + 0.0003*alfd + 0.0416;
     var dragCam5Thk20 = -3E-09*Math.pow(alfd,6) - 7E-08*Math.pow(alfd,5) + 1E-06*Math.pow(alfd,4) + 3E-05*Math.pow(alfd,3) + 0.0004*Math.pow(alfd,2) + 5E-05*alfd + 0.0483;
     var dragCam10Thk20 = 1E-08*Math.pow(alfd,6) + 4E-08*Math.pow(alfd,5) - 6E-06*Math.pow(alfd,4) - 2E-05*Math.pow(alfd,3) + 0.0014*Math.pow(alfd,2) + 0.007*alfd + 0.0692;
     var dragCam15Thk20 = 3E-09*Math.pow(alfd,6) - 9E-08*Math.pow(alfd,5) - 3E-06*Math.pow(alfd,4) + 4E-05*Math.pow(alfd,3) + 0.001*Math.pow(alfd,2) + 0.0021*alfd + 0.139;
     var dragCam20Thk20 = 3E-09*Math.pow(alfd,6) - 7E-08*Math.pow(alfd,5) - 3E-06*Math.pow(alfd,4) + 4E-05*Math.pow(alfd,3) + 0.0012*Math.pow(alfd,2) + 0.001*alfd + 0.1856;
     var dragco = 0;

     
     
    

     if (-20.0 <= camd && camd < -15.0)
                        {
                        var dragThk5 = (camd/5 + 4)*(dragCam15Thk5 - dragCam20Thk5) + dragCam20Thk5;
                        var dragThk10 = (camd/5 + 4)*(dragCam15Thk10 - dragCam20Thk10) + dragCam20Thk10;
                        var dragThk15 = (camd/5 + 4)*(dragCam15Thk15 - dragCam20Thk15) + dragCam20Thk15;
                        var dragThk20 = (camd/5 + 4)*(dragCam15Thk20 - dragCam20Thk20) + dragCam20Thk20;
                    
                        
                        if (1.0 <= thkd && thkd <= 5.0)
                            {
                            dragco = dragThk5;
                            }
                        else if (5.0 < thkd && thkd <= 10.0)
                            {
                            dragco = (thkd/5 - 1)*(dragThk10 - dragThk5) + dragThk5;
                            }
                        else if (10.0 < thkd && thkd <= 15.0)
                            {
                            dragco = (thkd/5 - 2)*(dragThk15 - dragThk10) + dragThk10;
                            }
                        else if (15.0 < thkd && thkd <= 20.0)
                            {
                            dragco = (thkd/5 - 3)*(dragThk20 - dragThk15) + dragThk15;
                            }

                        }
                    else if (-15.0 <= camd && camd < -10.0)
                        {
                        var dragThk5 = (camd/5 + 3)*(dragCam10Thk5 - dragCam15Thk5) + dragCam15Thk5;
                        var dragThk10 = (camd/5 + 3)*(dragCam10Thk10 - dragCam15Thk10) + dragCam15Thk10;
                        var dragThk15 = (camd/5 + 3)*(dragCam10Thk15 - dragCam15Thk15) + dragCam15Thk15;
                        var dragThk20 = (camd/5 + 3)*(dragCam10Thk20 - dragCam15Thk20) + dragCam15Thk20;

                        
                        if (1.0 <= thkd && thkd <= 5.0)
                            {
                            dragco = dragThk5;
                            }
                        else if (5.0 < thkd && thkd <= 10.0)
                            {
                            dragco = (thkd/5 - 1)*(dragThk10 - dragThk5) + dragThk5;
                            }
                        else if (10.0 < thkd && thkd <= 15.0)
                            {
                            dragco = (thkd/5 - 2)*(dragThk15 - dragThk10) + dragThk10;
                            }
                        else if (15.0 < thkd && thkd <= 20.0)
                            {
                            dragco = (thkd/5 - 3)*(dragThk20 - dragThk15) + dragThk15;
                            }
                        }
                    else if (-10.0 <= camd && camd < -5.0)
                        {
                        var dragThk5 = (camd/5 + 2)*(dragCam5Thk5 - dragCam10Thk5) + dragCam10Thk5;
                        var dragThk10 = (camd/5 + 2)*(dragCam5Thk10 - dragCam10Thk10) + dragCam10Thk10;
                        var dragThk15 = (camd/5 + 2)*(dragCam5Thk15 - dragCam10Thk15) + dragCam10Thk15;
                        var dragThk20 = (camd/5 + 2)*(dragCam5Thk20 - dragCam10Thk20) + dragCam10Thk20;

                       
                        if (1.0 <= thkd && thkd <= 5.0)
                            {
                            dragco = dragThk5;
                            }
                        else if (5.0 < thkd && thkd <= 10.0)
                            {
                            dragco = (thkd/5 - 1)*(dragThk10 - dragThk5) + dragThk5;
                            }
                        else if (10.0 < thkd && thkd <= 15.0)
                            {
                            dragco = (thkd/5 - 2)*(dragThk15 - dragThk10) + dragThk10;
                            }
                        else if (15.0 < thkd && thkd <= 20.0)
                            {
                            dragco = (thkd/5 - 3)*(dragThk20 - dragThk15) + dragThk15;
                            }
                        }
                    else if (-5.0 <= camd && camd < 0)
                        {
                        var dragThk5 = (camd/5 + 1)*(dragCam0Thk5 - dragCam5Thk5) + dragCam5Thk5;
                        var dragThk10 = (camd/5 + 1)*(dragCam0Thk10 - dragCam5Thk10) + dragCam5Thk10;
                        var dragThk15 = (camd/5 + 1)*(dragCam0Thk15 - dragCam5Thk15) + dragCam5Thk15;
                        var dragThk20 = (camd/5 + 1)*(dragCam0Thk20 - dragCam5Thk20) + dragCam5Thk20;

                        
                        if (1.0 <= thkd && thkd <= 5.0)
                            {
                            dragco = dragThk5;
                            }
                        else if (5.0 < thkd && thkd <= 10.0)
                            {
                            dragco = (thkd/5 - 1)*(dragThk10 - dragThk5) + dragThk5;
                            }
                        else if (10.0 < thkd && thkd <= 15.0)
                            {
                            dragco = (thkd/5 - 2)*(dragThk15 - dragThk10) + dragThk10;
                            
                            }
                        else if (15.0 < thkd && thkd <= 20.0)
                            {
                            dragco = (thkd/5 - 3)*(dragThk20 - dragThk15) + dragThk15;
                            }
                        }
                    else if (0 <= camd && camd < 5)
                        {
                        var dragThk5 = (camd/5)*(dragCam5Thk5 - dragCam0Thk5) + dragCam0Thk5;
                        var dragThk10 = (camd/5)*(dragCam5Thk10 - dragCam0Thk10) + dragCam0Thk10;
                        var dragThk15 = (camd/5)*(dragCam5Thk15 - dragCam0Thk15) + dragCam0Thk15;
                        var dragThk20 = (camd/5)*(dragCam5Thk20 - dragCam0Thk20) + dragCam0Thk20;

                        
                        
                        if (1.0 <= thkd && thkd <= 5.0)
                            {
                            dragco = dragThk5;
                            }
                        else if (5.0 < thkd && thkd <= 10.0)
                            {
                            dragco = (thkd/5 - 1)*(dragThk10 - dragThk5) + dragThk5;
                            }
                        else if (10.0 < thkd && thkd <= 15.0)
                            {
                            dragco = (thkd/5 - 2)*(dragThk15 - dragThk10) + dragThk10;
                            }
                        else if (15.0 < thkd && thkd <= 20.0)
                            {
                            dragco = (thkd/5 - 3)*(dragThk20 - dragThk15) + dragThk15;
                            }

                        
                            
                        }
                    else if (5 <= camd && camd < 10)
                        {
                        var dragThk5 = (camd/5 - 1)*(dragCam10Thk5 - dragCam5Thk5) + dragCam5Thk5;
                        var dragThk10 = (camd/5 - 1)*(dragCam10Thk10 - dragCam5Thk10) + dragCam5Thk10;
                        var dragThk15 = (camd/5 - 1)*(dragCam10Thk15 - dragCam5Thk15) + dragCam5Thk15;
                        var dragThk20 = (camd/5 - 1)*(dragCam10Thk20 - dragCam5Thk20) + dragCam5Thk20;

                        if (1.0 <= thkd && thkd <= 5.0)
                            {
                            dragco = dragThk5;
                            }
                        else if (5.0 < thkd && thkd <= 10.0)
                            {
                            dragco = (thkd/5 - 1)*(dragThk10 - dragThk5) + dragThk5;
                            }
                        else if (10.0 < thkd && thkd <= 15.0)
                            {
                            dragco = (thkd/5 - 2)*(dragThk15 - dragThk10) + dragThk10;
                            }
                        else if (15.0 < thkd && thkd <= 20.0)
                            {
                            dragco = (thkd/5 - 3)*(dragThk20 - dragThk15) + dragThk15;
                            }
                        }
                    else if (10 <= camd && camd < 15)
                        {
                        var dragThk5 = (camd/5 - 2)*(dragCam15Thk5 - dragCam10Thk5) + dragCam10Thk5;
                        var dragThk10 = (camd/5 - 2)*(dragCam15Thk10 - dragCam10Thk10) + dragCam10Thk10;
                        var dragThk15 = (camd/5 - 2)*(dragCam15Thk15 - dragCam10Thk15) + dragCam10Thk15;
                        var dragThk20 = (camd/5 - 2)*(dragCam15Thk20 - dragCam10Thk20) + dragCam10Thk20;

                        if (1.0 <= thkd && thkd <= 5.0)
                            {
                            dragco = dragThk5;
                            }
                        else if (5.0 < thkd && thkd <= 10.0)
                            {
                            dragco = (thkd/5 - 1)*(dragThk10 - dragThk5) + dragThk5;
                            }
                        else if (10.0 < thkd && thkd <= 15.0)
                            {
                            dragco = (thkd/5 - 2)*(dragThk15 - dragThk10) + dragThk10;
                            }
                        else if (15.0 < thkd && thkd <= 20.0)
                            {
                            dragco = (thkd/5 - 3)*(dragThk20 - dragThk15) + dragThk15;
                            }
                        }
                    else if (15 <= camd && camd <= 20)
                        {
                        var dragThk5 = (camd/5 - 3)*(dragCam20Thk5 - dragCam15Thk5) + dragCam15Thk5;
                        var dragThk10 = (camd/5 - 3)*(dragCam20Thk10 - dragCam15Thk10) + dragCam15Thk10;
                        var dragThk15 = (camd/5 - 3)*(dragCam20Thk15 - dragCam15Thk15) + dragCam15Thk15;
                        var dragThk20 = (camd/5 - 3)*(dragCam20Thk20 - dragCam15Thk20) + dragCam15Thk20;

                        if (1.0 <= thkd && thkd <= 5.0)
                            {
                            dragco = dragThk5;
                            }
                        else if (5.0 < thkd && thkd <= 10.0)
                            {
                            dragco = (thkd/5 - 1)*(dragThk10 - dragThk5) + dragThk5;
                            }
                        else if (10.0 < thkd && thkd <= 15.0)
                            {
                            dragco = (thkd/5 - 2)*(dragThk15 - dragThk10) + dragThk10;
                            }
                        else if (15.0 < thkd && thkd <= 20.0)
                            {
                            dragco = (thkd/5 - 3)*(dragThk20 - dragThk15) + dragThk15;
                            }
                        }

                        
                        var aspr = 4.0;
                        var reynolds = calculateReynolds();
                        var liftCoefficient = calculateLiftCoefficient();

                      
                        dragco = dragco * Math.pow((50000./reynolds),.11) ;
                        dragco = dragco + (liftCoefficient * liftCoefficient)/ (3.1415926 * aspr * .85);
                    
                        stringDragCoefficient = dragco.toFixed(4);
                        document.getElementById("cDragBox").value = stringDragCoefficient;

                       return dragco;
                        

}


function calculateDrag(){


    const pi = 3.1415926;
    var velocity = getVelocity();
    var altitude = getAltitude();
    var wingArea = getWingArea();
    var camd = getCamber() ;
    var thkd = getThickness();
    var alfd = getAngle();
    var stringDrag;
    var drag = 0;
    var vconv = 0.6818;



     //calculate q0
     
     

    

     dragco = calculateDragCoefficient(camd,thkd,alfd);
    
    
     
     if (altitude <= 36000){
 
         var q0T = calculateQ0T(velocity,vconv,altitude);
         drag = q0T * wingArea * dragco ;
        
     }
 
 
     else if (altitude > 36000){
 
         var q0S = calculateQ0S(velocity,vconv,altitude);
         drag = q0S * wingArea * dragco ;
         
     }


     
     stringDrag = drag.toFixed(0);
     document.getElementById("dragBox").value = stringDrag;
     

     return drag;

}

function calculateTS0STroposphere(hite){

    var ts0 = 518.6 - 3.56 * hite/1000. ;

    return ts0;


}

function calculateTS0Stratosphere(){

    var ts0 = 389.98 ;

    return ts0;

}

function calculateViscosity(mu0,ts0){

    var viscos = mu0 * 717.408/(ts0 + 198.72)*Math.pow(ts0/518.688,1.5) ;

    return viscos;

}

function calculateReynolds(){

    //obtain the inputs 
    const pi = 3.1415926;
    var velocity = getVelocity();
    var altitude = getAltitude();
    var angle = getAngle();
    var lconv  = 1.0;
    var radians = (angle * pi) / 180;
    
     
    
 
    var vconv = 0.6818;

    var chord = 5.0;
    var mu0 = .000000362;
    var hite = altitude / lconv;

    //Calculate ts0

    if (hite <= 36152.) {           // Troposphere
        ts0 = calculateTS0STroposphere(hite);
        
     }
     if (hite >= 36152. && hite <= 82345.) {   // Stratosphere
        ts0 = calculateTS0Stratosphere();
     }
    
 
    var viscos = calculateViscosity(mu0,ts0);
    

    //calculate Reynolds Number
    if (altitude <= 36000){

        var densityTrop = calculateDensityTroposphere(altitude);
        reynolds = velocity/vconv *chord/lconv * densityTrop / viscos ;
        
      
    }


    else if (altitude > 36000){

        var densityStrat = calculateDensityStratosphere(altitude)
        reynolds = (velocity/vconv) * (chord/lconv) * (densityStrat / viscos) ;
       
    }

    

    
    
        return reynolds;
    
       


}




function plotGraph(){

    var lift = 0;
    var drag = 0;

    lift = calculateLift();
    drag = calculateDrag();
    

    var data = [
        {
          x: ['Lift', 'Drag'],
          y: [lift, drag],
          type: 'bar'
        }
      ];
      
      Plotly.newPlot('tester', data);

  

    
}




function calculateLDRatio(){

    var lift = calculateLift();
    var drag = calculateDrag();
    var ratio = lift / drag;

    return ratio.toFixed(3);


}



function calculate(){

    
    calculateLift();
    calculateDrag();
    plotGraph();
 
    

}

function getFoilShape(){

    var shape = 0;

    return shape;

}

function getPSV(k,nln2){

     
     var psv = -.5*(nln2-1) + .5*(k-1) ;

    return psv;

}

function getFxg(){

    var fxg = -10.0;

    return fxg;
}


function genFlow(){

    var rnew,thet,psv,fxg,stfact;
    var k,index;
    var nlnc = 15;
    var nln2 = nlnc / 2 + 1;
    var nptc = 37;
    var npt2 = nptc / 2 + 1;
    var xg = [];
    for(var i = 0; i < 20; i++){

            xg[i] = [];
        for(var j = 0; j < 40; j++){
            xg[i][j] = undefined;
        }
    }
    var yg = [];
    for(var i = 0; i < 20; i++){

        yg[i] = [];
      for(var j = 0; j < 40; j++){
          yg[i][j] = undefined;
      }
  }
    var rg = [];
    for(var i = 0; i < 20; i++){

          rg[i] = [];
      for(var j = 0; j < 40; j++){
          rg[i][j] = undefined;
      }
  }
    var thg = [];
    for(var i = 0; i < 20; i++){

        thg[i] = [];
    for(var j = 0; j < 40; j++){
        thg[i][j] = undefined;
    }
}
    var xm = [];
    for(var i = 0; i < 20; i++){

        xm[i] = [];
    for(var j = 0; j < 40; j++){
        xm[i][j] = undefined;
    }
}
    var ym = [];
    for(var i = 0; i < 20; i++){

        ym[i] = [];
    for(var j = 0; j < 40; j++){
        ym[i][j] = undefined;
    }
}
    var lyg;
    var deltb = 0.5;
    var vxdir;
    var lxgt;
    var lygt;
    var lrg;
    var lthg;
    var lrgt;
    var lthgt;
    var lxm;
    var lym;
    var radm;
    var thetm;
    var lxmt;
    var lymt;
    var convdr = getConvdr();
    var alfval = getAngle();
    var xcval = getxcVal();
    var ycval = getycVal();
    var ur,uth,jake1,jake2,jakesq ;
    var xloc,yloc,thrad,alfrad ;
    var rad, theta;
    var rval = getrVal();
    var vel,pres;
    var gamval = getGamVal();
    var vsq;
    var i,j,n ;
    var xlabel,ylabel,ind,inmax,inmin ;
    var exes = new Array(8) ;
    var whys = new Array(8) ;
    var offx,scalex,offy,scaley,waste,incy,incx;
    var xl,yl,slope,radvec,xvec,yvec ;
    var camx = [new Array(19)] ;
    var camy = [new Array(19)] ;
    var xt = 170;
    var yt = 105;
    var fact = 30.0;
    var slope;
    var xvec;
    var yvec;
    var pid2 = 3.1415926/2.0;
    var fnew,ynew,yold,rfac,deriv ;
    var deriv;


    for( k = 1; k <= nlnc; k++){

        
        
        psv = getPSV(k,nln2);
        fxg = getFxg();
        
       
        for(index = 1; index <= nptc; index++ ){

            lyg = getLyg(fxg,psv);
            
            lrg = Math.sqrt(fxg*fxg + lyg*lyg) ;
            lthg = Math.atan2(lyg,fxg)/convdr ;
            lxgt = lrg * Math.cos(convdr*(lthg + alfval)) ;
            lygt = lrg * Math.sin(convdr*(lthg + alfval)) ;
       
                              // translate cylinder to generate airfoil 
            lxgt = lxgt + xcval ;
            lygt = lygt + ycval ;
            lrgt = Math.sqrt(lxgt*lxgt + lygt*lygt) ;
            lthgt = Math.atan2(lygt,lxgt)/convdr ;
                               //  Kutta-Joukowski mapping 
            lxm = (lrgt + 1.0/lrgt)*Math.cos(convdr*lthgt) ;
            lym = (lrgt - 1.0/lrgt)*Math.sin(convdr*lthgt) ;
                              // tranforms for view fixed with free stream 
                // take out rotation for angle of attack mapped and cylinder 
            radm = Math.sqrt(lxm*lxm+lym*lym) ;
            thetm = Math.atan2(lym,lxm)/convdr ;
            lxmt = radm*Math.cos(convdr*(thetm-alfval)) ;
            lymt = radm*Math.sin(convdr*(thetm-alfval)) ;

            lxgt = lxgt - xcval ;
            lygt = lygt - ycval ;
            lrgt = Math.sqrt(lxgt*lxgt + lygt*lygt)  ;
            lthgt = Math.atan2(lygt,lxgt)/convdr;
            lxgt = lrgt * Math.cos((lthgt - alfval)*convdr);
            lygt = lrgt * Math.sin((lthgt - alfval)*convdr);
            
            
           xg[k][index]  = lxgt ;
           yg[k][index]  = lygt ;
           rg[k][index]  = lrgt ;
           thg[k][index] = lthgt ;
           xm[k][index]  = lxmt ;
           ym[k][index]  = lymt ;
          
                                            //stall model
           if (alfval > 10.0 && psv > 0.0) {
                if (xm[k][index] > 0.0) {
                    ym[k][index] = ym[k][index -1] ;
            }
       }

             if (alfval < -10.0 && psv < 0.0) {
                if (xm[k][index] > 0.0) {
                     ym[k][index] = ym[k][index -1] ;
            }
       }

    rad = lrg;   
    theta = lthg;
    
           
    thrad = convdr * theta ;
    alfrad = convdr * alfval ;
                              // get x, y location in cylinder plane 
    xloc = rad * Math.cos(thrad) ;
    yloc = rad * Math.sin(thrad) ;
                              // velocity in cylinder plane 
    ur  = Math.cos(thrad-alfrad)*(1.0-(rval*rval)/(rad*rad)) ;
    uth = -Math.sin(thrad-alfrad)*(1.0+(rval*rval)/(rad*rad)) - gamval/rad;
    usq = ur*ur + uth*uth ;
    vxdir = ur * Math.cos(thrad) - uth * Math.sin(thrad) ; // MODS  20 Jul 99 
                              // translate to generate airfoil  
    xloc = xloc + xcval ;
    yloc = yloc + ycval ;
                                 // compute new radius-theta  
    rad = Math.sqrt(xloc*xloc + yloc*yloc) ;
    thrad  = Math.atan2(yloc,xloc) ;
                                 // compute Joukowski Jacobian  
    jake1 = 1.0 - Math.cos(2.0*thrad)/(rad*rad) ;
    jake2 = Math.sin(2.0*thrad)/(rad*rad) ;
    jakesq = jake1*jake1 + jake2*jake2 ;


    if (Math.abs(jakesq) <= .01){

     jakesq = .01 ;
     
    }// protection 

    vsq = usq / jakesq ;
        // vel is velocity ratio - pres is coefficient  (p-p0)/q0   
    
    vel = Math.sqrt(vsq) ;
    pres = 1.0 - vsq ;
    

    fxg = fxg + vxdir * deltb;
    
        
              

    }

    
   
    
}
      
                                   /*  stagnation line */
      k = nln2 ;
      psv = 0.0 ;
      
                                                                              /*  incoming flow */
        for (index = 1; index <= npt2;  index++) {
            rnew = 10.0 - (10.0 - rval)*Math.sin(pid2*(index-1)/(npt2-1)) ;
            thet = Math.asin(.999*(psv - gamval*Math.log(rnew/rval))/(rnew - rval*rval/rnew)) ;
            fxg =  - rnew * Math.cos(thet) ;
            lyg = getLyg(fxg,psv);
            
            
            lrg = Math.sqrt(fxg*fxg + lyg*lyg) ;
            lthg = Math.atan2(lyg,fxg)/convdr ;
            lxgt = lrg * Math.cos(convdr*(lthg + alfval)) ;
            lygt = lrg * Math.sin(convdr*(lthg + alfval)) ;
       
                              /* translate cylinder to generate airfoil */
            lxgt = lxgt + xcval ;
            lygt = lygt + ycval ;
            lrgt = Math.sqrt(lxgt*lxgt + lygt*lygt) ;
            lthgt = Math.atan2(lygt,lxgt)/convdr ;
                               /*  Kutta-Joukowski mapping */
            lxm = (lrgt + 1.0/lrgt)*Math.cos(convdr*lthgt) ;
            lym = (lrgt - 1.0/lrgt)*Math.sin(convdr*lthgt) ;
                              /* tranforms for view fixed with free stream */
                /* take out rotation for angle of attack mapped and cylinder */
            radm = Math.sqrt(lxm*lxm+lym*lym) ;
            thetm = Math.atan2(lym,lxm)/convdr ;
            lxmt = radm*Math.cos(convdr*(thetm-alfval)) ;
            lymt = radm*Math.sin(convdr*(thetm-alfval)) ;

            lxgt = lxgt - xcval ;
            lygt = lygt - ycval ;
            lrgt = Math.sqrt(lxgt*lxgt + lygt*lygt)  ;
            lthgt = Math.atan2(lygt,lxgt)/convdr;
            lxgt = lrgt * Math.cos((lthgt - alfval)*convdr);
            lygt = lrgt * Math.sin((lthgt - alfval)*convdr);

            
            xg[k][index]  = lxgt ;
            yg[k][index]  = lygt ;
            rg[k][index]  = lrgt ;
            thg[k][index] = lthgt ;
            xm[k][index]  = lxmt ;
            ym[k][index]  = lymt ;
            
                                           
        }

    
            
                                            //  downstream flow 
        for (index = 1; index <= npt2; ++ index) {
            rnew = 10.0 + .01 - (10.0 - rval)*Math.cos(pid2*(index-1)/(npt2-1)) ;
            thet = Math.asin(.999*(psv - gamval*Math.log(rnew/rval))/(rnew - rval*rval/rnew)) ;
            fxg =  rnew * Math.cos(thet) ;
           

            lyg = getLyg(fxg,psv);
            
            lrg = Math.sqrt(fxg*fxg + lyg*lyg) ;
            lthg = Math.atan2(lyg,fxg)/convdr ;
            lxgt = lrg * Math.cos(convdr*(lthg + alfval)) ;
            lygt = lrg * Math.sin(convdr*(lthg + alfval)) ;
       
                              // translate cylinder to generate airfoil 
            lxgt = lxgt + xcval ;
            lygt = lygt + ycval ;
            lrgt = Math.sqrt(lxgt*lxgt + lygt*lygt) ;
            lthgt = Math.atan2(lygt,lxgt)/convdr ;
                               //  Kutta-Joukowski mapping 
            lxm = (lrgt + 1.0/lrgt)*Math.cos(convdr*lthgt) ;
            lym = (lrgt - 1.0/lrgt)*Math.sin(convdr*lthgt) ;
                              // tranforms for view fixed with free stream 
                // take out rotation for angle of attack mapped and cylinder 
            radm = Math.sqrt(lxm*lxm+lym*lym) ;
            thetm = Math.atan2(lym,lxm)/convdr ;
            lxmt = radm*Math.cos(convdr*(thetm-alfval)) ;
            lymt = radm*Math.sin(convdr*(thetm-alfval)) ;

            lxgt = lxgt - xcval ;
            lygt = lygt - ycval ;
            lrgt = Math.sqrt(lxgt*lxgt + lygt*lygt)  ;
            lthgt = Math.atan2(lygt,lxgt)/convdr;
            lxgt = lrgt * Math.cos((lthgt - alfval)*convdr);
            lygt = lrgt * Math.sin((lthgt - alfval)*convdr);

            xg[k][npt2+index]  = lxgt ;
            yg[k][npt2+index]  = lygt ;
            rg[k][npt2+index]  = lrgt ;
            thg[k][npt2+index] = lthgt ;
            xm[k][npt2+index]  = lxmt ;
            ym[k][npt2+index]  = lymt ;
           
        }
                                       
                                                                              //  stagnation point 
            xg[k][npt2]  = xcval ;
            yg[k][npt2]  = ycval ;
            rg[k][npt2]  = Math.sqrt(xcval*xcval+ycval*ycval) ;
            thg[k][npt2] = Math.atan2(ycval,xcval)/convdr ;
            xm[k][npt2]  = (xm[k][npt2+1] + xm[k][npt2-1])/2.0 ;
            ym[k][npt2]  = (ym[0][nptc/4+1] + ym[0][nptc/4*3+1])/2.0 ;
            
            
            radvec = .5 ;
          for (j=1; j<=nln2-1; ++j) {           // lower half 
             for (i=1 ; i<= nptc-1; ++i) {
                exes[0] = (int) (fact*xm[j][i]) + xt ;
                whys[0] = (int) (fact*(-ym[j][i])) + yt ;
                slope = (ym[j][i+1]-ym[j][i])/(xm[j][i+1]-xm[j][i]) ;
                xvec = xm[j][i] + radvec / Math.sqrt(1.0 + slope*slope) ;
                yvec = ym[j][i] + slope * (xvec - xm[j][i]) ;
                exes[1] = (int) (fact*xvec) + xt ;
                whys[1] = (int) (fact*(-yvec)) + yt ;
                                   // MODS  21 JUL 99 
                
                  
                                   alert(exes[1]);
                 
                  line(exes[0],whys[0],exes[1],whys[1]) ;

                

            }

        }

        
        for (j=nln2+1; j<=nlnc; ++j) {          /* upper half */
            for (i=1 ; i<= nptc-1; ++i) {
                
               exes[0] = (int) (fact*xpl[j][i]) + xt ;
               whys[0] = (int) (fact*(-ypl[j][i])) + yt ;
               slope = (ypl[j][i+1]-ypl[j][i])/(xpl[j][i+1]-xpl[j][i]) ;
               xvec = xpl[j][i] + radvec / Math.sqrt(1.0 + slope*slope) ;
               yvec = ypl[j][i] + slope * (xvec - xpl[j][i]) ;
               exes[1] = (int) (fact*xvec) + xt ;
               whys[1] = (int) (fact*(-yvec)) + yt ;

             
               line(exes[0],whys[0],exes[1],whys[1]) ;

            }


        }

        

}

function getLyg(fxg,psv){

    var radm,thetm ;                /* MODS  20 Jul 99  whole routine*/
    var fnew,ynew,yold,rfac,deriv ;
    var deriv;
    var xold,xnew,thet ;
    var rmin,rmax ;
    var iter,isign;
    var alfval = getAngle();
    var rval = getrVal();
    var gamval = getGamVal();
    var lrgt;
    var lthgt
    

    ynew = 10.0 ;
    yold = 10.0 ;
       if (psv < 0.0){
           ynew = -10.0 ;
       }
       if (Math.abs(psv) < .001 && alfval < 0.0){
            ynew = rval ;
       }
       if (Math.abs(psv) < .001 && alfval >= 0.0){ 
          ynew = -rval ;
       }
       
       fnew = 0.1 ;
     
       iter = 1 ;
       while (Math.abs(fnew) >= .00001 && iter < 25) {
           ++iter ;
           rfac = fxg*fxg + ynew*ynew ;
          
           if (rfac < rval*rval) {
        	   rfac = rval*rval + .01 ;
           }
           fnew = psv - ynew*(1.0 - rval*rval/rfac) - gamval*Math.log(Math.sqrt(rfac)/rval) ;
           deriv = - (1.0 - rval*rval/rfac) - 2.0 * ynew*ynew*rval*rval/(rfac*rfac) - gamval * ynew / rfac ;
           yold = ynew ;
           ynew = yold  - .5*fnew/deriv ;
           
          
          
       }

       lyg = yold ;

       
       
       return lyg;




}



  function getLrg(fxg, lyg){

    var lrg = Math.sqrt(fxg*fxg + lyg*lyg) ;


    return lrg;


  }

  function getLthg(fxg,lyg){

   
    var convdr = getConvdr();
    var lthg = Math.atan2(lyg,fxg)/convdr ;

    return lthg;

  }


  function getLxgt(fxg,lyg){

    var alfval = getAngle();
    var lthg = getLthg(fxg,lyg);
    var xcval = getxcVal();
    var lrg = getLrg(fxg,lyg);
    var convdr = getConvdr();

    var lxgt = lrg * Math.cos(convdr*(lthg + alfval)) ;
    lxgt = lxgt + xcval;
    lxgt = lxgt - xcval;

     return lxgt;
    

  }

  

  function getLygt(fxg,lyg){
    
    var alfval = getAngle();
    var convdr = getConvdr();
    var lthg = getLthg(fxg,lyg);
    var lrg = getLrg(fxg,lyg);
    var ycval = getycVal();
    

    var lygt = lrg * Math.sin(convdr*(lthg + alfval)) ;
   
   
    return lygt;

  }


  function getLrgt(fxg,lyg){

    var lxgt = getLxgt(fxg,lyg);
    var lygt = getLygt(fxg,lyg);
    var lrgt = Math.sqrt(lxgt*lxgt + lygt*lygt) ;

    return lrgt;

  }

  function getLthgt(lygt,lxgt){

    var convdr = getConvdr();
    var thgt = Math.atan2(lygt,lxgt)/convdr ;

    return thgt;

  }

  function getLxm(lrgt, lthgt){


    var convdr = getConvdr();
    var lxm = (lrgt + 1.0/lrgt)*Math.cos(convdr*lthgt) ;

    return lxm;

  }


  function getLym(lrgt, lthgt){

    var convdr = getConvdr();
    var lym = (lrgt - 1.0/lrgt)*Math.sin(convdr*lthgt) ;

    return lym;

  }


  function getRadm(lxm, lym){

    
    var radm = Math.sqrt(lxm*lxm+lym*lym);

    return radm;

  }

  function getThetm(lxm, lym){


    var convdr = getConvdr();
    var thetm = Math.atan2(lym,lxm)/convdr ;

    return thetm;

  }


  function getLxmt(thetm, radm){

    var alfval = getAngle();
    var convdr = getConvdr();
    var lxmt = radm*Math.cos(convdr*(thetm-alfval));

    return lxmt;

  }

  function getLymt(thetm, radm){

    var alfval = getAngle();
    var convdr = getConvdr();
    var lymt = radm*Math.sin(convdr*(thetm-alfval)) ;

    return lymt;

  }


  function getVel(rad, theta){

    var ur,uth,jake1,jake2,jakesq ;
    var xloc,yloc,thrad,alfrad ;

    thrad = convdr * theta ;
    alfrad = convdr * alfval ;
                              /* get x, y location in cylinder plane */
    xloc = rad * Math.cos(thrad) ;
    yloc = rad * Math.sin(thrad) ;
                              /* velocity in cylinder plane */
    ur  = Math.cos(thrad-alfrad)*(1.0-(rval*rval)/(rad*rad)) ;
    uth = -Math.sin(thrad-alfrad)*(1.0+(rval*rval)/(rad*rad))
                          - gamval/rad;
    usq = ur*ur + uth*uth ;
    vxdir = ur * Math.cos(thrad) - uth * Math.sin(thrad) ; // MODS  20 Jul 99 
                              /* translate to generate airfoil  */
    xloc = xloc + xcval ;
    yloc = yloc + ycval ;
                                 /* compute new radius-theta  */
    rad = Math.sqrt(xloc*xloc + yloc*yloc) ;
    thrad  = Math.atan2(yloc,xloc) ;
                                 /* compute Joukowski Jacobian  */
    jake1 = 1.0 - Math.cos(2.0*thrad)/(rad*rad) ;
    jake2 = Math.sin(2.0*thrad)/(rad*rad) ;
    jakesq = jake1*jake1 + jake2*jake2 ;


    if (Math.abs(jakesq) <= .01){

     jakesq = .01 ;
     
    }/* protection */

    vsq = usq / jakesq ;
        /* vel is velocity ratio - pres is coefficient  (p-p0)/q0   */
    
    vel = Math.sqrt(vsq) ;
    pres = 1.0 - vsq ;
    
    
    
    

  }


            
  