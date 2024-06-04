
/**
 * Class shape
 * This class has all the variables and functions common to all the five shapes
 * used in the Foil Sim Student program
 */
class Shape{

    /**
     * Constructor receives
     * angle
     * camber
     * thickness
     * velocity
     * altitude
     * chord
     * span
     * wing Area
     * 
     * Shape object is created with 8 parameters
     */

    constructor(angle,camber,thickness,velocity,altitude,chord,span,wingArea){

        
        this.angle = angle;
        this.camber = camber;
        this.thickness = thickness;
        this.velocity = velocity;
        this.altitude = altitude;
        this.chord = chord;
        this.span = span;
        this.wingArea = wingArea;

    


    }

    /**
     * 
     * @param {number} angle - expressed in degrees
     */
    setAngle(angle){

        this.angle = angle;
    }

    /**
     * 
     * @param {number} camber - as percentage of chord
     */
    setCamber(camber){

        this.camber = camber;
    }

    /**
     * 
     * @param {number} thickness - as percentage of chord 
     */
    setThickness(thickness){

        this.thickness = thickness;
    }

    /**
     * 
     * @param {number} velocity 
     */
    setVelocity(velocity){

        this.velocity = velocity;
    }

    /**
     * 
     * @param {number} altitude 
     */
    setAltitude(altitude){

        this.altitude = altitude;
    }

    /**
     * 
     * @param {number} chord 
     */
    setChord(chord){

        this.chord = chord;
    }

    /**
     * 
     * @param {number} span 
     */
    setSpan(span){

        this.span = span;
    }

    /**
     * 
     * @param {number} wingArea 
     */
    setWingArea(wingArea){

        this.wingArea = wingArea;
    }

    /**
     * returns angle value in degrees
     */
    getAngle(){
        return this.angle;
    }

    /**
     * returns camber value 
     */
    getCamber(){
        return this.camber;
    }

    /**
     * returns thickness value
     */
    getThickness(){
        return this.thickness;
    }

    /**
     * returns velocity value
     */
    getVelocity(){
        return this.velocity;
    }

    /**
     * returns altitude value
     */
    getAltitude(){
        return this.altitude;
    }

    /**
     * returns chord value 
     */
    getChord(){
        return this.chord;
    }

    /**
     * returns span value
     */

    getSpan(){
        return this.span;
    }

    /**
     * returns aspect ratio
     * the aspect ratio is the span divided by the chord
     */
    getAspr(){

        var chord = this.getChord();
        var span = this.getSpan();
        var aspr = span / chord;

        return aspr;
    }

    /**
     * returns wing area
     */
    getWingArea(){
        return this.wingArea;
    }


    /**
     * returns ideal gas constant for earth
     */
    getRGasEarth(){
        var rgas = 1716;
        return rgas;

    }

    /**
     * returns gama earth
     */
    getGamaEarth(){

        var gama = 1.4;

        return gama;
    }

    /**
     * this function returns the conversion factor to convert degrees to radians
     */
    getConvDr(){

        var convdr = Math.PI / 180;
        return convdr;
    }

    /**
     * This function returns the division of PI over 2
     */
    getPiD2(){

        var pid2 = Math.PI / 2.0;
        return pid2;
    }

    /**
     * This function returns the vacuum permeability
     */
    getMu0(){

        var mu0 = .000000362 ;

        return mu0;

    }

    /**
     * This function returns the conversion factor for velocity units
     * The function knows if we are using imperial or metric units
     */
    getVconv(){

        var vconv = 0
        var units = document.getElementById("unitsButton").innerHTML;


        if(units == "english â–¼")
            vconv = 0.6818;
        else if(units == "metric â–¼")
            vconv = 1.097;

        return vconv;

    }

    /**
     * This function returns the conversion factor for lenght units
     * The function knows if we are using imperial or metric units
     */
    getLconv(){

        var lconv = 0
        var units = document.getElementById("unitsButton").innerHTML;

        if(units == "english â–¼")
            lconv = 1.0;
        else if(units == "metric â–¼")
            lconv = 0.3048;

        return lconv;
    }

    /**
     * This function returns the conversion factor for force units
     * The function knows if we are using imperial or metric units
     */
    getFconv(){

        var fconv = 0
        var units = document.getElementById("unitsButton").innerHTML;

        if(units == "english â–¼")
            fconv = 1.0;
        else if(units == "metric â–¼")
            fconv = 4.448;

        return fconv;

    }

    /**
     * This function returns the conversion factor for pressure units
     * The function knows if we are using imperial or metric units
     */
    getPconv(){

        var pconv = 0
        var units = document.getElementById("unitsButton").innerHTML;

        if(units == "english â–¼")
            pconv = 14.7;
        else if(units == "metric â–¼")
            pconv = 101.3;

        return pconv;

    }

    /**
     * This function returns the Hite
     * The hite is the altitude divided by the lenght conversion factor
     */
    getHite(){

        var altitude = this.getAltitude();
        var lconv = this.getLconv();
        var hite = altitude / lconv;
     
        return hite;
      

    }

    /**
     * This function returns the relative humidity
     */
    getRelativeHumidity(){

        var rlhum;

        if(environmentSelect <= 2)
            rlhum = 0.0;
        else if(environmentSelect == 3)
            rlhum = 100.0;
        
        return rlhum;

    }
    

   /**
    * This function returns the earth temperature in kelvins it is dependent on the altitude
    * */ 

    getTempEarth(){

        var hite = this.getHite();
        var tempEarth = 0;

        if(hite <= 36152)  // troposphere
            tempEarth = 518.6 - 3.56 * hite/1000;
        else if(hite >= 36152 && hite <= 82345) // Stratosphere
            tempEarth = 389.98;
    
        return tempEarth;
    
    }

    /**
     * This function returns the pressure of the earth it is dependent on the altitude
     */
    getPressureEarth(){

        var tempEarth = this.getTempEarth();
        var hite = this.getHite();
        var pressureEarth = 0;

        if(hite <= 36152) // troposphere
            pressureEarth = 2116.0 * Math.pow(tempEarth/518.6,5.256); 
        else if(hite >= 36152 && hite <= 82345) // stratosphere
            pressureEarth = 2116 * 0.2236 * Math.exp((36000.0 - hite) / (53.35 * 389.98));

        return pressureEarth;

    }

    /**
     * This function returns the temperature of the earth in Farenheit
     */
    getTemfEarth(){

        var tempEarth = this.getTempEarth();
        var temf = tempEarth - 459.6;

        if(temf <= 0.0)
            temf = 0.0;

        return temf;
    }

    /**
     * This function returs the pressure vapor of the earth
     */
    getPvapEarth(){

       var temf = this.getTemfEarth();
       var rlhum = 0.0;
       var pvap = rlhum*(2.685+.00354*Math.pow(temf,2.245))/100.;

       return pvap;
    }

    /**
     * This function returns the density of the air on earth
     */
    getRhoEarth(){

       
       var ps0 = this.getPressureEarth();
       var rgas = this.getRGasEarth();
       var ts0 = this.getTempEarth();
       var rho = ps0/(rgas * ts0) ;
       var pvap = this.getPvapEarth();
       var rho = (ps0 - .379*pvap)/(rgas * ts0) ; 

       return rho;

    }

    /**
     * This function returns the viscosity of the earth 
     */
    getViscosEarth(){

        var mu0 = this.getMu0();
        var ts0 = this.getTempEarth();
        var viscos = mu0 * 717.408/(ts0 + 198.72)*Math.pow(ts0/518.688,1.5) ;

        return viscos;

    }

    /**
     * This function returns the ideal gas constant for Mars
     */
    getRGasMars(){

        var rgas = 1149;

        return rgas;
    }

    /**
     * This function returns the gama value for Mars
     */
    getGamaMars(){

        var gama = 1.29;
        return gama;

    }

