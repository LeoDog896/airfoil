
var x = 1
var bool = true;
var m;
var view = 1;


/** Variables used for drawing
 *   xg = center of gravity x cord
 *   yg = center of gravity y cord
 *   rg = center of gravity radius
 *   xm = x coordinate of shape
 *   ym = y coordinate of shape
 */

 /**
  * The for loops in the variables are for
  * declaring 2D arrays in JavaScript
  */
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

var plthg = [new Array(2)];
plthg[1] = 0.0;

/** Variables used for pressure and velocity on shape
 *   plp[40] = specific pressure
 *   plv[40] = specific velocity
 * 
 */

var plp = [40];
var plv = [40];

/**
 * The function setup
 * Called once when the program is started. Used to define initial enviroment properties such as screen size, background color, loading images, etc. 
 * before the draw() begins executing. Variables declared within setup() 
 * are not accessible within other functions, including draw(). 
 * There can only be one setup() function for each program and it should not be called again after it's initial execution.
 * 
 * reference: http://processingjs.org/reference/setup_/
 */
function setup() {
  var canvas = createCanvas(290, 210);
  canvas.parent('airFoilSketch-holder');
  // Starts in the middle
  x = 1 ;
  y = 20;
  rectMode(CENTER)
  noLoop()
}

/**The function draw
 * If you define a function called "draw" in your code, then that function will get called repeatedly, about 30 times per second. 
 * This is typically used for creating animations, in combination with incrementing variables that affect the shapes drawn. 
 * To re-paint the entire canvas for each frame, use the background() command. Otherwise, new shapes will be drawn on top of the previous canvas.
 * 
 * reference : https://www.khanacademy.org/computer-programming/draw-processingjs/5192527846309888
 */ 

