/**
 * Global variables used for input and button selection
 *
 */
var angle;
var camber;
var thickness;
var shapeSelect;
var spin = 0.0;
var radius = 1.0;
var span = 20.0;
var clicks = 0;
var velocity = 100.0;
var altitude = 0.0;
var chord = 5.0;
var span = 20.0;
var area = 100.0;
var chrdold = 5.0;
var spnold = 20.0;
var arold = 100.0;
var aspr = 4.0;
var environmentSelect = 1;
var inputButton = 1;
var outputButton = 1;
var liftAnalisis = 1;
var ar = true;
var induced = true;
var reCorrection = true;
var dragBall = 1;
var display = 1;
var globalDensity = 0.00237;
var globalLift = 1;
var globalDrag = 1;
var globalPressure = 1;
var shapeString = "Joukowski Airfoil";
var lenghtUnit = "ft";
var forceUnit = "lbs";
var velocityUnits = " mph";
var volume = 0.0;
var volumeUnits = "cu ft";
var areaUnits = "sq ft";
var selectClicked = 1;
var pressureUnits = "psi";
var plot = 1;
//var globalReynolds = parseFloat(document.getElementById("reynoldBox").value);
var velocityMetric = velocity * 1.6;
var altitudeMetric = altitude * 0.3;
var unitsVar = 1;

/**
 * All of the GUI Components and their variables are programmed in this file
 */
function airfoilShape() {
  document.getElementById("airfoilDropdown").classList.toggle("show");
}

function unitsChange() {
  document.getElementById("unitsDropdown").classList.toggle("show");
}

function imperialUnits() {
  if (unitsVar == 2) {
    velocity = velocity / 1.6;
    altitude = altitude / 0.3;
    chord = chord / 0.3;
    span = span / 0.3;
    area = area / 0.09;
    radius = radius / 0.3;
  }
  unitsVar = 1;
}

function metricUnits() {
  if (unitsVar == 1) {
    velocity = velocity * 1.6;
    altitude = altitude * 0.3;
    chord = chord * 0.3;
    span = span * 0.3;
    area = area * 0.09;
    radius = radius * 0.3;
  }

  unitsVar = 2;
}

function isShapeClicked(click) {
  if (click == true) {
    return click;
  } else {
    return click;
  }
}

function buttonSelect() {
  if (inputButton == 1) {
    document.getElementById("shapeButton").style.backgroundColor = "yellow";
    document.getElementById("flightButton").style.backgroundColor = "";
    document.getElementById("analysisButton").style.backgroundColor = "";
    document.getElementById("selectButton").style.backgroundColor = "";
    document.getElementById("sizeButton").style.backgroundColor = "";
    // document.getElementById("plotButton").style.backgroundColor = "";
  } else if (inputButton == 2) {
    document.getElementById("shapeButton").style.backgroundColor = "";
    document.getElementById("flightButton").style.backgroundColor = "yellow";
    document.getElementById("analysisButton").style.backgroundColor = "";
    document.getElementById("selectButton").style.backgroundColor = "";
    document.getElementById("sizeButton").style.backgroundColor = "";
    // document.getElementById("plotButton").style.backgroundColor = "";
  } else if (inputButton == 3) {
    document.getElementById("shapeButton").style.backgroundColor = "";
    document.getElementById("flightButton").style.backgroundColor = "";
    document.getElementById("analysisButton").style.backgroundColor = "yellow";
    document.getElementById("selectButton").style.backgroundColor = "";
    document.getElementById("sizeButton").style.backgroundColor = "";
    // document.getElementById("plotButton").style.backgroundColor = "";
  } else if (inputButton == 4) {
    document.getElementById("shapeButton").style.backgroundColor = "";
    document.getElementById("flightButton").style.backgroundColor = "";
    document.getElementById("analysisButton").style.backgroundColor = "";
    document.getElementById("selectButton").style.backgroundColor = "";
    document.getElementById("sizeButton").style.backgroundColor = "yellow";
    //document.getElementById("plotButton").style.backgroundColor = "";
  } else if (inputButton == 5) {
    document.getElementById("shapeButton").style.backgroundColor = "";
    document.getElementById("flightButton").style.backgroundColor = "";
    document.getElementById("analysisButton").style.backgroundColor = "";
    document.getElementById("selectButton").style.backgroundColor = "yellow";
    //document.getElementById("plotButton").style.backgroundColor = "yellow";
    document.getElementById("sizeButton").style.backgroundColor = "";
  }

  if (outputButton == 1) {
    //document.getElementById("probeButton").style.backgroundColor = "";
    document.getElementById("gageButton").style.backgroundColor = "yellow";
    document.getElementById("geometryButton").style.backgroundColor = "";
    document.getElementById("dataButton").style.backgroundColor = "";
    document.getElementById("plotButton").style.backgroundColor = "";
  } else if (outputButton == 2) {
    //document.getElementById("probeButton").style.backgroundColor = "";
    document.getElementById("gageButton").style.backgroundColor = "";
    document.getElementById("geometryButton").style.backgroundColor = "yellow";
    document.getElementById("dataButton").style.backgroundColor = "";
    document.getElementById("plotButton").style.backgroundColor = "";
  } else if (outputButton == 3) {
    // document.getElementById("probeButton").style.backgroundColor = "";
    document.getElementById("gageButton").style.backgroundColor = "";
    document.getElementById("geometryButton").style.backgroundColor = "";
    document.getElementById("dataButton").style.backgroundColor = "yellow";
    document.getElementById("plotButton").style.backgroundColor = "";
  } else if (outputButton == 4) {
    // document.getElementById("probeButton").style.backgroundColor = "yellow";
    document.getElementById("gageButton").style.backgroundColor = "";
    document.getElementById("geometryButton").style.backgroundColor = "";
    document.getElementById("dataButton").style.backgroundColor = "";
    document.getElementById("plotButton").style.backgroundColor = "";
  }
}

function getUnits() {
  var unitsButton = document.getElementById("unitsButton").innerHTML;
  var units = 1;
  if (unitsButton == "english ▼") {
    units = 1;
  } else if (unitsButton == "metric ▼") {
    units = 2;
  }

  return units;
}

function isFlightClicked(click) {
  if (click == true) {
    return click;
  } else {
    return click;
  }
}

function getAngle() {
  var angle;

  if (isShapeClicked() == true && isFlightClicked() == false) {
    angleSliderValue = document.getElementById("slider1").value;
    angle = parseFloat(angleSliderValue);
  } else if (isFlightClicked() == true && isShapeClicked() == false) {
    angle = 5.0;
  }

  return angle;
}