    /**
     * This function returns the temperature of Mars in Kelvin
     */
    getTempMars(){

        var hite = this.getHite();
        var tempMars = 0;

        if(hite <= 22960)  // troposphere
            tempMars =  434.02 - .548 * hite/1000. ;
        else if(hite > 22960) // Stratosphere
            tempMars = 449.36 - 1.217 * hite/1000. ;
    
        return tempMars;
    }

    /**
     * This function returns the pressure of Mars
     */
    getPressureMars(){

        var hite = this.getHite();
        var pressureMars = 0;

        if(hite <= 22960)  // troposphere
            pressureMars =  14.62 * Math.pow(2.71828,-.00003 * hite) ;
        else if(hite > 22960) // Stratosphere
            pressureMars =  14.62 * Math.pow(2.71828,-.00003 * hite) ;
    
        return pressureMars;

    }

    /**
     * This function returns the density of Mars
     */
    getRhoMars(){

        var ts0 = this.getTempMars();
        var rgas = this.getRGasMars();
        var ps0 = this.getPressureMars();
        var rho = ps0/(rgas*ts0) ;

        return rho;
    }

    /**
     * This function returns the viscosity of Mars
     */
    getViscosMars(){

        var ts0 = this.getTempMars();
        var mu0 = this.getMu0();
        var viscos = mu0 * 717.408/(ts0 + 198.72)*Math.pow(ts0/518.688,1.5) ;

        return viscos;
    }

    /**
     * This function returns the depht of the shape in the water
     */
    getHiteConstWater(){

        var altitude = this.getAltitude();
        var lconv = this.getLconv();
        var hite = -altitude / lconv;

        return hite;
    }

    /**
     * This function returns the water temperature in Kelvins
     */
    getWaterTemp(){

        var temp = 520;
        return temp;
    }

    /**
     * This function returns the density of water in slug/ft3
     */
    getRhoWater(){

        var rho = 1.94;
        return rho;

    }

    /**
     * This function returns the water pressure
     */
    getPressureWater(){

        var g0;
        if(getUnits() == 1)
            g0 = 32.2;
        else if(getUnits() == 2)
            g0 = 9.81;
        var hite = this.getHiteConstWater();
        var rho = this.getRhoWater();
        var ps0 = (2116. - rho * g0 * hite) ;
        return ps0;

    }

    /**
     * This function returns the dynamic pressure of water
     */
    getQ0Water(){

        var vconv = this.getVconv();
        var vfsd = this.getVelocity();
        var rho = this.getRhoWater();
        var q0 = 0.5 * rho * vfsd * vfsd / (vconv * vconv);

        return q0;

    }

    /**
     * This function returns the vacuum permeability 
     */
    getMu0Water(){

        var mu0 = .0000272 ;
        return mu0;

    }

    /**
     * This function returns the viscosity of water 
     */
    getViscosWater(){

        var ts0 = this.getWaterTemp();
        var mu0 = this.getMu0Water();
        var viscos = mu0 * 717.408/(ts0 + 198.72)*Math.pow(ts0/518.688,1.5) ;
        return viscos;
    }

   

   /**
    * This function returns the gas constant for Venus
    */
    getRGasVenus(){

        var rgas = 1149;
        return rgas;

    }

    /**
     * This function returns the gama value for Venus
     */
    getGamaVenus(){

        var gama = 1.29;
        return gama;

    }

    /**
     * This function returns the Venus surface temperature in Kelvins
     */
    getTempVenus(){

        var ts0 = 1331.6;
        return ts0;

    }

    /**
     * This function returns the Surface pressure of Venus
     */
    getPressureVenus(){

        var ps0 = 194672.;
        return ps0;

    }

    /**
     * This function returns the surface density of Venus
     */
    getRhoVenus(){

        var ts0 = this.getTempVenus();
        var rgas = this.getRGasVenus();
        var ps0 = this.getPressureVenus();
        var rho = ps0/(rgas*ts0) ;

        return rho;

    }

    /**
     * This function returns the viscosity of Venus 
     */
    getViscosVenus(){

        var ts0 = this.getTempVenus();
        var mu0 = this.getMu0();
        var viscos = mu0 * 717.408/(ts0 + 198.72)*Math.pow(ts0/518.688,1.5) ;

        return viscos;
    }

    /**
     * This function returns the dynamic pressure of Earth
     */
    getQ0Earth(){

        var vconv = this.getVconv();
        var vfsd = this.getVelocity();
        var rho = this.getRhoEarth();
        var q0 = .5 * rho * vfsd * vfsd / (vconv * vconv) ;
        return q0;
    }

    /**
     * This function returns the dynamic pressure of Mars
     */
    getQ0Mars(){


        var vconv = this.getVconv();
        var vfsd = this.getVelocity();
        var rho = this.getRhoMars();
        var q0 = .5 * rho * vfsd * vfsd / (vconv * vconv) ;
        return q0;

    }

    /**
     * This function returns the dynamic pressure of Venus
     */
    getQ0Venus(){

        var vconv = this.getVconv();
        var vfsd = this.getVelocity();
        var rho = this.getRhoVenus();
        var q0 = .5 * rho * vfsd * vfsd / (vconv * vconv) ;
        return q0;

    }

    /**
     * This function returns the Pt0 of Earth
     */
    getPt0Earth(){

        var q0 = this.getQ0Earth();
        var ps0 = this.getPressureEarth();
        var pt0 = ps0 + q0 ;
        return pt0;
    }


    /**
     * This function returns the Pt0 of Mars
     */
    getPt0Mars(){

        var q0 = this.getQ0Mars();
        var ps0 = this.getPressureMars();
        var pt0 = ps0 + q0 ;
        return pt0;

    }

    /**
     * This function returns the Pt0 of Venus
     */
    getPt0Venus(){

        var q0 = this.getQ0Venus();
        var ps0 = this.getPressureVenus();
        var pt0 = ps0 + q0 ;
        return pt0;

    }

    /**
     * This function returns the Reynolds number
     * environmentSelect = 1, Reynolds number on Earth conditions
     * environmentSelect = 2, Reynolds number on Mars conditions
     * environmentSelect = 3, Reynolds number on Water constant density conditions
     * environmentSelect = 4, Reynolds number on Venus Surface
     */
    getReynolds(){


        var rho = 0;
        var viscos = 0;

        if(environmentSelect == 1){

            rho = this.getRhoEarth();
            viscos = this.getViscosEarth();
        }
        else if(environmentSelect == 2){

            rho = this.getRhoMars();
            viscos = this.getViscosMars();
        }
        else if(environmentSelect == 3){

            rho = this.getRhoWater();
            viscos = this.getViscosWater();
        
        }

        else if(environmentSelect == 4){

            rho = this.getRhoVenus();
            viscos = this.getViscosVenus();

        }
        var lconv = this.getLconv();
        var chord = this.getChord();
        var vfsd = this.getVelocity();
        var vconv = this.getVconv();
        var reynolds = vfsd/vconv * chord/lconv * rho / viscos;
        
       
        return reynolds;

    }


    








}


/**
 * The Airfoil class is a child class of Shape
 * The Airfoil class constructor uses the same parameters as Shape
 * Therefore, we call the Shape constructor using the super() method
 * This class gives us more precise methods of the Airfoil like the Geometry, Lift, Drag.
 */

class Airfoil extends Shape{


    constructor(angle,camber,thickness,velocity,altitude,chord,span,wingArea){

        super(angle,camber,thickness,velocity,altitude,chord,span,wingArea);
        
    }

    /**
     * This method returns the camber divided by 25 it is used for animation purposes
     */
    getCamVal(){

        var caminpt = this.getCamber();
        var camval = caminpt / 25.0 ;

        return camval;
    }

    /**
     * This method returns the thickness divided by 25 it is used for animation purposes
     */
    getThkVal(){

        var thkinpt = this.getThickness();
        var thkval = thkinpt / 25.0 ;

        return thkval;
    }

    /**
     * This method returns the initial ycoordinate for the airfoil
     */

    getYcVal(){

        var camval = this.getCamVal();
        var ycval = camval / 2.0 ;

        return ycval;

    }

