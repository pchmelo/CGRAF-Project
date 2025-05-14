import { CGFscene, CGFcamera, CGFaxis, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MySphere } from "./objects/MySphere.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyBuilding } from "./objects/firefighters/MyBuilding.js";
import { MyForest } from "./objects/forest/MyForest.js";
import { MyHeli } from "./objects/helicopter/MyHeli.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0, 0, 0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.enableTextures(true);

    // Enable blending for transparent textures
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    this.setUpdatePeriod(50);

    // Initialize textures -----------------------------------------
    this.earthTexture = new CGFtexture(this, "textures/earth.jpg");
    this.grassTexture = new CGFtexture(this, "textures/grass.jpg");
    this.panoramaTexture = new CGFtexture(this, "textures/panorama.jpg");
    this.windowTexture = new CGFtexture(this, "textures/window.jpg");
    this.signTexture = new CGFtexture(this, "textures/sign.png");
    this.helipadTexture = new CGFtexture(this, "textures/helipad.png");
    this.crownTexture = new CGFtexture(this, "textures/leaves.jpg");
    this.trunkTexture = new CGFtexture(this, "textures/trunk.jpg");
    this.fuselageTexture = new CGFtexture(this, "textures/fuselage.jpg");
    this.tintedGlassTexture = new CGFtexture(this, "textures/tinted_glass.jpg");
    this.bladeTexture = new CGFtexture(this, "textures/blade.jpg");
    this.bucketTexture = new CGFtexture(this, "textures/bucket.jpg");
    this.waterTexture = new CGFtexture(this, "textures/water.jpg");
    // -------------------------------------------------------------

    //Initialize scene objects -------------------------------------
    this.axis = new CGFaxis(this, 20, 1);
    this.plane = new MyPlane(this, 64);

    this.sphere = new MySphere(this, 32, 32);
    this.panorama = new MyPanorama(this, this.panoramaTexture);

    this.building = new MyBuilding(this, 50, 4, 3, this.windowTexture, [0.5, 0.5, 0.5]);
    this.forest = new MyForest(this, 7, 10, 200, 100);

    this.helicopter = new MyHeli(this, -10, -0.25, -9, Math.PI / 2, 0);
    // -------------------------------------------------------------

    // Auxiliary variables -----------------------------------------
    this.displayAxis = false;
    this.displayEarth = false;
    this.displayPlane = true;
    this.displayPanorama = true;
    this.displayBuilding = true;
    this.displayForest = true;

    this.rotationFactor = 0;
    this.speedFactor = 1;
    // -------------------------------------------------------------
  }
  
  initCameras() {
    this.camera = new CGFcamera(
      1,  // field of view (fov)
      0.1,
      1000,
      vec3.fromValues(10, 10, 10),
      vec3.fromValues(0, 0, 0)
    );
  }

  initLights() {
    this.setGlobalAmbientLight(0.3, 0.3, 0.3, 0.1);

    this.lights[0].setPosition(0, 0, 30, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 100.0);
    this.lights[0].enable();
    this.lights[0].update();

    this.lights[1].setPosition(100, 100, -100, 1);  // The Sun
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 500.0);
    this.lights[1].setSpecular(1.0, 1.0, 1.0, 100.0);
    this.lights[1].enable();
    this.lights[1].update();
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    // Move Forwards
    if (this.gui.isKeyPressed("KeyW")) {
        text += " W ";
        keysPressed = true;

        this.helicopter.accelerate(0.015);
    } else {
        this.helicopter.accelerate(0);
    }

    // Move Backwards
    if (this.gui.isKeyPressed("KeyS")) {
        text += " S ";
        keysPressed = true;

        this.helicopter.accelerate(-0.015);
    } else {
        this.helicopter.accelerate(0);
    }

    // Turn Left
    if (this.gui.isKeyPressed("KeyA")) {
        text += " A ";
        keysPressed = true;

        this.helicopter.turn(0.1 * this.speedFactor);
    }

    // Turn Right
    if (this.gui.isKeyPressed("KeyD")) {
        text += " D ";
        keysPressed = true;

        this.helicopter.turn(-0.1 * this.speedFactor);
    }

    // Fill Bucket
    if (this.gui.isKeyPressed("KeyF")) {
        text += " F ";
        keysPressed = true;

        this.helicopter.fillBucket();
    }

    // Empty Bucket
    if (this.gui.isKeyPressed("KeyE")) {
        text += " E ";
        keysPressed = true;

        this.helicopter.emptyBucket();
    }
  }

  update(t) {
    // Reset helicopter position
    if (this.gui.isKeyPressed("KeyR")) {
        this.helicopter.x = -10;
        this.helicopter.y = -0.25;
        this.helicopter.z = -9;
        this.helicopter.angle = Math.PI / 2;
        this.helicopter.velocity = 0;
        this.helicopter.retract();
        this.helicopter.emptyBucket();
        this.inFlight = false;
        this.isLiftingOffBuilding = false;
        this.isLandingBuilding = false;
        this.camera.setPosition(vec3.fromValues(10, 10, 10));
        this.camera.setTarget(vec3.fromValues(0, 0, 0));
    }

    // Lift off Building
    if (this.gui.isKeyPressed("KeyP") && !this.inFlight && !this.isLandingBuilding && this.helicopter.x >= -15 && this.helicopter.x <= -5 && this.helicopter.z >= -15 && this.helicopter.z <= -5) {
        this.isLiftingOffBuilding = true;
    }

    if (this.isLiftingOffBuilding) {
        this.helicopter.y += 0.1;

        if (this.helicopter.y >= 5) {
            this.isLiftingOffBuilding = false;
            this.inFlight = true; // Enable user control
            this.helicopter.deploy();
        }

        this.rotationFactor = (t * 360 / 1000);
    }

    // Land Building
    if (this.gui.isKeyPressed("KeyL") && this.inFlight && !this.isLiftingOffBuilding && this.helicopter.x >= -15 && this.helicopter.x <= -5 && this.helicopter.z >= -15 && this.helicopter.z <= -5 && this.helicopter.velocity == 0) {
        this.inFlight = false; // Disable user control
        this.isLandingBuilding = true;
        this.helicopter.retract();
    }

    if (this.isLandingBuilding) {
        this.helicopter.y -= 0.1;

        if (this.helicopter.y <= -0.25) {
            this.isLandingBuilding = false;
            this.helicopter.y = -0.25; // Reset to ground level
        }

        this.rotationFactor = (t * 360 / 1000);
    }

    if (this.inFlight) {
        this.checkKeys();

        // Camera offset
        const distance = 20;
        const height = 15;
        const offsetX = Math.sin(this.helicopter.angle - Math.PI / 2) * distance;
        const offsetZ = Math.cos(this.helicopter.angle - Math.PI / 2) * distance;

        // Update camera position to stay behind the helicopter
        this.camera.setPosition(vec3.fromValues(
            this.helicopter.x - offsetX + 5,
            this.helicopter.y + height,
            this.helicopter.z - offsetZ
        ));

        // Make the camera look at the helicopter's center
        this.camera.setTarget(vec3.fromValues(
            this.helicopter.x,
            this.helicopter.y,
            this.helicopter.z
        ));

        // Update rotation factor for helicopter blades
        this.rotationFactor = (t * 360 / 1000) * 3;
    }
}

  setDefaultAppearance() {
    this.setAmbient(0.5, 0.5, 0.5, 1.0);
    this.setDiffuse(0.5, 0.5, 0.5, 1.0);
    this.setSpecular(0.5, 0.5, 0.5, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    // Plane -------------------------------------------------------
    if (this.displayPlane) {
      this.pushMatrix();
      this.scale(400, 1, 400);
      this.translate(0, -20, 0);
      this.rotate(-Math.PI / 2, 1, 0, 0);
      this.plane.display();
      this.popMatrix();
    }
    // -------------------------------------------------------------

    // Sphere ------------------------------------------------------
    if (this.displayEarth) {
      this.pushMatrix();
      this.translate(0, 20, 0);
      this.scale(20, 20, 20);
      this.sphere.display();
      this.popMatrix();
    }
    // -------------------------------------------------------------

    // Panorama ----------------------------------------------------
    if (this.displayPanorama) {
      this.pushMatrix();
      this.translate(0, -50, 0);
      this.panorama.display();
      this.popMatrix();
    }
    // -------------------------------------------------------------

    // Building ----------------------------------------------------
    if (this.displayBuilding) {
      this.pushMatrix();
      this.translate(-10, -20, -10);
      this.scale(0.25, 0.25, 0.25);
      this.building.display();
      this.popMatrix();
    }
    // -------------------------------------------------------------

    // Forest ------------------------------------------------------
    if (this.displayForest) {
      this.pushMatrix();
      this.translate(-5, -20.2, 50);
      this.scale(0.25, 0.25, 0.25);
      this.forest.display();
      this.popMatrix();
    }
    // -------------------------------------------------------------

    // Helicopter --------------------------------------------------
      this.pushMatrix();
      this.helicopter.display();
      this.popMatrix();
    // -------------------------------------------------------------
  }
}