function outputAirfoil() {
  var slider1 = parseFloat(document.getElementById("slider1").value);
  var slider2 = parseFloat(document.getElementById("slider2").value);
  var slider3 = parseFloat(document.getElementById("slider3").value);
  var airfoilLabel = document.getElementById("airfoilLabel").innerHTML;

  if (airfoilLabel == "Flight Test" && getUnits() == 1) {
    angleLabel("angleLabel", "Speed-mph", true);
    camberLabel("camberLabel", "Altitude-ft", true);
    if (environmentSelect == 3) camberLabel("camberLabel", "Depth-ft", true);
    document.getElementById("thickLabel").innerHTML = "Press lb/ln2";
  } else if (airfoilLabel == "Flight Test" && getUnits() == 2) {
    angleLabel("angleLabel", "Speed-km/h", true);
    camberLabel("camberLabel", "Altitude-m", true);
    if (environmentSelect == 3) camberLabel("camberLabel", "Depth-m", true);
    document.getElementById("thickLabel").innerHTML = "Press kPa";
  }

  if (
    shapeSelect < 4 &&
    document.getElementById("airfoilLabel").innerHTML == "Airfoil Shape:"
  ) {
    angle = slider1;
    camber = slider2;
    thickness = slider3;
    document.getElementById("angleBox").innerHTML = String(angle);
    document.getElementById("camberBox").innerHTML = String(camber);
    document.getElementById("thickBox").innerHTML = String(thickness);
  } else if (
    shapeSelect < 4 &&
    document.getElementById("airfoilLabel").innerHTML == "Flight Test"
  ) {
    velocity = slider1;
    altitude = slider2;

    document.getElementById("angleBox").innerHTML = String(velocity);
    document.getElementById("camberBox").innerHTML = String(altitude);
  } else if (
    shapeSelect >= 4 &&
    (document.getElementById("airfoilLabel").innerHTML == "Cylinder In:" ||
      document.getElementById("airfoilLabel").innerHTML == "Ball Input:")
  ) {
    spin = slider1;
    radius = slider2;
    span = slider3;

    document.getElementById("angleBox").innerHTML = String(spin);
    document.getElementById("camberBox").innerHTML = String(radius);
    document.getElementById("thickBox").innerHTML = String(span);
  } else if (
    shapeSelect >= 4 &&
    document.getElementById("airfoilLabel").innerHTML == "Flight Test"
  ) {
    velocity = slider1;
    altitude = slider2;

    document.getElementById("angleBox").innerHTML = String(velocity);
    document.getElementById("camberBox").innerHTML = String(altitude);
  } else if (
    shapeSelect < 4 &&
    document.getElementById("airfoilLabel").innerHTML == "Wing Size"
  ) {
    chord = slider1;
    span = slider2;
    area = slider3;
    var choice = 0;
    var fact = 30.0;

    if (chord >= chrdold + 0.01 || chord <= chrdold - 0.01) choice = 1;
    else if (span >= spnold + 0.1 || span <= spnold - 0.1) choice = 2;
    else if (area >= arold + 1.0 || area <= arold - 1.0) choice = 3;

    switch (choice) {
      case 1: {
        if (chord < span) {
          area = span * chord;
          aspr = (span * span) / area;
        }

        if (chord >= span) {
          span = chord;
          aspr = 1.0;
          area = span * chord;

          spnold = span;
        }

        break;
      }

      case 2: {
        if (span > chord) {
          area = span * chord;
          aspr = (span * span) / area;
        }

        if (span <= chord) {
          chord = span;
          aspr = 1.0;
          area = chord * span;
          fact = (fact * chord) / chrdold;
          chrdold = chord;
        }

        spnold = span;
        arold = area;

        break;
      }

      case 3: {
        span = Math.sqrt(area * aspr);
        chord = area / span;
        fact = (fact * chord) / chrdold;
        chrdold = chord;
        spnold = span;
        arold = area;

        break;
      }
    }

    document.getElementById("angleBox").innerHTML = String(chord.toFixed(3));
    document.getElementById("camberBox").innerHTML = String(span.toFixed(3));
    document.getElementById("thickBox").innerHTML = String(area.toFixed(3));
    document.getElementById("symmetricButton").value = String(aspr.toFixed(3));
    document.getElementById("slider3").value = String(area);
  }

  var airfoil = new Airfoil(
    angle,
    camber,
    thickness,
    velocity,
    altitude,
    chord,
    span,
    area
  );
  var ellipse = new Ellipse(
    angle,
    camber,
    thickness,
    velocity,
    altitude,
    chord,
    span,
    area
  );
  var plate = new Plate(
    angle,
    camber,
    thickness,
    velocity,
    altitude,
    chord,
    span,
    area
  );
  var cylinder = new Cylinder(
    0.0,
    0.0,
    thickness,
    velocity,
    altitude,
    5.0,
    span,
    100.0,
    radius,
    spin
  );
  var ball = new Ball(
    0.0,
    0.0,
    thickness,
    velocity,
    altitude,
    5.0,
    radius,
    100.0,
    radius,
    spin
  );
  density = airfoil.getRhoEarth();
  globalPressure = airfoil.getPressureEarth();

  if (shapeSelect == 1) {
    shapeString = "Joukowski Airfoil";
    globalLift = airfoil.getLift();
    globalDrag = airfoil.getDrag();

    var liftBox = document.getElementById("liftBox");
    liftBox.value = String(airfoil.getLift().toFixed(0));

    var cLiftBox = document.getElementById("cLiftBox");
    cLiftBox.value = String(airfoil.getLiftCoefficient().toFixed(2));

    var reynoldsBox = document.getElementById("reynoldBox");
    reynoldsBox.value = String(airfoil.getReynolds().toFixed(0));

    var dragBox = document.getElementById("dragBox");
    dragBox.value = String(airfoil.getDrag().toFixed(0));

    var cDragBox = document.getElementById("cDragBox");
    cDragBox.value = String(airfoil.getDragCoefficient().toFixed(3));

    var lVersusDrag = document.getElementById("ratioBox");
    lVersusDrag.value = String(airfoil.getLiftOverDrag().toFixed(3));

    if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 1 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (airfoil.getPressureEarth() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        airfoil.getRhoEarth().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        airfoil.getQ0Earth().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (airfoil.getTempEarth() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        airfoil.getViscosEarth().toExponential(3)
      );
      globalPressure = airfoil.getPressureEarth();
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 1 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * airfoil.getPressureEarth()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (airfoil.getRhoEarth() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * airfoil.getQ0Earth()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((airfoil.getTempEarth() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (airfoil.getViscosEarth() * 47.87).toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 2 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (airfoil.getPressureMars() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        airfoil.getRhoMars().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        airfoil.getQ0Mars().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (airfoil.getTempMars() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        airfoil.getViscosMars().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 2 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * airfoil.getPressureMars()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (airfoil.getRhoMars() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * airfoil.getQ0Mars()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((airfoil.getTempMars() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (airfoil.getViscosMars() * 47.87).toExponential(3)
      );
      lenghtUnit = " m";
      forceUnit = " N";
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 3 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (airfoil.getPressureWater() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        airfoil.getRhoWater().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        airfoil.getQ0Water().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (airfoil.getWaterTemp() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        airfoil.getViscosWater().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 3 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * airfoil.getPressureWater()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (airfoil.getRhoWater() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * airfoil.getQ0Water()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((airfoil.getWaterTemp() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (airfoil.getViscosWater() * 47.87).toExponential(3)
      );
      lenghtUnit = " m";
      forceUnit = " N";
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 4 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (airfoil.getPressureVenus() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        airfoil.getRhoVenus().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        airfoil.getQ0Venus().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (airfoil.getTempVenus() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        airfoil.getViscosVenus().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 4 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * airfoil.getPressureVenus()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (airfoil.getRhoVenus() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * airfoil.getQ0Venus()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((airfoil.getTempVenus() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (airfoil.getViscosVenus() * 47.87).toExponential(3)
      );
      lenghtUnit = " m";
      forceUnit = " N";
    }
  } else if (shapeSelect == 2) {
    shapeString = "Elliptical Airfoil";
    var liftBox = document.getElementById("liftBox");
    liftBox.value = String(ellipse.getLift().toFixed(0));

    var cLiftBox = document.getElementById("cLiftBox");
    cLiftBox.value = String(ellipse.getLiftCoefficient().toFixed(2));

    var reynoldsBox = document.getElementById("reynoldBox");
    reynoldsBox.value = String(ellipse.getReynolds().toFixed(0));

    var dragBox = document.getElementById("dragBox");
    dragBox.value = String(ellipse.getDrag().toFixed(0));

    var cDragBox = document.getElementById("cDragBox");
    cDragBox.value = String(ellipse.getDragCoefficient().toFixed(3));

    var lVersusDrag = document.getElementById("ratioBox");
    lVersusDrag.value = String(ellipse.getLiftOverDrag().toFixed(3));

    if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 1 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (ellipse.getPressureEarth() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        ellipse.getRhoEarth().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        ellipse.getQ0Earth().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (ellipse.getTempEarth() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        ellipse.getViscosEarth().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 1 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * ellipse.getPressureEarth()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (ellipse.getRhoEarth() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * ellipse.getQ0Earth()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((ellipse.getTempEarth() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (ellipse.getViscosEarth() * 47.87).toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 2 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (ellipse.getPressureMars() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        ellipse.getRhoMars().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        ellipse.getQ0Mars().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (ellipse.getTempMars() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        ellipse.getViscosMars().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 2 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * ellipse.getPressureMars()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (ellipse.getRhoMars() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * ellipse.getQ0Mars()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((ellipse.getTempMars() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (ellipse.getViscosMars() * 47.87).toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 3 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (ellipse.getPressureWater() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        ellipse.getRhoWater().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        ellipse.getQ0Water().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (ellipse.getWaterTemp() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        ellipse.getViscosWater().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 3 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * ellipse.getPressureWater()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (ellipse.getRhoWater() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * ellipse.getQ0Water()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((ellipse.getWaterTemp() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (ellipse.getViscosWater() * 47.87).toExponential(3)
      );
      lenghtUnit = " m";
      forceUnit = " N";
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 4 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (ellipse.getPressureVenus() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        ellipse.getRhoVenus().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        ellipse.getQ0Venus().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (ellipse.getTempVenus() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        ellipse.getViscosVenus().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 4 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * ellipse.getPressureVenus()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (ellipse.getRhoVenus() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * ellipse.getQ0Venus()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((ellipse.getTempVenus() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (ellipse.getViscosVenus() * 47.87).toExponential(3)
      );
      lenghtUnit = " m";
      forceUnit = " N";
    }
  } else if (shapeSelect == 3) {
    shapeString = "Plate";

    var liftBox = document.getElementById("liftBox");
    liftBox.value = String(plate.getLift().toFixed(0));

    var cLiftBox = document.getElementById("cLiftBox");
    cLiftBox.value = String(plate.getLiftCoefficient().toFixed(2));

    var reynoldsBox = document.getElementById("reynoldBox");
    reynoldsBox.value = String(plate.getReynolds().toFixed(0));

    var dragBox = document.getElementById("dragBox");
    dragBox.value = String(plate.getDrag().toFixed(0));

    var cDragBox = document.getElementById("cDragBox");
    cDragBox.value = String(plate.getDragCoefficient().toFixed(3));

    var lVersusDrag = document.getElementById("ratioBox");
    lVersusDrag.value = String(plate.getLiftOverDrag().toFixed(3));

    if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 1 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (plate.getPressureEarth() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        plate.getRhoEarth().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        plate.getQ0Earth().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (plate.getTempEarth() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        plate.getViscosEarth().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 1 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * plate.getPressureEarth()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (plate.getRhoEarth() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * plate.getQ0Earth()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((plate.getTempEarth() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (plate.getViscosEarth() * 47.87).toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 2 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (plate.getPressureMars() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        plate.getRhoMars().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        plate.getQ0Mars().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (plate.getTempMars() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        plate.getViscosMars().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 2 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * plate.getPressureMars()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (plate.getRhoMars() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * plate.getQ0Mars()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((plate.getTempMars() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (plate.getViscosMars() * 47.87).toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 3 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (plate.getPressureWater() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        plate.getRhoWater().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        plate.getQ0Water().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (plate.getWaterTemp() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        plate.getViscosWater().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 3 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * plate.getPressureWater()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (plate.getRhoWater() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * plate.getQ0Water()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((plate.getWaterTemp() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (plate.getViscosWater() * 47.87).toExponential(3)
      );
      lenghtUnit = " m";
      forceUnit = " N";
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 4 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (plate.getPressureVenus() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        plate.getRhoVenus().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        plate.getQ0Venus().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (plate.getTempVenus() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        plate.getViscosVenus().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 4 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * plate.getPressureVenus()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (plate.getRhoVenus() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * plate.getQ0Venus()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((plate.getTempVenus() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (plate.getViscosVenus() * 47.87).toExponential(3)
      );
      lenghtUnit = " m";
      forceUnit = " N";
    }
  } else if (shapeSelect == 4) {
    shapeString = "Rotating Cylinder";

    var liftBox = document.getElementById("liftBox");
    liftBox.value = String(cylinder.getLift().toFixed(0));

    var cLiftBox = document.getElementById("cLiftBox");
    cLiftBox.value = String(cylinder.getLiftCoefficient().toFixed(2));

    var reynoldsBox = document.getElementById("reynoldBox");
    reynoldsBox.value = String(cylinder.getReynoldsCylinder().toFixed(0));

    var dragBox = document.getElementById("dragBox");
    dragBox.value = String(cylinder.getDrag().toFixed(0));

    var cDragBox = document.getElementById("cDragBox");
    cDragBox.value = String(cylinder.getDragCoefficient().toFixed(3));

    var lVersusDrag = document.getElementById("ratioBox");
    lVersusDrag.value = String(cylinder.getLiftOverDrag().toFixed(3));

    if (document.getElementById("airfoilLabel").innerHTML == "Cylinder In:") {
      var slider1 = document.getElementById("slider1");
      slider1.min = String(cylinder.getSpinMn().toFixed(2));
      slider1.max = String(cylinder.getSpinMx().toFixed(2));
    }

    if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 1 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (cylinder.getPressureEarth() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        cylinder.getRhoEarth().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        cylinder.getQ0Earth().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (cylinder.getTempEarth() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        cylinder.getViscosEarth().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 1 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * cylinder.getPressureEarth()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (cylinder.getRhoEarth() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * cylinder.getQ0Earth()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((cylinder.getTempEarth() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (cylinder.getViscosEarth() * 47.87).toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 2 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (cylinder.getPressureMars() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        cylinder.getRhoMars().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        cylinder.getQ0Mars().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (cylinder.getTempMars() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        cylinder.getViscosMars().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 2 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * cylinder.getPressureMars()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (cylinder.getRhoMars() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * cylinder.getQ0Mars()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((cylinder.getTempMars() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (cylinder.getViscosMars() * 47.87).toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 3 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (cylinder.getPressureWater() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        cylinder.getRhoWater().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        cylinder.getQ0Water().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (cylinder.getWaterTemp() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        cylinder.getViscosWater().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 3 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * cylinder.getPressureWater()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (cylinder.getRhoWater() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * cylinder.getQ0Water()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((cylinder.getWaterTemp() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (cylinder.getViscosWater() * 47.87).toExponential(3)
      );
      lenghtUnit = " m";
      forceUnit = " N";
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 4 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (cylinder.getPressureVenus() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        cylinder.getRhoVenus().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        cylinder.getQ0Venus().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (cylinder.getTempVenus() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        cylinder.getViscosVenus().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 4 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * cylinder.getPressureVenus()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (cylinder.getRhoVenus() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * cylinder.getQ0Venus()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((cylinder.getTempVenus() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (cylinder.getViscosVenus() * 47.87).toExponential(3)
      );
      lenghtUnit = " m";
      forceUnit = " N";
    }
  } else if (shapeSelect == 5) {
    span = radius;
    document.getElementById("slider3").value = String(span);

    shapeString = "Spinning Ball";

    var liftBox = document.getElementById("liftBox");
    liftBox.value = String(ball.getLift().toFixed(0));

    var cLiftBox = document.getElementById("cLiftBox");
    cLiftBox.value = String(ball.getLiftCoefficient().toFixed(2));

    var reynoldsBox = document.getElementById("reynoldBox");
    reynoldsBox.value = String(ball.getReynoldsBall().toFixed(0));

    var dragBox = document.getElementById("dragBox");
    dragBox.value = String(ball.getDrag().toFixed(0));

    var cDragBox = document.getElementById("cDragBox");
    cDragBox.value = String(ball.getDragCoefficient().toFixed(3));

    var lVersusDrag = document.getElementById("ratioBox");
    lVersusDrag.value = String(ball.getLiftOverDrag().toFixed(3));

    if (document.getElementById("airfoilLabel").innerHTML == "Ball Input:") {
      var slider1 = document.getElementById("slider1");
      slider1.min = String(ball.getSpinMn().toFixed(2));
      slider1.max = String(ball.getSpinMx().toFixed(2));
    }

    if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 1 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (ball.getPressureEarth() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        ball.getRhoEarth().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        ball.getQ0Earth().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (ball.getTempEarth() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        ball.getViscosEarth().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 1 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * ball.getPressureEarth()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (ball.getRhoEarth() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * ball.getQ0Earth()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((ball.getTempEarth() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (ball.getViscosEarth() * 47.87).toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 2 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (ball.getPressureMars() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        ball.getRhoMars().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        ball.getQ0Mars().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (ball.getTempMars() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        ball.getViscosMars().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 2 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * ball.getPressureMars()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (ball.getRhoMars() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * airfoil.getQ0Mars()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((ball.getTempMars() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (ball.getViscosMars() * 47.87).toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 3 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (ball.getPressureWater() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        ball.getRhoWater().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        ball.getQ0Water().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (ball.getWaterTemp() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        ball.getViscosWater().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 3 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * ball.getPressureWater()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (ball.getRhoWater() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * ball.getQ0Water()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((ball.getWaterTemp() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (ball.getViscosWater() * 47.87).toExponential(3)
      );
      lenghtUnit = " m";
      forceUnit = " N";
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 4 &&
      getUnits() == 1
    ) {
      document.getElementById("slider3").value = String(
        (ball.getPressureVenus() / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        ball.getRhoVenus().toFixed(5)
      );
      document.getElementById("pressOut").value = String(
        ball.getQ0Venus().toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        (ball.getTempVenus() - 460).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        ball.getViscosVenus().toExponential(3)
      );
    } else if (
      airfoilLabel == "Flight Test" &&
      environmentSelect == 4 &&
      getUnits() == 2
    ) {
      document.getElementById("slider2").max = "15000.0";
      document.getElementById("slider3").value = String(
        (((101.3 / 14.7) * ball.getPressureVenus()) / 144).toFixed(3)
      );
      document.getElementById("symmetricButton").value = String(
        (ball.getRhoVenus() * 515.4).toFixed(3)
      );
      document.getElementById("pressOut").value = String(
        (((101.3 / 14.7) * airfoil.getQ0Venus()) / 144).toFixed(3)
      );
      document.getElementById("tempOut").value = String(
        ((ball.getTempVenus() * 5.0) / 9.0 - 273.1).toFixed(0)
      );
      document.getElementById("viscOut").value = String(
        (ball.getViscosVenus() * 47.87).toExponential(3)
      );
      lenghtUnit = " m";
      forceUnit = " N";
    }
  }
}

function getCamber() {
  var camberSliderValue = document.getElementById("slider2").value;
  var camber = parseFloat(camberSliderValue);

  return camber;
}

function getThickness() {
  var thicknessSliderValue = document.getElementById("slider3").value;
  var thickness = parseFloat(thicknessSliderValue);
  return thickness;
}

function airLabel(idName, stringValue, visible) {
  var airLabel = document.getElementById(idName);
  airLabel.innerHTML = stringValue;

  if (visible == true) {
    airLabel.style.visibility = "visible";
  } else airLabel.style.visibility = " hidden";
}

function buttonText1(idName, stringValue) {
  var buttonText1 = document.getElementById(idName);
  buttonText1.innerHTML = stringValue;
}

function button1(idName, stringValue, visible) {
  var button1 = document.getElementById(idName);
  button1.innerHTML = stringValue;

  if (visible == true) button1.style.visibility = "visible";
  else button1.style.visibility = "hidden";
}

function link1(idName, visible, remove1, remove2, remove3, add1) {
  var link1 = document.getElementById(idName);
  link1.removeEventListener("click", remove1);
  link1.removeEventListener("click", remove2);
  link1.removeEventListener("click", remove3);
  link1.addEventListener("click", add1);

  if (visible == true) link1.style.visibility = "visible";
  else link1.style.visibility = "hidden";
}

function link2(idName, stringValue, visible, remove1, remove2, remove3, add1) {
  var link2 = document.getElementById(idName);
  link2.removeEventListener("click", remove1);
  link2.removeEventListener("click", remove2);
  link2.removeEventListener("click", remove3);
  link2.addEventListener("click", add1);
  link2.innerHTML = stringValue;

  if (visible == true) link2.style.visibility = "visible";
  else link2.style.visibility = "hidden";
}

function link3(idName, stringValue, visible, remove1, remove2, add1) {
  var link3 = document.getElementById(idName);
  link3.removeEventListener("click", remove1);
  link3.removeEventListener("click", remove2);
  link3.addEventListener("click", add1);
  link3.innerHTML = stringValue;

  if (visible == true) link3.style.visibility = "visible";
  else link3.style.visibility = "hidden";
}

function link4(idName, stringValue, visible, remove1, remove2, add1) {
  var link4 = document.getElementById(idName);
  link4.removeEventListener("click", remove1);
  link4.removeEventListener("click", remove2);
  link4.addEventListener("click", add1);
  link4.innerHTML = stringValue;

  if (visible == true) link4.style.visibility = "visible";
  else link4.style.visibility = "hidden";
}

function link5(idName, stringValue, visible, remove1, remove2, add1) {
  var link5 = document.getElementById(idName);
  link5.removeEventListener("click", remove1);
  link5.removeEventListener("click", remove2);
  link5.addEventListener("click", add1);
  link5.innerHTML = stringValue;

  if (visible == true) link5.style.visibility = "visible";
  else link5.style.visibility = "hidden";
}

function angleLabel(idName, stringValue, visible) {
  var angleLabel = document.getElementById(idName);
  angleLabel.innerHTML = stringValue;

  if (visible == true) angleLabel.style.visibility = "visible";
  else angleLabel.style.visibility = "hidden";
}

function angleBox(idName, visible, initialValue) {
  var angleBox = document.getElementById(idName);
  angleBox.innerHTML = initialValue;
  if (visible == true) angleBox.style.visibility = "visible";
  else angleBox.style.visibility = "hidden";
}

function slider1(idName, visible, min, max, initialValue) {
  var slider1 = document.getElementById(idName);
  slider1.min = min;
  slider1.max = max;

  if (visible == true) slider1.style.visibility = "visible";
  else slider1.style.visibility = "hidden";

  slider1.value = initialValue;
}

function camberLabel(idName, stringValue, visible) {
  var camberLabel = document.getElementById(idName);
  camberLabel.innerHTML = stringValue;

  if (visible == true) camberLabel.style.visibility = "visible";
  else camberLabel.style.visibility = "hidden";
}

function camberBox(idName, stringValue, visible) {
  var camberBox = document.getElementById(idName);
  camberBox.innerHTML = stringValue;
  camberBox.style.visibility = "visible";
}

function slider2(idName, min, max, step, initialValue, visible) {
  var slider2 = document.getElementById(idName);
  slider2.min = min;
  slider2.max = max;
  slider2.step = step;
  slider2.value = initialValue;

  if (visible == true) slider2.style.visibility = "visible";
  else slider2.style.visibility = "hidden";
}

function pressLabel(idName, stringValue, visible) {
  var pressLb = document.getElementById(idName);
  pressLb.innerHTML = stringValue;

  if (visible == true) pressLb.style.visibility = "visible";
  else pressLb.style.visibility = "hidden";
}

function slider3toText(idName, type, position, width, left, value, visible) {
  var slider3 = document.getElementById(idName);
  slider3.type = type;
  slider3.style.position = position;
  slider3.style.width = width;
  slider3.style.left = left;
  slider3.value = value;

  if (visible == true) slider3.style.visibility = "visible";
  else slider3.style.visibility = "hidden";
}

function basicLabel(idName, stringValue, visible) {
  var basicLabelElem = document.getElementById(idName);
  basicLabelElem.innerHTML = stringValue;

  if (visible == true) basicLabelElem.style.visibility = "visible";
  else basicLabelElem.style.visibility = "hidden";
}

function symmetricToText(idName, type, width, value, left, visible) {
  var symmetricElem = document.getElementById(idName);
  symmetricElem.type = type;
  symmetricElem.style.width = width;
  symmetricElem.value = value;
  symmetricElem.style.left = left;

  if (visible == true) symmetricElem.style.visibility = "visible";
  else symmetricElem.style.visibility = "hidden";
}

function isButtonVisible(idName, visible) {
  var isButtonVisible = document.getElementById(idName);

  if (visible == true) isButtonVisible.style.visibility = "visible";
  else isButtonVisible.style.visibility = "hidden";
}

function dynPressLabel(element, text, position, left, bottom) {
  var basicLabelElem = document.getElementById("basicLabel");
  var dynPressLabel = document.createElement(element);
  var pressText = document.createTextNode(text);
  dynPressLabel.appendChild(pressText);
  basicLabelElem.appendChild(dynPressLabel);
  dynPressLabel.style.position = position;
  dynPressLabel.style.left = left;
  dynPressLabel.style.bottom = bottom;

  pressOut(dynPressLabel, "INPUT", "65px", "absolute", "-100px", "25.575");
}

function pressOut(dynPressLabel, element, width, position, right, value) {
  var pressOut = document.createElement(element);
  pressOut.style.width = width;
  pressOut.style.position = position;
  pressOut.style.right = right;
  pressOut.id = "pressOut";
  pressOut.value = value;
  dynPressLabel.appendChild(pressOut);

  if (getUnits() == 1)
    tempLabel(dynPressLabel, "LABEL", "Temp.F", "absolute", "30px", "10px");
  else tempLabel(dynPressLabel, "LABEL", "Temp.C", "absolute", "30px", "10px");
}

function tempLabel(dynPressLabel, element, text, position, top, right) {
  var tempLabel = document.createElement(element);
  var tempText = document.createTextNode(text);
  tempLabel.appendChild(tempText);
  dynPressLabel.appendChild(tempLabel);
  tempLabel.style.position = position;
  tempLabel.style.top = top;
  tempLabel.style.right = right;
  tempOut(tempLabel, "INPUT", "58", "65px", "absolute", "90px");
}

function tempOut(tempLabel, element, value, width, position, left) {
  var tempOut = document.createElement(element);
  tempOut.value = value;
  tempOut.style.width = width;
  tempOut.style.position = position;
  tempOut.style.left = left;
  tempOut.id = "tempOut";
  tempLabel.appendChild(tempOut);

  if (getUnits() == 1)
    viscLabel(
      tempLabel,
      "LABEL",
      "Visc slug/ft-s",
      "absolute",
      "100px",
      "25px",
      "-30px"
    );
  else
    viscLabel(
      tempLabel,
      "LABEL",
      "Visc kg/m-s",
      "absolute",
      "100px",
      "25px",
      "-30px"
    );
}

function viscLabel(tempLabel, element, text, position, width, top, left) {
  var viscLabel = document.createElement(element);
  var viscText = document.createTextNode(text);
  viscLabel.appendChild(viscText);
  tempLabel.appendChild(viscLabel);
  viscLabel.style.position = position;
  viscLabel.style.width = width;
  viscLabel.style.top = top;
  viscLabel.style.left = left;
  viscOut(viscLabel, "INPUT", "absolute", "65px", "120px", "3.61E-7");
}

function viscOut(viscLabel, element, position, width, left, value) {
  var viscOut = document.createElement(element);
  viscOut.style.position = position;
  viscOut.style.width = width;
  viscOut.style.left = left;
  viscOut.value = value;
  viscOut.id = "viscOut";
  viscLabel.appendChild(viscOut);
  humLabel(
    viscLabel,
    "LABEL",
    "Rel Humid %",
    "absolute",
    "30px",
    "100px",
    "10px"
  );
}

function humLabel(viscLabel, element, text, position, top, width, right) {
  var humLabel = document.createElement(element);
  var humText = document.createTextNode(text);
  humLabel.appendChild(humText);
  humLabel.style.position = position;
  humLabel.style.top = top;
  humLabel.style.width = width;
  humLabel.style.right = right;
  viscLabel.appendChild(humLabel);
  humOut(humLabel, "INPUT", "absolute", "65px", "130px", "0.0");
}

function humOut(humLabel, element, position, width, left, value) {
  var humOut = document.createElement(element);
  humOut.style.position = position;
  humOut.style.width = width;
  humOut.style.left = left;
  humOut.value = value;
  humLabel.appendChild(humOut);
}

function flightButton() {
  var lconv, vconv, fconv, pconv;

  if (getUnits() == 1) {
    airLabel("airfoilLabel", "Flight Test", true);
    buttonText1("buttonText1", "Earth - Average Day");
    button1("button1", "Earth - Average Day", true);
    link1("link1", true, airfoilText, airfoilClicked, stallModelText, earthVal);
    link2(
      "link2",
      "Mars - Avg Day",
      true,
      ellipseText,
      ellipseClicked,
      idealFlowText,
      marsVal
    );
    link3(
      "link3",
      "Water - Const Denst",
      true,
      plateText,
      plateClicked,
      waterDensityDisp
    );
    link4(
      "link4",
      "Venus-Surface",
      true,
      cylinderText,
      cylinderClicked,
      venusVal
    );
    link5(
      "link5",
      "Specify Density",
      false,
      ballText,
      ballClicked,
      specificDens
    );
    angleLabel("angleLabel", "Speed-mph", true);
    angleBox("angleBox", true, String(velocity));
    slider1("slider1", true, "0", "250", String(velocity));
    camberLabel("camberLabel", "Altitude-ft", true);
    slider2("slider2", "0.0", "49500.0", "100.0", String(altitude), true);
    pressLabel("thickLabel", "Press lb/ln2", true);
    slider3toText(
      "slider3",
      "text",
      "absolute",
      "60px",
      "145px",
      "14.694",
      true
    );
    basicLabel("basicLabel", "Dens slug/ft3", true);
    symmetricToText(
      "symmetricButton",
      "text",
      "60px",
      "0.00237",
      "300px",
      true
    );
    thickLabel("thickBox", "", false);
    highCamberButton("hidden");
    flatPlateButton("hidden");
    flatBottomButton("hidden");
    negCamberButton("hidden");
    ellipseButton("hidden");
    curvePlateButton("hidden");
    dynPressLabel("LABEL", "Dyn Press lb/ft2", "absolute", "10px", "180px");
    var box3 = document.getElementById("box3");
    box3.style.visibility = "hidden";
    document.getElementById("stepUpSlider1").style.visibility = "visible";
    document.getElementById("stepDownSlider1").style.visibility = "visible";
    document.getElementById("stepDownSlider2").style.visibility = "visible";
    document.getElementById("stepUpSlider2").style.visibility = "visible";
  } else if (getUnits() == 2) {
    airLabel("airfoilLabel", "Flight Test", true);
    buttonText1("buttonText1", "Earth - Average Day ▼");
    button1("button1", "Earth - Average Day", true);
    link1("link1", true, airfoilText, airfoilClicked, stallModelText, earthVal);
    link2(
      "link2",
      "Mars - Avg Day ▼",
      true,
      ellipseText,
      ellipseClicked,
      idealFlowText,
      marsVal
    );
    link3(
      "link3",
      "Water - Const Denst ▼",
      true,
      plateText,
      plateClicked,
      waterDensityDisp
    );
    link4(
      "link4",
      "Venus-Surface ▼",
      true,
      cylinderText,
      cylinderClicked,
      venusVal
    );
    link5(
      "link5",
      "Specify Density",
      false,
      ballText,
      ballClicked,
      specificDens
    );
    angleLabel("angleLabel", "Speed-km/h", true);
    angleBox("angleBox", true, String(velocity));
    slider1("slider1", true, "0", "396.0", String(velocity));
    camberLabel("camberLabel", "Altitude-m", true);
    slider2("slider2", "0.0", "15087.6", "100.0", String(altitude), true);
    pressLabel("thickLabel", "Press kPa", true);
    slider3toText(
      "slider3",
      "text",
      "absolute",
      "60px",
      "145px",
      "14.694",
      true
    );
    basicLabel("basicLabel", "Dens kg/m3", true);
    symmetricToText(
      "symmetricButton",
      "text",
      "60px",
      "0.00237",
      "300px",
      true
    );
    thickLabel("thickBox", "", false);
    highCamberButton("hidden");
    flatPlateButton("hidden");
    flatBottomButton("hidden");
    negCamberButton("hidden");
    ellipseButton("hidden");
    curvePlateButton("hidden");
    dynPressLabel("LABEL", "Dyn Press kPa", "absolute", "10px", "180px");
    var box3 = document.getElementById("box3");
    box3.style.visibility = "hidden";
    document.getElementById("stepUpSlider1").style.visibility = "visible";
    document.getElementById("stepDownSlider1").style.visibility = "visible";
    document.getElementById("stepDownSlider2").style.visibility = "visible";
    document.getElementById("stepUpSlider2").style.visibility = "visible";
  }

  if (selectClicked > 1) {
    document.getElementById("selectLabel").style.visibility = "hidden";
    document.getElementById("surfaceLabel").style.visibility = "hidden";
    document.getElementById("pressureButton").style.visibility = "hidden";
    document.getElementById("velocityButton").style.visibility = "hidden";
    document.getElementById("dragButton").style.visibility = "hidden";
    document.getElementById("dropdown1").style.visibility = "hidden";
    document.getElementById("angleButton").style.visibility = "hidden";
    document.getElementById("camberButton").style.visibility = "hidden";
    document.getElementById("thicknessButton").style.visibility = "hidden";
    document.getElementById("dropdown2").style.visibility = "hidden";
    document.getElementById("speedButton").style.visibility = "hidden";
    document.getElementById("altitudeButton").style.visibility = "hidden";
    document.getElementById("wingButton").style.visibility = "hidden";
    document.getElementById("densityButton").style.visibility = "hidden";
  }

  inputButton = 2;
  buttonSelect();

  if (environmentSelect == 1)
    document.getElementById("button1").innerHTML = "Earth - Average Day ▼";
  else if (environmentSelect == 2)
    document.getElementById("button1").innerHTML = "Mars - Average Day ▼";
  else if (environmentSelect == 3) {
    document.getElementById("button1").innerHTML = "Water - Const Denst ▼";
    camberLabel("camberLabel", "Depth-ft", true);
  } else if (environmentSelect == 4)
    document.getElementById("button1").innerHTML = "Venus-Surface";
}

function slider(idName, min, max, value, step, visible) {
  var slider = document.getElementById(idName);
  slider.min = min;
  slider.max = max;
  slider.value = value;
  slider.step = step;
  slider.style.visibility = visible;
}

function earthVal() {
  document.getElementById("button1").innerHTML = "Earth - Avg Day ▼";
  var earthLink = document.getElementById("link1");
  earthLink.setAttribute("href", "#earthAvg");

  environmentSelect = 1;
}

function marsVal() {
  document.getElementById("button1").innerHTML = "Mars - Avg Day ▼";
  var marsLink = document.getElementById("link2");
  marsLink.setAttribute("href", "#marsAvg");

  environmentSelect = 2;
}

function waterDensityDisp() {
  document.getElementById("button1").innerHTML = "Water-Const Density ▼";
  var waterLink = document.getElementById("link3");
  waterLink.setAttribute("href", "#waterDens");
  slider1("slider1", true, "0", "49.5", "5.0");
  slider2("slider2", "0.0", "4950.0", "10.0", "0.0", true);
  camberLabel("camberLabel", "Depth-ft", true);

  environmentSelect = 3;
}

function venusVal() {
  document.getElementById("button1").innerHTML = "Venus-Surface ▼";
  var venusSurfaceLink = document.getElementById("link4");
  venusSurfaceLink.setAttribute("href", "#Venus-Surface");

  environmentSelect = 4;
}

function specifyAir() {
  document.getElementById("button1").innerHTML = "Specify Air T & P";
  var specifyAirLink = document.getElementById("link4");
  specifyAirLink.setAttribute("href", "#specifyAir");
}

function specificDens() {
  document.getElementById("button1").innerHTML = "Specific Density";
  var specifyDensLink = document.getElementById("link5");
  specifyDensLink.setAttribute("href", "#specifyDens");
}

function getShapeSelect() {
  var shapeButton = document.getElementById("button1");
  var shape = 1;

  if (shapeButton.innerHTML == "airfoil") shape = 1;
  else if (shapeButton.innerHTML == "ellipse") shape = 2;
  else if (shapeButton.innerHTML == "plate") shape = 3;
  else if (shapeButton.innerHTML == "cylinder") shape = 4;
  else if (shapeButton.innerHTML == "ball") shape = 5;
  else shape = 1;

  return shape;
}

function getEnvironment() {
  var environmentButton = document.getElementById("button1");
  var environment = 1;
  if (
    environmentButton.innerHTML == "Earth - Avg Day" ||
    environmentButton.innerHTML == "Earth - Average Day"
  )
    environment = 1;
  else if (environmentButton.innerHTML == "Mars - Avg Day") environment = 2;
  else if (environmentButton.innerHTML == "Water-Const Density")
    environment = 3;
  else if (environmentButton.innerHTML == "Venus-Surface") environment = 4;
  else if (environmentButton.innerHTML == "Specific Density") environment = 5;
  else environment = 1;

  return environment;
}

function shapeButton() {
  if (clicks == 0) shapeSelect = 1;

  if (shapeSelect < 4) airLabel("airfoilLabel", "Airfoil Shape:", true);
  else if (shapeSelect == 4) airLabel("airfoilLabel", "Cylinder In:", true);
  else if (shapeSelect == 5) airLabel("airfoilLabel", "Ball Input:", true);

  buttonText1("buttonText1", "airfoil");
  button1("button1", "airfoil", true);
  isShapeClicked(true);
  isFlightClicked(false);
  link1Shape("link1", earthVal, stallModelText, airfoilText, airfoilClicked);
  link2Shape("link2", marsVal, idealFlowText, ellipseText, ellipseClicked);
  link3Shape("link3", waterDensityDisp, plateText, plateClicked, "visible");
  link4Shape("link4", specifyAir, cylinderText, cylinderClicked, "visible");
  link5Shape("link5", specificDens, ballText, ballClicked, "visible");
  linkText("link2", "ellipse");
  linkText("link3", "plate");
  linkText("link4", "cylinder");
  linkText("link5", "ball");
  angleLabel("angleLabel", "Angle-deg", true);
  angleBox("angleBox", true, String(angle));
  document.getElementById("stepUpSlider1").style.visibility = "visible";
  document.getElementById("stepDownSlider1").style.visibility = "visible";
  document.getElementById("stepDownSlider2").style.visibility = "visible";
  document.getElementById("stepUpSlider2").style.visibility = "visible";
  slider1Shape("slider1", "-20", String(angle), "20", "0.1", "visible");
  camberLabel("camberLabel", "Camber-%c", true);
  camberBox("camberBox", String(camber), "visible");
  slider2Shape("slider2", "-20.0", "20.0", "0.1", String(camber), "visible");
  thickLabel("thickLabel", "Thick-%crd", "visible");
  slider3Shape(
    "slider3",
    "range",
    "1.0",
    "20.0",
    "0.1",
    "absolute",
    String(thickness),
    "visible"
  );
  var thickBox = document.getElementById("thickBox");
  thickBox.value = String(thickness);
  thickBox.style.visibility = "visible";
  basicLabelElem("basicLabel", "Basic Shapes:");
  symmetricButton("symmetricButton", "button", "Symmetric", "100px", "visible");
  highCamberButton("visible");
  flatPlateButton("visible");
  flatBottomButton("visible");
  negCamberButton("visible");
  ellipseButton("visible");
  curvePlateButton("visible");
  var basicLabel = document.getElementById("basicLabel");
  basicLabel.style.visibility = "visible";

  if (shapeSelect == 4) {
    cylinderClicked();
  } else if (shapeSelect == 5) {
    ballClicked();
  }

  var box3 = document.getElementById("box3");
  box3.style.visibility = "hidden";

  if (selectClicked > 1) {
    document.getElementById("selectLabel").style.visibility = "hidden";
    document.getElementById("surfaceLabel").style.visibility = "hidden";
    document.getElementById("pressureButton").style.visibility = "hidden";
    document.getElementById("velocityButton").style.visibility = "hidden";
    document.getElementById("dragButton").style.visibility = "hidden";
    document.getElementById("dropdown1").style.visibility = "hidden";
    document.getElementById("angleButton").style.visibility = "hidden";
    document.getElementById("camberButton").style.visibility = "hidden";
    document.getElementById("thicknessButton").style.visibility = "hidden";
    document.getElementById("dropdown2").style.visibility = "hidden";
    document.getElementById("speedButton").style.visibility = "hidden";
    document.getElementById("altitudeButton").style.visibility = "hidden";
    document.getElementById("wingButton").style.visibility = "hidden";
    document.getElementById("densityButton").style.visibility = "hidden";
  }

  if (shapeSelect == 1)
    document.getElementById("button1").innerHTML = "airfoil ▼";
  else if (shapeSelect == 2)
    document.getElementById("button1").innerHTML = "ellipse ▼";
  else if (shapeSelect == 3)
    document.getElementById("button1").innerHTML = "plate ▼";
  else if (shapeSelect == 4)
    document.getElementById("button1").innerHTML = "cylinder ▼";
  else if (shapeSelect == 5)
    document.getElementById("button1").innerHTML = "Ball ▼";

  inputButton = 1;
  buttonSelect();

  clicks++;
}

function stepUpSlider1() {
  document.getElementById("slider1").stepUp(1);
}

function stepDownSlider1() {
  document.getElementById("slider1").stepDown(1);
}

function stepDownSlider2() {
  if (inputButton == 2) document.getElementById("slider2").stepDown(10);
  else document.getElementById("slider2").stepDown(1);
}

function stepUpSlider2() {
  if (inputButton == 2) document.getElementById("slider2").stepUp(10);
  else document.getElementById("slider2").stepUp(1);
}

function symmetricButton(idname, type, value, width, visible) {
  var symmetricButton = document.getElementById(idname);
  symmetricButton.type = type;
  symmetricButton.value = value;
  symmetricButton.style.width = width;
  symmetricButton.style.visibility = visible;
  symmetricButton.addEventListener("click", symmetricClicked);
}

function symmetricClicked() {
  var angleBox = document.getElementById("angleBox");
  angleBox.innerHTML = "0.0";

  var slider1 = document.getElementById("slider1");
  slider1.value = "0.0";

  var camberBox = document.getElementById("camberBox");
  camberBox.innerHTML = "0.0";

  var slider2 = document.getElementById("slider2");
  slider2.value = "0.0";

  var shapeButton = document.getElementById("button1");
  shapeButton.innerHTML = "airfoil";

  var thickBox = document.getElementById("thickBox");
  thickBox.innerHTML = "12.5";

  var slider3 = document.getElementById("slider3");
  slider3.value = "12.5";

  shapeSelect = 1;
}

function highCamberButton(visible) {
  var highCamberButton = document.getElementById("highCamberButton");
  highCamberButton.style.visibility = visible;

  highCamberButton.addEventListener("click", highCamberClicked);
}

function highCamberClicked() {
  var angleBox = document.getElementById("angleBox");
  angleBox.innerHTML = "9.0";

  var slider1 = document.getElementById("slider1");
  slider1.value = "9.0";

  var camberBox = document.getElementById("camberBox");
  camberBox.innerHTML = "15.0";

  var slider2 = document.getElementById("slider2");
  slider2.value = "15.0";

  var shapeButton = document.getElementById("button1");
  shapeButton.innerHTML = "airfoil";

  var thickBox = document.getElementById("thickBox");
  thickBox.innerHTML = "12.5";

  var slider3 = document.getElementById("slider3");
  slider3.value = "12.5";

  shapeSelect = 1;
}

function flatPlateButton(visible) {
  var flatPlateButton = document.getElementById("flatPlateButton");
  flatPlateButton.style.visibility = visible;

  flatPlateButton.addEventListener("click", flatPlateClicked);
}

function flatPlateClicked() {
  var thickBox = document.getElementById("thickBox");
  thickBox.innerHTML = "1.0";

  var slider3 = document.getElementById("slider3");
  slider3.value = "1.0";

  var shapeButton = document.getElementById("button1");
  shapeButton.innerHTML = "plate";

  shapeSelect = 3;
}

function flatBottomButton(visible) {
  var flatBottomButton = document.getElementById("flatBottomButton");
  flatBottomButton.style.visibility = visible;

  flatBottomButton.addEventListener("click", flatBottomClicked);
}

function flatBottomClicked() {
  var angleBox = document.getElementById("angleBox");
  angleBox.innerHTML = "7.0";

  var slider1 = document.getElementById("slider1");
  slider1.value = "7.0";

  var camberBox = document.getElementById("camberBox");
  camberBox.innerHTML = "5.0";

  var slider2 = document.getElementById("slider2");
  slider2.value = "5.0";

  var shapeButton = document.getElementById("button1");
  shapeButton.innerHTML = "airfoil";

  var thickBox = document.getElementById("thickBox");
  thickBox.innerHTML = "12.5";

  var slider3 = document.getElementById("slider3");
  slider3.value = "12.5";

  shapeSelect = 1;
}

function negCamberButton(visible) {
  var negCamberButton = document.getElementById("negCamberButton");
  negCamberButton.style.visibility = visible;

  negCamberButton.addEventListener("click", negCamberClicked);
}

function negCamberClicked() {
  var angleBox = document.getElementById("angleBox");
  angleBox.innerHTML = "-7.0";

  var slider1 = document.getElementById("slider1");
  slider1.value = "-7.0";

  var camberBox = document.getElementById("camberBox");
  camberBox.innerHTML = "-5.0";

  var slider2 = document.getElementById("slider2");
  slider2.value = "-5.0";

  var shapeButton = document.getElementById("button1");
  shapeButton.innerHTML = "airfoil";

  var thickBox = document.getElementById("thickBox");
  thickBox.innerHTML = "12.5";

  var slider3 = document.getElementById("slider3");
  slider3.value = "12.5";

  shapeSelect = 1;
}

function ellipseButton(visible) {
  var ellipseButton = document.getElementById("ellipseButton");
  ellipseButton.style.visibility = visible;

  ellipseButton.addEventListener("click", ellipseClicked1);
}

function ellipseClicked1() {
  var angleBox = document.getElementById("angleBox");
  angleBox.innerHTML = "0.0";

  var slider1 = document.getElementById("slider1");
  slider1.value = "0.0";

  var camberBox = document.getElementById("camberBox");
  camberBox.innerHTML = "0.0";

  var slider2 = document.getElementById("slider2");
  slider2.value = "0.0";

  var thickBox = document.getElementById("thickBox");
  thickBox.innerHTML = "12.5";

  var slider3 = document.getElementById("slider3");
  slider3.value = "12.5";

  var shapeButton = document.getElementById("button1");
  shapeButton.innerHTML = "ellipse";

  shapeSelect = 2;
}

function curvePlateButton(visible) {
  var curvePlateButton = document.getElementById("curvePlateButton");
  curvePlateButton.style.visibility = visible;

  curvePlateButton.addEventListener("click", curvePlateClicked);
}

function curvePlateClicked() {
  var angleBox = document.getElementById("angleBox");
  angleBox.innerHTML = "5.0";

  var slider1 = document.getElementById("slider1");
  slider1.value = "5.0";

  var camberBox = document.getElementById("camberBox");
  camberBox.innerHTML = "5.0";

  var slider2 = document.getElementById("slider2");
  slider2.value = "5.0";

  var thickBox = document.getElementById("thickBox");
  thickBox.innerHTML = "1.0";

  var slider3 = document.getElementById("slider3");
  slider3.value = "1.0";

  var shapeButton = document.getElementById("button1");
  shapeButton.innerHTML = "plate";

  shapeSelect = 3;
}

function link1Shape(idname, remove1, remove2, add1, add2) {
  var link1 = document.getElementById(idname);
  link1.removeEventListener("click", remove1);
  link1.removeEventListener("click", remove2);
  link1.addEventListener("click", add1);
  link1.addEventListener("click", add2);
  link1.style.visibility = "visible";
  link1.style.background = "white";
}

function link2Shape(idname, remove1, remove2, add1, add2) {
  var link2 = document.getElementById(idname);
  link2.removeEventListener("click", remove1);
  link2.removeEventListener("click", remove2);
  link2.addEventListener("click", add1);
  link2.addEventListener("click", add2);
  link2.style.visibility = "visible";
  link2.style.background = "white";
}

function link3Shape(idname, remove1, remove2, add, visible) {
  var link3 = document.getElementById(idname);
  link3.removeEventListener("click", remove1);
  link3.addEventListener("click", remove2);
  link3.addEventListener("click", add);
  link3.style.visibility = visible;
  link3.style.background = "white";
}

function link4Shape(idname, remove1, remove2, add, visible) {
  var link4 = document.getElementById(idname);
  link4.removeEventListener("click", remove1);
  link4.addEventListener("click", remove2);
  link4.addEventListener("click", add);
  link4.style.visibility = visible;
  link4.style.background = "white";
}

function link5Shape(idname, remove1, remove2, add, visible) {
  var link5 = document.getElementById(idname);
  link5.removeEventListener("click", remove1);
  link5.addEventListener("click", remove2);
  link5.addEventListener("click", add);
  link5.style.visibility = visible;
  link5.style.background = "white";
}

function linkText(idname, text) {
  var link2Text = document.getElementById(idname);
  link2Text.innerHTML = text;
}

function slider1Shape(idname, min, value, max, step, visible) {
  var slider1 = document.getElementById(idname);
  slider1.min = min;
  slider1.max = max;
  slider1.step = step;
  slider1.value = value;
  slider1.style.visibility = visible;
}

function slider2Shape(idname, min, max, step, value, visible) {
  var slider2 = document.getElementById(idname);
  slider2.min = min;
  slider2.max = max;
  slider2.step = step;
  slider2.value = value;
  slider2.style.visibility = visible;
}

function slider3Shape(idname, type, min, max, step, position, value, visible) {
  var slider3 = document.getElementById(idname);
  slider3.type = type;
  slider3.min = min;
  slider3.max = max;
  slider3.step = step;
  slider3.style.position = position;
  slider3.value = value;
  slider3.style.left = "200px";
  slider3.style.visibility = visible;
}

function basicLabelElem(idname, text) {
  var basicLabelElem = document.getElementById(idname);
  basicLabelElem.innerHTML = text;
}

function thickLabel(idname, text, visible) {
  var thickLabel = document.getElementById(idname);
  thickLabel.innerHTML = text;
  thickLabel.style.visibility = visible;
}

function airfoilText() {
  document.getElementById("button1").innerHTML = "airfoil ▼";
  var earthLink = document.getElementById("link1");
  earthLink.setAttribute("href", "#airfoil");
}

function ellipseText() {
  document.getElementById("button1").innerHTML = "ellipse ▼";
  var marsLink = document.getElementById("link2");
  marsLink.setAttribute("href", "#ellipse");
}

function plateText() {
  document.getElementById("button1").innerHTML = "plate ▼";
  var waterLink = document.getElementById("link3");
  waterLink.setAttribute("href", "#plate");
}

function cylinderText() {
  document.getElementById("button1").innerHTML = "cylinder ▼";
  var specifyAirLink = document.getElementById("link4");
  specifyAirLink.setAttribute("href", "#cylinder");
}

function ballText() {
  document.getElementById("button1").innerHTML = "ball ▼";
  var specifyDensLink = document.getElementById("link5");
  specifyDensLink.setAttribute("href", "#ball");
}

function airfoilClicked() {
  var airLabel = document.getElementById("airfoilLabel");
  airLabel.innerHTML = "Airfoil Shape:";

  shapeSelect = 1;

  var angleLabel = document.getElementById("angleLabel");
  angleLabel.innerHTML = "Angle-deg";

  var angleBox = document.getElementById("angleBox");
  angleBox.innerHTML = "5.0";

  var slider1 = document.getElementById("slider1");
  slider1.min = "-20";
  slider1.value = "5.0";
  slider1.max = "20";
  slider1.step = "0.1";

  var camberLabel = document.getElementById("camberLabel");
  camberLabel.innerHTML = "Camber-%c";

  var camberBox = document.getElementById("camberBox");
  camberBox.innerHTML = "0.0";

  var slider2 = document.getElementById("slider2");
  slider2.min = "-20.0";
  slider2.max = "20.0";
  slider2.value = "0.0";
  slider2.step = "0.1";

  var thickLabel = document.getElementById("thickLabel");
  thickLabel.innerHTML = "Thick-%crd";

  var thickBox = document.getElementById("thickBox");
  thickBox.innerHTML = "12.5";

  var slider3 = document.getElementById("slider3");
  slider3.type = "range";
  slider3.min = "1.0";
  slider3.max = "20.0";
  slider3.step = "0.1";
  slider3.value = "12.5";
  slider3.style.position = "absolute";
  slider3.style.left = "200px";

  var basicLabelElem = document.getElementById("basicLabel");
  basicLabelElem.innerHTML = "Basic Shapes:";
  basicLabelElem.style.visibility = "visible";

  var symmetricButton = document.getElementById("symmetricButton");
  symmetricButton.type = "button";
  symmetricButton.value = "Symmetric";
  symmetricButton.style.width = "100px";
  symmetricButton.style.visibility = "visible";

  var camberButton = document.getElementById("highCamberButton");
  camberButton.style.visibility = "visible";

  var flatButton = document.getElementById("flatPlateButton");
  flatButton.style.visibility = "visible";

  var flatBottom = document.getElementById("flatBottomButton");
  flatBottom.style.visibility = "visible";

  var camberElem = document.getElementById("negCamberButton");
  camberElem.style.visibility = "visible";

  var ellipseElem = document.getElementById("ellipseButton");
  ellipseElem.style.visibility = "visible";

  var curveElem = document.getElementById("curvePlateButton");
  curveElem.style.visibility = "visible";
}

function ellipseClicked() {
  var airLabel = document.getElementById("airfoilLabel");
  airLabel.innerHTML = "Airfoil Shape:";

  shapeSelect = 2;

  var angleLabel = document.getElementById("angleLabel");
  angleLabel.innerHTML = "Angle-deg";

  var angleBox = document.getElementById("angleBox");
  angleBox.innerHTML = "5.0";

  var slider1 = document.getElementById("slider1");
  slider1.min = "-20";
  slider1.value = "5.0";
  slider1.max = "20";
  slider1.step = "0.1";

  var camberLabel = document.getElementById("camberLabel");
  camberLabel.innerHTML = "Camber-%c";

  var camberBox = document.getElementById("camberBox");
  camberBox.innerHTML = "0.0";

  var slider2 = document.getElementById("slider2");
  slider2.min = "-20.0";
  slider2.max = "20.0";
  slider2.step = "0.1";
  slider2.value = "0.0";

  var thickLabel = document.getElementById("thickLabel");
  thickLabel.innerHTML = "Thick-%crd";

  var thickBox = document.getElementById("thickBox");
  thickBox.innerHTML = "12.5";

  var slider3 = document.getElementById("slider3");
  slider3.type = "range";
  slider3.min = "1.0";
  slider3.max = "20.0";
  slider3.step = "0.1";
  slider3.value = "12.5";
  slider3.style.position = "absolute";
  slider3.style.left = "200px";

  var basicLabelElem = document.getElementById("basicLabel");
  basicLabelElem.innerHTML = "Basic Shapes:";
  basicLabelElem.style.visibility = "visible";

  var symmetricButton = document.getElementById("symmetricButton");
  symmetricButton.type = "button";
  symmetricButton.value = "Symmetric";
  symmetricButton.style.width = "100px";
  symmetricButton.style.visibility = "visible";

  var camberButton = document.getElementById("highCamberButton");
  camberButton.style.visibility = "visible";

  var flatButton = document.getElementById("flatPlateButton");
  flatButton.style.visibility = "visible";

  var flatBottom = document.getElementById("flatBottomButton");
  flatBottom.style.visibility = "visible";

  var camberElem = document.getElementById("negCamberButton");
  camberElem.style.visibility = "visible";

  var ellipseElem = document.getElementById("ellipseButton");
  ellipseElem.style.visibility = "visible";

  var curveElem = document.getElementById("curvePlateButton");
  curveElem.style.visibility = "visible";
}

function plateClicked() {
  var airLabel = document.getElementById("airfoilLabel");
  airLabel.innerHTML = "Airfoil Shape:";

  shapeSelect = 3;

  var angleLabel = document.getElementById("angleLabel");
  angleLabel.innerHTML = "Angle-deg";

  var angleBox = document.getElementById("angleBox");
  angleBox.innerHTML = "5.0";

  var slider1 = document.getElementById("slider1");
  slider1.min = "-20";
  slider1.value = "5.0";
  slider1.max = "20";
  slider1.step = "0.1";

  var camberLabel = document.getElementById("camberLabel");
  camberLabel.innerHTML = "Camber-%c";

  var camberBox = document.getElementById("camberBox");
  camberBox.innerHTML = "0.0";

  var slider2 = document.getElementById("slider2");
  slider2.min = "-20.0";
  slider2.max = "20.0";
  slider2.step = "0.1";
  slider2.value = "0.0";

  var thickLabel = document.getElementById("thickLabel");
  thickLabel.innerHTML = "Thick-%crd";

  var thickBox = document.getElementById("thickBox");
  thickBox.innerHTML = "1.0";

  var slider3 = document.getElementById("slider3");
  slider3.type = "range";
  slider3.min = "1.0";
  slider3.max = "20.0";
  slider3.value = "1.0";
  slider3.step = "0.1";
  slider3.value = "12.5";
  slider3.style.position = "absolute";
  slider3.style.left = "200px";

  var basicLabelElem = document.getElementById("basicLabel");
  basicLabelElem.innerHTML = "Basic Shapes:";
  basicLabelElem.style.visibility = "visible";

  var symmetricButton = document.getElementById("symmetricButton");
  symmetricButton.type = "button";
  symmetricButton.value = "Symmetric";
  symmetricButton.style.width = "100px";
  symmetricButton.style.visibility = "visible";

  var camberButton = document.getElementById("highCamberButton");
  camberButton.style.visibility = "visible";

  var flatButton = document.getElementById("flatPlateButton");
  flatButton.style.visibility = "visible";

  var flatBottom = document.getElementById("flatBottomButton");
  flatBottom.style.visibility = "visible";

  var camberElem = document.getElementById("negCamberButton");
  camberElem.style.visibility = "visible";

  var ellipseElem = document.getElementById("ellipseButton");
  ellipseElem.style.visibility = "visible";

  var curveElem = document.getElementById("curvePlateButton");
  curveElem.style.visibility = "visible";
}

function cylinderClicked() {
  shapeSelect = 4;
  var lenghtString = "ft";

  if (getUnits() == 1) lenghtString = "ft";
  else if (getUnits() == 2) lenghtString = "m";

  document.getElementById("box3").style.visibility = "hidden";

  var airLabel = document.getElementById("airfoilLabel");
  airLabel.innerHTML = "Cylinder In:";
  airLabel.style.visibility = "visible";

  var angleLabel = document.getElementById("angleLabel");
  angleLabel.innerHTML = "Spin rpm";
  angleLabel.style.visibility = "visible";

  var angleBox = document.getElementById("angleBox");
  angleBox.innerHTML = "0.0";
  angleBox.style.visibility = "visible";

  var slider1 = document.getElementById("slider1");
  slider1.style.visibility = "visible";
  slider1.min = "-1500.0";
  slider1.max = "1500.0";
  slider1.step = "0.1";
  slider1.value = String(spin);

  var camberLabel = document.getElementById("camberLabel");
  camberLabel.innerHTML = "Radius " + lenghtString;
  camberLabel.style.visibility = "visible";

  var radBox = document.getElementById("camberBox");
  radBox.innerHTML = "1.0";
  radBox.style.visibility = "visible";

  var slider2 = document.getElementById("slider2");
  slider2.style.visibility = "visible";
  slider2.min = "0.3";
  slider2.max = "5";
  slider2.step = "0.1";
  slider2.value = String(radius);

  var thickLabel = document.getElementById("thickLabel");
  thickLabel.innerHTML = "Span " + lenghtString;
  thickLabel.style.visibility = "visible";

  var spanBox = document.getElementById("thickBox");
  spanBox.innerHTML = "20.0";
  spanBox.style.visibility = "visible";

  var slider3 = document.getElementById("slider3");
  slider3.style.visibility = "visible";
  slider3.type = "range";
  slider3.min = "0.1";
  slider3.max = "123.8";
  slider3.step = "0.1";
  slider3.value = String(span);
  slider3.style.position = "absolute";
  slider3.style.left = "200px";

  var basicLabelElem = document.getElementById("basicLabel");
  basicLabelElem.innerHTML = "Basic Shapes:";
  basicLabelElem.style.visibility = "hidden";

  var symmetricButton = document.getElementById("symmetricButton");
  symmetricButton.type = "button";
  symmetricButton.value = "Symmetric";
  symmetricButton.style.width = "100px";
  symmetricButton.style.visibility = "hidden";

  var camberButton = document.getElementById("highCamberButton");
  camberButton.style.visibility = "hidden";

  var flatButton = document.getElementById("flatPlateButton");
  flatButton.style.visibility = "hidden";

  var flatBottom = document.getElementById("flatBottomButton");
  flatBottom.style.visibility = "hidden";

  var camberElem = document.getElementById("negCamberButton");
  camberElem.style.visibility = "hidden";

  var ellipseElem = document.getElementById("ellipseButton");
  ellipseElem.style.visibility = "hidden";

  var curveElem = document.getElementById("curvePlateButton");
  curveElem.style.visibility = "hidden";
}

function ballClicked() {
  span = radius;
  shapeSelect = 5;
  document.getElementById("box3").style.visibility = "hidden";

  var lenghtString = "ft";

  if (getUnits() == 1) lenghtString = "ft";
  else if (getUnits() == 2) lenghtString = "m";

  var airLabel = document.getElementById("airfoilLabel");
  airLabel.innerHTML = "Ball Input:";
  airLabel.style.visibility = "visible";

  document.getElementById("button1").style.visibility = "visible";

  var angleLabel = document.getElementById("angleLabel");
  angleLabel.innerHTML = "Spin rpm";
  angleLabel.style.visibility = "visible";

  var angleBox = document.getElementById("angleBox");
  angleBox.innerHTML = "0.0";
  angleBox.style.visibility = "visible";

  var slider1 = document.getElementById("slider1");
  slider1.min = "-405.0";
  slider1.max = "397.0";
  slider1.step = "0.1";
  slider1.value = String(spin);
  slider1.style.visibility = "visible";

  var camberLabel = document.getElementById("camberLabel");
  camberLabel.innerHTML = "Radius " + lenghtString;
  camberLabel.style.visibility = "visible";

  var slider2 = document.getElementById("slider2");
  slider2.min = "0.3";
  slider2.max = "5.0";
  slider2.step = "0.1";
  slider2.value = String(radius);
  slider2.style.visibility = "visible";

  var thickLabel = document.getElementById("thickLabel");
  thickLabel.innerHTML = "Span " + lenghtString;
  thickLabel.style.visibility = "visible";

  var slider3 = document.getElementById("slider3");
  slider3.type = "range";
  slider3.min = "0.1";
  slider3.max = "123.85";
  slider3.step = "0.1";
  slider3.value = String(span);
  slider3.style.position = "absolute";
  slider3.style.left = "200px";
  slider3.style.visibility = "visible";

  var basicLabelElem = document.getElementById("basicLabel");
  basicLabelElem.innerHTML = "Basic Shapes:";
  basicLabelElem.style.visibility = "hidden";

  var symmetricButton = document.getElementById("symmetricButton");
  symmetricButton.type = "button";
  symmetricButton.value = "Symmetric";
  symmetricButton.style.width = "100px";
  symmetricButton.style.visibility = "hidden";

  var camberButton = document.getElementById("highCamberButton");
  camberButton.style.visibility = "hidden";

  var flatButton = document.getElementById("flatPlateButton");
  flatButton.style.visibility = "hidden";

  var flatBottom = document.getElementById("flatBottomButton");
  flatBottom.style.visibility = "hidden";

  var camberElem = document.getElementById("negCamberButton");
  camberElem.style.visibility = "hidden";

  var ellipseElem = document.getElementById("ellipseButton");
  ellipseElem.style.visibility = "hidden";

  var curveElem = document.getElementById("curvePlateButton");
  curveElem.style.visibility = "hidden";
}

function sizeButton() {
  inputButton = 4;
  buttonSelect();

  document.getElementById("stepUpSlider1").style.visibility = "visible";
  document.getElementById("stepDownSlider1").style.visibility = "visible";
  document.getElementById("stepDownSlider2").style.visibility = "visible";
  document.getElementById("stepUpSlider2").style.visibility = "visible";

  if (selectClicked > 1) {
    document.getElementById("selectLabel").style.visibility = "hidden";
    document.getElementById("surfaceLabel").style.visibility = "hidden";
    document.getElementById("pressureButton").style.visibility = "hidden";
    document.getElementById("velocityButton").style.visibility = "hidden";
    document.getElementById("dragButton").style.visibility = "hidden";
    document.getElementById("dropdown1").style.visibility = "hidden";
    document.getElementById("angleButton").style.visibility = "hidden";
    document.getElementById("camberButton").style.visibility = "hidden";
    document.getElementById("thicknessButton").style.visibility = "hidden";
    document.getElementById("dropdown2").style.visibility = "hidden";
    document.getElementById("speedButton").style.visibility = "hidden";
    document.getElementById("altitudeButton").style.visibility = "hidden";
    document.getElementById("wingButton").style.visibility = "hidden";
    document.getElementById("densityButton").style.visibility = "hidden";
  }

  if (shapeSelect < 4 && getUnits() == 1) {
    var box3 = document.getElementById("box3");
    box3.style.visibility = "hidden";
    airLabel("airfoilLabel", "Wing Size", true);
    button1("button1", "", false);
    angleLabel("angleLabel", "Chord-ft", true);
    angleBox("angleBox", true, String(chord));
    slider("slider1", "0.1", "19.9", String(chord), "0.1", "visible");
    camberLabel("camberLabel", "Span-ft", true);
    camberBox("camberBox", String(span), true);
    slider("slider2", "5.0", "123.85", String(span), "0.1", "visible");
    thickLabel("thickLabel", "Area-sq ft", true);
    thickLabel("thickBox", String(area), true);
    document.getElementById("thickLabel").style.visibility = "visible";
    document.getElementById("thickBox").style.visibility = "visible";

    var slider3 = document.getElementById("slider3");
    slider3.type = "range";
    slider3.min = "0.01";
    slider3.max = "2475.01";
    slider3.step = "0.01";
    slider3.value = String(area);
    slider3.style.position = "absolute";
    slider3.style.left = "200px";
    slider3.style.visibility = "visible";

    basicLabel("basicLabel", "Aspect-Rat", true);

    var aspectBox = document.getElementById("symmetricButton");
    aspectBox.type = "text";
    aspectBox.value = "4.0";
    aspectBox.style.visibility = "visible";

    highCamberButton("hidden");
    flatPlateButton("hidden");
    flatBottomButton("hidden");
    negCamberButton("hidden");
    ellipseButton("hidden");
    curvePlateButton("hidden");
  } else if (shapeSelect < 4 && getUnits() == 2) {
    var box3 = document.getElementById("box3");
    box3.style.visibility = "hidden";
    airLabel("airfoilLabel", "Wing Size", true);
    button1("button1", "", false);
    angleLabel("angleLabel", "Chord-m", true);
    angleBox("angleBox", true, String(chord));
    slider("slider1", "0.1", "6.06", String(chord), "0.1", "visible");
    camberLabel("camberLabel", "Span-m", true);
    camberBox("camberBox", String(span), true);
    slider("slider2", "5.0", "37.79", String(span), "0.1", "visible");
    thickLabel("thickLabel", "Area-sq m", true);
    thickLabel("thickBox", "100.0", true);

    var slider3 = document.getElementById("slider3");
    slider3.type = "range";
    slider3.min = "0.01";
    slider3.max = "229.93";
    slider3.step = "0.01";
    slider3.value = String(area);
    slider3.style.position = "absolute";
    slider3.style.left = "200px";
    slider3.style.visibility = "visible";

    basicLabel("basicLabel", "Aspect-Rat", true);

    var aspectBox = document.getElementById("symmetricButton");
    aspectBox.type = "text";
    aspectBox.value = "4.0";
    aspectBox.style.visibility = "visible";

    highCamberButton("hidden");
    flatPlateButton("hidden");
    flatBottomButton("hidden");
    negCamberButton("hidden");
    ellipseButton("hidden");
    curvePlateButton("hidden");
  } else if (shapeSelect == 4) {
    cylinderClicked();
  } else if (shapeSelect == 5) {
    ballClicked();
  }

  if (environmentSelect == 3) {
    slider("slider1", "0.1", "5.05", String(chord), "0.1", true);
    slider("slider2", "0.1", "20.0", String(span), "0.1", true);
    thickLabel("thickBox", "10.0", true);
    var slider3 = document.getElementById("slider3");
    slider3.min = "0.01";
    slider3.max = "50.05";
    slider3.step = "0.01";
    slider3.value = String(area);
    slider3.style.position = "absolute";
    slider3.style.left = "200px";
    slider3.style.visibility = "visible";
  }
}

function analysisButton() {
  inputButton = 3;
  buttonSelect();

  var box3 = document.getElementById("box3");
  box3.style.visibility = "visible";

  airLabel("airfoilLabel", "Lift Analysis", true);
  button1("button1", "", "hidden");
  liftAnalysisButtons();
  angleLabel("angleLabel", "", "hidden");
  angleBox("angleBox", "", "hidden");
  slider("slider1", "", "", "", "", "hidden");
  camberLabel("camberLabel", "", "hidden");
  camberBox("camberBox", "", "hidden");
  slider("slider2", "", "", "", "", "hidden");
  thickLabel("thickLabel", "", false);
  thickLabel("thickBox", "", false);
  slider("slider3", "", "", "", "", "hidden");
  basicLabel("basicLabel", "", false);
  symmetricButton("symmetricButton", "input", "", "", "hidden");
  highCamberButton("hidden");
  flatPlateButton("hidden");
  flatBottomButton("hidden");
  negCamberButton("hidden");
  ellipseButton("hidden");
  curvePlateButton("hidden");
  liftCorrection();
  liftCorrectionButtons();
  inducedDragLabel();
  inducedButtons();
  reNumCorrection();
  reNumButtons();
  dragOfBall();
  BallButtons();
  displayLabel();
  streamlinesButton();
  csv_Button();
  view_Buttons();
  document.getElementById("stepDownSlider1").style.visibility = "hidden";
  document.getElementById("stepUpSlider1").style.visibility = "hidden";
  document.getElementById("stepDownSlider2").style.visibility = "hidden";
  document.getElementById("stepUpSlider2").style.visibility = "hidden";

  if (selectClicked > 1) {
    document.getElementById("selectLabel").style.visibility = "hidden";
    document.getElementById("surfaceLabel").style.visibility = "hidden";
    document.getElementById("pressureButton").style.visibility = "hidden";
    document.getElementById("velocityButton").style.visibility = "hidden";
    document.getElementById("dragButton").style.visibility = "hidden";
    document.getElementById("dropdown1").style.visibility = "hidden";
    document.getElementById("angleButton").style.visibility = "hidden";
    document.getElementById("camberButton").style.visibility = "hidden";
    document.getElementById("thicknessButton").style.visibility = "hidden";
    document.getElementById("dropdown2").style.visibility = "hidden";
    document.getElementById("speedButton").style.visibility = "hidden";
    document.getElementById("altitudeButton").style.visibility = "hidden";
    document.getElementById("wingButton").style.visibility = "hidden";
    document.getElementById("densityButton").style.visibility = "hidden";
  }
}

function liftAnalysisButtons() {
  var box3 = document.getElementById("box3");
  var stallModelButton = document.createElement("button");
  stallModelButton.setAttribute("id", "stallModelButton");
  var stallModelNode = document.createTextNode("Stall Model");
  stallModelButton.appendChild(stallModelNode);
  stallModelButton.style.position = "absolute";
  stallModelButton.style.top = "30px";
  stallModelButton.style.left = "150px";

  box3.appendChild(stallModelButton);

  var box3 = document.getElementById("box3");
  var idealFlowButton = document.createElement("button");
  var idealFlowNode = document.createTextNode("Ideal Flow");
  idealFlowButton.appendChild(idealFlowNode);
  idealFlowButton.setAttribute("id", "idealFlowButton");
  idealFlowButton.style.top = "30px";
  idealFlowButton.style.left = "250px";
  idealFlowButton.style.position = "absolute";
  box3.appendChild(idealFlowButton);

  if (liftAnalisis == 1) {
    stallModelButton.style.backgroundColor = "yellow";
    idealFlowButton.style.backgroundColor = "";
  } else {
    stallModelButton.style.backgroundColor = "";
    idealFlowButton.style.backgroundColor = "yellow";
  }

  stallModelButton.addEventListener("click", function () {
    liftAnalisis = 1;
    stallModelButton.style.backgroundColor = "yellow";
    idealFlowButton.style.backgroundColor = "";
  });
  idealFlowButton.addEventListener("click", function () {
    liftAnalisis = 2;
    stallModelButton.style.backgroundColor = "";
    idealFlowButton.style.backgroundColor = "yellow";
  });
}

function liftCorrection() {
  var box3 = document.getElementById("box3");
  var liftCorrection = document.createElement("LABEL");
  var liftCorrectionNode = document.createTextNode("AR Lift Correction:");
  liftCorrection.appendChild(liftCorrectionNode);
  liftCorrection.id = "liftCorrection";
  liftCorrection.style.position = "absolute";
  liftCorrection.style.color = "blue";
  liftCorrection.style.top = "80px";
  liftCorrection.style.left = "10px";

  box3.appendChild(liftCorrection);
}

function liftCorrectionButtons() {
  var box3 = document.getElementById("box3");
  var arOnButton = document.createElement("BUTTON");
  var arOnNode = document.createTextNode("AR On");
  arOnButton.appendChild(arOnNode);
  arOnButton.id = "arOnButton";
  arOnButton.style.position = "absolute";
  arOnButton.style.top = "80px";
  arOnButton.style.left = "150px";

  box3.appendChild(arOnButton);

  var arOffButton = document.createElement("BUTTON");
  arOffNode = document.createTextNode("AR Off");
  arOffButton.appendChild(arOffNode);
  arOffButton.id = "arOffButton";
  arOffButton.style.position = "absolute";
  arOffButton.style.top = "80px";
  arOffButton.style.left = "220px";

  box3.appendChild(arOffButton);

  if (ar == true) {
    arOnButton.style.backgroundColor = "yellow";
    arOffButton.style.backgroundColor = "";
  } else {
    arOnButton.style.backgroundColor = "";
    arOffButton.style.backgroundColor = "yellow";
  }

  arOnButton.addEventListener("click", function () {
    ar = true;
    arOnButton.style.backgroundColor = "yellow";
    arOffButton.style.backgroundColor = "";
  });

  arOffButton.addEventListener("click", function () {
    ar = false;
    arOnButton.style.backgroundColor = "";
    arOffButton.style.backgroundColor = "yellow";
  });
}

function inducedDragLabel() {
  var box3 = document.getElementById("box3");
  var inducedDragLabel = document.createElement("LABEL");
  var inducedDragNode = document.createTextNode("Induced Drag:");
  inducedDragLabel.appendChild(inducedDragNode);
  inducedDragLabel.id = "inducedDragLabel";
  inducedDragLabel.style.position = "absolute";
  inducedDragLabel.style.color = "blue";
  inducedDragLabel.style.top = "120px";
  inducedDragLabel.style.left = "10px";

  box3.appendChild(inducedDragLabel);
}

function inducedButtons() {
  var box3 = document.getElementById("box3");
  var idOnButton = document.createElement("BUTTON");
  var idOnNode = document.createTextNode("ID On");
  idOnButton.appendChild(idOnNode);
  idOnButton.id = "idOnButton";
  idOnButton.style.position = "absolute";
  idOnButton.style.top = "120px";
  idOnButton.style.left = "150px";

  box3.appendChild(idOnButton);

  var idOffButton = document.createElement("BUTTON");
  var idOffNode = document.createTextNode("ID Off");
  idOffButton.appendChild(idOffNode);
  idOffButton.id = "idOffButton";
  idOffButton.style.position = "absolute";
  idOffButton.style.top = "120px";
  idOffButton.style.left = "220px";

  box3.appendChild(idOffButton);

  if (induced == true) {
    idOnButton.style.backgroundColor = "yellow";
    idOffButton.style.backgroundColor = "";
  } else {
    idOnButton.style.backgroundColor = "";
    idOffButton.style.backgroundColor = "yellow";
  }

  idOnButton.addEventListener("click", function () {
    induced = true;
    idOnButton.style.backgroundColor = "yellow";
    idOffButton.style.backgroundColor = "";
  });

  idOffButton.addEventListener("click", function () {
    induced = false;
    idOnButton.style.backgroundColor = "";
    idOffButton.style.backgroundColor = "yellow";
  });
}

function reNumCorrection() {
  var box3 = document.getElementById("box3");
  var reNumCorrection = document.createElement("LABEL");
  var reNumNode = document.createTextNode("Re # Correction");
  reNumCorrection.appendChild(reNumNode);
  reNumCorrection.id = "reNumCorrection";
  reNumCorrection.style.position = "absolute";
  reNumCorrection.style.color = "blue";
  reNumCorrection.style.top = "160px";
  reNumCorrection.style.left = "10px";

  box3.appendChild(reNumCorrection);
}

function reNumButtons() {
  var box3 = document.getElementById("box3");
  var reOnButton = document.createElement("BUTTON");
  var reOnNode = document.createTextNode("Re On");
  reOnButton.appendChild(reOnNode);
  reOnButton.id = "reOnButton";
  reOnButton.style.position = "absolute";
  reOnButton.style.top = "160px";
  reOnButton.style.left = "150px";
  box3.appendChild(reOnButton);

  var reOffButton = document.createElement("BUTTON");
  var reOffNode = document.createTextNode("Re Off");
  reOffButton.appendChild(reOffNode);
  reOffButton.id = "reOffButton";
  reOffButton.style.position = "absolute";
  reOffButton.style.top = "160px";
  reOffButton.style.left = "220px";
  box3.appendChild(reOffButton);

  if (reCorrection == true) {
    reOnButton.style.backgroundColor = "yellow";
    reOffButton.style.backgroundColor = "";
  } else {
    reOnButton.style.backgroundColor = "";
    reOffButton.style.backgroundColor = "yellow";
  }

  reOnButton.addEventListener("click", function () {
    reCorrection = true;
    reOnButton.style.backgroundColor = "yellow";
    reOffButton.style.backgroundColor = "";
  });
  reOffButton.addEventListener("click", function () {
    reCorrection = false;
    reOnButton.style.backgroundColor = "";
    reOffButton.style.backgroundColor = "yellow";
  });
}

function dragOfBall() {
  var box3 = document.getElementById("box3");

  var dragOfBall = document.createElement("LABEL");
  var dragNode = document.createTextNode("Drag of Ball");
  dragOfBall.appendChild(dragNode);
  dragOfBall.id = "dragOfBall";
  dragOfBall.style.position = "absolute";
  dragOfBall.style.top = "200px";
  dragOfBall.style.left = "10px";
  dragOfBall.style.color = "blue";

  box3.appendChild(dragOfBall);
}

function BallButtons() {
  var box3 = document.getElementById("box3");
  var smoothBallButton = document.createElement("BUTTON");
  var smoothBallNode = document.createTextNode("Smooth Ball");
  smoothBallButton.appendChild(smoothBallNode);
  smoothBallButton.id = "smoothBallButton";
  smoothBallButton.style.position = "absolute";
  smoothBallButton.style.top = "200px";
  smoothBallButton.style.left = "100px";

  box3.appendChild(smoothBallButton);

  var roughBallButton = document.createElement("BUTTON");
  var roughBallNode = document.createTextNode("Rough Ball");
  roughBallButton.appendChild(roughBallNode);
  roughBallButton.id = "roughBallButton";
  roughBallButton.style.position = "absolute";
  roughBallButton.style.top = "200px";
  roughBallButton.style.left = "190px";

  box3.appendChild(roughBallButton);

  var golfBallButton = document.createElement("BUTTON");
  var golfBallNode = document.createTextNode("Golf Ball");
  golfBallButton.appendChild(golfBallNode);
  golfBallButton.id = "golfBallButton";
  golfBallButton.style.position = "absolute";
  golfBallButton.style.top = "200px";
  golfBallButton.style.left = "275px";

  box3.appendChild(golfBallButton);

  if (dragBall == 1) {
    dragBall = 1;
    smoothBallButton.style.backgroundColor = "yellow";
    roughBallButton.style.backgroundColor = "";
    golfBallButton.style.backgroundColor = "";
  } else if (dragBall == 2) {
    dragBall = 2;
    smoothBallButton.style.backgroundColor = "";
    roughBallButton.style.backgroundColor = "yellow";
    golfBallButton.style.backgroundColor = "";
  } else {
    dragBall = 3;
    smoothBallButton.style.backgroundColor = "";
    roughBallButton.style.backgroundColor = "";
    golfBallButton.style.backgroundColor = "yellow";
  }

  smoothBallButton.addEventListener("click", function () {
    dragBall = 1;
    smoothBallButton.style.backgroundColor = "yellow";
    roughBallButton.style.backgroundColor = "";
    golfBallButton.style.backgroundColor = "";
  });

  roughBallButton.addEventListener("click", function () {
    dragBall = 2;
    smoothBallButton.style.backgroundColor = "";
    roughBallButton.style.backgroundColor = "yellow";
    golfBallButton.style.backgroundColor = "";
  });

  golfBallButton.addEventListener("click", function () {
    dragBall = 3;
    smoothBallButton.style.backgroundColor = "";
    roughBallButton.style.backgroundColor = "";
    golfBallButton.style.backgroundColor = "yellow";
  });
}

function displayLabel() {
  var box3 = document.getElementById("box3");
  var displayLabel = document.createElement("LABEL");
  displayLabel.setAttribute("id", "displayLabel");
  var displayNode = document.createTextNode("Display");
  displayLabel.appendChild(displayNode);
  displayLabel.style.position = "absolute";
  displayLabel.style.top = "250px";
  displayLabel.style.left = "10px";
  displayLabel.style.color = "blue";
  box3.appendChild(displayLabel);
}

function streamlinesButton() {
  var box3 = document.getElementById("box3");
  var streamlinesButton = document.createElement("BUTTON");
  streamlinesButton.setAttribute("id", "streamlinesButton");
  var streamlinesNode = document.createTextNode("Streamlines");
  streamlinesButton.appendChild(streamlinesNode);
  streamlinesButton.style.position = "absolute";
  streamlinesButton.style.top = "250px";
  streamlinesButton.style.left = "80px";
  box3.appendChild(streamlinesButton);

  var movingButton = document.createElement("BUTTON");
  movingButton.setAttribute("id", "movingButton");
  var movingNode = document.createTextNode("moving");
  movingButton.appendChild(movingNode);
  movingButton.style.position = "absolute";
  movingButton.style.top = "250px";
  movingButton.style.left = "170px";
  box3.appendChild(movingButton);

  var box3 = document.getElementById("box3");
  var freezeButton = document.createElement("BUTTON");
  freezeButton.setAttribute("id", "freezeButton");
  var freezeNode = document.createTextNode("freeze");
  freezeButton.appendChild(freezeNode);
  freezeButton.style.position = "absolute";
  freezeButton.style.top = "250px";
  freezeButton.style.left = "230px";
  box3.appendChild(freezeButton);

  if (display == 1) {
    streamlinesButton.style.backgroundColor = "yellow";
    movingButton.style.backgroundColor = "";
    freezeButton.style.backgroundColor = "";
  } else if (display == 2) {
    streamlinesButton.style.backgroundColor = "";
    movingButton.style.backgroundColor = "yellow";
    freezeButton.style.backgroundColor = "";
  } else {
    streamlinesButton.style.backgroundColor = "";
    movingButton.style.backgroundColor = "";
    freezeButton.style.backgroundColor = "yellow";
  }

  streamlinesButton.addEventListener("click", function () {
    display = 1;
    streamlinesButton.style.backgroundColor = "yellow";
    movingButton.style.backgroundColor = "";
    freezeButton.style.backgroundColor = "";
  });

  movingButton.addEventListener("click", function () {
    display = 2;
    streamlinesButton.style.backgroundColor = "";
    movingButton.style.backgroundColor = "yellow";
    freezeButton.style.backgroundColor = "";
  });

  freezeButton.addEventListener("click", function () {
    display = 3;
    streamlinesButton.style.backgroundColor = "";
    movingButton.style.backgroundColor = "";
    freezeButton.style.backgroundColor = "yellow";
  });
}

function csv_Button() {
  var box3 = document.getElementById("box3");
  var csvButton = document.createElement("BUTTON");
  csvButton.setAttribute("id", "csvButton");
  var csvNode = document.createTextNode("CSV");
  csvButton.appendChild(csvNode);
  csvButton.style.position = "absolute";
  csvButton.style.top = "300px";
  csvButton.style.left = "10px";
  box3.appendChild(csvButton);

  csvButton.addEventListener("click", function () {
    generate_CSV();
  });
}

function view_Buttons() {
  var box3 = document.getElementById("box3");
  var twoDButton = document.createElement("BUTTON");
  twoDButton.setAttribute("id", "twoDButton");
  var twoDNode = document.createTextNode("2D view");
  twoDButton.appendChild(twoDNode);
  twoDButton.style.position = "absolute";
  twoDButton.style.top = "300px";
  twoDButton.style.left = "70px";
  box3.appendChild(twoDButton);

  var box3 = document.getElementById("box3");
  var threeDButton = document.createElement("BUTTON");
  threeDButton.setAttribute("id", "threeDButton");
  var threeDNode = document.createTextNode("3D view");
  threeDButton.appendChild(threeDNode);
  threeDButton.style.position = "absolute";
  threeDButton.style.top = "300px";
  threeDButton.style.left = "150px";
  box3.appendChild(threeDButton);

  twoDButton.addEventListener("click", function () {
    view = 1;
    twoDButton.style.background = "yellow";
    threeDButton.style.background = "";
  });

  threeDButton.addEventListener("click", function () {
    view = 2;
    twoDButton.style.background = "";
    threeDButton.style.background = "yellow";
  });
}

function selectPlotButton() {
  outputButton = 5;
  plot = 2;
  inputButton = 5;
  document.getElementById("textArea").innerHTML = "";

  buttonSelect();

  //document.getElementById("probeButton").style.backgroundColor = "";
  document.getElementById("gageButton").style.backgroundColor = "";
  document.getElementById("geometryButton").style.backgroundColor = "";
  document.getElementById("dataButton").style.backgroundColor = "";
  document.getElementById("plotButton").style.backgroundColor = "yellow";

  var box3 = document.getElementById("box3");
  box3.style.visibility = "hidden";
  airLabel("airfoilLabel", "", false);
  button1("button1", "", false);
  angleLabel("angleLabel", "", false);
  angleBox("angleBox", false, "");
  slider("slider1", "", "", "", "", "hidden");
  slider("slider2", "", "", "", "", "hidden");
  camberLabel("camberLabel", "", "hidden");
  camberBox("camberBox", "", "hidden");
  thickLabel("thickLabel", "", "hidden");
  thickLabel("thickBox", "", "hidden");
  slider("slider3", "", "", "", "", "hidden");
  basicLabel("basicLabel", "", "hidden");
  symmetricButton("symmetricButton", "", "", "", "hidden");
  highCamberButton("hidden");
  flatPlateButton("hidden");
  flatBottomButton("hidden");
  negCamberButton("hidden");
  ellipseButton("hidden");
  curvePlateButton("hidden");
  document.getElementById("stepDownSlider1").style.visibility = "hidden";
  document.getElementById("stepUpSlider1").style.visibility = "hidden";
  document.getElementById("stepDownSlider2").style.visibility = "hidden";
  document.getElementById("stepUpSlider2").style.visibility = "hidden";

  if (selectClicked == 1 && shapeSelect <= 3) {
    label("SelectPlot", "selectLabel", "blue", "350px", "200px", "visible");
    label("Surface", "surfaceLabel", "", "400px", "100px", "visible");
    pressureButton("visible");
    velocityButton("visible");
    dragButton("visible");
    dropdown1("visible");
    angleButton("visible");
    camberButton("visible");
    thicknessButton("visible");
    dropdown2("visible");
    speedButton("visible");
    altitudeButton("visible");
    wingButton("visible");
    densityButton("visible");
  } else if (selectClicked == 1 && shapeSelect >= 4) {
    label("SelectPlot", "selectLabel", "blue", "350px", "200px", "visible");
    label("Surface", "surfaceLabel", "", "400px", "100px", "visible");
    pressureButton("visible");
    velocityButton("visible");
    dragButton("visible");
    dropdown1("hidden");
    angleButton("hidden");
    camberButton("hidden");
    thicknessButton("hidden");
    dropdown2("hidden");
    speedButton("hidden");
    altitudeButton("hidden");
    wingButton("hidden");
    densityButton("hidden");
  } else if (selectClicked > 1 && shapeSelect < 4) {
    document.getElementById("selectLabel").style.visibility = "visible";
    document.getElementById("surfaceLabel").style.visibility = "visible";
    document.getElementById("pressureButton").style.visibility = "visible";
    document.getElementById("velocityButton").style.visibility = "visible";
    document.getElementById("dragButton").style.visibility = "visible";
    document.getElementById("dropdown1").style.visibility = "visible";
    document.getElementById("angleButton").style.visibility = "visible";
    document.getElementById("camberButton").style.visibility = "visible";
    document.getElementById("thicknessButton").style.visibility = "visible";
    document.getElementById("dropdown2").style.visibility = "visible";
    document.getElementById("speedButton").style.visibility = "visible";
    document.getElementById("altitudeButton").style.visibility = "visible";
    document.getElementById("wingButton").style.visibility = "visible";
    document.getElementById("densityButton").style.visibility = "visible";
  } else if (selectClicked > 1 && shapeSelect >= 4) {
    document.getElementById("selectLabel").style.visibility = "visible";
    document.getElementById("surfaceLabel").style.visibility = "visible";
    document.getElementById("pressureButton").style.visibility = "visible";
    document.getElementById("velocityButton").style.visibility = "visible";
    document.getElementById("dragButton").style.visibility = "visible";
    document.getElementById("dropdown1").style.visibility = "hidden";
    document.getElementById("angleButton").style.visibility = "hidden";
    document.getElementById("camberButton").style.visibility = "hidden";
    document.getElementById("thicknessButton").style.visibility = "hidden";
    document.getElementById("dropdown2").style.visibility = "hidden";
    document.getElementById("speedButton").style.visibility = "hidden";
    document.getElementById("altitudeButton").style.visibility = "hidden";
    document.getElementById("wingButton").style.visibility = "hidden";
    document.getElementById("densityButton").style.visibility = "hidden";
  }

  selectClicked++;
}

function label(textNode, labelId, color, top, left, visibility) {
  var body = document.getElementById("body");

  var selectLabel = document.createElement("LABEL");
  var selectNode = document.createTextNode(textNode);
  selectLabel.appendChild(selectNode);
  selectLabel.id = labelId;
  selectLabel.style.position = "absolute";
  selectLabel.style.color = color;
  selectLabel.style.top = top;
  selectLabel.style.left = left;
  selectLabel.style.visibility = visibility;
  body.appendChild(selectLabel);
}

function pressureButton(visible) {
  var body = document.getElementById("body");
  var pressureButton = document.createElement("BUTTON");
  var pressureNode = document.createTextNode("Pressure");
  pressureButton.appendChild(pressureNode);
  pressureButton.id = "pressureButton";
  pressureButton.style.position = "absolute";
  pressureButton.style.top = "400px";
  pressureButton.style.left = "180px";
  pressureButton.addEventListener("click", function () {
    plot = 2;
  });
  pressureButton.style.visibility = visible;

  body.appendChild(pressureButton);
}

function velocityButton(visible) {
  var body = document.getElementById("body");
  var velocityButton = document.createElement("BUTTON");
  var velocityNode = document.createTextNode("Velocity");
  velocityButton.appendChild(velocityNode);
  velocityButton.id = "velocityButton";
  velocityButton.style.position = "absolute";
  velocityButton.style.top = "400px";
  velocityButton.style.left = "260px";
  velocityButton.addEventListener("click", function () {
    plot = 3;
  });
  velocityButton.style.visibility = visible;

  body.appendChild(velocityButton);
}

function dragButton(visible) {
  var body = document.getElementById("body");
  var dragButton = document.createElement("BUTTON");
  var dragNode = document.createTextNode("Drag Polar");
  dragButton.appendChild(dragNode);
  dragButton.id = "dragButton";
  dragButton.style.position = "absolute";
  dragButton.style.top = "400px";
  dragButton.style.left = "330px";
  dragButton.addEventListener("click", function () {
    plot = 4;
  });
  dragButton.style.visibility = visible;

  body.appendChild(dragButton);
}

function dropdown1(visible) {
  var dropdown1 = document.createElement("SELECT");
  dropdown1.setAttribute("id", "dropdown1");
  document.body.appendChild(dropdown1);
  dropdown1.style.position = "absolute";
  dropdown1.style.top = "450px";
  dropdown1.style.left = "100px";
  var liftOption = document.createElement("OPTION");
  liftOption.setAttribute("value", "liftOption");
  var liftNode = document.createTextNode("Lift vs");
  liftOption.appendChild(liftNode);
  var clOption = document.createElement("OPTION");
  clOption.setAttribute("value", "clOption");
  var clNode = document.createTextNode("Cl vs");
  var dragVs = document.createElement("OPTION");
  dragVs.setAttribute("value", "dragVs");
  var dragNode = document.createTextNode("Drag vs");
  var cdOption = document.createElement("OPTION");
  cdOption.setAttribute("value", "cdOption");
  var cdNode = document.createTextNode("Cd vs");
  clOption.appendChild(clNode);
  dragVs.appendChild(dragNode);
  cdOption.appendChild(cdNode);
  dropdown1.appendChild(liftOption);
  dropdown1.appendChild(clOption);
  dropdown1.appendChild(dragVs);
  dropdown1.appendChild(cdOption);
  dropdown1.style.visibility = visible;
}

function angleButton(visible) {
  var body = document.getElementById("body");
  var angleButton = document.createElement("BUTTON");
  var angleNode = document.createTextNode("Angle");
  angleButton.appendChild(angleNode);
  angleButton.id = "angleButton";
  angleButton.style.position = "absolute";
  angleButton.style.top = "450px";
  angleButton.style.left = "180px";
  angleButton.addEventListener("click", function () {
    plot = 5;
  });
  angleButton.style.visibility = visible;
  body.appendChild(angleButton);
}

function camberButton(visible) {
  var body = document.getElementById("body");
  var camberButton = document.createElement("BUTTON");
  var camberNode = document.createTextNode("Camber");
  camberButton.appendChild(camberNode);
  camberButton.id = "camberButton";
  camberButton.style.position = "absolute";
  camberButton.style.top = "450px";
  camberButton.style.left = "240px";
  camberButton.addEventListener("click", function () {
    plot = 6;
  });
  camberButton.style.visibility = visible;
  body.appendChild(camberButton);
}

function thicknessButton(visible) {
  var body = document.getElementById("body");
  var thicknessButton = document.createElement("BUTTON");
  var thicknessNode = document.createTextNode("Thickness");
  thicknessButton.appendChild(thicknessNode);
  thicknessButton.id = "thicknessButton";
  thicknessButton.style.position = "absolute";
  thicknessButton.style.top = "450px";
  thicknessButton.style.left = "310px";
  thicknessButton.addEventListener("click", function () {
    plot = 7;
  });
  thicknessButton.style.visibility = visible;
  body.appendChild(thicknessButton);
}

function dropdown2(visible) {
  var dropdown2 = document.createElement("SELECT");
  dropdown2.setAttribute("id", "dropdown2");
  document.body.appendChild(dropdown2);
  dropdown2.id = "dropdown2";
  dropdown2.style.position = "absolute";
  dropdown2.style.top = "500px";
  dropdown2.style.left = "100px";
  var liftVsOption = document.createElement("OPTION");
  liftVsOption.setAttribute("value", "liftVsOption");
  var liftVsNode = document.createTextNode("Lift vs");
  liftVsOption.appendChild(liftVsNode);
  var dragVsOption = document.createElement("OPTION");
  dragVsOption.setAttribute("value", "dragVsOption");
  var dragVsNode = document.createTextNode("Drag vs");
  dragVsOption.appendChild(dragVsNode);
  dropdown2.appendChild(liftVsOption);
  dropdown2.appendChild(dragVsOption);
  dropdown2.style.visibility = visible;
}

function speedButton(visible) {
  var body = document.getElementById("body");
  var speedButton = document.createElement("BUTTON");
  var speedNode = document.createTextNode("Speed");
  speedButton.appendChild(speedNode);
  speedButton.id = "speedButton";
  speedButton.style.position = "absolute";
  speedButton.style.top = "500px";
  speedButton.style.left = "175px";
  speedButton.addEventListener("click", function () {
    plot = 8;
  });
  speedButton.style.visibility = visible;
  body.appendChild(speedButton);
}

function altitudeButton(visible) {
  var body = document.getElementById("body");
  var altitudeButton = document.createElement("BUTTON");
  var altitudeNode = document.createTextNode("Altitude");
  altitudeButton.appendChild(altitudeNode);
  altitudeButton.id = "altitudeButton";
  altitudeButton.style.position = "absolute";
  altitudeButton.style.top = "500px";
  altitudeButton.style.left = "230px";
  altitudeButton.addEventListener("click", function () {
    plot = 9;
  });
  altitudeButton.style.visibility = visible;
  body.appendChild(altitudeButton);
}

function wingButton(visible) {
  var body = document.getElementById("body");
  var wingButton = document.createElement("BUTTON");
  var wingNode = document.createTextNode("Wing Area");
  wingButton.appendChild(wingNode);
  wingButton.id = "wingButton";
  wingButton.style.position = "absolute";
  wingButton.style.top = "500px";
  wingButton.style.left = "290px";
  wingButton.addEventListener("click", function () {
    plot = 10;
  });
  wingButton.style.visibility = visible;
  body.appendChild(wingButton);
}

function densityButton(visible) {
  var body = document.getElementById("body");
  var densityButton = document.createElement("BUTTON");
  var densityNode = document.createTextNode("Density");
  densityButton.appendChild(densityNode);
  densityButton.id = "densityButton";
  densityButton.style.position = "absolute";
  densityButton.style.top = "500px";
  densityButton.style.left = "370px";
  densityButton.addEventListener("click", function () {
    plot = 11;
  });
  densityButton.style.visibility = visible;
  body.appendChild(densityButton);
}

function dataButton() {
  var shape = new Shape(
    angle,
    camber,
    thickness,
    velocity,
    altitude,
    chord,
    span,
    area
  );
  var airfoil = new Airfoil(
    angle,
    camber,
    thickness,
    velocity,
    altitude,
    chord,
    span,
    area
  );
  var ellipse = new Ellipse(
    angle,
    camber,
    thickness,
    velocity,
    altitude,
    chord,
    span,
    area
  );
  var plate = new Plate(
    angle,
    camber,
    thickness,
    velocity,
    altitude,
    chord,
    span,
    area
  );
  var cylinder = new Cylinder(
    0.0,
    0.0,
    thickness,
    velocity,
    altitude,
    5.0,
    span,
    100.0,
    radius,
    spin
  );
  var ball = new Ball(
    0.0,
    0.0,
    thickness,
    velocity,
    altitude,
    5.0,
    span,
    100.0,
    radius,
    spin
  );
  var lift;
  var drag;
  var density = shape.getRhoEarth();
  var pressure = shape.getPressureEarth();
  outputButton = 3;
  var environmentString = "Standard Earth Atmosphere";
  var temperature = shape.getTempEarth();
  var tempUnits = " F";
  var densityUnits = " slug/cu ft ";
  var pressureUnit;
  Plotly.purge("tester");
  if (getUnits() == 1) {
    lenghtUnit = " ft";
    forceUnit = " lbs";
    velocityUnits = " mph";
    areaUnits = " sq ft";
    densityUnits = " slug / cu ft";
    tempUnits = " F";
    pressureUnit = " lb/ sq in";
  } else if (getUnits() == 2) {
    lenghtUnit = " m";
    forceUnit = " N";
    velocityUnits = " km/h";
    areaUnits = " sq m";
    densityUnits = " kg / cu m";
    tempUnits = " C";
    pressureUnit = " kPa";
  }

  if (environmentSelect == 1) {
    environmentString = "Standard Earth Atmosphere ";

    if (getUnits() == 1) {
      pressure = shape.getPressureEarth() / 144;
      temperature = shape.getTempEarth() - 460;
      density = shape.getRhoEarth();
    } else if (getUnits() == 2) {
      pressure = ((101.3 / 14.7) * shape.getPressureEarth()) / 144;
      temperature = (shape.getTempEarth() * 5.0) / 9.0 - 273.1;
      density = shape.getRhoEarth() * 515.4;
    }
  } else if (environmentSelect == 2) {
    environmentString = "Martian Atmosphere ";

    if (getUnits() == 1) {
      pressure = shape.getPressureMars() / 144;
      temperature = shape.getTempMars() - 460;
      density = shape.getRhoMars();
    } else if (getUnits() == 2) {
      pressure = ((101.3 / 14.7) * shape.getPressureMars()) / 144;
      temperature = (shape.getTempMars() * 5.0) / 9.0 - 273.1;
      density = shape.getRhoMars() * 515.4;
    }
  } else if (environmentSelect == 3) {
    environmentString = "Under Water ";

    if (getUnits() == 1) {
      pressure = shape.getPressureWater() / 144;
      temperature = shape.getWaterTemp() - 460;
      density = shape.getRhoWater();
    } else if (getUnits() == 2) {
      pressure = ((101.3 / 14.7) * shape.getPressureWater()) / 144;
      temperature = (shape.getWaterTemp() * 5.0) / 9.0 - 273.1;
      density = shape.getRhoWater() * 515.4;
    }
  } else if (environmentSelect == 4) {
    environmentString = "Venus Surface ";

    if (getUnits() == 1) {
      pressure = shape.getPressureVenus() / 144;
      temperature = shape.getTempVenus() - 460;
      density = shape.getRhoVenus();
    } else if (getUnits() == 2) {
      pressure = ((101.3 / 14.7) * shape.getPressureVenus()) / 144;
      temperature = (shape.getTempVenus() * 5.0) / 9.0 - 273.1;
      density = shape.getRhoVenus() * 515.4;
    }
  }

  if (shapeSelect == 1) {
    lift = airfoil.getLift();
    drag = airfoil.getDrag();
  } else if (shapeSelect == 2) {
    lift = ellipse.getLift();
    drag = ellipse.getDrag();
  } else if (shapeSelect == 3) {
    lift = plate.getLift();
    drag = plate.getDrag();
  } else if (shapeSelect == 4) {
    lift = cylinder.getLift();
    drag = cylinder.getDrag();
  } else if (shapeSelect == 5) {
    lift = ball.getLift();
    drag = ball.getDrag();
  }

  if (shapeSelect < 4)
    var dataString =
      shapeString +
      "</br> \
                      Camber = " +
      String(camber) +
      " % chord" +
      ", Thickness = " +
      String(thickness) +
      " % chord </br>  " +
      "Chord = " +
      String(chord) +
      lenghtUnit +
      " span " +
      String(span) +
      lenghtUnit +
      "  </br>" +
      "Surface Area =  " +
      String(area.toFixed(2)) +
      areaUnits +
      " </br>" +
      "Angle of attack = " +
      String(angle) +
      " degrees </br>" +
      environmentString +
      "</br>" +
      "Altitude =  " +
      String(altitude) +
      lenghtUnit +
      " ,  Density = " +
      String(density.toPrecision(4)) +
      densityUnits +
      " </br>" +
      "Pressure = " +
      String(pressure.toFixed(3)) +
      pressureUnit +
      " , Temperature = " +
      String(temperature.toFixed(0)) +
      tempUnits +
      "</br>" +
      "Speed = " +
      String(velocity) +
      velocityUnits +
      " </br> " +
      "Lift = " +
      String(lift.toFixed(0)) +
      forceUnit +
      "</br>" +
      "Drag = " +
      String(drag.toFixed(0)) +
      forceUnit +
      "  </br>";
  else if (shapeSelect >= 4)
    var dataString =
      shapeString +
      "</br> \
                      Spin = " +
      String(spin) +
      " rpm" +
      ", Radius = " +
      String(radius) +
      lenghtUnit +
      "</br>  " +
      " span " +
      String(span) +
      lenghtUnit +
      "  </br>" +
      "Angle of attack = " +
      String(angle) +
      " degrees </br>" +
      environmentString +
      "</br>" +
      "Altitude =  " +
      String(altitude) +
      lenghtUnit +
      " ,  Density = " +
      String(density.toPrecision(4)) +
      densityUnits +
      " </br>" +
      "Pressure = " +
      String(pressure.toFixed(3)) +
      pressureUnit +
      " , Temperature = " +
      String(temperature.toFixed(0)) +
      tempUnits +
      "</br>" +
      "Speed = " +
      String(velocity) +
      velocityUnits +
      " </br> " +
      "Lift = " +
      String(lift.toFixed(0)) +
      forceUnit +
      "</br>" +
      "Drag = " +
      String(drag.toFixed(0)) +
      forceUnit +
      "  </br>";

  var textArea = document.getElementById("textArea");
  textArea.innerHTML = dataString;
  buttonSelect();
}

function geometryButton() {
  outputButton = 2;

  Plotly.purge("tester");
  var npt2 = 19;
  var textArea = document.getElementById("textArea");
  var mapfact = 4.0;

  if (shapeSelect < 4) mapfact = 4.0;
  else if (shapeSelect >= 4) mapfact = 2.0;

  textArea.innerHTML =
    " Upper Surface</br></br>" +
    "X / C  &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp    Y/C  &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp    P  &nbsp &nbsp &nbsp&nbsp &nbsp &nbsp      V </br>" +
    String((xm[0][npt2 - 0] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 0] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 0].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 0].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 1] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 1] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 1].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 1].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 2] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 2] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 2].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 2].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 3] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 3] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 3].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 3].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 4] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 4] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 4].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 4].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 5] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 5] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 5].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 5].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 6] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 6] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 6].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 6].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 7] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 7] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 7].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 7].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 8] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 8] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 8].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 8].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 9] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 9] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 9].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 9].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 10] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 10] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 10].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 10].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 11] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 11] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 11].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 11].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 12] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 12] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 12].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 12].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 13] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 13] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 13].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 13].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 14] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 14] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 14].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 14].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 15] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 15] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 15].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 15].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 16] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 16] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 16].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 16].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 17] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 17] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 17].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 17].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 - 18] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 - 18] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 - 18].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 - 18].toFixed(0)) +
    "</br>" +
    "</br></br> Lower Surface </br>" +
    String((xm[0][npt2 + 0] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 0] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 0].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 0].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 1] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 1] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 1].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 1].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 2] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 2] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 2].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 2].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 3] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 3] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 3].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 3].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 4] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 4] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 4].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 4].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 5] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 5] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 5].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 5].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 6] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 6] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 6].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 6].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 7] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 7] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 7].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 7].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 8] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 8] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 8].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 8].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 9] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 9] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 9].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 9].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 10] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 10] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 10].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 10].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 11] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 11] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 11].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 11].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 12] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 12] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 12].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 12].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 13] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 13] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 13].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 13].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 14] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 14] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 14].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 14].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 15] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 15] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 15].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 15].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 16] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 16] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 16].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 16].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 17] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 17] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 17].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 17].toFixed(0)) +
    "</br>" +
    String((xm[0][npt2 + 18] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String((ym[0][npt2 + 18] / mapfact).toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plp[npt2 + 18].toFixed(3)) +
    "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
    String(plv[npt2 + 18].toFixed(0)) +
    "</br></br>";

  buttonSelect();
}

function gageButton() {
  outputButton = 1;
  plot = 1;
  document.getElementById("textArea").innerHTML = "";
  buttonSelect();
}

function generate_CSV() {
  var data = [72];
  var npt2 = 19;
  var mapfact = 4.0;

  var shape = "airfoil";
  if (shapeSelect == 1) shape = "airfoil";
  else if (shapeSelect == 2) shape = "ellipse";
  else if (shapeSelect == 3) shape = "plate";
  else if (shapeSelect == 4) shape = "cylinder";
  else if (shapeSelect == 5) shape = "ball";

  if (shapeSelect < 4) mapfact = 4.0;
  else if (shapeSelect >= 4) mapfact = 2.0;

  for (var i = 0; i < 19; i++) {
    data[i] = [
      String(xm[0][npt2 - i].toFixed(3) / mapfact),
      String(ym[0][npt2 - i].toFixed(3) / mapfact),
      String(plp[npt2 - i].toFixed(3)),
      String(plv[npt2 - i].toFixed(3)),
    ];
    data[19] = ["Lower Surface"];
    data[i + 20] = [
      String(xm[0][npt2 + i].toFixed(3) / mapfact),
      String(ym[0][npt2 + i].toFixed(3) / mapfact),
      String(plp[npt2 + i].toFixed(3)),
      String(plv[npt2 + i].toFixed(3)),
    ];
  }

  function download_csv() {
    var csv = "Upper Surface\nX/C,Y/C,P,V\n";

    data.forEach(function (row) {
      csv += row.join(",");
      csv += "\n";
    });

    var blob = new Blob([csv], { type: "text/csv" });
    if (navigator.msSaveOrOpenBlob) {
      // Works for Internet Explorer and Microsoft Edge
      navigator.msSaveOrOpenBlob(blob, shape + "Coordinates.csv");
    } else {
      var hiddenElement = document.createElement("a");
      hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
      hiddenElement.target = "_blank";
      hiddenElement.download = shape + "Coordinates.csv";
      hiddenElement.click();
      hiddenElement.remove();
    }
  }

  download_csv();
}

function plotButton() {
  //document.getElementById("probeButton").style.backgroundColor = "";
  document.getElementById("gageButton").style.backgroundColor = "";
  document.getElementById("geometryButton").style.backgroundColor = "";
  document.getElementById("dataButton").style.backgroundColor = "";
  document.getElementById("plotButton").style.backgroundColor = "yellow";
}

function probeButton() {
  outputButton = 4;
  probe();
  document.getElementById("textArea").innerHTML = "";
  plot = 12;
  buttonSelect();
}

function stallModelText() {
  document.getElementById("button1").innerHTML = "Stall Model";
  var stallModelText = document.getElementById("link1");
  stallModelText.setAttribute("href", "#Stall");
}

function idealFlowText() {
  document.getElementById("button1").innerHTML = "Ideal Flow";
  var idealFlowText = document.getElementById("link2");
  idealFlowText.setAttribute("href", "#Ideal");
}

window.onclick = function (event) {
  if (
    !event.target.matches(".dropbtn1") &&
    !event.target.matches(".dropbtn2")
  ) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function changeButtonText(idName, value1) {
  document.getElementById(idName).innerHTML = value1;
}

function showVal(idName, newVal) {
  document.getElementById(idName).innerHTML = newVal;
}

var count = 1;
function setColor(btn, color) {
  var property = document.getElementById(btn);
  if (count == 0) {
    property.style.backgroundColor = "white";
    count = 1;
  } else {
    property.style.backgroundColor = color;
    count = 0;
  }
}

function reset() {
  location.reload(false);
}