    /**
     * This method returns the radius value of the airfoil
     */
    getRVal(){

        var ycval = this.getYcVal();
        var thkval = this.getThkVal();
        var rval = thkval/4.0 +Math.sqrt(thkval*thkval/16.0+ycval*ycval +1.0);
        return rval;
    }

    /**
     * This method returns the initial xcoordinate value for the airfoil
     */
    getXcVal(){

        var ycval = this.getYcVal();
        var rval = this.getRVal();
        var xcval = 1.0 - Math.sqrt(rval*rval - ycval*ycval) ;

        return xcval;

    }

    /**
     * This method returns the beta angle value 
     */
    getBeta(){

        var convdr = this.getConvDr();
        var rval = this.getRVal();
        var ycval = this.getYcVal();
        var beta = Math.asin(ycval/rval)/convdr ;

        return beta;
    }

    /**
     * This method returns the gama angle value
     */
    getGamval(){

        var convdr = this.getConvDr();
        var beta = this.getBeta();
        var alfval = this.getAngle();
        var rval = this.getRVal();
        var gamval = 2.0*rval*Math.sin((alfval+beta)*convdr) ;
        return gamval;
    }

    /**
     * The following functions 
     * getLeg()
     * getTeg()
     * getLem()
     * getTem()
     * 
     * are used to calculate the chord for calculations
     */
    getLeg(){

        var xcval = this.getXcVal();
        var ycval = this.getYcVal();
        var rval = this.getRVal();
        var leg = xcval - Math.sqrt(rval * rval - ycval * ycval);

        return leg;
    }

    getTeg(){

        var rval = this.getRVal();
        var xcval = this.getXcVal();
        var ycval = this.getYcVal();
        var teg = xcval + Math.sqrt(rval * rval - ycval * ycval);

        return teg;

    }

    getLem(){

        var leg = this.getLeg();
        var lem = leg + 1.0 / leg;
        
        return lem;

    }

    getTem(){

        var teg = this.getTeg();
        var tem = teg + 1.0 / teg;

        return tem;
    }
/**
 * This function returns the chord lenght value of the airfoil for calculations
 */
    getChrd(){

        var tem = this.getTem();
        var lem = this.getLem();
        var chrd = tem - lem;

        return chrd;

    }

    /**
     * This function returns the liftCoefficient value for the Joukowski Airfoil
     * It uses the angle value, gamval and chrd value
     * 
     */
   getLiftCoefficient(){

     //obtain the inputs 
     const pi = Math.PI;
   
     var angle = this.getAngle();
     
      
     //Juokowski geometry
     var liftCoefficient;
     var gamval = this.getGamval();
    
     // calculate lift coefficient
     
     //var leg = this.getLeg();
     //var teg = this.getTeg();
     var chrd = this.getChrd();
     liftCoefficient = gamval * 4.0 * pi / chrd; 
 
     var stfact;
     
     if(angle > 10.0)
         stfact = 0.5 + 0.1 * angle - 0.005 * angle * angle;
     else if(angle < -10)
         stfact = 0.5 - 0.1 * angle - 0.005 * angle * angle;
     else
         stfact = 1.0;    
 
     liftCoefficient  = liftCoefficient * stfact;    
 
     /**
      * This is for the Aspect Ratio Lift correction
      */
    if(ar == true)
      liftCoefficient = liftCoefficient / (1.0 + Math.abs(liftCoefficient) / (pi * 4.0));

      /**
       * If the velocity is 0 then the lift Coefficient is 0
       */
     if(this.getVelocity() == 0)
        liftCoefficient = 0;

     

     return liftCoefficient;

   }

   /**
    * This function returns the lift value for the Joukowski Airfoil
    * The inputs are:
    * 
    * wingArea
    * angle of attack
    * liftCoefficient
    * dynamic pressure (q0)
    * 
    * Depending on the environment the dynamic Pressure will change
    */
   getLift(){

    //obtain the inputs 
        const pi = Math.PI;
    
        var wingArea = this.getWingArea();
        var angle = this.getAngle();
        var radians = (angle * pi) / 180;
        var lift;
        var lconv = this.getLconv();
        var fconv = this.getFconv();
    
    // calculate lift coefficient
        var vconv = this.getVconv();
        var liftCoefficient = this.getLiftCoefficient();
    
    //calculate q0
        var q0Earth = this.getQ0Earth();
        var q0Mars = this.getQ0Mars();
        var q0Water = this.getQ0Water();
        var q0Venus = this.getQ0Venus();
    
    
        if(environmentSelect == 1){
    
            lift =   q0Earth * wingArea * liftCoefficient / lconv / lconv ;
        
        }
    
        else if(environmentSelect == 2){
    
            lift = q0Mars * wingArea * liftCoefficient / lconv / lconv ;
    
        }

        else if(environmentSelect == 3){

            lift = q0Water * wingArea * liftCoefficient / lconv / lconv;
            
        }

        else if(environmentSelect == 4){

            lift = q0Venus * wingArea * liftCoefficient / lconv / lconv;

        }
        
        lift = lift * fconv;
    
    
        
        return lift;
        
    
        }

        /**
         * This function returns the dragCoefficient
         * Many of the values were determined experimentally in a wind tunnel
         * They were all taken from the Foil Sim Student Java applet
         * 
         * The inputs are:
         * 
         * angle of attack
         * camber
         * thickness
         * lift coefficient
         * reynolds number
         */
        getDragCoefficient(){

            var dragco;
            var dragCam0Thk5, dragCam5Thk5, dragCam10Thk5, dragCam15Thk5, dragCam20Thk5;
            var dragCam0Thk10, dragCam5Thk10, dragCam10Thk10, dragCam15Thk10, dragCam20Thk10;
            var dragCam0Thk15, dragCam5Thk15, dragCam10Thk15, dragCam15Thk15, dragCam20Thk15;
            var dragCam0Thk20, dragCam5Thk20, dragCam10Thk20, dragCam15Thk20, dragCam20Thk20;
            var dragThk5, dragThk10, dragThk15, dragThk20;
            var dragCam0, dragCam5, dragCam10, dragCam15, dragCam20;
            var camd = this.getCamber();
            var thkd = this.getThickness();
            var alfd = this.getAngle();

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

                if(liftAnalisis == 2){
                    dragco = 0;
                }
                else{

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

                        var cldin = this.getLiftCoefficient();
                    
                        var reynolds = this.getReynolds();

                        /**
                         * The following is for the reynolds number correction 
                         */
                        if(reCorrection == true)
                            dragco = dragco * Math.pow((50000./reynolds),.11) ;
                        
                            /**
                             * The following is for the induced drag option
                             */
                        if(induced == true)
                            dragco = dragco + (cldin * cldin)/ (3.1415926 * aspr * .85) ;

                        /**
                         * If the velocity is 0 then the dragCoefficient will be 0
                         */

                        if(this.getVelocity() == 0)
                            dragco = 0;

                    }

                        return dragco;

        }

        /**
         * This function returns the drag, the inputs are:
         * 
         * wingArea
         * dragCoefficient
         * dynamic Pressure (q0), depends on the environment
         * 
         * 
         */
        getDrag(){

            var drag;
            var area = this.getWingArea();
            var q0Earth = this.getQ0Earth();
            var q0Mars = this.getQ0Mars();
            var q0Water = this.getQ0Water();
            var q0Venus = this.getQ0Venus();
            var lconv = this.getLconv();
            var dragCoeff = this.getDragCoefficient();
            var fconv = this.getFconv();



            if(environmentSelect == 1){
    
                drag = dragCoeff * q0Earth * area / lconv / lconv ; /* drag in lbs */
                drag = drag * fconv ;
            
            }
        
            else if(environmentSelect == 2){
        
                drag = dragCoeff * q0Mars * area / lconv / lconv ; /* drag in lbs */
                drag = drag * fconv ;
        
            }

            else if(environmentSelect == 3){

                drag = dragCoeff * q0Water * area / lconv / lconv;
                drag = drag * fconv;
            }

            else if(environmentSelect == 4){

                drag = dragCoeff * q0Venus * area / lconv / lconv;
                drag = drag * fconv;
            }

            return drag;

            
        }