function draw() {


 
/**
 * Initialize the variables that will be used to draw the shape and the lines of flow
 */
var exes = [new Array(8)];
var whys = [new Array(8)];
var camx = [new Array(19)];
var camy = [new Array(19)];
var nlnc = 15;
var nln2 = nlnc / 3;
var nptc = 37;
var thet = 0;
var theta = 0;
var lift = 0.0;
var drag = 0.0;
var rval = 0.0;
var xcval = 0.0;
var ycval = 0.0
var gamval = 0.0;
var spindr = 1.0;
/**
 * The input parameters
 * angle
 * camber
 * thickness
 * velocity
 * altitude
 * chord
 * span
 * area
 * 
 * are global variables in the program they are retrieved from the studentGUIComponents 
 * their values are assigned by the sliders used throught the program
 */
var shape = new Shape(angle, camber, thickness, velocity, altitude, chord,span,area);
var airfoil = new Airfoil(angle, camber, thickness, velocity, altitude, chord,span,area);
var ellipse = new Ellipse(angle, camber, thickness, velocity, altitude, chord,span,area);
var plate = new Plate(angle, camber, thickness, velocity, altitude, 5.0,20.0,100.0);
var cylinder = new Cylinder(0.0, 0.0, 12.5, velocity, altitude, 5.0,span,100.0,radius,spin);
var ball = new Ball(0.0, 0.0, 12.5, velocity, altitude, 5.0,span,100.0,radius,spin);
var sldloc = 50 ;
var fact = 30.0;
var spanfac = (int)(2.0*fact*aspr*.3535) ;
var xt = 170;
var yt = 105;
var xt1 = xt + spanfac ;
var yt1 = yt - spanfac ;
var xt2 = xt - spanfac;
var yt2 = yt + spanfac ;
var convdr = shape.getConvDr();
var rdm;
var thtm;
var i,j;
var npt2 = nptc/2+1;
var psv;
var fxg;
var lyg;
var lrg,lthg,lxgt,lygt;
var lxgt,lygt;
var lrgt,lthgt;
var lxm, lym;
var lxmt, lymt;
var rad;   
var theta;
var thrad;
var alfrad;               // get x, y location in cylinder plane 
var xloc;
var yloc;              // velocity in cylinder plane 
var ur;
var uth;
var usq;
var vxdir;               // translate to generate airfoil  
var xloc;
var yloc;                 // compute new radius-theta  
var rad;
var thrad;                       // compute Joukowski Jacobian  
var jake1;
var jake2;
var jakesq;
var slope;
var xvec;
var yvec;
var radvec;
var vel = 1.0;
var pres = 1.0;
var k, index; 
var deltb = 0.5;
var ps0 = 0;
var q0 = 0


/**
 * The variables needed to draw the joukowsky airfoil, shapeSelect = 1 
 */
if(shapeSelect == 1){
    rval = airfoil.getRVal();
    xcval = airfoil.getXcVal();
    ycval = airfoil.getYcVal();
    angle = airfoil.getAngle();
    gamval = airfoil.getGamval();
    lift = airfoil.getLift();
    drag = airfoil.getDrag();
}

/*
* The variables needed to draw the ellipse, shapeSelect = 2  
*/
else if(shapeSelect == 2){
    rval = ellipse.getRVal();
    xcval = ellipse.getXcVal();
    ycval = ellipse.getYcVal();
    angle = ellipse.getAngle();
    gamval = ellipse.getGamval();
    lift = ellipse.getLift();
    drag = ellipse.getDrag();
}

/*
* The variables needed to draw the plate, shapeSelect = 3 
*/
else if(shapeSelect == 3){

    rval = plate.getRVal();
    xcval = plate.getXcVal();
    ycval = plate.getYcVal();
    angle = plate.getAngle();
    gamval = plate.getGamval();
    lift = plate.getLift();
    drag = plate.getDrag();

}

/**
 * The variables needed to draw the rotating cylinder, shapeSelect = 4
 */
else if(shapeSelect == 4){

    var spinCylinder = cylinder.getSpin();
    if(getUnits() == 1)
        rval = cylinder.getRVal() * 1.5 ;
    else if(getUnits() == 2)
        rval = cylinder.getRVal() * 1.5;
    xcval = cylinder.getXcVal();
    ycval = cylinder.getYcVal();
    gamval = cylinder.getGamval();
    lift = cylinder.getLift();
    drag = cylinder.getDrag();
    angle = cylinder.getAngle();
    
    
    plthg[1] = plthg[1] + spinCylinder*spindr*5. ;
    if (plthg[1] < -360.0) {
       plthg[1] = plthg[1] + 360.0 ;
    }
    else if (plthg[1] > 360.0) {
       plthg[1] = plthg[1] - 360.0 ;
    }
    
    

}

/**
 * The variables needed to draw the ball, shapeSelect = 5
 */

else if(shapeSelect == 5){

    spinBall = ball.getSpin();
    if(getUnits() == 1)
        rval = ball.getRVal() * 1.5 ;
    else if(getUnits() == 2)
        rval = ball.getRVal() * 1.5 ;
    xcval = ball.getXcVal();
    ycval = ball.getYcVal();
    camber = ball.getCamber();
    angle = ball.getAngle();
    thickness = ball.getThickness();
    gamval = ball.getGamval();
    lift = ball.getLift();
    drag = ball.getDrag();
    
    
    plthg[1] = plthg[1] + spinBall*spindr*5. ;
    if (plthg[1] < -360.0) {
       plthg[1] = plthg[1] + 360.0 ;
    }
    else if (plthg[1] > 360.0) {
       plthg[1] = plthg[1] - 360.0 ;
    }
    

}

/**
 * The push() function saves the current drawing style settings and transformations, while pop() restores these settings. Note that these functions are always used together. 
 * They allow you to change the style and transformation settings and later return to what you had. When a new state is started with push(), 
 * it builds on the current style and transform information. The push() and pop() functions can be embedded to provide more control. (See the second example for a demonstration.) 
 * 
 * reference : https://p5js.org/reference/#/p5/push
 */
var c = color('white');
  background('black');
  push();
  stroke(50);
  fill(c);


/**
 * Draw the graphs, and probe in real time.
 */
    if(outputButton == 1 || outputButton == 5)
        plotGraph(lift,drag);
    else if(outputButton == 4)
        probe()
    else if(outputButton != 1 || inputButton != 5)
        Plotly.purge('tester')
    
        if(getUnits() == 1){
            document.getElementById("liftLabel").innerHTML = "lbf";
            document.getElementById("dragLabel").innerHTML = "lbf";
        }
        else if(getUnits() == 2){
            document.getElementById("liftLabel").innerHTML = "N";
            document.getElementById("dragLabel").innerHTML = "N";
        }
    
        /**
         * Geometry is updated automatically as you change the inputs
         * Data is updated automatically as you change the inputs
         */
    if(outputButton == 2)
        geometryButton();
    if(outputButton == 3)
        dataButton();
  


 for(var index = 0; index <= nptc; index++){


    /**
 *  calculate the coordinates of each point that 
 * will be drawn to form the shape
 * 
 */
    thet = (index - 1) * 360 / (nptc - 1);
    xg[0][index] = rval  * Math.cos(convdr * thet) + xcval;
    yg[0][index] = rval  * Math.sin(convdr * thet) + ycval;
    rg[0][index] = Math.sqrt(xg[0][index] * xg[0][index] + yg[0][index] * yg[0][index]);
    thg[0][index] = Math.atan2(yg[0][index], xg[0][index]) / convdr;
    xm[0][index] = (rg[0][index]  + 1.0 / rg[0][index]) * Math.cos(convdr * thg[0][index]);
    ym[0][index] = (rg[0][index]  - 1.0 / rg[0][index]) * Math.sin(convdr * thg[0][index]);
    rdm = Math.sqrt(xm[0][index] * xm[0][index] + ym[0][index] * ym[0][index]);
    thtm = Math.atan2(ym[0][index], xm[0][index]) / convdr;
    xm[0][index] = rdm * Math.cos((thtm - angle) * convdr);
    ym[0][index] = rdm * Math.sin((thtm - angle) * convdr);
    
   
    
    
     
     
   
    rad = rval;   
    theta = thet;
    thrad = convdr * theta ;
    alfrad = convdr * angle ;
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

    if(shapeSelect <= 3){
        vel = Math.sqrt(vsq) ;
        pres = 1.0 - vsq ;
    

    }

    else if(shapeSelect >= 4){

        vel = Math.sqrt(usq);
        pres =  1.0 - usq;
    }




    /**
     * environmentSelect = 1 , earth average day
     * ps0 = pressure earth average day
     * q0 = Dynamic pressure earth average day
     */
    if(environmentSelect == 1){
        ps0 = airfoil.getPressureEarth();
        q0 = airfoil.getQ0Earth();
    }

    /**
     * environmentSelect = 2, mars average day
     * ps0 = pressure mars average day
     * q0 = dynamic pressure mars average dat
     */
    else if(environmentSelect == 2){
        ps0 = airfoil.getPressureMars();
        q0 = airfoil.getQ0Mars();
    }

    /**
     * environmentSelect = 3, water constant density
     * ps0 = pressure, water constant density
     * q0 = dynamic pressure, water constant density
     */

    else if(environmentSelect == 3){

        ps0 = airfoil.getPressureWater();
        q0 = airfoil.getQ0Water();
    }

    /**
     * environmentSelect = 4, Venus Surface
     * ps0 = pressure, Venus Surface
     * q0 = dynamic pressure, Venus Surface
     */

    else if(environmentSelect == 4){

        ps0 = airfoil.getPressureVenus();
        q0 = airfoil.getQ0Venus();
    }

    var mapfac = 4.0;

    if(shapeSelect < 4)
        mapfac = 4.0;
    else if(shapeSelect >= 4)
        mapfac = 2.0;

    var pconv = airfoil.getPconv();
    fxg = fxg + vxdir * deltb;
    plv[index] = vel * velocity;
    plp[index] = ((ps0 + pres * q0)/2116.) * pconv ;
   
   
    /**
     * Calculate x and y coordinates for 2D view
     * view = 1 , 2D view
     * 
     * */  
    if(view == 1){    
        exes[1] = (fact * (xm[0][index])) + xt;
        whys[1] = (fact * (-ym[0][index])) + yt;
        exes[2] = (fact * (xm[0][index])) + xt;
        whys[2] = (fact * (-ym[0][index])) + yt;
    }

    /**
     * Calculate x and y coordinates for 3D view
     * view = 2, 3D view
     */
        
    else if(view == 2){
       exes[1] = (int) (fact*(xm[0][index])) + xt1 ;
       whys[1] = (int) (fact*(-ym[0][index])) + yt1 ;
       exes[2] = (int) (fact*(xm[0][index])) + xt2 ;
       whys[2] = (int) (fact*(-ym[0][index])) + yt2 ;
    }

    //npt2 - 1
    for(var i = 0; i<= 1; i++){

      
    /**
     * Calculate x and y coordinates for 2D view
     * view = 1 , 2D view
     * 
     * */  
    if(view == 1 || shapeSelect == 5){
      exes[0] = exes[1] ;
      whys[0] = whys[1] ;
      exes[1] = (int) (fact*(ym[0][npt2-i])) + xt ;
      whys[1] = (int)(fact*(-ym[0][npt2-i])) + yt ;
      exes[3] = exes[2] ;
      whys[3] = whys[2] ;
      exes[2] = (fact*(xm[0][npt2+i])) + xt ;
      whys[2] = (fact*(-ym[0][npt2+i])) + yt ;
      camx[i] = (exes[1] + exes[2]) / 2 ;
      camy[i] = (whys[1] + whys[2]) / 2 ;


    }

    /**
     * Calculate x and y coordinates for 3D view
     * view = 2, 3D view
     */

    else if(view == 2 || shapeSelect != 5){
      
     exes[0] = exes[1] ;
     whys[0] = whys[1] ;
     exes[1] = (int) (fact*(xm[0][npt2-i])) + xt1 ;
     whys[1] = (int) (fact*(-ym[0][npt2-i])) + yt1 ;
     exes[3] = exes[2] ;
     whys[3] = whys[2] ;
     exes[2] = (int) (fact*(xm[0][npt2-i])) + xt2 ;
     whys[2] = (int) (fact*(-ym[0][npt2-i])) + yt2 ;
     fill('red')

    }
      
     
    /**
     * shapeSelect = 1, joukowsky airfoil
     * shapeSelect = 2, ellipse
     * shapeSelect = 3, plate
     */
       
    if(shapeSelect < 4){

        /**
         * we use polygon function to draw the points that form the shape
         * polygon(xCoordinate, yCoordinate, radius of each point, number of points);
         * view = 1, 2D drawing
         */
        if(view == 1){
            polygon(exes[3],whys[3],3,10);
            

        }

        /**
         * we use polygon function to draw the points that form the shape
         * polygon(xCoordinate, yCoordinate, radius of each point, number of points);
         * view = 2, 3D drawing
         */
        else if(view == 2){
            fill('red')
            quad(exes[0],whys[0],exes[1],whys[1],exes[2],whys[2],exes[3],whys[3])
            fill('white')
            stroke('red')
            polygon(exes[0],whys[0],3,10); 
            polygon(exes[3], whys[3], 3, 10)
            
        }
       
        
  
    }

    /**
     * shapeSelect = 4, rotating cylinder
     * shapeSelect = 5, spinning ball
     * 
     */
    else if(shapeSelect >= 4){

         /**
         * we use polygon function to draw the points that form the shape
         * polygon(xCoordinate, yCoordinate, radius of each point, number of points);
         * view = 1, 2D drawing
         */
        if(view == 1){
            
            if(getUnits() == 1)
                polygon(exes[1],whys[1],radius * 20 , 20);
            else if(getUnits() == 2)
                polygon(exes[1],whys[1],radius * 20 / 0.30 , 20);
        }
            

        /**
         * we use polygon function to draw the points that form the shape
         * polygon(xCoordinate, yCoordinate, radius of each point, number of points);
         * view = 2, 3D drawing
         */
        else if(view == 2 && shapeSelect == 4){
            fill('red');
            fill('white')
            stroke('red');
            if(getUnits() == 1)
                polygon(exes[2] ,whys[2] ,radius * 20, 20); 
            else if(getUnits() == 2)
            polygon(exes[2] ,whys[2] ,radius * 20 / 0.30, 20); 
            fill('red');
            if(getUnits() == 1)
                polygon(exes[2] + index * span / 7,whys[2] - index * span / 7 ,radius * 20, 20); 
            else if(getUnits() == 2)
                 polygon(exes[2] + index * span / 7 / 0.30,whys[2] - index * span / 7 / 0.30 ,radius * 20 / 0.30, 20); 
            //polygon(exes[1] ,whys[1] ,radius * 20, 10); 
           
          
        }

        else if(view == 2 && shapeSelect == 5)
            polygon(exes[1],whys[1],radius * 20, 20);
    }

    
    
    

    }

    /**
     * Rotate red line in the center of the cylinder and ball
     */
    if(shapeSelect >= 4 && view == 1){

        
        exes[0] = (int) (fact* (.01*(xm[0][1] + xm[0][2]) + (rval/2.0) * Math.cos(convdr*(plthg[1] + 180.)))) + xt ;
        whys[0] = (int) (fact* (-ym[0][1] + (rval/2.0) * Math.sin(convdr*(plthg[1] + 180.)))) + yt ;
        exes[1] = (int) (fact* (.01*(xm[0][1] + xm[0][2]) + (rval/2.0) * Math.cos(convdr*plthg[1]))) + xt ;
        whys[1] = (int) (fact* (-ym[0][1] + (rval/2.0) * Math.sin(convdr*plthg[1]))) + yt ;
        push()
        stroke('red')
        line(exes[0],whys[0],exes[1],whys[1])
        pop()
      
      }

      else if(shapeSelect == 4 && view == 2 ){

        exes[0] = (int) (fact* (.5*(xm[0][1] + xm[0][17]) + rval  /2.0  * Math.cos(convdr*(plthg[1] + 180.)))) + xt2 ;
        whys[0] = (int) (fact* (-ym[0][1] + rval /2.0 * Math.sin(convdr*(plthg[1] + 180.)))) + yt2 ;
        exes[1] = (int) (fact* (.5*(xm[0][1] + xm[0][17]) + rval /2.0 * Math.cos(convdr*plthg[1]))) + xt2 ;
        whys[1] = (int) (fact* (-ym[0][1] + rval /2.0 * Math.sin(convdr*plthg[1]))) + yt2 ;
        push()
        stroke('red')
        line(exes[0],whys[0],exes[1],whys[1])
        pop()
      }

      else if(shapeSelect == 5 && view == 2){

        exes[0] = (int) (fact* (.01*(xm[0][1] + xm[0][2]) + (rval/2.0) * Math.cos(convdr*(plthg[1] + 180.)))) + xt ;
        whys[0] = (int) (fact* (-ym[0][1] + (rval/2.0) * Math.sin(convdr*(plthg[1] + 180.)))) + yt ;
        exes[1] = (int) (fact* (.01*(xm[0][1] + xm[0][2]) + (rval/2.0) * Math.cos(convdr*plthg[1]))) + xt ;
        whys[1] = (int) (fact* (-ym[0][1] + (rval/2.0) * Math.sin(convdr*plthg[1]))) + yt ;
        push()
        stroke('red')
        line(exes[0],whys[0],exes[1],whys[1])
        pop()


      }
 
   

 

}



/**
 * Now we will be working on drawing the lines of flow
 */


for( var k = 1; k <= nlnc; k++){

        
        
  psv = getPSV(k,nln2);
  fxg = getFxg();
   
  

 
  for( var index = 1; index <= nptc; index++ ){

   
      lyg = getLyg(fxg,psv,angle,rval,gamval);
      
      
      lrg = Math.sqrt(fxg*fxg + lyg*lyg) ;
      lthg = Math.atan2(lyg,fxg)/convdr ;
      lxgt = lrg * Math.cos(convdr*(lthg + angle)) ;
      lygt = lrg * Math.sin(convdr*(lthg + angle)) ;
 
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
      lxmt = radm*Math.cos(convdr*(thetm-angle)) ;
      lymt = radm*Math.sin(convdr*(thetm-angle)) ;
      

      lxgt = lxgt - xcval ;
      lygt = lygt - ycval ;
      lrgt = Math.sqrt(lxgt*lxgt + lygt*lygt)  ;
      lthgt = Math.atan2(lygt,lxgt)/convdr;
      lxgt = lrgt * Math.cos((lthgt - angle)*convdr);
      lygt = lrgt * Math.sin((lthgt - angle)*convdr);
      
  
    
     xg[k][index]  = lxgt ;
     yg[k][index]  = lygt ;
     rg[k][index]  = lrgt ;
     thg[k][index] = lthgt ;
     xm[k][index]  = lxmt ;
     ym[k][index]  = lymt ;

    
     

     
                                      //stall model
     if (angle > 10.0 && psv > 0.0) {
          if (xm[k][index] > 0.0) {
              ym[k][index] = ym[k][index -1] ;
      }
 }

       if (angle < -10.0 && psv < 0.0) {
          if (xm[k][index] > 0.0) {
               ym[k][index] = ym[k][index -1] ;
      }
 }

 
rad = lrg;   
theta = lthg;

     
thrad = convdr * theta ;
alfrad = convdr * angle ;
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

if(shapeSelect <= 3){
    vel = Math.sqrt(vsq) ;
    pres = 1.0 - vsq ;
    

}

else if(shapeSelect >= 4){

    vel = Math.sqrt(usq);
    pres =  1.0 - usq;
}



/**
 * 
 */

    /**
     * environmentSelect = 1 , earth average day
     * ps0 = pressure earth average day
     * q0 = Dynamic pressure earth average day
     */
    if(environmentSelect == 1){
        ps0 = airfoil.getPressureEarth();
        q0 = airfoil.getQ0Earth();
    }

    /**
     * environmentSelect = 2, mars average day
     * ps0 = pressure mars average day
     * q0 = dynamic pressure mars average dat
     */
    else if(environmentSelect == 2){
        ps0 = airfoil.getPressureMars();
        q0 = airfoil.getQ0Mars();
    }

    /**
     * environmentSelect = 3, water constant density
     * ps0 = pressure, water constant density
     * q0 = dynamic pressure, water constant density
     */

    else if(environmentSelect == 3){

        ps0 = airfoil.getPressureWater();
        q0 = airfoil.getQ0Water();
    }

    /**
     * environmentSelect = 4, Venus Surface
     * ps0 = pressure, Venus Surface
     * q0 = dynamic pressure, Venus Surface
     */

    else if(environmentSelect == 4){

        ps0 = airfoil.getPressureVenus();
        q0 = airfoil.getQ0Venus();
    }

var pconv = airfoil.getPconv();
fxg = fxg + vxdir * deltb;


  
        

}

                                // stagnation point
    xg[k][npt2]  = xcval ;
    yg[k][npt2]  = ycval ;
    rg[k][npt2]  = Math.sqrt(xcval*xcval+ycval*ycval) ;
    thg[k][npt2] = Math.atan2(ycval,xcval)/convdr ;
    xm[k][npt2]  = (xm[k][npt2+1] + xm[k][npt2-1])/2.0 ;
    ym[k][npt2]  = (ym[0][nptc/4+1] + ym[0][nptc/4*3+1])/2.0 ;


}


if(display == 1){    // Streamlines Display

radvec = .5 ;
          for ( j=1; j<=nln2 - 1; j = j + 1) {           // lower half 
             for ( i=1 ; i<= nptc - 1; i = i + 1) {
                exes[0] = (int) (fact*xm[j][i]) + xt ;
                whys[0] = (int) (fact*(-ym[j][i])) + yt ;                   
                slope = (ym[j][i+1]-ym[j][i])/(xm[j][i+1]-xm[j][i]) ;
                xvec = xm[j][i] + radvec / Math.sqrt(1.0 + slope*slope) ;
                yvec = ym[j][i] + slope * (xvec - xm[j][i]) ;
                exes[1] = (int) (fact*xvec) + xt ;
                whys[1] = (int) (fact*(-yvec)) + yt ;
                exes[1] = (int) (fact*xm[j][i + 1]) + xt ;
                whys[1] = (int) (fact*(-ym[j][i + 1])) + yt ;
                                  
                
                
                if(environmentSelect <= 2 || environmentSelect == 4)
                    stroke('yellow');
                else if(environmentSelect == 3)
                    stroke('blue');
                if(velocity == 0)
                    stroke('black')

                    line(exes[0],whys[0],exes[1],whys[1]) ;
                  
            }
            

        }

        

    
       
    
       
        
        for ( j= nln2 + 1; j<=nlnc; ++j) {           // upper half 
          for ( i=1 ; i< nptc - 1; i++) {
            exes[0] = (int) (fact*xm[j][i]) + xt ;
            whys[0] = (int) (fact*(-ym[j][i])) + yt ;
            slope = (ym[j][i]-ym[j][i])/(xm[j][i]-xm[j][i]) ;
            xvec = xm[j][i] + radvec / Math.sqrt(1.0 + slope*slope);
            yvec = ym[j][i] + slope * (xvec - xm[j][i]) ;
            exes[1] = (int) (fact*xvec) + xt ;
            whys[1] = (int) (fact*(-yvec)) + yt ;
            exes[1] = (int) (fact*xm[j][i + 1]) + xt ;
            whys[1] = (int) (fact*(-ym[j][i + 1])) + yt ;
            
                               
             
               
            if(environmentSelect == 1 || environmentSelect == 4)
                stroke('cyan');
            else if(environmentSelect == 2)
                stroke('yellow');
            else if(environmentSelect == 3)
                stroke('blue');
            if(velocity == 0)
                stroke('black');


            line(exes[0],whys[0],exes[1],whys[1]) ;
            

         }

     }




     stroke('white'); /* stagnation */
     if(velocity == 0)
        stroke('black')
          exes[1] = (int) (fact*xm[nln2][1]) + xt ;
          whys[1] = (int) (fact*(-ym[nln2][1])) + yt ;
          for (i=2 ; i<= npt2 - 1; ++i) {
                exes[0] = exes[1] ;
                whys[0] = whys[1] ;
                exes[1] = (int) (fact*xm[nln2][i]) + xt ;
                whys[1] = (int) (fact*(-ym[nln2][i])) + yt ;
                           
                  line(exes[0],whys[0],exes[1],whys[1]) ;
                
          }

          stroke('white');
          exes[1] = (int) (fact*xm[nln2][npt2+1]) + xt ;
          whys[1] = (int) (fact*(-ym[nln2][npt2+1])) + yt ;
          for (i=npt2 + 2 ; i<= nptc; ++i) {
                exes[0] = exes[1] ;
                whys[0] = whys[1] ;
                exes[1] = (int) (fact*xm[nln2][i]) + xt ;
                whys[1] = (int) (fact*(-ym[nln2][i])) + yt ;
                                       
                  line(exes[0],whys[0],exes[1],whys[1]) ;
                
          }
  

    }

/*Moving Particles*/
else if(display == 2){


   

    radvec = .5 ;
          for (j=1; j<=nln2; ++j) {           // lower half 
             for (i=1 ; i<27; i = i + 2) {
                exes[0] = (int) (fact*xm[j][x + i]) + xt ;
                whys[0] = (int) (fact*(-ym[j][x + i])) + yt ;
                slope = (ym[j][i+1]-ym[j][i])/(xm[j][i+1]-xm[j][i]) ;
                xvec = xm[j][i] + radvec / Math.sqrt(1.0 + slope*slope);
                yvec = ym[j][i] + slope * (xvec - xm[j][i]) ;
                exes[1] = (int) (fact*xvec) + xt ;
                whys[1] = (int) (fact*(-yvec)) + yt ;
                exes[1] = (int) (fact*xm[j][x + i + 1]) + xt ;
                whys[1] = (int) (fact*(-ym[j][x + i + 1])) + yt ;
                                
                
                if( (i % 5 == 0 || i % 9 == 0) && velocity != 0)
                    stroke('white');
                else if(velocity == 0)
                    stroke('black');
                else
                    stroke('cyan');

                if(environmentSelect == 3)
                    stroke('blue');
                

                line(exes[0],whys[0],exes[1],whys[1]) ;
                                   
  

            }
            

        }

    
       
    
       
        
        for (j=nln2 + 1; j<=nlnc; ++j) {           // upper half 
          for (i=1 ; i< 27; i = i + 2) {
            exes[0] = (int) (fact*xm[j][x + i]) + xt ;
            whys[0] = (int) (fact*(-ym[j][x + i])) + yt ;
            slope = (ym[j][x+i]-ym[j][x])/(xm[j][x+i]-xm[j][x]) ;
            xvec = xm[j][x] + radvec / Math.sqrt(1.0 + slope*slope);
            yvec = ym[j][x] + slope * (xvec - xm[j][x]) ;
            exes[1] = (int) (fact*xvec) + xt ;
            whys[1] = (int) (fact*(-yvec)) + yt ;
            exes[1] = (int) (fact*xm[j][x + i + 1]) + xt ;
            whys[1] = (int) (fact*(-ym[j][x + i + 1])) + yt ;
            
                                
             
               
            if( (i % 5 == 0 || i % 9 == 0) && velocity != 0)
                stroke('white');
            else if(velocity == 0)
                stroke('black');
            else
                stroke('cyan');

            if(environmentSelect == 3)
                stroke('blue');

            line(exes[0],whys[0],exes[1],whys[1]) ;


         }

     }

     x = x + 1

     if(x > 10){

        x = 5;
     }

    
}

/*Freeze Particles*/ 
else if(display == 3){

    radvec = .5 ;
          for (j=1; j<=nln2; ++j) {           // lower half 
             for (i=1 ; i<27; i = i + 2) {
                exes[0] = (int) (fact*xm[j][x + i]) + xt ;
                whys[0] = (int) (fact*(-ym[j][x + i])) + yt ;
                slope = (ym[j][i+1]-ym[j][i])/(xm[j][i+1]-xm[j][i]) ;
                xvec = xm[j][i] + radvec / Math.sqrt(1.0 + slope*slope);
                yvec = ym[j][i] + slope * (xvec - xm[j][i]) ;
                exes[1] = (int) (fact*xvec) + xt ;
                whys[1] = (int) (fact*(-yvec)) + yt ;
                exes[1] = (int) (fact*xm[j][x + i + 1]) + xt ;
                whys[1] = (int) (fact*(-ym[j][x + i + 1])) + yt ;
                                   // MODS  21 JUL 99 
                
                if( (i % 5 == 0 || i % 9 == 0) && velocity != 0)
                    stroke('white');
                else if(velocity == 0)
                    stroke('black');
                else
                    stroke('cyan');

                if(environmentSelect == 3)
                    stroke('blue');
                

                line(exes[0],whys[0],exes[1],whys[1]) ;
                                   
  

            }
            

        }

    
       
    
       
        
        for (j=nln2 + 1; j<=nlnc; ++j) {           // upper half 
          for (i=1 ; i< 27; i = i + 2) {
            exes[0] = (int) (fact*xm[j][x + i]) + xt ;
            whys[0] = (int) (fact*(-ym[j][x + i])) + yt ;
            slope = (ym[j][x+i]-ym[j][x])/(xm[j][x+i]-xm[j][x]) ;
            xvec = xm[j][x] + radvec / Math.sqrt(1.0 + slope*slope);
            yvec = ym[j][x] + slope * (xvec - xm[j][x]) ;
            exes[1] = (int) (fact*xvec) + xt ;
            whys[1] = (int) (fact*(-yvec)) + yt ;
            exes[1] = (int) (fact*xm[j][x + i + 1]) + xt ;
            whys[1] = (int) (fact*(-ym[j][x + i + 1])) + yt ;
            
                                // MODS  21 JUL 99 
             
               
            if( (i % 5 == 0 || i % 9 == 0) && velocity != 0)
                stroke('white');
            else if(velocity == 0)
                stroke('black');
            else
                stroke('cyan');

            if(environmentSelect == 3)
                stroke('blue');

            line(exes[0],whys[0],exes[1],whys[1]) ;


         }

     }

     x = 5

     


}
    
    outputAirfoil();
    timer()

  
}




// Timer function used to call the redraw function
// Redraw is dependant on the velocity input
function timer(){

    
            
    var timer = 100 - (int) (.227 *velocity/0.6818) ;
    var myVar = setTimeout(redraw, timer);
   
    

}



/**
 * 
 * @param {iterations of main loop} k 
 * @param {number of lines divided by 3*} nln2 
 */
function getPSV(k,nln2){

     
    var psv = -.5*(nln2-1) + .5*(k-1) ;

   return psv;

}

function getFxg(){

   var fxg = -10.0;

   return fxg;
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} radius 
 * @param {number} npoints 
 */
function polygon(x, y, radius, npoints) {
    var angl = 2 * pi / npoints;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angl) {
      var sx = x + cos(a) * radius;
      var sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
/**
 * 
 * @param {number} fxg 
 * @param {number} psv 
 * @param {number} alfval - angle in degrees
 * @param {number} rval  - radius vlaue
 * @param {number} gamval  - gama value
 */
  function getLyg(fxg,psv,alfval,rval,gamval){
               
    var fnew,ynew,yold,rfac,deriv ;
    var deriv;
    var iter
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


 