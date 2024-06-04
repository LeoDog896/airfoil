
/**
 * This file is for the plots, gauge and probe of the program
 */

 /**
  * These are the variables needed for the plots
  * pltx = x coordinates
  * plty = y coordinates
  */
 var pltx = [];
 for(var i = 0; i < 20; i++){
 
     pltx[i] = [];
 for(var j = 0; j < 40; j++){
     pltx[i][j] = undefined;
     }
 }
 
 var plty = [];
 for(var i = 0; i < 20; i++){
 
     plty[i] = [];
 for(var j = 0; j < 40; j++){
     plty[i][j] = undefined;
     }
 }
 
 /**
  * 
  * @param {number} lift 
  * @param {number} drag 
  * 
  * This function plots the graphs and the gages
  */
 function plotGraph(lift,drag){
 
   
     var pconv;
     var lconv;
     var pressString;
     var velString;
     var forceString;
     var lenghtString;
     if(getUnits() == 1){
         pconv = 14.7;
         lconv = 1.0;
         pressString = "psi";
         velString = "mph";
         forceString = "lbf";
         lenghtString = "ft"
         areaString = "sq ft";
     }
     else if(getUnits() == 2){
         pconv = 101.3;
         lconv = 0.3048;
         pressString = "kPa";
         velString = "km/h";
         forceString = "N";
         lenghtString = "m";
         areaString = "sq m";
     }
     var npt2 = 19;
     var npt = npt2;
 
     /**
      * plot = 1
      * lift vs drag gauge
      */
     if(plot == 1){
     var data = [
         {
           x: ['Lift', 'Drag'],
           y: [lift, drag],
           type: 'bar',
         
         }
       ];
 
       var layout = {
           title: 'Lift and Drag',
           showlegend: false
       }
      
         Plotly.newPlot('tester', data,layout, {displayModeBar: false});
         if(outputButton != 1)
             Plotly.purge('tester');
         
 
     }
 
     /**
      * plot = 2 
      * Pressure variation
      * ShapeSelect < 4, Airfoil, Ellipse and Plate
      * shapeSelect >= 4, rotating Cylinder and spinning ball
      */
     else if(plot == 2){
 
         var shape = new Shape(angle, camber, thickness, velocity, altitude, chord,span,area);
             if(environmentSelect == 1){
                 globalPressure = shape.getPressureEarth();
             }
 
             else if(environmentSelect == 2){
 
                 globalPressure = shape.getPressureMars();
             }
 
             else if(environmentSelect == 3){
 
                 globalPressure = shape.getPressureWater();
             }
 
             else if(environmentSelect == 4){
 
                 globalPressure = shape.getPressureVenus();
             }
 
             
         if(shapeSelect < 4)
         var trace1 = 
             {
               x: [100.*(xm[0][npt2-0 + 1]/4.0 + .5), 100.*(xm[0][npt2-1 + 1]/4.0 + .5),100.*(xm[0][npt2-2 + 1]/4.0 + .5),100.*(xm[0][npt2-3 + 1]/4.0 + .5),
                   100.*(xm[0][npt2-4 + 1]/4.0 + .5), 100.*(xm[0][npt2-5 + 1]/4.0 + .5),100.*(xm[0][npt2-6 + 1]/4.0 + .5),100.*(xm[0][npt2-7 + 1]/4.0 + .5),
                   100.*(xm[0][npt2-8 + 1]/4.0 + .5), 100.*(xm[0][npt2-9 + 1]/4.0 + .5),100.*(xm[0][npt2-10 + 1]/4.0 + .5),100.*(xm[0][npt2-11 + 1]/4.0 + .5),
                   100.*(xm[0][npt2-12 + 1]/4.0 + .5), 100.*(xm[0][npt2-13 + 1]/4.0 + .5),100.*(xm[0][npt2-14 + 1]/4.0 + .5),100.*(xm[0][npt2-15 + 1]/4.0 + .5),
                   100.*(xm[0][npt2-16 + 1]/4.0 + .5), 100.*(xm[0][npt2-17 + 1]/4.0 + .5),100.*(xm[0][npt2-18 + 1]/4.0 + .5)],
               y: [plp[npt2-0 + 1],plp[npt2-1 + 1],plp[npt2-2 + 1],plp[npt2-3 + 1],plp[npt2-4 + 1],plp[npt2-5 + 1],plp[npt2-6 + 1],plp[npt2-7 + 1],plp[npt2 - 8 + 1],
                   plp[npt2-9 + 1],plp[npt2-10 + 1],plp[npt2-11 + 1],plp[npt2-12 + 1],plp[npt2-13 + 1],plp[npt2-14 + 1],plp[npt2-15 + 1],plp[npt2-16 + 1],plp[npt2 - 17 + 1],plp[npt2 - 18 + 1]],
               mode: 'lines',
               name: 'Upper Surface',
               type: 'scatter',
             
             }
         else if(shapeSelect >= 4)
         var trace1 = 
             {
               x: [100.*(xm[0][npt2-0 + 1]/(2.0 * radius / lconv) + .5), 100.*(xm[0][npt2-1 + 1]/(2.0 * radius / lconv)+ .5),100.*(xm[0][npt2-2 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-3 + 1]/(2.0 * radius / lconv) + .5),
                   100.*(xm[0][npt2-4 + 1]/(2.0 * radius / lconv) + .5), 100.*(xm[0][npt2-5 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-6 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-7 + 1]/(2.0 * radius / lconv) + .5),
                   100.*(xm[0][npt2-8 + 1]/4.0 + .5), 100.*(xm[0][npt2-9 + 1]/4.0 + .5),100.*(xm[0][npt2-10 + 1]/4.0 + .5),100.*(xm[0][npt2-11 + 1]/4.0 + .5),
                   100.*(xm[0][npt2-12 + 1]/(2.0 * radius / lconv) + .5), 100.*(xm[0][npt2-13 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-14 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-15 + 1]/(2.0 * radius / lconv) + .5),
                   100.*(xm[0][npt2-16 + 1]/(2.0 * radius / lconv) + .5), 100.*(xm[0][npt2-17 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-18 + 1]/(2.0 * radius / lconv) + .5)],
               y: [plp[npt2-0 + 1],plp[npt2-1 + 1],plp[npt2-2 + 1],plp[npt2-3 + 1],plp[npt2-4 + 1],plp[npt2-5 + 1],plp[npt2-6 + 1],plp[npt2-7 + 1],plp[npt2 - 8 + 1],
                   plp[npt2-9 + 1],plp[npt2-10 + 1],plp[npt2-11 + 1],plp[npt2-12 + 1],plp[npt2-13 + 1],plp[npt2-14 + 1],plp[npt2-15 + 1],plp[npt2-16 + 1],plp[npt2 - 17 + 1],plp[npt2 - 18 + 1]],
               mode: 'lines',
               type: 'scatter',
               name:'Upper Surface'
             
             }
 
             if(shapeSelect < 4)
             var trace2 = {
 
                 x: [100.*(xm[1][npt2 + 0 - 1]/4.0 + .5), 100.*(xm[1][npt2 + 1 - 1]/4.0 + .5),100.*(xm[1][npt2  + 2 - 1]/4.0 + .5),100.*(xm[1][npt2 + 3 - 1]/4.0 + .5),
                 100.*(xm[1][npt2 + 4 - 1]/4.0 + .5), 100.*(xm[1][npt2 + 5 - 1]/4.0 + .5),100.*(xm[1][npt2+6 - 1]/4.0 + .5),100.*(xm[1][npt2+7 - 1]/4.0 + .5),
                 100.*(xm[1][npt2+8 - 1]/4.0 + .5), 100.*(xm[1][npt2+9 - 1]/4.0 + .5),100.*(xm[1][npt2 + 10 - 1]/4.0 + .5),100.*(xm[1][npt2+11 - 1]/4.0 + .5),
                 100.*(xm[1][npt2+12 - 1]/4.0 + .5), 100.*(xm[1][npt2+13 - 1]/4.0 + .5),100.*(xm[1][npt2+14 - 1]/4.0 + .5),100.*(xm[1][npt2+15 - 1]/4.0 + .5),
                 100.*(xm[1][npt2+16 - 1]/4.0 + .5), 100.*(xm[1][npt2+17 - 1]/4.0 + .5),100.*(xm[1][npt2+18 - 1]/4.0 + .5)],
             y: [plp[npt2+0 - 1],plp[npt2+1 - 1],plp[npt2+2 - 1],plp[npt2+3 - 1],plp[npt2+4 - 1],plp[npt2+5 - 1],plp[npt2+6 - 1],plp[npt2+7 - 1],plp[npt2 + 8 - 1],
                 plp[npt2+9 - 1],plp[npt2+10 - 1],plp[npt2+11 - 1],plp[npt2+12 - 1],plp[npt2+13 - 1],plp[npt2+14 - 1],plp[npt2+15 - 1],plp[npt2+16 - 1],plp[npt2 + 17 - 1],plp[npt2 + 18 - 1]],
             mode: 'lines',
             type: 'scatter',
             name: 'Lower Surface'
 
             }
 
             else if(shapeSelect >= 4)
             var trace2 = {
 
                 x: [100.*(xm[1][npt2 + 0 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2 + 1 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2  + 2 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2 + 3 - 1]/(2.0 * radius / lconv) + .5),
                 100.*(xm[1][npt2 + 4 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2 + 5 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+6 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+7 - 1]/(2.0 * radius / lconv) + .5),
                 100.*(xm[1][npt2+8 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2+9 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2 + 10 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+11 - 1]/(2.0 * radius / lconv) + .5),
                 100.*(xm[1][npt2+12 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2+13 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+14 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+15 - 1]/(2.0 * radius / lconv) + .5),
                 100.*(xm[1][npt2+16 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2+17 - 1]/(2.0 * radius / lconv)+ .5),100.*(xm[1][npt2+18 - 1]/(2.0 * radius / lconv) + .5)],
             y: [plp[npt2+0 - 1],plp[npt2+1 - 1],plp[npt2+2 - 1],plp[npt2+3 - 1],plp[npt2+4 - 1],plp[npt2+5 - 1],plp[npt2+6 - 1],plp[npt2+7 - 1],plp[npt2 + 8 - 1],
                 plp[npt2+9 - 1],plp[npt2+10 - 1],plp[npt2+11 - 1],plp[npt2+12 - 1],plp[npt2+13 - 1],plp[npt2+14 - 1],plp[npt2+15 - 1],plp[npt2+16 - 1],plp[npt2 + 17 - 1],plp[npt2 + 18 - 1]],
             mode: 'lines',
             type: 'scatter',
             name: 'Lower Surface'
 
             }
 
 
             if(shapeSelect < 4)
             var trace3 = {
                 x:  [100.*(xm[1][npt2 + 0 - 1]/4.0 + .5), 100.*(xm[1][npt2 + 1 - 1]/4.0 + .5),100.*(xm[1][npt2  + 2 - 1]/4.0 + .5),100.*(xm[1][npt2 + 3 - 1]/4.0 + .5),
                 100.*(xm[1][npt2 + 4 - 1]/4.0 + .5), 100.*(xm[1][npt2 + 5 - 1]/4.0 + .5),100.*(xm[1][npt2+6 - 1]/4.0 + .5),100.*(xm[1][npt2+7 - 1]/4.0 + .5),
                 100.*(xm[1][npt2+8 - 1]/4.0 + .5), 100.*(xm[1][npt2+9 - 1]/4.0 + .5),100.*(xm[1][npt2 + 10 - 1]/4.0 + .5),100.*(xm[1][npt2+11 - 1]/4.0 + .5),
                 100.*(xm[1][npt2+12 - 1]/4.0 + .5), 100.*(xm[1][npt2+13 - 1]/4.0 + .5),100.*(xm[1][npt2+14 - 1]/4.0 + .5),100.*(xm[1][npt2+15 - 1]/4.0 + .5),
                 100.*(xm[1][npt2+16 - 1]/4.0 + .5), 100.*(xm[1][npt2+17 - 1]/4.0 + .5),100.*(xm[1][npt2+18 - 1]/4.0 + .5)],
                 y:[globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,
                     globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,
                     globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,
                     globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv ],
                 
                 mode: 'lines',
                 type: 'scatter',
                 name : 'Pressure'
                 
             }
             else if(shapeSelect >= 4)
             var trace3 = {
                 x:  [100.*(xm[1][npt2 + 0 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2 + 1 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2  + 2 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2 + 3 - 1]/(2.0 * radius / lconv) + .5),
                 100.*(xm[1][npt2 + 4 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2 + 5 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+6 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+7 - 1]/(2.0 * radius / lconv) + .5),
                 100.*(xm[1][npt2+8 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2+9 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2 + 10 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+11 - 1]/(2.0 * radius / lconv) + .5),
                 100.*(xm[1][npt2+12 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2+13 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+14 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+15 - 1]/(2.0 * radius / lconv) + .5),
                 100.*(xm[1][npt2+16 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2+17 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+18 - 1]/(2.0 * radius / lconv) + .5)],
                 y:[globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,
                     globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,
                     globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,
                     globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv,globalPressure / 2116 * pconv ],
                 
                 mode: 'lines',
                 type: 'scatter',
                 name: 'Pressure'
                 
             }
           
     
           var layout = {
               title: 'Pressure Variation',
               showlegend:true,
               autosize: false,
               width: 380,
               height: 400,
               size:30,
               xaxis: {
                 title: {
                   text: 'x Coordinate',
                   font: {
                     family: 'Courier New, monospace',
                     size: 18,
                     color: 'black'
                   }
                 },
               },
               yaxis: {
                 title: {
                   text: 'Press ' + pressString,
                   font: {
                     family: 'Courier New, monospace',
                     size: 18,
                     color: 'black'
                   }
                 }
               }
 
           }
 
           var data = [trace1,trace2,trace3];
          
             Plotly.newPlot('tester', data,layout,{displayModeBar: false});
             if(outputButton != 5)
                 Plotly.purge('tester');
             
 
         
 
 
     }
 
     /**
      * plot = 3 
      * velocity variation
      * ShapeSelect < 4, Airfoil, Ellipse and Plate
      * shapeSelect >= 4, rotating Cylinder and spinning ball
      */
     else if(plot == 3){
 
         if(shapeSelect < 4)
         var trace1 = 
         {
           x: [100.*(xm[0][npt2-0 + 1]/4.0 + .5), 100.*(xm[0][npt2-1 + 1]/4.0 + .5),100.*(xm[0][npt2-2 + 1]/4.0 + .5),100.*(xm[0][npt2-3 + 1]/4.0 + .5),
               100.*(xm[0][npt2-4 + 1]/4.0 + .5), 100.*(xm[0][npt2-5 + 1]/4.0 + .5),100.*(xm[0][npt2-6 + 1]/4.0 + .5),100.*(xm[0][npt2-7 + 1]/4.0 + .5),
               100.*(xm[0][npt2-8 + 1]/4.0 + .5), 100.*(xm[0][npt2-9 + 1]/4.0 + .5),100.*(xm[0][npt2-10 + 1]/4.0 + .5),100.*(xm[0][npt2-11 + 1]/4.0 + .5),
               100.*(xm[0][npt2-12 + 1]/4.0 + .5), 100.*(xm[0][npt2-13 + 1]/4.0 + .5),100.*(xm[0][npt2-14 + 1]/4.0 + .5),100.*(xm[0][npt2-15 + 1]/4.0 + .5),
               100.*(xm[0][npt2-16 + 1]/4.0 + .5), 100.*(xm[0][npt2-17 + 1]/4.0 + .5),100.*(xm[0][npt2-18 + 1]/4.0 + .5)],
           y: [plv[npt2-0 + 1],plv[npt2-1 + 1],plv[npt2-2 + 1],plv[npt2-3 + 1],plv[npt2-4 + 1],plv[npt2-5 + 1],plv[npt2-6 + 1],plv[npt2-7 + 1],plv[npt2 - 8 + 1],
               plv[npt2-9 + 1],plv[npt2-10 + 1],plv[npt2-11 + 1],plv[npt2-12 + 1],plv[npt2-13 + 1],plv[npt2-14 + 1],plv[npt2-15 + 1],plv[npt2-16 + 1],plv[npt2 - 17 + 1],plv[npt2 - 18 + 1]],
           mode: 'lines',
           type: 'scatter',
           name: 'Upper Surface'
         
         }
         else if(shapeSelect >= 4)
         var trace1 = 
         {
           x: [100.*(xm[0][npt2-0 + 1]/(2.0 * radius / lconv) + .5), 100.*(xm[0][npt2-1 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-2 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-3 + 1]/(2.0 * radius / lconv) + .5),
               100.*(xm[0][npt2-4 + 1]/(2.0 * radius / lconv) + .5), 100.*(xm[0][npt2-5 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-6 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-7 + 1]/(2.0 * radius / lconv) + .5),
               100.*(xm[0][npt2-8 + 1]/(2.0 * radius / lconv) + .5), 100.*(xm[0][npt2-9 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-10 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-11 + 1]/(2.0 * radius / lconv) + .5),
               100.*(xm[0][npt2-12 + 1]/(2.0 * radius / lconv) + .5), 100.*(xm[0][npt2-13 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-14 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-15 + 1]/(2.0 * radius / lconv) + .5),
               100.*(xm[0][npt2-16 + 1]/(2.0 * radius / lconv) + .5), 100.*(xm[0][npt2-17 + 1]/(2.0 * radius / lconv) + .5),100.*(xm[0][npt2-18 + 1]/(2.0 * radius / lconv) + .5)],
           y: [plv[npt2-0 + 1],plv[npt2-1 + 1],plv[npt2-2 + 1],plv[npt2-3 + 1],plv[npt2-4 + 1],plv[npt2-5 + 1],plv[npt2-6 + 1],plv[npt2-7 + 1],plv[npt2 - 8 + 1],
               plv[npt2-9 + 1],plv[npt2-10 + 1],plv[npt2-11 + 1],plv[npt2-12 + 1],plv[npt2-13 + 1],plv[npt2-14 + 1],plv[npt2-15 + 1],plv[npt2-16 + 1],plv[npt2 - 17 + 1],plv[npt2 - 18 + 1]],
           mode: 'lines',
           type: 'scatter',
           name: 'Upper Surface'
         
         }
 
         if(shapeSelect < 4)
         var trace2 = {
 
             x: [100.*(xm[1][npt2 + 0 - 1]/4.0 + .5), 100.*(xm[1][npt2 + 1 - 1]/4.0 + .5),100.*(xm[1][npt2  + 2 - 1]/4.0 + .5),100.*(xm[1][npt2 + 3 - 1]/4.0 + .5),
             100.*(xm[1][npt2 + 4 - 1]/4.0 + .5), 100.*(xm[1][npt2 + 5 - 1]/4.0 + .5),100.*(xm[1][npt2+6 - 1]/4.0 + .5),100.*(xm[1][npt2+7 - 1]/4.0 + .5),
             100.*(xm[1][npt2+8 - 1]/4.0 + .5), 100.*(xm[1][npt2+9 - 1]/4.0 + .5),100.*(xm[1][npt2 + 10 - 1]/4.0 + .5),100.*(xm[1][npt2+11 - 1]/4.0 + .5),
             100.*(xm[1][npt2+12 - 1]/4.0 + .5), 100.*(xm[1][npt2+13 - 1]/4.0 + .5),100.*(xm[1][npt2+14 - 1]/4.0 + .5),100.*(xm[1][npt2+15 - 1]/4.0 + .5),
             100.*(xm[1][npt2+16 - 1]/4.0 + .5), 100.*(xm[1][npt2+17 - 1]/4.0 + .5),100.*(xm[1][npt2+18 - 1]/4.0 + .5)],
         y: [plv[npt2+0 - 1],plv[npt2+1 - 1],plv[npt2+2 - 1],plv[npt2+3 - 1],plv[npt2+4 - 1],plv[npt2+5 - 1],plv[npt2+6 - 1],plv[npt2+7 - 1],plv[npt2 + 8 - 1],
             plv[npt2+9 - 1],plv[npt2+10 - 1],plv[npt2+11 - 1],plv[npt2+12 - 1],plv[npt2+13 - 1],plv[npt2+14 - 1],plv[npt2+15 - 1],plv[npt2+16 - 1],plv[npt2 + 17 - 1],plv[npt2 + 18 - 1]],
         mode: 'lines',
         type: 'scatter',
         name: 'Lower Surface'
 
         }
         else if(shapeSelect >= 4)
         var trace2 = {
 
             x: [100.*(xm[1][npt2 + 0 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2 + 1 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2  + 2 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2 + 3 - 1]/(2.0 * radius / lconv) + .5),
             100.*(xm[1][npt2 + 4 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2 + 5 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+6 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+7 - 1]/(2.0 * radius / lconv) + .5),
             100.*(xm[1][npt2+8 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2+9 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2 + 10 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+11 - 1]/(2.0 * radius / lconv) + .5),
             100.*(xm[1][npt2+12 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2+13 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+14 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+15 - 1]/(2.0 * radius / lconv) + .5),
             100.*(xm[1][npt2+16 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2+17 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+18 - 1]/(2.0 * radius / lconv) + .5)],
         y: [plv[npt2+0 - 1],plv[npt2+1 - 1],plv[npt2+2 - 1],plv[npt2+3 - 1],plv[npt2+4 - 1],plv[npt2+5 - 1],plv[npt2+6 - 1],plv[npt2+7 - 1],plv[npt2 + 8 - 1],
             plv[npt2+9 - 1],plv[npt2+10 - 1],plv[npt2+11 - 1],plv[npt2+12 - 1],plv[npt2+13 - 1],plv[npt2+14 - 1],plv[npt2+15 - 1],plv[npt2+16 - 1],plv[npt2 + 17 - 1],plv[npt2 + 18 - 1]],
         mode: 'lines',
         type: 'scatter',
         name: 'Lower Surface'
 
         }
 
         if(shapeSelect < 4)
         var trace3 = {
             x:  [100.*(xm[1][npt2 + 0 - 1]/4.0 + .5), 100.*(xm[1][npt2 + 1 - 1]/4.0 + .5),100.*(xm[1][npt2  + 2 - 1]/4.0 + .5),100.*(xm[1][npt2 + 3 - 1]/4.0 + .5),
             100.*(xm[1][npt2 + 4 - 1]/4.0 + .5), 100.*(xm[1][npt2 + 5 - 1]/4.0 + .5),100.*(xm[1][npt2+6 - 1]/4.0 + .5),100.*(xm[1][npt2+7 - 1]/4.0 + .5),
             100.*(xm[1][npt2+8 - 1]/4.0 + .5), 100.*(xm[1][npt2+9 - 1]/4.0 + .5),100.*(xm[1][npt2 + 10 - 1]/4.0 + .5),100.*(xm[1][npt2+11 - 1]/4.0 + .5),
             100.*(xm[1][npt2+12 - 1]/4.0 + .5), 100.*(xm[1][npt2+13 - 1]/4.0 + .5),100.*(xm[1][npt2+14 - 1]/4.0 + .5),100.*(xm[1][npt2+15 - 1]/4.0 + .5),
             100.*(xm[1][npt2+16 - 1]/4.0 + .5), 100.*(xm[1][npt2+17 - 1]/4.0 + .5),100.*(xm[1][npt2+18 - 1]/4.0 + .5)],
             y:[velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,
                 velocity,velocity,velocity,velocity,velocity ],
             
             mode: 'lines',
             type: 'scatter',
             name: 'Velocity'
             
         }
         else if(shapeSelect >= 4)
         var trace3 = {
             x:  [100.*(xm[1][npt2 + 0 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2 + 1 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2  + 2 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2 + 3 - 1]/(2.0 * radius / lconv) + .5),
             100.*(xm[1][npt2 + 4 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2 + 5 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+6 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+7 - 1]/(2.0 * radius / lconv) + .5),
             100.*(xm[1][npt2+8 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2+9 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2 + 10 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+11 - 1]/(2.0 * radius / lconv) + .5),
             100.*(xm[1][npt2+12 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2+13 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+14 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+15 - 1]/(2.0 * radius / lconv) + .5),
             100.*(xm[1][npt2+16 - 1]/(2.0 * radius / lconv) + .5), 100.*(xm[1][npt2+17 - 1]/(2.0 * radius / lconv) + .5),100.*(xm[1][npt2+18 - 1]/(2.0 * radius / lconv) + .5)],
             y:[velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,velocity,
                 velocity,velocity,velocity,velocity,velocity ],
             
             mode: 'lines',
             type: 'scatter',
             name: 'velocity'
             
         }
 
       
 
       var layout = {
           title: 'Velocity Variation',
           showlegend:true,
           autosize: false,
           width: 380,
           height: 400,
           xaxis: {
             title: {
               text: 'x Coordinate',
               font: {
                 family: 'Courier New, monospace',
                 size: 18,
                 color: 'black'
               }
             },
           },
           yaxis: {
             title: {
               text: 'Vel ' + velString,
               font: {
                 family: 'Courier New, monospace',
                 size: 18,
                 color: 'black'
               }
             }
           }
 
       }
 
       var data = [trace1,trace2,trace3];
      
         Plotly.newPlot('tester', data,layout, {displayModeBar: false});
         if(outputButton != 5)
             Plotly.purge('tester');
 
 
         
     }
 /**
  * plot = 4, drag polar
  */
     else if(plot == 4){
 
         
         npt = 20;
         var ntr = 1;
         var nabs = 2;
         var nord = 3;
         var ntikx = 5;
         var del = 40.0 / npt;
         var angl;
         var clpl;
         var cdpl;
         for(var ic = 1; ic <= npt; ic++){
             angl = -20.0 + (ic - 1) * del;
             clpl = getClPlot(camber,thickness,angl) ;
             plty[0][ic] = 100. * clpl ;
             cdpl = getDrag(clpl);
             pltx[0][ic] = 100 * cdpl;
             
 
         }
 
         var ntiky = 5;
         var cdref = parseFloat(document.getElementById("cDragBox").value);
         var clref = parseFloat(document.getElementById("cLiftBox").value);
         pltx[1][0] = cdref * 100. ;    
         plty[1][0] = clref * 100. ;  
 
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: "markers",
             type: 'scatter'
         }
 
         var data = [trace1,trace2];
 
         var layout = {
             title: 'Drag polar',
             showlegend: false,
             xaxis: {
               title: {
                 text: 'Cd x 100',
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: '#7f7f7f'
                 }
               },
             },
             yaxis: {
               title: {
                 text: 'Cl x 100 ',
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: '#7f7f7f'
                 }
               }
             }
   
         }
 
         Plotly.newPlot('tester', data,layout);
         if(outputButton != 5)
             Plotly.purge('tester');
 
            
     }
 
     /**
      * Lift vs Angle plot
      */
     else if (document.getElementById("dropdown1").value == "liftOption" && plot == 5){
 
         npt = 21;
         var del = 40.0 / (npt-1) ;
         var clpl;
         var cdpl;
         var fconv;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var clref = parseFloat(document.getElementById("cLiftBox").value);
         var angl;
         var camval = camber / 25.0;
         var thkval = thickness / 25.0;
         if(getUnits() == 1)
             fconv = 1.0;
         else if(getUnits() == 2)
             fconv = 4.448;
         
         for (var ic = 1; ic <= npt; ic++){
 
             angl = -20.0 + (ic-1)*del ;
             clpl = getClPlot(camval,thkval,angl) ;
 
             if(clref == 0){
                 clref = 0.001;
                 lftref = 0.001
             }
             pltx[0][ic] = angl;
             plty[0][ic] = fconv*lftref * clpl/clref;
                        
 
         }
 
         pltx[1][0] = angle ;
         plty[1][0] = lftref * fconv ;
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
 
 
         var data = [trace1,trace2];
 
         var layout = {
             title: 'Lift Vs Angle',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Angle Degrees",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
               title: {
                 text: "Lift " + forceString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
         Plotly.purge('tester');
 
 }
 
 /**
  * Lift coefficient vs angle
  */
 else if(document.getElementById("dropdown1").value == "clOption" && plot == 5){
 
     npt = 21;
         var del = 40.0 / (npt-1) ;
         var clpl;
         var cdpl;
         var fconv;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var clref = parseFloat(document.getElementById("cLiftBox").value);
         var angl;
         var camval = camber / 25.0;
         var thkval = thickness / 25.0;
         if(getUnits() == 1)
             fconv = 1.0;
         else if(getUnits() == 2)
             fconv = 4.448;
         
         for (var ic = 1; ic <= npt; ic++){
 
             angl = -20.0 + (ic-1)*del ;
             clpl = getClPlot(camval,thkval,angl) ;
 
             if(clref == 0)
                 clref = 0.001;
             pltx[0][ic] = angl;
             plty[0][ic] = 100 * clpl;
                        
 
         }
 
         pltx[1][0] = angle ;
         plty[1][0] = 100 * clref;
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
 
 
         var data = [trace1,trace2];
 
         var layout = {
             title: 'Cl Vs Angle',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Angle Degrees",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
               title: {
                 text: "Cl * 100 ",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
         Plotly.purge('tester');
 
 
 
 
 }
 
 /**
  * Drag vs angle
  */
 else if(document.getElementById("dropdown1").value == "dragVs" && plot == 5){
 
 
     npt = 21;
         var del = 40.0 / (npt-1) ;
         var clpl;
         var cdpl;
         var fconv;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var clref = parseFloat(document.getElementById("cLiftBox").value);
         var drgref = parseFloat(document.getElementById("dragBox").value);
         var cdref = parseFloat(document.getElementById("cDragBox").value);
         var angl;
         var camval = camber / 25.0;
         var thkval = thickness / 25.0;
         if(getUnits() == 1)
             fconv = 1.0;
         else if(getUnits() == 2)
             fconv = 4.448;
         
         for (var ic = 1; ic <= npt; ic++){
 
             angl = -20.0 + (ic-1)*del ;
             clpl = getClPlot(camval,thkval,angl) ;
             cdpl = getDrag(clpl);
             if(clref == 0)
                 clref = 0.001;
             pltx[0][ic] = angl;
             plty[0][ic] = fconv*drgref * cdpl/cdref ;
                        
 
         }
 
         pltx[1][0] = angle ;
         plty[1][0] = drgref * fconv;
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
 
 
         var data = [trace1,trace2];
 
         var layout = {
             title: 'Drag Vs Angle',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Angle Degrees",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
               title: {
                 text: "Drag " + forceString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
         Plotly.purge('tester');
 
 
 }
 
 /**
  * drag coefficient vs angle plot
  */
 else if(document.getElementById("dropdown1").value == "cdOption" && plot == 5){
 
     npt = 21;
         var del = 40.0 / (npt-1) ;
         var clpl;
         var cdpl;
         var fconv;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var clref = parseFloat(document.getElementById("cLiftBox").value);
         var drgref = parseFloat(document.getElementById("dragBox").value);
         var cdref = parseFloat(document.getElementById("cDragBox").value);
         var angl;
         var camval = camber / 25.0;
         var thkval = thickness / 25.0;
         if(getUnits() == 1)
             fconv = 1.0;
         else if(getUnits() == 2)
             fconv = 4.448;
         
         for (var ic = 1; ic <= npt; ic++){
 
             angl = -20.0 + (ic-1)*del ;
             clpl = getClPlot(camval,thkval,angl) ;
             cdpl = getDrag(clpl);
             if(clref == 0)
                 clref = 0.001;
             pltx[0][ic] = angl;
             plty[0][ic] = 100 * cdpl;
                        
 
         }
 
         pltx[1][0] = angle ;
         plty[1][0] = 100 * cdref;
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
 
 
         var data = [trace1,trace2];
 
         var layout = {
             title: 'Cd Vs Angle',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Angle Degrees",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
               title: {
                 text: "Cd * 100",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
         Plotly.purge('tester');
 
 
 
 }
 
 /**
  * lift vs camber plot
  */
 else if(document.getElementById("dropdown1").value == "liftOption" && plot == 6){
 
         npt = 21;
         var del = 2.0 / (npt-1) ;
         var clpl;
         var cdpl;
         var fconv;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var clref = parseFloat(document.getElementById("cLiftBox").value);
         var drgref = parseFloat(document.getElementById("dragBox").value);
         var cdref = parseFloat(document.getElementById("cDragBox").value);
         var campl;
         var angl;
         var camval = camber;
         var thkval = thickness / 25.0;
         if(getUnits() == 1)
             fconv = 1.0;
         else if(getUnits() == 2)
             fconv = 4.448;
         
         for (var ic = 1; ic <= npt; ic++){
 
             campl = -1.0 + (ic-1)*del ;
             clpl = getClPlot(campl,thkval,angle) ;
             cdpl = getDrag(clpl);
             if(clref == 0){
                 clref = 0.001;
                 lftref = 0.001;
             }
             pltx[0][ic] = campl * 25.0;
             plty[0][ic] = fconv*lftref * clpl/clref;
                        
 
         }
 
         pltx[1][0] = camber ;
         plty[1][0] = lftref*fconv ;
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
 
 
         var data = [trace1,trace2];
 
         var layout = {
             title: 'Lift Vs Camber',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Camber % chord",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
               title: {
                 text: "Lift " + forceString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
         Plotly.purge('tester');
 
 
 
 
 }
 
 /**
  * lift coefficient vs camber plot
  */
 else if (document.getElementById("dropdown1").value == "clOption" && plot == 6){
 
 
     npt = 21;
         var del = 2.0 / (npt-1) ;
         var clpl;
         var cdpl;
         var fconv;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var clref = parseFloat(document.getElementById("cLiftBox").value);
         var drgref = parseFloat(document.getElementById("dragBox").value);
         var cdref = parseFloat(document.getElementById("cDragBox").value);
         var campl;
         var angl;
         var camval = camber;
         var thkval = thickness / 25.0;
         if(getUnits() == 1)
             fconv = 1.0;
         else if(getUnits() == 2)
             fconv = 4.448;
         
         for (var ic = 1; ic <= npt; ic++){
 
             campl = -1.0 + (ic-1)*del ;
             clpl = getClPlot(campl,thkval,angle) ;
             cdpl = getDrag(clpl);
             if(clref == 0)
                 clref = 0.001;
             pltx[0][ic] = campl * 25.0;
             plty[0][ic] = 100 * clpl;
                        
 
         }
 
         pltx[1][0] = camber ;
         plty[1][0] = 100 * clref ;
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
 
 
         var data = [trace1,trace2];
 
         var layout = {
             title: 'Cl Vs Camber',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Camber % chord",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
               title: {
                 text: "Cd * 100 ",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
         Plotly.purge('tester');
 
 
 
 }
 
 /**
  * drag vs camber plot
  */
 else if(document.getElementById("dropdown1").value == "dragVs" && plot == 6){
 
         npt = 21;
         var del = 2.0 / (npt-1) ;
         var clpl;
         var cdpl;
         var fconv;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var clref = parseFloat(document.getElementById("cLiftBox").value);
         var drgref = parseFloat(document.getElementById("dragBox").value);
         var cdref = parseFloat(document.getElementById("cDragBox").value);
         var campl;
         var angl;
         var camval = camber;
         var thkval = thickness / 25.0;
         if(getUnits() == 1)
             fconv = 1.0;
         else if(getUnits() == 2)
             fconv = 4.448;
         
         for (var ic = 1; ic <= npt; ic++){
 
             campl = -1.0 + (ic-1)*del ;
             clpl = getClPlot(campl,thkval,angle) ;
             cdpl = getDrag(clpl);
             if(clref == 0)
                 clref = 0.001;
             pltx[0][ic] = campl * 25.0;
             plty[0][ic] = fconv*drgref * cdpl/cdref;
                        
 
         }
 
         pltx[1][0] = camber ;
         plty[1][0] = drgref*fconv ;
         plty[0][1] = plty[0][2]= plty[0][3] ;
         plty[0][npt] = plty[0][npt -1] = plty[0][npt - 2]
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
 
 
         var data = [trace1,trace2];
 
         var layout = {
             title: 'Drag Vs Camber',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Camber % chord",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
               title: {
                 text: "Drag " + forceString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
         Plotly.purge('tester');
 
 
 
 }
 
 /**
  * drag coefficient vs camber plot
  */
 else if(document.getElementById("dropdown1").value == "cdOption" && plot == 6){
 
          npt = 21;
         var del = 2.0 / (npt-1) ;
         var clpl;
         var cdpl;
         var fconv;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var clref = parseFloat(document.getElementById("cLiftBox").value);
         var drgref = parseFloat(document.getElementById("dragBox").value);
         var cdref = parseFloat(document.getElementById("cDragBox").value);
         var campl;
         var angl;
         var camval = camber;
         var thkval = thickness / 25.0;
         if(getUnits() == 1)
             fconv = 1.0;
         else if(getUnits() == 2)
             fconv = 4.448;
         
         for (var ic = 1; ic <= npt; ic++){
 
             campl = -1.0 + (ic-1)*del ;
             clpl = getClPlot(campl,thkval,angle) ;
             cdpl = getDrag(clpl);
             if(clref == 0)
                 clref = 0.001;
             pltx[0][ic] = campl * 25.0;
             plty[0][ic] = 100.*cdpl ;
                        
 
         }
 
         pltx[1][0] = camber ;
         plty[1][0] = 100.*cdref ;
         plty[0][1] = plty[0][2]= plty[0][3] ;
         plty[0][npt] = plty[0][npt -1] = plty[0][npt-2] ;
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
 
 
         var data = [trace1,trace2];
 
         var layout = {
             title: 'Cd Vs Camber',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Camber % chord",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
               title: {
                 text: "Cd * 100 ",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
         Plotly.purge('tester');
 
 
 
 }
 
 /**
  * lift vs thickness plot
  */
 else if(document.getElementById("dropdown1").value == "liftOption" && plot == 7){
 
 
         npt = 20;
         var del = 1.0 / (npt) ;
         var clpl;
         var cdpl;
         var fconv;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var clref = parseFloat(document.getElementById("cLiftBox").value);
         var drgref = parseFloat(document.getElementById("dragBox").value);
         var cdref = parseFloat(document.getElementById("cDragBox").value);
         var campl;
         var angl;
         var camval = camber  / 25.0;
         var thkval = thickness;
         var thkpl;
         if(getUnits() == 1)
             fconv = 1.0;
         else if(getUnits() == 2)
             fconv = 4.448;
         
         for (var ic = 1; ic <= npt; ic++){
 
             thkpl = .05 + (ic-1)*del ;
             clpl = getClPlot(camval,thkval,angle) ;
             cdpl = getDrag(clpl);
             if(clref == 0){
                 clref = 0.001;
                 lftref = 0.001;
             }
             pltx[0][ic] = thkpl*25.0;
             plty[0][ic] = fconv*lftref ;
                        
 
         }
 
         pltx[1][0] = thickness ;
         plty[1][0] = lftref * fconv ;
     
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
 
 
         var data = [trace1,trace2];
 
         var layout = {
             title: 'Lift Vs Thickness',
             showlegend: false,
             xaxis: {
                 range:[0.0,20.0],
               title: {
                 text: "Thickness % chord",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
                 //range:[-5000.0,10000.0],
               title: {
                 text: "Lift " + forceString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
         Plotly.purge('tester');
 
 
 
 
     }
 
     /**
      * lift coefficient vs thickness
      */
     else if(document.getElementById("dropdown1").value == "clOption" && plot == 7){
 
 
         npt = 20;
         var del = 1.0 / (npt) ; ;
         var clpl;
         var cdpl;
         var fconv;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var clref = parseFloat(document.getElementById("cLiftBox").value);
         var drgref = parseFloat(document.getElementById("dragBox").value);
         var cdref = parseFloat(document.getElementById("cDragBox").value);
         var campl;
         var angl;
         var camval = camber  / 25.0;
         var thkval = thickness / 25.0;
         var thkpl;
         if(getUnits() == 1)
             fconv = 1.0;
         else if(getUnits() == 2)
             fconv = 4.448;
         
         for (var ic = 1; ic <= npt; ic++){
 
             thkpl = .05 + (ic-1)*del ;
             clpl = getClPlot(camval,thkval,angle) ;
             cdpl = getDrag(clpl);
             
            
             pltx[0][ic] = thkpl*25.;
             plty[0][ic] = 100.*clpl ;
                        
 
         }
 
         pltx[1][0] = thickness ;
         plty[1][0] = 100.*clref ;
        
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
 
 
         var data = [trace1,trace2];
 
         var layout = {
             range:[0.0, 20.0],
             title: 'Cl Vs Thickness',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Thickness % chord",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
                 range:[-200.0,200.0],
               title: {
                 text: "Cl * 100 ",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
         Plotly.purge('tester');
     }
 
 
     /**
      * drag vs thickness plot
      */
     else if(document.getElementById("dropdown1").value == "dragVs" && plot == 7){
 
 
         npt = 20;
         var del = 1.0 / (npt) ; ;
         var clpl;
         var cdpl;
         var fconv;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var clref = parseFloat(document.getElementById("cLiftBox").value);
         var drgref = parseFloat(document.getElementById("dragBox").value);
         var cdref = parseFloat(document.getElementById("cDragBox").value);
         var campl;
         var angl;
         var camval = camber  / 25.0;
         var thkval = thickness /  25.0;
         var thkpl;
         if(getUnits() == 1)
             fconv = 1.0;
         else if(getUnits() == 2)
             fconv = 4.448;
         
         for (var ic = 1; ic <= npt; ic++){
 
             thkpl = .05 + (ic-1)*del ;
             clpl = getClPlot(camval,thkval,angle) ;
             cdpl = getDrag(clpl);
             
            
             pltx[0][ic] = thkpl*25.;
             plty[0][ic] = fconv*drgref * cdpl/cdref ;
                        
 
         }
 
         pltx[1][0] = thickness ;
         plty[1][0] = drgref*fconv ;
         plty[0][npt]= plty[0][npt-1]= plty[0][npt-2]=plty[0][npt-3]=plty[0][npt-4]
        
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
 
 
         var data = [trace1,trace2];
 
         var layout = {
             range:[0.0, 20.0],
             title: 'Drag Vs Thickness',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Thickness % chord",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
                 range:[0.0,2500.0],
               title: {
                 text: "Drag " + forceString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
         Plotly.purge('tester');
 
 
 
 
     }
 
     /**
      * drag coefficient vs thickness plot
      */
     else if(document.getElementById("dropdown1").value == "cdOption" && plot == 7){
 
 
         npt = 20;
         var del = 1.0 / (npt) ; ;
         var clpl;
         var cdpl;
         var fconv;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var clref = parseFloat(document.getElementById("cLiftBox").value);
         var drgref = parseFloat(document.getElementById("dragBox").value);
         var cdref = parseFloat(document.getElementById("cDragBox").value);
         var campl;
         var angl;
         var camval = camber  / 25.0;
         var thkval = thickness /  25.0;
         var thkpl;
         if(getUnits() == 1)
             fconv = 1.0;
         else if(getUnits() == 2)
             fconv = 4.448;
         
         for (var ic = 1; ic <= npt; ic++){
 
             thkpl = .05 + (ic-1)*del ;
             clpl = getClPlot(camval,thkval,angle) ;
             cdpl = getDrag(clpl);
             
            
             pltx[0][ic] = thkpl*25.;
             plty[0][ic] = 100 * cdpl ;
                        
 
         }
 
         pltx[1][0] = thickness ;
         plty[1][0] = 100.*cdref ;
         plty[0][npt] = plty[0][npt-1] = plty[0][npt-2]=plty[0][npt-3]=plty[0][npt-4]
        
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
 
 
         var data = [trace1,trace2];
 
         var layout = {
             range:[0.0, 20.0],
             title: 'Cd Vs Thickness',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Thickness % chord",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
                 range:[0.0,80.0],
               title: {
                 text: "Cd * 100 ",
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
         Plotly.purge('tester');
 
 
     }
 
     /**
      * Lift vs speed plot
      */
     else if(document.getElementById("dropdown2").value == "liftVsOption" && plot == 8){
 
 
         var npt = 20 ;
         var ntr = 1 ;
         var vmax = 250;
         var del = vmax / npt;
         var spd;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         if(lftref == 0 )
             lftref = 0.001;
         var fconv;
         if(getUnits() == 1)
             fconv = 1.0;
         else if(getUnits() == 2)
             fconv = 4.448;
 
         for (ic=1; ic <=npt; ++ic){
 
             spd = (ic-1)*del ;
             pltx[0][ic] = spd ;
             plty[0][ic] = fconv*lftref * spd * spd / (velocity * velocity) 
 
 
         }
 
         pltx[1][0] = velocity ;
         plty[1][0] = lftref*fconv;
 
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
 
 
         var data = [trace1,trace2];
 
         var layout = {
             title: 'Lift Vs Speed',
             showlegend: false,
             xaxis: {
                 range:[0.0, 250.0],
               title: {
                 text: "Speed " + velString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
                
               title: {
                 text: "Lift " + forceString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
         Plotly.purge('tester');
 
 
 
 
     }
 
     /**
      * Drag vs speed plot
      */
     else if(document.getElementById("dropdown2").value == "dragVsOption" && plot == 8){
 
         var npt = 20 ;
         var ntr = 1 ;
         var vmax = 250;
         var del = vmax / npt;
         var spd;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var drgref = parseFloat(document.getElementById("dragBox").value);
         var fconv;
         if(getUnits() == 1)
             fconv = 1.0;
         else if(getUnits() == 2)
             fconv = 4.448;
 
         for (ic=1; ic <=npt; ++ic){
 
             spd = (ic-1)*del ;
             pltx[0][ic] = spd ;
             plty[0][ic] = fconv*drgref * spd * spd / (velocity * velocity) 
 
 
         }
 
         pltx[1][0] = velocity ;
         plty[1][0] = drgref*fconv;
 
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
                pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
                pltx[0][17],pltx[0][18],pltx[0][19]],
             y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
                plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
                plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
             mode: 'lines',
             type: 'scatter',
         }
 
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
 
 
         var data = [trace1,trace2];
 
         var layout = {
             autosize: true,
             title: 'Drag Vs Speed',
             showlegend: false,
             xaxis: {
                 range:[0.0, 250.0],
               title: {
                 text: "Speed " + velString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
                 
               title: {
                 text: "Drag " + forceString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
         Plotly.purge('tester');
 
 
 
     }
 
     /**
      * lift vs altitude plot
      */
     else if(document.getElementById("dropdown2").value == "liftVsOption" && plot == 9){
 
         var npt = 20 ;
         var ntr = 1 ;
         var altmax;
         var hpl, tpl, ppl;
         var lconv;
         var shape = new Shape(angle,camber,thickness,velocity,altitude,chord,span,area)
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var fconv;
         if(lftref == 0)
             lftref = 0.001;
 
         if(getUnits() == 1){
             fconv = 1.0;
             lconv = 1.0;
         }
         else if(getUnits() == 2){
             fconv = 4.448;
             lconv = 0.3048;
         }
         if(environmentSelect == 1){
 
             altmax = 49500;
         }
 
         else if (environmentSelect == 2)
             altmax = 15000;
 
         var del = altmax / npt ;
 
         for (ic=1; ic <=npt; ++ic) {
             hpl = (ic-1)*del ;
             pltx[0][ic] = lconv*hpl/1000. ;
             tpl = 518.6 ;
             ppl = 2116. ;
 
             if(environmentSelect == 1){
 
                 if (hpl < 36152.)   {
                     tpl = 518.6 - 3.56 * hpl /1000. ;
                     ppl = 2116. * Math.pow(tpl/518.6, 5.256) ;
               }
                  else {
                     tpl = 389.98 ;
                     ppl = 2116. * .236 * Math.exp((36000.-hpl)/(53.35*tpl)) ;
               }
 
               plty[0][ic] = fconv*lftref * ppl/(tpl*53.3*32.17) / shape.getRhoEarth();
 
 
 
             }
 
             else if(environmentSelect == 2){
 
                 if (hpl <= 22960.) {
                     tpl = 434.02 - .548 * hpl/1000. ;
                     ppl = 14.62 * Math.pow(2.71828,-.00003 * hpl) ;
                  }
                  else if (hpl > 22960.) {
                     tpl = 449.36 - 1.217 * hpl/1000. ;
                     ppl = 14.62 * Math.pow(2.71828,-.00003 * hpl) ;
 
             }
 
             plty[0][ic] = fconv*lftref * ppl/(tpl*1149.) / shape.getRhoMars();
 
         }
 
     }
 
     pltx[1][0] = altitude/1000.;
     plty[1][0] = lftref*fconv ;
 
     var trace1 = {
         x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
            pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
            pltx[0][17],pltx[0][18],pltx[0][19]],
         y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
            plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
            plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
         mode: 'lines',
         type: 'scatter',
     }
 
     var trace2 = {
         x:[pltx[1][0]],
         y:[plty[1][0]],
         mode: 'markers',
         type: 'scatter',
     }
 
 
     var data = [trace1,trace2];
 
     var layout = {
         autosize: true,
         title: 'Lift Vs Altitude',
         showlegend: false,
         xaxis: {
           title: {
             text: "Altitude " + lenghtString,
             font: {
               family: 'Courier New, monospace',
               size: 18,
               color: 'black'
             }
           },
         },
         yaxis: {
             
           title: {
             text: "Lift " + forceString,
             font: {
               family: 'Courier New, monospace',
               size: 18,
               color: 'black'
             }
           }
         }
     
 }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
          Plotly.purge('tester');
 
 
 
 
 
     }
 
     /**
      * drag vs altitude plot
      */
     else if(document.getElementById("dropdown2").value == "dragVsOption" && plot == 9){
 
 
         var npt = 20 ;
         var ntr = 1 ;
         var altmax;
         var hpl, tpl, ppl;
         var lconv;
         var shape = new Shape(angle,camber,thickness,velocity,altitude,chord,span,area)
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var drgref = parseFloat(document.getElementById("dragBox").value);
         var fconv;
 
         if(getUnits() == 1){
             fconv = 1.0;
             lconv = 1.0;
         }
         else if(getUnits() == 2){
             fconv = 4.448;
             lconv = 0.3048;
         }
         if(environmentSelect == 1){
 
             altmax = 49500;
         }
 
         else if (environmentSelect == 2)
             altmax = 15000;
 
         var del = altmax / npt ;
 
         for (ic=1; ic <=npt; ++ic) {
             hpl = (ic-1)*del ;
             pltx[0][ic] = lconv*hpl/1000. ;
             tpl = 518.6 ;
             ppl = 2116. ;
 
             if(environmentSelect == 1){
 
                 if (hpl < 36152.)   {
                     tpl = 518.6 - 3.56 * hpl /1000. ;
                     ppl = 2116. * Math.pow(tpl/518.6, 5.256) ;
               }
                  else {
                     tpl = 389.98 ;
                     ppl = 2116. * .236 * Math.exp((36000.-hpl)/(53.35*tpl)) ;
               }
 
               plty[0][ic] = fconv*drgref * ppl/(tpl*53.3*32.17) / shape.getRhoEarth();
 
 
 
             }
 
             else if(environmentSelect == 2){
 
                 if (hpl <= 22960.) {
                     tpl = 434.02 - .548 * hpl/1000. ;
                     ppl = 14.62 * Math.pow(2.71828,-.00003 * hpl) ;
                  }
                  else if (hpl > 22960.) {
                     tpl = 449.36 - 1.217 * hpl/1000. ;
                     ppl = 14.62 * Math.pow(2.71828,-.00003 * hpl) ;
 
             }
 
             plty[0][ic] = fconv*drgref * ppl/(tpl*1149.) / shape.getRhoMars();
 
         }
 
     }
 
     pltx[1][0] = altitude/1000.;
     plty[1][0] = drgref*fconv ;
 
     var trace1 = {
         x:[pltx[0][1],pltx[0][2],pltx[0][3],pltx[0][4],pltx[0][5],pltx[0][6],pltx[0][7],pltx[0][8],
            pltx[0][9],pltx[0][10],pltx[0][11],pltx[0][12],pltx[0][13],pltx[0][14],pltx[0][15],pltx[0][16],
            pltx[0][17],pltx[0][18],pltx[0][19]],
         y:[plty[0][1],plty[0][2],plty[0][3],plty[0][4],plty[0][5],plty[0][6],plty[0][7],
            plty[0][8],plty[0][9],plty[0][10],plty[0][11],plty[0][12],plty[0][13],plty[0][14],plty[0][15],
            plty[0][16],plty[0][17],plty[0][18],plty[0][19]],
         mode: 'lines',
         type: 'scatter',
     }
 
     var trace2 = {
         x:[pltx[1][0]],
         y:[plty[1][0]],
         mode: 'markers',
         type: 'scatter',
     }
 
 
     var data = [trace1,trace2];
 
     var layout = {
         autosize: true,
         title: 'Drag Vs Altitude',
         showlegend: false,
         xaxis: {
           title: {
             text: "Altitude " + lenghtString,
             font: {
               family: 'Courier New, monospace',
               size: 18,
               color: 'black'
             }
           },
         },
         yaxis: {
             
           title: {
             text: "Drag " + forceString,
             font: {
               family: 'Courier New, monospace',
               size: 18,
               color: 'black'
             }
           }
         }
     
 }
 
     Plotly.newPlot('tester', data,layout);
     if(outputButton != 5)
          Plotly.purge('tester');
 
 
 
 
 
 
     }
 
     /**
      * Lift vs wing area plot
      */
     else if(document.getElementById("dropdown2").value == "liftVsOption" && plot == 10){
 
 
         var fconv;
         if(getUnits() == 1){
             fconv = 1.0;
         }
         else if(getUnits() == 2){
             fconv = 4.448;
         }
         var lftref = parseFloat(document.getElementById("liftBox").value);
 
         if(lftref == 0)
             lftref = 0.001;
       
         var npt = 2 ;
         var ntr = 1 ;
         pltx[0][1] = 0.0 ;
         plty[0][1] = 0.0 ;
         pltx[0][2] = 2000.; 
         plty[0][2] = fconv*lftref * 2000. /area
         pltx[1][0] = area;
         plty[1][0] = lftref*fconv ;
 
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[1][0]],
             y:[plty[0][1],plty[0][2],plty[1][0]],
             mode: 'lines',
             type: 'scatter',
         }
     
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
     
     
         var data = [trace1,trace2];
     
         var layout = {
             autosize: true,
             title: 'Lift Vs Wing Span',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Wing Area " + areaString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
                 
               title: {
                 text: "Lift " + forceString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
     
         Plotly.newPlot('tester', data,layout);
         if(outputButton != 5)
              Plotly.purge('tester');
 
 
     }
 
     /**
      * Drag vs wing area plot
      */
     else if(document.getElementById("dropdown2").value == "dragVsOption" && plot == 10){
 
 
         var fconv;
         if(getUnits() == 1){
             fconv = 1.0;
         }
         else if(getUnits() == 2){
             fconv = 4.448;
         }
         var drgref = parseFloat(document.getElementById("dragBox").value);
 
         if(lftref == 0)
             lftref = 0.001;
       
         var npt = 2 ;
         var ntr = 1 ;
         pltx[0][1] = 0.0 ;
         plty[0][1] = 0.0 ;
         pltx[0][2] = 2000.; 
         plty[0][2] = fconv*drgref * 2000. /area
         pltx[1][0] = area;
         plty[1][0] = drgref*fconv ;
 
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[1][0]],
             y:[plty[0][1],plty[0][2],plty[1][0]],
             mode: 'lines',
             type: 'scatter',
         }
     
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
     
     
         var data = [trace1,trace2];
     
         var layout = {
             autosize: true,
             title: 'Drag Vs Wing Span',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Wing Area " + areaString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
                 
               title: {
                 text: "Drag " + forceString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
     
         Plotly.newPlot('tester', data,layout);
         if(outputButton != 5)
              Plotly.purge('tester');
 
 
 
 
 
 
     }
 
     /**
      * Lift vs density plot
      */
     else if(document.getElementById("dropdown2").value == "liftVsOption" && plot == 11){
 
         var npt = 2 ;
         var ntr = 1 ;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var drgref = parseFloat(document.getElementById("dragBox").value);
 
         if(lftref == 0)
             lftref = 0.001;
         var fconv;
         var densityUnits = "slug / cu ft";
         var shape = new Shape(angle,camber,thickness,velocity,altitude,chord,span,area)
         if(getUnits() == 1){
             fconv = 1.0;
             densityUnits = "slug / cu ft";
         }
         else if(getUnits() == 2){
             fconv = 4.448;
             densityUnits = "g / cu m";
         }
 
         if(getUnits() == 1 && environmentSelect == 1){
 
             pltx[0][1] = 0.0 ;
             plty[0][1] = 0.0 ;
             pltx[0][2] = 23.7 ;
             plty[0][2] = fconv*lftref * 23.7 /(shape.getRhoEarth()*10000.);
             pltx[1][0] = shape.getRhoEarth()*10000.
             plty[1][0] = lftref*fconv
 
         }
 
         else if(getUnits() == 2 && environmentSelect == 1){
 
             pltx[0][1] = 0.0 ;
             plty[0][1] = 0.0 ;
             pltx[0][2] = 1226 ;
             plty[0][2] = fconv*lftref * 23.7 /(shape.getRhoEarth()*10000.)
             pltx[1][0] = shape.getRhoEarth()*1000.*515.4 ;
             plty[1][0] = lftref*fconv;
 
         }
 
         else if(getUnits() == 1 && environmentSelect == 2){
 
             pltx[0][1] = 0.0 ;
             plty[0][1] = 0.0 ;
             pltx[0][2] = 2.93 ;
             plty[0][2] = fconv*lftref * 2.93 /(shape.getRhoMars()*100000.);
             pltx[1][0] = shape.getRhoMars()*100000.;
             plty[1][0] = lftref*fconv
 
         }
 
         else if(getUnits() == 2 && environmentSelect == 2){
             pltx[0][1] = 0.0 ;
             plty[0][1] = 0.0 ;
             pltx[0][2] = 15.1 ;
             plty[0][2] = fconv*lftref * 2.93 /(shape.getRhoMars()*100000.);
             pltx[1][0] = shape.getRhoMars()*1000.*515.4;
             plty[1][0] = lftref*fconv;
 
         }
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[1][0]],
             y:[plty[0][1],plty[0][2],plty[1][0]],
             mode: 'lines',
             type: 'scatter',
         }
     
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
     
     
         var data = [trace1,trace2];
     
         var layout = {
             autosize: true,
             title: 'Lift Vs density',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Density " + densityUnits,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
                 
               title: {
                 text: "Lift " + forceString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
     
         Plotly.newPlot('tester', data,layout);
         if(outputButton != 5)
              Plotly.purge('tester');
 
 
 
 
         
 
 
     }
 
     /**
      * drag vs density plot
      */
     else if(document.getElementById("dropdown2").value == "dragVsOption" && plot == 11){
 
         var npt = 2 ;
         var ntr = 1 ;
         var lftref = parseFloat(document.getElementById("liftBox").value);
         var drgref = parseFloat(document.getElementById("dragBox").value);
 
         if(lftref == 0)
             lftref = 0.001;
         var fconv;
         var densityUnits = "slug / cu ft";
         var shape = new Shape(angle,camber,thickness,velocity,altitude,chord,span,area)
         if(getUnits() == 1){
             fconv = 1.0;
             densityUnits = "slug / cu ft";
         }
         else if(getUnits() == 2){
             fconv = 4.448;
             densityUnits = "g / cu m";
         }
 
         if(getUnits() == 1 && environmentSelect == 1){
 
             pltx[0][1] = 0.0 ;
             plty[0][1] = 0.0 ;
             pltx[0][2] = 23.7 ;
             plty[0][2] = fconv*drgref * 23.7 /(shape.getRhoEarth()*10000.);
             pltx[1][0] = shape.getRhoEarth()*10000.
             plty[1][0] = drgref*fconv
 
         }
 
         else if(getUnits() == 2 && environmentSelect == 1){
 
             pltx[0][1] = 0.0 ;
             plty[0][1] = 0.0 ;
             pltx[0][2] = 1226 ;
             plty[0][2] = fconv*drgref * 23.7 /(shape.getRhoEarth()*10000.)
             pltx[1][0] = shape.getRhoEarth()*1000.*515.4 ;
             plty[1][0] = drgref*fconv;
 
         }
 
         else if(getUnits() == 1 && environmentSelect == 2){
 
             pltx[0][1] = 0.0 ;
             plty[0][1] = 0.0 ;
             pltx[0][2] = 2.93 ;
             plty[0][2] = fconv*drgref * 2.93 /(shape.getRhoMars()*100000.);
             pltx[1][0] = shape.getRhoMars()*100000.;
             plty[1][0] = drgref*fconv
 
         }
 
         else if(getUnits() == 2 && environmentSelect == 2){
             pltx[0][1] = 0.0 ;
             plty[0][1] = 0.0 ;
             pltx[0][2] = 15.1 ;
             plty[0][2] = fconv*drgref * 2.93 /(shape.getRhoMars()*100000.);
             pltx[1][0] = shape.getRhoMars()*1000.*515.4;
             plty[1][0] = drgref*fconv;
 
         }
 
         var trace1 = {
             x:[pltx[0][1],pltx[0][2],pltx[1][0]],
             y:[plty[0][1],plty[0][2],plty[1][0]],
             mode: 'lines',
             type: 'scatter',
         }
     
         var trace2 = {
             x:[pltx[1][0]],
             y:[plty[1][0]],
             mode: 'markers',
             type: 'scatter',
         }
     
     
         var data = [trace1,trace2];
     
         var layout = {
             autosize: true,
             title: 'Drag Vs density',
             showlegend: false,
             xaxis: {
               title: {
                 text: "Density " + densityUnits,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               },
             },
             yaxis: {
                 
               title: {
                 text: "Drag " + forceString,
                 font: {
                   family: 'Courier New, monospace',
                   size: 18,
                   color: 'black'
                 }
               }
             }
         
     }
     
         Plotly.newPlot('tester', data,layout);
         if(outputButton != 5)
              Plotly.purge('tester');
 
 
     }
 
     
 }
 
 /**
  * This function is for the velocity probe
  */
 function probe(){
 
     var velUnits;
     if(getUnits() == 1)
         velUnits = " mph"
     else if(getUnits() == 2)
         velUnits = " km/h";
     var level = velocity;
        
 // Trig to calc meter point
     var degrees = 180 - level,
         rad = .5;
     var radians = degrees * Math.PI / 180;
     var x = rad * Math.cos(radians);
     var y = rad * Math.sin(radians);
 
 // Path: may have to change to create a better triangle
     var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
         pathX = String(x),
         space = ' ',
         pathY = String(y),
         pathEnd = ' Z';
         var path = mainPath.concat(pathX,space,pathY,pathEnd);
 
     var data = [{ type: 'scatter',
         x: [0], y:[0],
         marker: {size: 10, color:'850000'},
         showlegend: false,
         name: 'speed',
         text: level,
         hoverinfo: 'text+name'},
         { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50/6,50/6],
         rotation: 90,
         text: ['181-230', '131-180', '91-130', '51-90',
             '0-50', '', String(velocity + velUnits), "230-250"],
         textinfo: 'text',
         textposition:'inside',      
         marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                          'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                          'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                          'rgba(0,0,0,0)','rgba(15, 128, 0, 0.55)']},
        
         hoverinfo: 'label',
         hole: .5,
         type: 'pie',
         showlegend: false
         }];
 
 var layout = {
   shapes:[{
       type: 'path',
       path: path,
       fillcolor: '850000',
       line: {
         color: '850000'
       }
     }],
   title: '<b>Velocity</b> <br> ',
   height: 400,
   width: 400,
   xaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]},
   yaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]}
 };
 
     
     Plotly.newPlot('tester', data, layout, {displayModeBar: false});
     
     
 
     
 
 
 }
 
 /**
  * 
  * @param {number} cldin 
  * 
  * This function is used for drag calculations in the plots
  */
 
 function getDrag(cldin){
 
     var reynolds = parseFloat(document.getElementById("reynoldBox").value)
     var dragco;
     var alfd = angle;
     var camd = camber;
     var thkd = thickness;
     var index,ifound ;  
     var dragCam0Thk5, dragCam5Thk5, dragCam10Thk5, dragCam15Thk5, dragCam20Thk5;
     var dragCam0Thk10, dragCam5Thk10, dragCam10Thk10, dragCam15Thk10, dragCam20Thk10;
     var dragCam0Thk15, dragCam5Thk15, dragCam10Thk15, dragCam15Thk15, dragCam20Thk15;
     var dragCam0Thk20, dragCam5Thk20, dragCam10Thk20, dragCam15Thk20, dragCam20Thk20;
     var dragThk5, dragThk10, dragThk15, dragThk20;
     var dragCam0, dragCam5, dragCam10, dragCam15, dragCam20;  //used for the flat plate drag values
     var recyl  = [.1, .2, .4, .5, .6, .8, 1.0,
                           2.0, 4.0, 5.0, 6.0, 8.0, 10.0,
                       20.0, 40.0, 50.0, 60.0, 80.0, 100.0,
                      200.0, 400.0, 500.0, 600.0, 800.0, 1000.,
                     2000., 4000., 5000., 6000., 8000., 10000.,
                   100000.,200000.,400000.,500000.,600000.,800000.,1000000.,
                   2000000.,4000000.,5000000.,6000000.,8000000.,1000000000000. ] ; 
     var cdcyl  = [70., 35., 20., 17., 15., 13., 10.,
                        7., 5.5, 5.0, 4.5, 4., 3.5,
                        3.0, 2.7, 2.5, 2.0, 2.0, 1.9,
                        1.6, 1.4, 1.2, 1.1, 1.1, 1.0, 
                        1.2, 1.4, 1.4, 1.5, 1.5, 1.6,
                        1.6, 1.4, .4, .28, .32, .4, .45,
                         .6, .8, .8, .85, .9, .9 ] ; 
     var resps  = [.1, .2, .4, .5, .6, .8, 1.0,
                         2.0, 4.0, 5.0, 6.0, 8.0, 10.0,
                        20., 40., 50., 60., 80.0, 100.0,
                       200., 400., 500., 600., 800.0, 1000.,
                      2000., 4000., 5000., 6000., 8000., 10000.,
                     20000., 40000., 50000., 60000., 80000., 100000.,
                    200000., 400000., 500000., 600000., 800000., 1000000.,
                   2000000., 4000000., 5000000., 6000000., 8000000., 1000000000000. ] ; 
 
     var cdsps  = [270., 110., 54., 51., 40., 35., 28.,
                        15., 8.5, 7.5, 6.0, 5.4, 4.9,
                        3.1, 1.9, 1.8, 1.5, 1.3, 1.1,
                        0.81, 0.6, 0.58, 0.56, 0.5, 0.49, 
                        0.40, 0.41, 0.415, 0.42, 0.43, 0.44,
                        0.44, 0.45, 0.455, 0.46, 0.47, 0.48, 
                        0.47, 0.10, 0.098, 0.1, 0.15, 0.19, 
                        0.30, 0.35, 0.370, 0.4, 0.40, 0.42 ] ; 
     var cdspr  = [270., 110., 54., 51., 40., 35., 28.,
                        15., 8.5, 7.5, 6.0, 5.4, 4.9,
                        3.1, 1.9, 1.8, 1.5, 1.3, 1.1,
                        0.81, 0.6, 0.58, 0.56, 0.5, 0.49, 
                        0.40, 0.41, 0.415, 0.42, 0.43, 0.44,
                        0.44, 0.45, 0.455, 0.46, 0.42, 0.15, 
                        0.27, 0.33, 0.35, 0.37, 0.38, 0.39, 
                        0.40, 0.41, 0.41, 0.42, 0.43, 0.44 ] ; 
     var cdspg  = [270., 110., 54., 51., 40., 35., 28.,
                        15., 8.5, 7.5, 6.0, 5.4, 4.9,
                        3.1, 1.9, 1.8, 1.5, 1.3, 1.1,
                        0.81, 0.6, 0.58, 0.56, 0.5, 0.49, 
                        0.40, 0.41, 0.415, 0.42, 0.43, 0.44,
                        0.44, 0.28, 0.255, 0.24, 0.24, 0.25, 
                        0.26, 0.27, 0.290, 0.33, 0.37, 0.40, 
                        0.41, 0.42, 0.420, 0.43, 0.44, 0.45 ] ; 
     if (liftAnalisis == 2)
         {
         dragco = 0;
         }
 
     else if (liftAnalisis == 1)
         {
         switch (shapeSelect)
             {
             case 1:    //airfoil drag logic
                 {
                 dragCam0Thk5 = -9E-07*Math.pow(alfd,3) + 0.0007*Math.pow(alfd,2) + 0.0008*alfd + 0.015;
                 dragCam5Thk5 = 4E-08*Math.pow(alfd,5) - 7E-07*Math.pow(alfd,4) - 1E-05*Math.pow(alfd,3) + 0.0009*Math.pow(alfd,2) + 0.0033*alfd + 0.0301;
                 dragCam10Thk5 = -9E-09*Math.pow(alfd,6) - 6E-08*Math.pow(alfd,5) + 5E-06*Math.pow(alfd,4) + 3E-05*Math.pow(alfd,3) - 0.0001*Math.pow(alfd,2) - 0.0025*alfd + 0.0615;
                 dragCam15Thk5 = 8E-10*Math.pow(alfd,6) - 5E-08*Math.pow(alfd,5) - 1E-06*Math.pow(alfd,4) + 3E-05*Math.pow(alfd,3) + 0.0008*Math.pow(alfd,2) - 0.0027*alfd + 0.0612;
                 dragCam20Thk5 = 8E-9*Math.pow(alfd,6) + 1E-8*Math.pow(alfd,5) - 5E-6*Math.pow(alfd,4) + 6E-6*Math.pow(alfd,3) + 0.001*Math.pow(alfd,2) - 0.001*alfd + 0.1219;
                 
                 dragCam0Thk10 = -1E-08*Math.pow(alfd,6) + 6E-08*Math.pow(alfd,5) + 6E-06*Math.pow(alfd,4) - 2E-05*Math.pow(alfd,3) - 0.0002*Math.pow(alfd,2) + 0.0017*alfd + 0.0196;
                 dragCam5Thk10 = 3E-09*Math.pow(alfd,6) + 6E-08*Math.pow(alfd,5) - 2E-06*Math.pow(alfd,4) - 3E-05*Math.pow(alfd,3) + 0.0008*Math.pow(alfd,2) + 0.0038*alfd + 0.0159;
                 dragCam10Thk10 = -5E-09*Math.pow(alfd,6) - 3E-08*Math.pow(alfd,5) + 2E-06*Math.pow(alfd,4) + 1E-05*Math.pow(alfd,3) + 0.0004*Math.pow(alfd,2) - 3E-05*alfd + 0.0624;
                 dragCam15Thk10 = -2E-09*Math.pow(alfd,6) - 2E-08*Math.pow(alfd,5) - 5E-07*Math.pow(alfd,4) + 8E-06*Math.pow(alfd,3) + 0.0009*Math.pow(alfd,2) + 0.0034*alfd + 0.0993;
                 dragCam20Thk10 = 2E-09*Math.pow(alfd,6) - 3E-08*Math.pow(alfd,5) - 2E-06*Math.pow(alfd,4) + 2E-05*Math.pow(alfd,3) + 0.0009*Math.pow(alfd,2) + 0.0023*alfd + 0.1581;
 
                 dragCam0Thk15 = -5E-09*Math.pow(alfd,6) + 7E-08*Math.pow(alfd,5) + 3E-06*Math.pow(alfd,4) - 3E-05*Math.pow(alfd,3) - 7E-05*Math.pow(alfd,2) + 0.0017*alfd + 0.0358;
                 dragCam5Thk15 = -4E-09*Math.pow(alfd,6) - 8E-09*Math.pow(alfd,5) + 2E-06*Math.pow(alfd,4) - 9E-07*Math.pow(alfd,3) + 0.0002*Math.pow(alfd,2) + 0.0031*alfd + 0.0351;
                 dragCam10Thk15 = 3E-09*Math.pow(alfd,6) + 3E-08*Math.pow(alfd,5) - 2E-06*Math.pow(alfd,4) - 1E-05*Math.pow(alfd,3) + 0.0009*Math.pow(alfd,2) + 0.004*alfd + 0.0543;
                 dragCam15Thk15 = 3E-09*Math.pow(alfd,6) + 5E-08*Math.pow(alfd,5) - 2E-06*Math.pow(alfd,4) - 3E-05*Math.pow(alfd,3) + 0.0008*Math.pow(alfd,2) + 0.0087*alfd + 0.1167;
                 dragCam20Thk15 = 3E-10*Math.pow(alfd,6) - 3E-08*Math.pow(alfd,5) - 6E-07*Math.pow(alfd,4) + 3E-05*Math.pow(alfd,3) + 0.0006*Math.pow(alfd,2) + 0.0008*alfd + 0.1859;
 
                 dragCam0Thk20 = -3E-09*Math.pow(alfd,6) + 2E-08*Math.pow(alfd,5) + 2E-06*Math.pow(alfd,4) - 8E-06*Math.pow(alfd,3) - 4E-05*Math.pow(alfd,2) + 0.0003*alfd + 0.0416;
                 dragCam5Thk20 = -3E-09*Math.pow(alfd,6) - 7E-08*Math.pow(alfd,5) + 1E-06*Math.pow(alfd,4) + 3E-05*Math.pow(alfd,3) + 0.0004*Math.pow(alfd,2) + 5E-05*alfd + 0.0483;
                 dragCam10Thk20 = 1E-08*Math.pow(alfd,6) + 4E-08*Math.pow(alfd,5) - 6E-06*Math.pow(alfd,4) - 2E-05*Math.pow(alfd,3) + 0.0014*Math.pow(alfd,2) + 0.007*alfd + 0.0692;
                 dragCam15Thk20 = 3E-09*Math.pow(alfd,6) - 9E-08*Math.pow(alfd,5) - 3E-06*Math.pow(alfd,4) + 4E-05*Math.pow(alfd,3) + 0.001*Math.pow(alfd,2) + 0.0021*alfd + 0.139;
                 dragCam20Thk20 = 3E-09*Math.pow(alfd,6) - 7E-08*Math.pow(alfd,5) - 3E-06*Math.pow(alfd,4) + 4E-05*Math.pow(alfd,3) + 0.0012*Math.pow(alfd,2) + 0.001*alfd + 0.1856;
 
                 if (-20.0 <= camd && camd < -15.0)
                     {
                     dragThk5 = (camd/5 + 4)*(dragCam15Thk5 - dragCam20Thk5) + dragCam20Thk5;
                     dragThk10 = (camd/5 + 4)*(dragCam15Thk10 - dragCam20Thk10) + dragCam20Thk10;
                     dragThk15 = (camd/5 + 4)*(dragCam15Thk15 - dragCam20Thk15) + dragCam20Thk15;
                     dragThk20 = (camd/5 + 4)*(dragCam15Thk20 - dragCam20Thk20) + dragCam20Thk20;
                 
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
                     dragThk5 = (camd/5 + 3)*(dragCam10Thk5 - dragCam15Thk5) + dragCam15Thk5;
                     dragThk10 = (camd/5 + 3)*(dragCam10Thk10 - dragCam15Thk10) + dragCam15Thk10;
                     dragThk15 = (camd/5 + 3)*(dragCam10Thk15 - dragCam15Thk15) + dragCam15Thk15;
                     dragThk20 = (camd/5 + 3)*(dragCam10Thk20 - dragCam15Thk20) + dragCam15Thk20;
 
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
                     dragThk5 = (camd/5 + 2)*(dragCam5Thk5 - dragCam10Thk5) + dragCam10Thk5;
                     dragThk10 = (camd/5 + 2)*(dragCam5Thk10 - dragCam10Thk10) + dragCam10Thk10;
                     dragThk15 = (camd/5 + 2)*(dragCam5Thk15 - dragCam10Thk15) + dragCam10Thk15;
                     dragThk20 = (camd/5 + 2)*(dragCam5Thk20 - dragCam10Thk20) + dragCam10Thk20;
 
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
                     dragThk5 = (camd/5 + 1)*(dragCam0Thk5 - dragCam5Thk5) + dragCam5Thk5;
                     dragThk10 = (camd/5 + 1)*(dragCam0Thk10 - dragCam5Thk10) + dragCam5Thk10;
                     dragThk15 = (camd/5 + 1)*(dragCam0Thk15 - dragCam5Thk15) + dragCam5Thk15;
                     dragThk20 = (camd/5 + 1)*(dragCam0Thk20 - dragCam5Thk20) + dragCam5Thk20;
 
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
                     dragThk5 = (camd/5)*(dragCam5Thk5 - dragCam0Thk5) + dragCam0Thk5;
                     dragThk10 = (camd/5)*(dragCam5Thk10 - dragCam0Thk10) + dragCam0Thk10;
                     dragThk15 = (camd/5)*(dragCam5Thk15 - dragCam0Thk15) + dragCam0Thk15;
                     dragThk20 = (camd/5)*(dragCam5Thk20 - dragCam0Thk20) + dragCam0Thk20;
 
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
                     dragThk5 = (camd/5 - 1)*(dragCam10Thk5 - dragCam5Thk5) + dragCam5Thk5;
                     dragThk10 = (camd/5 - 1)*(dragCam10Thk10 - dragCam5Thk10) + dragCam5Thk10;
                     dragThk15 = (camd/5 - 1)*(dragCam10Thk15 - dragCam5Thk15) + dragCam5Thk15;
                     dragThk20 = (camd/5 - 1)*(dragCam10Thk20 - dragCam5Thk20) + dragCam5Thk20;
 
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
                     dragThk5 = (camd/5 - 2)*(dragCam15Thk5 - dragCam10Thk5) + dragCam10Thk5;
                     dragThk10 = (camd/5 - 2)*(dragCam15Thk10 - dragCam10Thk10) + dragCam10Thk10;
                     dragThk15 = (camd/5 - 2)*(dragCam15Thk15 - dragCam10Thk15) + dragCam10Thk15;
                     dragThk20 = (camd/5 - 2)*(dragCam15Thk20 - dragCam10Thk20) + dragCam10Thk20;
 
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
                     dragThk5 = (camd/5 - 3)*(dragCam20Thk5 - dragCam15Thk5) + dragCam15Thk5;
                     dragThk10 = (camd/5 - 3)*(dragCam20Thk10 - dragCam15Thk10) + dragCam15Thk10;
                     dragThk15 = (camd/5 - 3)*(dragCam20Thk15 - dragCam15Thk15) + dragCam15Thk15;
                     dragThk20 = (camd/5 - 3)*(dragCam20Thk20 - dragCam15Thk20) + dragCam15Thk20;
 
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
 
                    
 
                 break;
                 }
             case 2:   //elliptical drag logic
                 {
                 dragCam0Thk5 = -6E-07*Math.pow(alfd,3) + 0.0007*Math.pow(alfd,2) + 0.0007*alfd + 0.0428;
                 dragCam10Thk5 = 5E-09*Math.pow(alfd,6) - 7E-08*Math.pow(alfd,5) - 3E-06*Math.pow(alfd,4) + 5E-05*Math.pow(alfd,3) + 0.0009*Math.pow(alfd,2) - 0.0058*alfd + 0.0758;
                 dragCam20Thk5 = 1E-08*Math.pow(alfd,6) - 2E-08*Math.pow(alfd,5) - 7E-06*Math.pow(alfd,4) + 1E-05*Math.pow(alfd,3) + 0.0015*Math.pow(alfd,2) + 0.0007*alfd + 0.1594;
                 
                 dragCam0Thk10 = 3E-09*Math.pow(alfd,6) + 4E-08*Math.pow(alfd,5) - 3E-06*Math.pow(alfd,4) - 9E-06*Math.pow(alfd,3) + 0.0013*Math.pow(alfd,2) + 0.0007*alfd + 0.0112;
                 dragCam10Thk10 = -4E-09*Math.pow(alfd,6) - 9E-08*Math.pow(alfd,5) + 2E-06*Math.pow(alfd,4) + 7E-05*Math.pow(alfd,3) + 0.0008*Math.pow(alfd,2) - 0.0095*alfd + 0.0657;
                 dragCam20Thk10 = -8E-09*Math.pow(alfd,6) - 9E-08*Math.pow(alfd,5) + 3E-06*Math.pow(alfd,4) + 6E-05*Math.pow(alfd,3) + 0.0005*Math.pow(alfd,2) - 0.0088*alfd + 0.2088;
 
                 dragCam0Thk20 = -7E-09*Math.pow(alfd,6) - 1E-07*Math.pow(alfd,5) + 4E-06*Math.pow(alfd,4) + 6E-05*Math.pow(alfd,3) + 0.0001*Math.pow(alfd,2) - 0.0087*alfd + 0.0596;
                 dragCam10Thk20 = -2E-09*Math.pow(alfd,6) + 2E-07*Math.pow(alfd,5) + 1E-06*Math.pow(alfd,4) - 6E-05*Math.pow(alfd,3) + 0.0004*Math.pow(alfd,2) - 7E-05*alfd + 0.1114;
                 dragCam20Thk20 = 4E-09*Math.pow(alfd,6) - 7E-08*Math.pow(alfd,5) - 3E-06*Math.pow(alfd,4) + 3E-05*Math.pow(alfd,3) + 0.001*Math.pow(alfd,2) - 0.0018*alfd + 0.1925;
 
                 if (-20.0 <= camd && camd < -10.0)
                     {
                     dragThk5 = (camd/10 + 2)*(dragCam10Thk5 - dragCam20Thk5) + dragCam20Thk5;
                     dragThk10 = (camd/10 + 2)*(dragCam10Thk10 - dragCam20Thk10) + dragCam20Thk10;
                     dragThk20 = (camd/10 + 2)*(dragCam10Thk20 - dragCam20Thk20) + dragCam20Thk20;
                 
                     if (1.0 <= thkd && thkd <= 5.0)
                         {
                         dragco = dragThk5;
                         }
                     else if (5.0 < thkd && thkd <= 10.0)
                         {
                         dragco = (thkd/5 - 1)*(dragThk10 - dragThk5) + dragThk5;
                         }
                     else if (10.0 < thkd && thkd <= 20.0)
                         {
                         dragco = (thkd/10 - 1)*(dragThk20 - dragThk10) + dragThk10;
                         }
                     }
                 else if (-10.0 <= camd && camd < 0)
                     {
                     dragThk5 = (camd/10 + 1)*(dragCam0Thk5 - dragCam10Thk5) + dragCam10Thk5;
                     dragThk10 = (camd/10 + 1)*(dragCam0Thk10 - dragCam10Thk10) + dragCam10Thk10;
                     dragThk20 = (camd/10 + 1)*(dragCam0Thk20 - dragCam10Thk20) + dragCam10Thk20;
 
                     if (1.0 <= thkd && thkd <= 5.0)
                         {
                         dragco = dragThk5;
                         }
                     else if (5.0 < thkd && thkd <= 10.0)
                         {
                         dragco = (thkd/5 - 1)*(dragThk10 - dragThk5) + dragThk5;
                         }
                     else if (10.0 < thkd && thkd <= 20.0)
                         {
                         dragco = (thkd/10 - 1)*(dragThk20 - dragThk10) + dragThk10;
                         }
                     }
                 else if (0 <= camd && camd < 10)
                     {
                     dragThk5 = (camd/10)*(dragCam10Thk5 - dragCam0Thk5) + dragCam0Thk5;
                     dragThk10 = (camd/10)*(dragCam10Thk10 - dragCam0Thk10) + dragCam0Thk10;
                     dragThk20 = (camd/10)*(dragCam10Thk20 - dragCam0Thk20) + dragCam0Thk20;
 
                     if (1.0 <= thkd && thkd <= 5.0)
                         {
                         dragco = dragThk5;
                         }
                     else if (5.0 < thkd && thkd <= 10.0)
                         {
                         dragco = (thkd/5 - 1)*(dragThk10 - dragThk5) + dragThk5;
                         }
                     else if (10.0 < thkd && thkd <= 20.0)
                         {
                         dragco = (thkd/10 - 1)*(dragThk20 - dragThk10) + dragThk10;
                         }
                     }
                 else if (10 <= camd && camd < 20)
                     {
                     dragThk5 = (camd/10 - 1)*(dragCam20Thk5 - dragCam10Thk5) + dragCam10Thk5;
                     dragThk10 = (camd/10 - 1)*(dragCam20Thk10 - dragCam10Thk10) + dragCam10Thk10;
                     dragThk20 = (camd/10 - 1)*(dragCam20Thk20 - dragCam10Thk20) + dragCam10Thk20;
 
                     if (1.0 <= thkd && thkd <= 5.0)
                         {
                         dragco = dragThk5;
                         }
                     else if (5.0 < thkd && thkd <= 10.0)
                         {
                         dragco = (thkd/5 - 1)*(dragThk10 - dragThk5) + dragThk5;
                         }
                     else if (10.0 < thkd && thkd <= 20.0)
                         {
                         dragco = (thkd/10 - 1)*(dragThk20 - dragThk10) + dragThk10;
                         }
                     }
 
                 break;
                 }
             case 3:    //flat plate drag logic
                 {
                 dragCam0 = -9E-07*Math.pow(alfd,3) + 0.0007*Math.pow(alfd,2) + 0.0008*alfd + 0.015;
                 dragCam5 = 1E-08*Math.pow(alfd,6) + 4E-08*Math.pow(alfd,5) - 9E-06*Math.pow(alfd,4) - 1E-05*Math.pow(alfd,3) + 0.0021*Math.pow(alfd,2) + 0.0033*alfd + 0.006;
                 dragCam10 = -9E-09*Math.pow(alfd,6) - 6E-08*Math.pow(alfd,5) + 5E-06*Math.pow(alfd,4) + 3E-05*Math.pow(alfd,3) - 0.0001*Math.pow(alfd,2) - 0.0025*alfd + 0.0615;
                 dragCam15 = 8E-10*Math.pow(alfd,6) - 5E-08*Math.pow(alfd,5) - 1E-06*Math.pow(alfd,4) + 3E-05*Math.pow(alfd,3) + 0.0008*Math.pow(alfd,2) - 0.0027*alfd + 0.0612;
                 dragCam20 = 8E-9*Math.pow(alfd,6) + 1E-8*Math.pow(alfd,5) - 5E-6*Math.pow(alfd,4) + 6E-6*Math.pow(alfd,3) + 0.001*Math.pow(alfd,2) - 0.001*alfd + 0.1219;
 
                 if (-20.0 <= camd && camd < -15.0)
                     {
                     dragco = (camd/5 + 4)*(dragCam15 - dragCam20) + dragCam20;
                     }
                 else if (-15.0 <= camd && camd < -10.0)
                     {
                     dragco = (camd/5 + 3)*(dragCam10 - dragCam15) + dragCam15;
                     }
                 else if (-10.0 <= camd && camd < -5.0)
                     {
                     dragco = (camd/5 + 2)*(dragCam5 - dragCam10) + dragCam10;
                     }
                 else if (-5.0 <= camd && camd < 0)
                     {
                     dragco = (camd/5 + 1)*(dragCam0 - dragCam5) + dragCam5;
                     }
                 else if (0 <= camd && camd < 5)
                     {
                     dragco = (camd/5)*(dragCam5 - dragCam0) + dragCam0;
                     }
                 else if (5 <= camd && camd < 10)
                     {
                     dragco = (camd/5 - 1)*(dragCam10 - dragCam5) + dragCam5;
                     }
                 else if (10 <= camd && camd < 15)
                     {
                     dragco = (camd/5 - 2)*(dragCam15 - dragCam10) + dragCam10;
                     }
                 else if (15 <= camd && camd <= 20)
                     {
                     dragco = (camd/5 - 3)*(dragCam20 - dragCam15) + dragCam15;
                     }
                 break;
                 }
             case 4:   //cylinder drag logic
                 {
                 ifound = 0 ;
                 for (index = 0; index <= 43 ; ++ index) {
                     if(reynolds >= recyl[index] && reynolds < recyl[index+1]) ifound = index;
                 }
 
                 dragco = ((cdcyl[ifound+1]-cdcyl[ifound])/(recyl[ifound+1]-recyl[ifound]))*
                           (reynolds - recyl[ifound]) + cdcyl[ifound];
 
                 
                 break;
                 }
             case 5:   //sphere drag logic
                 {
                 ifound = 0 ;
                 for (var index = 0; index <= 48 ; ++ index) {
                     if(reynolds >= resps[index] && reynolds < resps[index+1]) ifound = index;
                 }
                 
                 if ( dragBall == 1) {    // smooth ball
                    dragco = ((cdsps[ifound+1]-cdsps[ifound])/(resps[ifound+1]-resps[ifound]))*
                           (reynolds - resps[ifound]) + cdsps[ifound]; 
                 }
                 if ( dragBall == 2) {    // rough ball
                    dragco = ((cdspr[ifound+1]-cdspr[ifound])/(resps[ifound+1]-resps[ifound]))*
                           (reynolds - resps[ifound]) + cdspr[ifound];
                 }
                 if ( dragBall == 3) {    // golf ball
                    dragco = ((cdspg[ifound+1]-cdspg[ifound])/(resps[ifound+1]-resps[ifound]))*
                           (reynolds - resps[ifound]) + cdspg[ifound];
                 }
 
                 break;
                 }
             }
 
             if(reCorrection == true) {    // reynolds correction
                  if (shapeSelect <= 3) {       // airfoil 
                      dragco = dragco * Math.pow((50000./reynolds),.11) ;
                     
                      
                  }
             }
 
             if (induced == true) {    // induced drag coefficient  factor = .85 for rectangle
                 dragco = dragco + (cldin * cldin)/ (3.1415926 * aspr * .85) ;
                 
             }
         }
 
         
         return dragco;
     }
 
 
     /**
      * 
      * @param {number} camb 
      * @param {number} thic 
      * @param {number} angl 
      * 
      * This function is for the lift coefficient value used in the plots
      */
 function getClPlot(camb,thic,angl){
     var beta,xc,yc,rc,gamc,lec,tec,lecm,tecm,crdc ;
     var stfact,number ;
     var stfact;
     var convdr = Math.PI / 180;
     xc = 0.0 ;
     yc = camb / 2.0 ;
     rc = thic/4.0 + Math.sqrt( thic*thic/16.0 + yc*yc + 1.0);
     xc = 1.0 - Math.sqrt(rc*rc - yc*yc) ;
     beta = Math.asin(yc/rc)/convdr ;       /* Kutta condition */
     gamc = 2.0*rc*Math.sin((angl+beta)*convdr) ;
     lec = xc - Math.sqrt(rc*rc - yc*yc) ;
     tec = xc + Math.sqrt(rc*rc - yc*yc) ;
     lecm = lec + 1.0/lec ;
     tecm = tec + 1.0/tec ;
     crdc = tecm - lecm ;
 
     stfact = 1.0 ;
            
                if (angl > 10.0 ) {
                   stfact = .5 + .1 * angl - .005 * angl * angl ;
                }
                if (angl < -10.0 ) {
                   stfact = .5 - .1 * angl - .005 * angl * angl ;
                }
            
     
            number = stfact*gamc*4.0*3.1415926/crdc ;
 
            if (ar == true) {  // correction for low aspect ratio
                number = number /(1.0 + Math.abs(number)/(3.14159*aspr)) ;
            }
 
         
 
            return number ;
 
 }
 