        /**
         * This function returns the liftOverDrag
         */
        getLiftOverDrag(){

            var lift = this.getLift();
            var drag = this.getDrag();
            var liftOverDrag = lift / drag;

            if(this.getVelocity() == 0 || lift == 0 || drag == 0 )
                liftOverDrag = 0;

            return liftOverDrag;

        }


    
    

}

/**
 * The following subclass inherits all the methods and parameters from the Shape class 
 * while it also has more specific methods for the geometry,lift and drag calculations 
 * for an Ellipse 
 * 
 * The methods are the same as the ones in the Airfoil subclass but they change the values in xVal and yVal
 */
class Ellipse extends Shape{


    constructor(angle,camber,thickness,velocity,altitude,chord,span,wingArea){

        super(angle,camber,thickness,velocity,altitude,chord,span,wingArea);
        
    }

    getCamval(){

        var caminpt = this.getCamber();
        var camval = caminpt / 25.0 ;

        return camval;

    }

    getThkVal(){

        var thkinpt = this.getThickness();
        var thkval = thkinpt / 25.0 ;

        return thkval;


    }

    getXcVal(){

        var xcval = 0.0;
        return xcval;
    }

    getYcVal(){

        var camval = this.getCamval();
        var ycval = camval / 2.0;

        return ycval;

    }

    getRVal(){

        var thkval = this.getThkVal();
        var ycval = this.getYcVal();
        var rval = thkval/4.0 + Math.sqrt(thkval*thkval/16.0+ycval*ycval+1.0);

        return rval;
    }

    getBeta(){

        var convdr = this.getConvDr();
        var rval = this.getRVal();
        var ycval = this.getYcVal();
        var beta = Math.asin(ycval/rval)/convdr ;
        
        return beta;

    }

    getGamval(){

        var convdr = this.getConvDr();
        var beta = this.getBeta();
        var alfval = this.getAngle();
        var rval = this.getRVal();
        var gamval = 2.0*rval*Math.sin((alfval+beta)*convdr) ;

        return gamval;

    }

    getLeg(){

        var xcval = this.getXcVal();
        var ycval = this.getYcVal();
        var rval = this.getRVal();
        var leg = xcval - Math.sqrt(rval * rval - ycval * ycval);

        return leg;
    }

    getTeg(){

        var rval = this.getRVal();
        var xcval = this.getXcVal();
        var ycval = this.getYcVal();
        var teg = xcval + Math.sqrt(rval * rval - ycval * ycval);

        return teg;

    }

    getLem(){

        var leg = this.getLeg();
        var lem = leg + 1.0 / leg;
        
        return lem;

    }

    getTem(){

        var teg = this.getTeg();
        var tem = teg + 1.0 / teg;

        return tem;
    }

    getChrd(){

        var tem = this.getTem();
        var lem = this.getLem();
        var chrd = tem - lem;

        return chrd;

    }

   getLiftCoefficient(){

     //obtain the inputs 
     const pi = Math.PI;
   
     var angle = this.getAngle();
     
      
     //Juokowski geometry
     var liftCoefficient;
     var gamval = this.getGamval();
    
     // calculate lift coefficient
     
     //var leg = this.getLeg();
     //var teg = this.getTeg();
     var chrd = this.getChrd();
     liftCoefficient = gamval * 4.0 * pi / chrd; 
 
     var stfact;
     
     if(angle > 10.0)
         stfact = 0.5 + 0.1 * angle - 0.005 * angle * angle;
     else if(angle < -10)
         stfact = 0.5 - 0.1 * angle - 0.005 * angle * angle;
     else
         stfact = 1.0;    
 
     liftCoefficient  = liftCoefficient * stfact;    
 
    if(ar == true)  //Correction for aspect ratio
        liftCoefficient = liftCoefficient / (1.0 + Math.abs(liftCoefficient) / (pi * 4.0));

     if(this.getVelocity() == 0)
        liftCoefficient = 0;

     return liftCoefficient;

   }

   getLift(){

    //obtain the inputs 
        const pi = Math.PI;
    
        var wingArea = this.getWingArea();
        var angle = this.getAngle();
        var radians = (angle * pi) / 180;
        var lift;
        var lconv = this.getLconv();
        var fconv = this.getFconv();
    
    // calculate lift coefficient
        var vconv = this.getVconv();
        var liftCoefficient = this.getLiftCoefficient();
    
    //calculate q0
        var q0Earth = this.getQ0Earth();
        var q0Mars = this.getQ0Mars();
        var q0Water = this.getQ0Water();
        var q0Venus = this.getQ0Venus();
    
    
    
        if(environmentSelect == 1){
    
            lift =   q0Earth * wingArea * liftCoefficient / lconv / lconv ;
        
        }
    
        else if(environmentSelect == 2){
    
            lift =   q0Mars * wingArea * liftCoefficient / lconv / lconv ;
    
        }

        else if(environmentSelect == 3){

            lift = q0Water * wingArea * liftCoefficient / lconv / lconv;
        }

        else if(environmentSelect == 4){

            lift = q0Venus * wingArea * liftCoefficient / lconv / lconv;

        }

        
        lift = lift * fconv;
    
    
        
        return lift;
        
    
        }

        getDragCoefficient(){

            var dragco;
            var dragCam0Thk5, dragCam5Thk5, dragCam10Thk5, dragCam15Thk5, dragCam20Thk5;
            var dragCam0Thk10, dragCam5Thk10, dragCam10Thk10, dragCam15Thk10, dragCam20Thk10;
            var dragCam0Thk15, dragCam5Thk15, dragCam10Thk15, dragCam15Thk15, dragCam20Thk15;
            var dragCam0Thk20, dragCam5Thk20, dragCam10Thk20, dragCam15Thk20, dragCam20Thk20;
            var dragThk5, dragThk10, dragThk15, dragThk20;
            var dragCam0, dragCam5, dragCam10, dragCam15, dragCam20;
            var camd = this.getCamber();
            var thkd = this.getThickness();
            var alfd = this.getAngle();

            dragCam0Thk5 = -6E-07*Math.pow(alfd,3) + 0.0007*Math.pow(alfd,2) + 0.0007*alfd + 0.0428;
            dragCam10Thk5 = 5E-09*Math.pow(alfd,6) - 7E-08*Math.pow(alfd,5) - 3E-06*Math.pow(alfd,4) + 5E-05*Math.pow(alfd,3) + 0.0009*Math.pow(alfd,2) - 0.0058*alfd + 0.0758;
            dragCam20Thk5 = 1E-08*Math.pow(alfd,6) - 2E-08*Math.pow(alfd,5) - 7E-06*Math.pow(alfd,4) + 1E-05*Math.pow(alfd,3) + 0.0015*Math.pow(alfd,2) + 0.0007*alfd + 0.1594;
            
            dragCam0Thk10 = 3E-09*Math.pow(alfd,6) + 4E-08*Math.pow(alfd,5) - 3E-06*Math.pow(alfd,4) - 9E-06*Math.pow(alfd,3) + 0.0013*Math.pow(alfd,2) + 0.0007*alfd + 0.0112;
            dragCam10Thk10 = -4E-09*Math.pow(alfd,6) - 9E-08*Math.pow(alfd,5) + 2E-06*Math.pow(alfd,4) + 7E-05*Math.pow(alfd,3) + 0.0008*Math.pow(alfd,2) - 0.0095*alfd + 0.0657;
            dragCam20Thk10 = -8E-09*Math.pow(alfd,6) - 9E-08*Math.pow(alfd,5) + 3E-06*Math.pow(alfd,4) + 6E-05*Math.pow(alfd,3) + 0.0005*Math.pow(alfd,2) - 0.0088*alfd + 0.2088;

            dragCam0Thk20 = -7E-09*Math.pow(alfd,6) - 1E-07*Math.pow(alfd,5) + 4E-06*Math.pow(alfd,4) + 6E-05*Math.pow(alfd,3) + 0.0001*Math.pow(alfd,2) - 0.0087*alfd + 0.0596;
            dragCam10Thk20 = -2E-09*Math.pow(alfd,6) + 2E-07*Math.pow(alfd,5) + 1E-06*Math.pow(alfd,4) - 6E-05*Math.pow(alfd,3) + 0.0004*Math.pow(alfd,2) - 7E-05*alfd + 0.1114;
            dragCam20Thk20 = 4E-09*Math.pow(alfd,6) - 7E-08*Math.pow(alfd,5) - 3E-06*Math.pow(alfd,4) + 3E-05*Math.pow(alfd,3) + 0.001*Math.pow(alfd,2) - 0.0018*alfd + 0.1925;

            if(liftAnalisis == 2 || this.getVelocity() == 0){
                dragco = 0;
            }

            else{

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

                var reynolds = this.getReynolds();
               
                var cldin = this.getLiftCoefficient();

                if(reCorrection == true)
                    dragco = dragco * Math.pow((50000./reynolds),.11) ;
                if(induced == true)
                    dragco = dragco + (cldin * cldin)/ (3.1415926 * aspr * .85) ;

               

            }

                return dragco;

        }


        getDrag(){

            var drag;
            var area = this.getWingArea();
            var q0Earth = this.getQ0Earth();
            var q0Mars = this.getQ0Mars();
            var q0Water = this.getQ0Water();
            var q0Venus = this.getQ0Venus();
            var lconv = this.getLconv();
            var dragCoeff = this.getDragCoefficient();
            var fconv = this.getFconv();



            if(environmentSelect == 1){
    
                drag = dragCoeff * q0Earth * area / lconv / lconv ; /* drag in lbs */
                drag = drag * fconv ;
            
            }
        
            else if(environmentSelect == 2){
        
                drag = dragCoeff * q0Mars * area / lconv / lconv ; /* drag in lbs */
                drag = drag * fconv ;
        
            }

            else if(environmentSelect == 3){

                drag = dragCoeff * q0Water * area / lconv / lconv;
                drag = drag * fconv;

            }

            else if(environmentSelect == 4){

                drag = dragCoeff * q0Venus * area / lconv / lconv;
                drag = drag * fconv;

            }

            return drag;

            
        }

        getLiftOverDrag(){

            var lift = this.getLift();
            var drag = this.getDrag();
            var liftOverDrag = lift / drag;

            if(this.getVelocity() == 0 || lift == 0 || drag == 0)
                liftOverDrag = 0;

            return liftOverDrag;
        }


    
}
/**
 * The following subclass inherits all the methods and parameters from the Shape class 
 * while it also has more specific methods for the geometry,lift and drag calculations 
 * for a plate 
 * 
 * The methods are the same as the ones in the Airfoil subclass but they change the values in xVal and yVal
 */
class Plate extends Shape{


    constructor(angle,camber,thickness,velocity,altitude,chord,span,wingArea){

        super(angle,camber,thickness,velocity,altitude,chord,span,wingArea);
        
    }



    getCamval(){

        var caminpt = this.getCamber();
        var camval = caminpt / 25.0 ;

        return camval;

    }

    getXcVal(){

        var xcval = 0.0;
        return xcval;
    }

    getYcVal(){

        var camval = this.getCamval();
        var ycval = camval / 2.0 ;

        return ycval;

    }

    getRVal(){

        var ycval = this.getYcVal();
        var rval = Math.sqrt(ycval*ycval+1.0);

        return rval;

    }

    getBeta(){

        var convdr = this.getConvDr();
        var rval = this.getRVal();
        var ycval = this.getYcVal();
        var beta = Math.asin(ycval/rval)/convdr ;  
        
        return beta;
    }

    getGamval(){

        var convdr = this.getConvDr();
        var beta  = this.getBeta();
        var alfval = this.getAngle();
        var rval = this.getRVal();
        var gamval = 2.0*rval*Math.sin((alfval+beta)*convdr) ;

        return gamval;

    }

    getLeg(){

        var xcval = this.getXcVal();
        var ycval = this.getYcVal();
        var rval = this.getRVal();
        var leg = xcval - Math.sqrt(rval * rval - ycval * ycval);

        return leg;
    }

    getTeg(){

        var rval = this.getRVal();
        var xcval = this.getXcVal();
        var ycval = this.getYcVal();
        var teg = xcval + Math.sqrt(rval * rval - ycval * ycval);

        return teg;

    }

    getLem(){

        var leg = this.getLeg();
        var lem = leg + 1.0 / leg;
        
        return lem;

    }

    getTem(){

        var teg = this.getTeg();
        var tem = teg + 1.0 / teg;

        return tem;
    }

    getChrd(){

        var tem = this.getTem();
        var lem = this.getLem();
        var chrd = tem - lem;

        return chrd;

    }

   getLiftCoefficient(){

     //obtain the inputs 
     const pi = Math.PI;
   
     var angle = this.getAngle();
     
      
     //Juokowski geometry
     var liftCoefficient;
     var gamval = this.getGamval();
    
     // calculate lift coefficient
     
     //var leg = this.getLeg();
     //var teg = this.getTeg();
     var chrd = this.getChrd();
     liftCoefficient = gamval * 4.0 * pi / chrd; 
 
     var stfact;
     
     if(angle > 10.0)
         stfact = 0.5 + 0.1 * angle - 0.005 * angle * angle;
     else if(angle < -10)
         stfact = 0.5 - 0.1 * angle - 0.005 * angle * angle;
     else
         stfact = 1.0;    
 
     liftCoefficient  = liftCoefficient * stfact;    
 
     if(ar == true)//Correction for aspect ratio
        liftCoefficient = liftCoefficient / (1.0 + Math.abs(liftCoefficient) / (pi * 4.0));

     if(this.getVelocity() == 0)
        liftCoefficient = 0;
     

     return liftCoefficient;

   }

   getLift(){
    
    //obtain the inputs 
        const pi = Math.PI;
    
        var wingArea = this.getWingArea();
        var angle = this.getAngle();
        var radians = (angle * pi) / 180;
        var lift;
        var lconv = this.getLconv();
        var fconv = this.getFconv();
    
    // calculate lift coefficient
        var vconv = this.getVconv();
        var liftCoefficient = this.getLiftCoefficient();
    
    //calculate q0
        var q0Earth = this.getQ0Earth();
        var q0Mars = this.getQ0Mars();
        var q0Water = this.getQ0Water();
        var q0Venus = this.getQ0Venus();
    
    
        if(environmentSelect == 1){
    
            lift =   q0Earth * wingArea * liftCoefficient / lconv / lconv ;
        
        }
    
        else if(environmentSelect == 2){
    
            lift =   q0Mars * wingArea * liftCoefficient / lconv / lconv ;
    
        }

        else if(environmentSelect == 3){

            lift = q0Water * wingArea * liftCoefficient / lconv / lconv;
        }

        else if(environmentSelect == 4){

            lift = q0Venus * wingArea * liftCoefficient / lconv / lconv;
        }
        
        lift = lift * fconv;
    
    
        
        return lift;
        
    
        }


        getDragCoefficient(){

            var dragco;
            var dragCam0Thk5, dragCam5Thk5, dragCam10Thk5, dragCam15Thk5, dragCam20Thk5;
            var dragCam0Thk10, dragCam5Thk10, dragCam10Thk10, dragCam15Thk10, dragCam20Thk10;
            var dragCam0Thk15, dragCam5Thk15, dragCam10Thk15, dragCam15Thk15, dragCam20Thk15;
            var dragCam0Thk20, dragCam5Thk20, dragCam10Thk20, dragCam15Thk20, dragCam20Thk20;
            var dragThk5, dragThk10, dragThk15, dragThk20;
            var dragCam0, dragCam5, dragCam10, dragCam15, dragCam20;
            var camd = this.getCamber();
            var alfd = this.getAngle();

            if(liftAnalisis == 2 || this.getVelocity() == 0){
                dragco = 0;
            }

            else{

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

                        var reynolds = this.getReynolds();
                        var cldin = this.getLiftCoefficient();
                        

                        if(reCorrection == true)
                            dragco = dragco * Math.pow((50000./reynolds),.11) ;
                        if(induced == true)
                            dragco = dragco + (cldin * cldin)/ (3.1415926 * aspr * .85) ;

                    }

                        return dragco;

        }


        getDrag(){

            var drag;
            var area = this.getWingArea();
            var q0Earth = this.getQ0Earth();
            var q0Mars = this.getQ0Mars();
            var q0Water = this.getQ0Water();
            var q0Venus = this.getQ0Venus();
            var lconv = this.getLconv();
            var dragCoeff = this.getDragCoefficient();
            var fconv = this.getFconv();



            /**
             * Earth conditions
             */
            if(environmentSelect == 1){
    
                drag = dragCoeff * q0Earth * area / lconv / lconv ; /* drag in lbs */
                drag = drag * fconv ;
            
            }
        
            /**
             * Mars conditions
             */
            else if(environmentSelect == 2){
        
                drag = dragCoeff * q0Mars * area / lconv / lconv ; /* drag in lbs */
                drag = drag * fconv ;
        
            }

            /**
             * Water conditions
             */
            else if(environmentSelect == 3){

                drag = dragCoeff * q0Water * area / lconv / lconv;
                drag = drag * fconv;
                
            }

            /**
             * Venus surface conditions
             */
            else if(environmentSelect == 4){

                drag = dragCoeff * q0Venus * area / lconv / lconv;
                drag = drag * fconv;

            }

            return drag;

            
        }

        getLiftOverDrag(){

            var lift = this.getLift();
            var drag = this.getDrag();
            var liftOverDrag = lift / drag;

            if(this.getVelocity() == 0 || lift == 0 || drag == 0)
                liftOverDrag = 0;

            return liftOverDrag;

        }

    
 
   
}
/**
 * The following subclass inherits all the methods and parameters from the Shape class 
 * while it also has more specific methods for the geometry,lift and drag calculations 
 * for a rotating Cylinder
 * 
 * For the rotating cylinder and spinning ball we have inherit the same input parameters plus we also
 * add two more parameters which are:
 * 
 * radius
 * spin
 * 
 */
class Cylinder extends Shape{

    /**
     * We use the super keyword to call the constructor from the parent class
     * plus we also add two more parameters for this shape
     */

    constructor(angle,camber,thickness,velocity,altitude,chord,span,wingArea,radius,spin){

        super(angle,camber,thickness,velocity,altitude,chord,span,wingArea);
        this.radius = radius;
        this.spin = spin;
       
    }

    /**
     * 
     * @param {number} radius - circle radius 
     */
    setRadius(radius){

        this.radius = radius;
    }

    /**
     * 
     * @param {number} spin  - in rpm 
     */
    setSpin(spin){

        this.spin = spin;
    }


    /**
     * Returns the radius of the cylinder
     */
    getRadius(){

        
        var radius = this.radius;
        return radius;
    
    }

    getAreaCylinder(){

        var span = this.getSpan();
        var radius = this.getRadius();
        var areaCylinder = 2.0 * radius * span;

        return areaCylinder;
    }

    /**
     * Returns the spin of the cylinder
     */
    getSpin(){

        var spinMx = this.getSpinMx();
        var spinMn = this.getSpinMn();
        var spin = this.spin;
        spin = spin / 60;
        

        return spin;

        

    }

    /**
     * Returns the maximum spin for the cylinder
     * It is dependant on:
     * 
     * radius 
     * velocity
     */
    getSpinMx(){
        var velocity = this.getVelocity();
        var vconv = this.getVconv();
        var radius = this.getRadius();
        var lconv = this.getLconv();
        var spinMx = 2.75 * velocity / vconv / (radius / lconv);
        
        return spinMx;
    }

    /**
     * Returns the minimum spin for the cylinder 
     * It is dependant on 
     * 
     * velocity
     * radius
     */
    getSpinMn(){

        var velocity = this.getVelocity();
        var vconv = this.getVconv();
        var radius = this.getRadius();
        var lconv = this.getLconv();
        var spinMn = -2.75 * velocity / vconv / (radius / lconv);
     
        return spinMn;

    }

    /**
     * Returns the area for a cylinder
     * dependant on:
     * 
     * radius
     * 
     */
    getArea(){

        const pi = Math.PI;
        var radius = this.getRadius();
        var area = pi * Math.pow(radius,2);

        return area;
    }

    /**
     * Returns the rval for the cylinder
     */
    getRVal(){

        var lconv = this.getLconv();
        var radius = this.getRadius();
        var rval = radius/lconv ;
        return rval;

    }

    /**
     * Returns the gamval of the cylinder
     */
    getGamval(){

        var pi = Math.PI
        var spindr = 1.0;
        var vconv = this.getVconv();
        var vfsd = this.getVelocity();
        var rval = this.getRVal();
        var spin = this.getSpin();
        var gamval = 4.0 * pi * pi *spin * rval * rval / (vfsd/vconv);
        gamval = gamval * spindr ;
        return gamval;

    }

    /**
     * Returns the initial x coordinate value
     */
    getXcVal(){

        var xcval = 0.0;
        return xcval;

    }

    /**
     * Returns the initial y coordinate value
     */
    getYcVal(){

       var ycval = 0.0001;
        return ycval;

    }


    /**
     * Returns the leg
     */
    getLeg(){

        var xcval = this.getXcVal();
        var ycval = this.getYcVal();
        var rval = this.getRVal();
        var leg = xcval - Math.sqrt(rval * rval - ycval * ycval);

        return leg;
    }

    /**
     * Returns the teg
     */
    getTeg(){

        var rval = this.getRVal();
        var xcval = this.getXcVal();
        var ycval = this.getYcVal();
        var teg = xcval + Math.sqrt(rval * rval - ycval * ycval);

        return teg;

    }

    /**
     * Returns the lem
     */
    getLem(){

        var leg = this.getLeg();
        var lem = leg + 1.0 / leg;
        
        return lem;

    }

    /**
     * Returns the tem
     */
    getTem(){

        var teg = this.getTeg();
        var tem = teg + 1.0 / teg;

        return tem;
    }

    /**
     * Returns the chord it is dependant on 
     * 
     * tem
     * lem
     */
    getChrd(){

        var tem = this.getTem();
        var lem = this.getLem();
        var chrd = tem - lem; 
           
        return chrd;

    }

    /**
     * Returns the lift coefficient it is dependant on:
     * 
     * gamval
     * angle of attack 
     * chord
     * 
     */
   getLiftCoefficient(){

     //obtain the inputs 
     const pi = Math.PI;
   
     var area = this.getArea();
     var angle = this.getAngle();
     var fconv = this.getFconv();
     var lconv = this.getLconv();
     
      
     //Juokowski geometry
     var liftCoefficient;
     var gamval = this.getGamval();
    
     
     // calculate lift coefficient
     
    
     var chrd = this.getChrd();
     liftCoefficient = gamval * 4.0 * pi / chrd; 
     
     var stfact;
     
     if(angle > 10.0)
         stfact = 0.5 + 0.1 * angle - 0.005 * angle * angle;
     else if(angle < -10)
         stfact = 0.5 - 0.1 * angle - 0.005 * angle * angle;
     else
         stfact = 1.0;    
 
     liftCoefficient  = liftCoefficient * stfact;    
 
     if(ar == true)//Correction for aspect ratio
        liftCoefficient = liftCoefficient / (1.0 + Math.abs(liftCoefficient) / (pi * 4.0));


     if(this.getVelocity() == 0)
        liftCoefficient = 0;

        var lift = this.getLift();
        var q0;
        if(environmentSelect == 1){
    
            q0 = this.getQ0Earth();
         
         }
     
         /**
          * Mars conditions
          */
         else if(environmentSelect == 2){
     
            q0 = this.getQ0Mars();
     
         }
     
         /**
          * Water conditions
          */
         else if(environmentSelect == 3){
     
             q0 = this.getQ0Water();
         }
     
         /**
          * Venus Surface conditions
          */
         else if(environmentSelect == 4){
     
             q0 = this.getQ0Venus();
     
         }

        liftCoefficient = (lift/fconv) / ( q0 *  area/lconv/lconv) ;
      

     return liftCoefficient;

   }


   /**
    * This function returns the lift for the cylinder it is dependant on:
    * 
    * rho (density)
    * gamval
    * velocity
    * span
    */
   getLift(){


    var lconv = this.getLconv();
    var rho;
    var fconv = this.getFconv();


    /**
     * Earth conditions
     */
    if(environmentSelect == 1){
    
       rho = this.getRhoEarth();
    
    }

    /**
     * Mars conditions
     */
    else if(environmentSelect == 2){

        rho = this.getRhoMars();

    }

    /**
     * Water conditions
     */
    else if(environmentSelect == 3){

        rho = this.getRhoWater();
    }

    /**
     * Venus Surface conditions
     */
    else if(environmentSelect == 4){

        rho = this.getRhoVenus();

    }

        
        var gamval = this.getGamval();
        var vfsd = this.getVelocity();
        var vconv = this.getVconv();
        var span = this.getSpan();
     
        var lift = rho * (vfsd/vconv) * gamval * (vfsd/vconv) * (span/lconv);
        lift = lift * fconv;

        /**
         * If velocity is 0 then lift coefficient is 0
         */
        if(this.getVelocity() == 0)
            lift = 0;

        return lift;

   }

   /**
    * Returns the reynolds number for the cylinder
    * it is dependant on:
    * 
    * rho(density)
    * viscos(viscosity)
    * velocity
    * radius
    */
   getReynoldsCylinder(){


    var vfsd = this.getVelocity();
    var vconv = this.getVconv();
    var radius = this.getRadius();
    var lconv = this.getLconv();
    var rho;
    var viscos;

    /**
     * Earth conditions
     */
    if(environmentSelect == 1){

         rho = this.getRhoEarth();
         viscos = this.getViscosEarth();
    }

    /**
     * Mars conditions
     */
    else if(environmentSelect == 2){

         rho = this.getRhoMars();
         viscos = this.getViscosMars();
    }

    /**
     * Water conditions
     */
    else if(environmentSelect == 3){

         rho = this.getRhoWater();
         viscos = this.getViscosWater();

    }

    /**
     * Venus Surface conditions 
     */
    else if(environmentSelect == 4){

         rho = this.getRhoVenus();
         viscos = this.getViscosVenus();

    }

    var reynolds = vfsd/vconv * 2 * radius/lconv * rho / viscos;
    return reynolds;

   }

   /**
    * Returns the drag coefficient for the cylinder
    */
   getDragCoefficient(){

        var dragco;
        var index,ifound ; 
        var reynolds = this.getReynoldsCylinder();
        var cldin = this.getLiftCoefficient();
        var recyl = [.1, .2, .4, .5, .6, .8, 1.0,
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
            
        /**
         * ideal flow, drag is 0
         * velocity is 0, drag is 0
         */
        if(liftAnalisis == 2 || this.getVelocity() == 0){
            dragco = 0;
        }

        else{


        ifound = 0 ;
                    for (index = 0; index <= 43 ; ++ index) {
                        if(reynolds >= recyl[index] && reynolds < recyl[index+1]) 
                            ifound = index;
                    }

                    dragco = ((cdcyl[ifound+1]-cdcyl[ifound])/(recyl[ifound+1]-recyl[ifound])) * (reynolds - recyl[ifound]) + cdcyl[ifound];
                    
                   
                }

                /**
                 * Induced drag calculation
                 */
                if(induced == true)
                    dragco = dragco + (cldin * cldin)/ (3.1415926 * aspr * .85) ;

                    return dragco;

   }

   /**
    * Returns the drag for the rotating cylinder
    * it is dependant on:
    * 
    * dynamic pressure
    * wing area
    * drag coefficient
    */
   getDrag(){

    var drag;
    var area = this.getAreaCylinder();
    var q0Earth = this.getQ0Earth();
    var q0Mars = this.getQ0Mars();
    var q0Water = this.getQ0Water();
    var q0Venus = this.getQ0Venus();
    var lconv = this.getLconv();
    var dragCoeff = this.getDragCoefficient();
    var fconv = this.getFconv();

    

    /**
     * Earth conditions
     */
    if(environmentSelect == 1){

        drag = dragCoeff * q0Earth * area / lconv / lconv ; /* drag in lbs */
        drag = drag * fconv ;
    
    }

    /**
     * Mars conditions
     */
    else if(environmentSelect == 2){

        drag = dragCoeff * q0Mars * area / lconv / lconv ; /* drag in lbs */
        drag = drag * fconv ;

    }

    /**
     * Water conditions
     */
    else if(environmentSelect == 3){

        drag = dragCoeff * q0Water * area / lconv / lconv;
        drag = drag * fconv;
    }

    /**
     * Venus Surface conditions
     */
    else if(environmentSelect == 4){

        drag = dragCoeff * q0Venus * area / lconv / lconv;
        drag = drag * fconv;

    }

    /**
     * If velocity is 0, drag is 0
     */
    else if(this.getVelocity() == 0)
        drag = 0;

    return drag;

    
}

/**
 * Returns the lift over drag
 */
getLiftOverDrag(){

    var lift = this.getLift();
    var drag = this.getDrag();
    var liftOverDrag = lift / drag;

    if(this.getVelocity == 0 || lift == 0 || drag == 0)
        liftOverDrag = 0;

    return liftOverDrag;

}
    

}

/**
 * The following subclass inherits all the methods and parameters from the Shape class 
 * while it also has more specific methods for the geometry,lift and drag calculations 
 * for a spinning ball
 * 
 * For the rotating cylinder and spinning ball we inherit the same input parameters plus we also
 * add two more parameters which are:
 * 
 * radius
 * spin
 * 
 * For the spinning ball the methods are the same as the cylinder
 * 
 */

class Ball extends Shape{


    constructor(angle,camber,thickness,velocity,altitude,chord,span,wingArea,radius,spin){

        super(angle,camber,thickness,velocity,altitude,chord,span,wingArea);
        this.radius = radius;
        this.spin = spin;
        
    }


    setRadius(radius){

        this.radius = radius;
    }

    setSpin(spin){

        this.spin = spin;
    }

    getRadius(){

        return this.radius;
    
    }

    getSpanBall(){

        var span = this.radius;
        return span;
    }

    getSpinMx(){
        var velocity = this.getVelocity();
        var vconv = this.getVconv();
        var radius = this.getRadius();
        var lconv = this.getLconv();
        var spinMx = 2.75 * velocity / vconv / (radius / lconv);
        
        return spinMx;
    }

    getSpinMn(){

        var velocity = this.getVelocity();
        var vconv = this.getVconv();
        var radius = this.getRadius();
        var lconv = this.getLconv();
        var spinMn = -2.75 * velocity / vconv / (radius / lconv);
     
        return spinMn;

    }

    getSpin(){

        return this.spin / 60;

    }

    getRVal(){

        var lconv = this.getLconv();
        var radius = this.getRadius();
        var rval = radius/lconv ;

        return rval;

    }

    getArea(){

        const pi = Math.PI;
        var radius = this.getRadius();
        var area = pi * Math.pow(radius,2);

        return area;
    }


    getGamval(){

        var spindr = 1.0;
        var vconv = this.getVconv();
        var vfsd = this.getVelocity();
        var rval = this.getRVal();
        var spin = this.getSpin();
        var gamval = 4.0 * 3.1415926 * 3.1415926 *spin * rval * rval / (vfsd/vconv);
        var gamval = gamval * spindr ;
        return gamval;

    }

    getXcVal(){

        var xcval = 0.0;
        return xcval;
    }


    getYcVal(){

       var ycval = 0.0001 ;
        return ycval;
        
    }

    getLeg(){

        var xcval = this.getXcVal();
        var ycval = this.getYcVal();
        var rval = this.getRVal();
        var leg = xcval - Math.sqrt(rval * rval - ycval * ycval);

        return leg;
    }

    getTeg(){

        var rval = this.getRVal();
        var xcval = this.getXcVal();
        var ycval = this.getYcVal();
        var teg = xcval + Math.sqrt(rval * rval - ycval * ycval);

        return teg;

    }

    getLem(){

        var leg = this.getLeg();
        var lem = leg + 1.0 / leg;
        
        return lem;

    }

    getTem(){

        var teg = this.getTeg();
        var tem = teg + 1.0 / teg;

        return tem;
    }

    getChrd(){

        var tem = this.getTem();
        var lem = this.getLem();
        var chrd = tem - lem;

        return chrd;

    }

   getLiftCoefficient(){

     //obtain the inputs 
     const pi = Math.PI;
     var fconv = this.getFconv();
     var angle = this.getAngle();
     var lconv = this.getLconv();
     
     //Juokowski geometry
     var liftCoefficient;
     var gamval = this.getGamval();
    
     // calculate lift coefficient
     
     //var leg = this.getLeg();
     //var teg = this.getTeg();
     var chrd = this.getChrd();
     liftCoefficient = gamval * 4.0 * pi / chrd; 
     
     var stfact = 1.0;
     
     if(angle > 10.0)
         stfact = 0.5 + 0.1 * angle - 0.005 * angle * angle;
     else if(angle < -10)
         stfact = 0.5 - 0.1 * angle - 0.005 * angle * angle;
       
 
     liftCoefficient  = liftCoefficient * stfact; 
     
 
     if(ar == true){//Correction for aspect ratio
        liftCoefficient = liftCoefficient / (1.0 + Math.abs(liftCoefficient) / (pi * 0.2));
        
     }

    if(this.getVelocity() == 0)
        liftCoefficient = 0;
     
    var lift = this.getLift();
    var q0;
    var area = this.getArea();

    if(environmentSelect == 1){
    
    
        q0 = this.getQ0Earth();
     }
 
     else if(environmentSelect == 2){
 
    
         q0 = this.getQ0Mars();
 
     }
 
     else if(environmentSelect == 3){
 
        
         q0 = this.getQ0Water();
     }
 
     else if(environmentSelect == 4){
 
     
         q0 = this.getQ0Venus();
     }
 
    liftCoefficient = (lift/fconv) / ( q0 *  area/lconv/lconv) ;

     return liftCoefficient;

   }




   getLift(){


    var lconv = this.getLconv();
    var rho;
    var fconv = this.getFconv();
    

    if(environmentSelect == 1){
    
       rho = this.getRhoEarth();
    
    }

    else if(environmentSelect == 2){

        rho = this.getRhoMars();

    }

    else if(environmentSelect == 3){

        rho = this.getRhoWater();
    }

    else if(environmentSelect == 4){

        rho = this.getRhoVenus();
    }

        
        var gamval = this.getGamval();
        var vfsd = this.getVelocity();
        var vconv = this.getVconv();
        var span = this.getSpanBall();
        var rval = this.getRVal();
     
        var lift = rho * vfsd/vconv * gamval * vfsd/vconv * span/lconv; // lift lbs
        lift = lift * 4.0 * rval / (span/lconv) / 3.0 ; 
        lift = lift * fconv;
        return lift;

   }

   getReynoldsBall(){

    var vfsd = this.getVelocity();
    var vconv = this.getVconv();
    var radius = this.getRadius();
    var lconv = this.getLconv();
    var rho;
    var viscos;
    if(environmentSelect == 1){

         rho = this.getRhoEarth();
         viscos = this.getViscosEarth();
    }

    else if(environmentSelect == 2){

         rho = this.getRhoMars();
         viscos = this.getViscosMars();
    }

    else if(environmentSelect == 3){

        rho = this.getRhoWater();
        viscos = this.getViscosWater();

    }

    else if(environmentSelect == 4){

        rho = this.getRhoVenus();
        viscos = this.getViscosVenus();
    }

    var reynolds = vfsd/vconv * 2 * radius/lconv * rho / viscos;
    return reynolds;


   }

   getDragCoefficient(){

    var index, ifound;
    var dragco;
    var cldin = this.getLiftCoefficient();
    var resps = [.1, .2, .4, .5, .6, .8, 1.0,
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
    var cdspg = [270., 110., 54., 51., 40., 35., 28.,
        15., 8.5, 7.5, 6.0, 5.4, 4.9,
        3.1, 1.9, 1.8, 1.5, 1.3, 1.1,
        0.81, 0.6, 0.58, 0.56, 0.5, 0.49, 
        0.40, 0.41, 0.415, 0.42, 0.43, 0.44,
        0.44, 0.28, 0.255, 0.24, 0.24, 0.25, 
        0.26, 0.27, 0.290, 0.33, 0.37, 0.40, 
        0.41, 0.42, 0.420, 0.43, 0.44, 0.45 ] ; 
    var reynolds = this.getReynoldsBall();

    if(liftAnalisis == 2 || this.getVelocity() == 0){

        dragco = 0;
    }

    else{
   
                    ifound = 0 ;
                    for (index = 0; index <= 48 ; ++ index) {
                        if(reynolds >= resps[index] && reynolds < resps[index+1]) 
                            ifound = index;
                    }
                    
                    if ( dragBall == 1) {    // smooth ball
                        dragco = ((cdsps[ifound+1]-cdsps[ifound])/(resps[ifound+1]-resps[ifound]))*(reynolds - resps[ifound]) + cdsps[ifound];
                    }
                    if ( dragBall == 2) {    // rough ball
                       dragco = ((cdspr[ifound+1]-cdspr[ifound])/(resps[ifound+1]-resps[ifound]))*(reynolds - resps[ifound]) + cdspr[ifound];
                    }
                    if ( dragBall == 3) {    // golf ball
                       dragco = ((cdspg[ifound+1]-cdspg[ifound])/(resps[ifound+1]-resps[ifound]))*(reynolds - resps[ifound]) + cdspg[ifound];
                    }

                }

                if(induced == true)
                    dragco = dragco + (cldin * cldin)/ (3.1415926 * aspr * .85) ;
                  
                    return dragco;
   }

   getDrag(){

    var drag;
    var area = this.getArea();
    var q0Earth = this.getQ0Earth();
    var q0Mars = this.getQ0Mars();
    var q0Water = this.getQ0Water();
    var q0Venus = this.getQ0Venus();
    var lconv = this.getLconv();
    var dragCoeff = this.getDragCoefficient();
    var fconv = this.getFconv();

   


    if(environmentSelect == 1){

        drag = dragCoeff * q0Earth * area / lconv / lconv ; /* drag in lbs */
        drag = drag * fconv ;
    
    }

    else if(environmentSelect == 2){

        drag = dragCoeff * q0Mars * area / lconv / lconv ; /* drag in lbs */
        drag = drag * fconv ;

    }

    else if(environmentSelect == 3){

        drag = dragCoeff * q0Water * area / lconv / lconv;
        drag = drag * fconv;
    }

    else if(environmentSelect == 4){

        drag = dragCoeff * q0Venus * area / lconv / lconv;
        drag = drag * fconv;

    }

    return drag;

    
}

getLiftOverDrag(){

    var lift = this.getLift();
    var drag = this.getDrag();
    var liftOverDrag = lift / drag;

    if(this.getVelocity() == 0 || lift == 0  || drag == 0)
        liftOverDrag = 0;

    return liftOverDrag;
}
    

}