import { CGFscene, CGFcamera, CGFaxis, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MySphere } from "./objects/MySphere.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyBuilding } from "./objects/firefighters/MyBuilding.js";
import { MyForest } from "./objects/forest/MyForest.js";
import { MyHeli } from "./objects/helicopter/MyHeli.js";
import { MyLake } from "./objects/waterAndFire/MyLake.js";
import { MyFire } from "./objects/waterAndFire/MyFire.js";
import { MyFireplace } from "./objects/waterAndFire/MyFireplace.js";

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
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFuncSeparate(
      this.gl.SRC_ALPHA,
      this.gl.ONE_MINUS_SRC_ALPHA,
      this.gl.ONE,
      this.gl.ONE
    );

    this.setUpdatePeriod(25);

    // Shaders -----------------------------------------------------
    this.fireShader = new CGFshader(this.gl, "shaders/fire.vert", "shaders/fire.frag");
    this.blinkerShader = new CGFshader(this.gl, "shaders/default.vert", "shaders/blinker.frag");
    this.helipadShader = new CGFshader(this.gl, "shaders/default.vert", "shaders/helipad.frag");
    // -------------------------------------------------------------

    // Initialize textures -----------------------------------------
    this.earthTexture = new CGFtexture(this, "textures/earth.jpg");
    this.grassTexture = new CGFtexture(this, "textures/grass.jpg");
    this.panoramaTexture = new CGFtexture(this, "textures/panorama.jpg");
    this.wallTexture = new CGFtexture(this, "textures/wall.jpg");
    this.windowTexture = new CGFtexture(this, "textures/window.jpg");
    this.signTexture = new CGFtexture(this, "textures/sign.png");
    this.helipadTexture = new CGFtexture(this, "textures/helipad.png");
    this.crownTexture = new CGFtexture(this, "textures/shadedLeaves.jpg");
    this.crownTopTexture = new CGFtexture(this, "textures/leaves.jpg");
    this.crownBottomTexture = new CGFtexture(this, "textures/shadedLeavesBot.jpg");
    this.treeShadowTexture = new CGFtexture(this, "textures/treeShadow.png");
    this.trunkTexture = new CGFtexture(this, "textures/trunk.jpg");
    this.fuselageTexture = new CGFtexture(this, "textures/fuselage.jpg");
    this.tintedGlassTexture = new CGFtexture(this, "textures/tinted_glass.jpg");
    this.bladeTexture = new CGFtexture(this, "textures/blade.jpg");
    this.bucketTexture = new CGFtexture(this, "textures/bucket.jpg");
    this.waterTexture = new CGFtexture(this, "textures/water.jpg");
    this.fireTexture = new CGFtexture(this, "textures/fire.png");
    this.lakeTexture = new CGFtexture(this, "textures/lake.png");
    this.blinkerTexture = new CGFtexture(this, "textures/blinker.jpg");
    this.upTexture = new CGFtexture(this, "textures/upPad.png");
    this.downTexture = new CGFtexture(this, "textures/downPad.png");
    // -------------------------------------------------------------

    //Initialize scene objects -------------------------------------
    this.axis = new CGFaxis(this, 20, 1);
    this.plane = new MyPlane(this, 64);

    this.sphere = new MySphere(this, 32, 32);
    this.panorama = new MyPanorama(this, this.panoramaTexture);

    this.building = new MyBuilding(this, 50, 4, 3, this.windowTexture, [0.5, 0.5, 0.5]);
    this.forest1 = new MyForest(this, 7, 7, 450, 450);
    this.forest2 = new MyForest(this, 7, 7, 450, 450);

    this.helicopter = new MyHeli(this, -10, -0.25, -9, 0, 0);

    this.lake = new MyLake(this);
    this.fire = new MyFire(this, 6, 10, 14);
    this.fireplace = new MyFireplace(this);
    // -------------------------------------------------------------

    // Auxiliary variables -----------------------------------------
    this.displayAxis = false;
    this.displayEarth = false;
    this.displayPlane = true;
    this.displayPanorama = true;
    this.displayBuilding = true;
    this.displayForest = true;

    this.lakePositionX = 15;
    this.lakePositionY = -19.99;
    this.lakePositionZ = 10;

    this.flamePositionX = -5;
    this.flamePositionY = -20;
    this.flamePositionZ = 30;
    this.flameScaler = 1.0;
    this.extingishing = false;

    this.rotationFactor = 0;
    this.speedFactor = 1;
    // -------------------------------------------------------------
  }
  
  initCameras() {
    this.camera = new CGFcamera(
      1,  // field of view (fov)
      0.1,
      1000,
      vec3.fromValues(10, 10, -20),
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

    // Empty Bucket
    if (this.gui.isKeyPressed("KeyO") && this.helicopter.canEmptyBucket()) {
        text += " O ";
        keysPressed = true;

        this.extingishing = true;
    }

    if (keysPressed) {
        console.log(text);
    }
  }

  update(t) {
    this.time = (performance.now() % 1000) / 1000; // Normalize time to [0, 1] range
    //console.log(this.time);

    // Reset helicopter position -----------------------------------
    if (this.gui.isKeyPressed("KeyR")) {
        this.helicopter.x = -10;
        this.helicopter.y = -0.25;
        this.helicopter.z = -9;
        this.helicopter.angle = 0;
        this.helicopter.velocity = 0;
        this.awaitLiftOff = false;
        this.helicopter.retract();
        this.extingishing = false;
        this.flameScaler = 1.0;
        this.inFlight = false;
        this.isLiftingOff = false;
        this.isLiftingOffBuilding = false;
        this.isLandingBuilding = false;
        this.isLandingLake = false;
        this.landing = false;
        this.camera.setPosition(vec3.fromValues(10, 10, -20));
        this.camera.setTarget(vec3.fromValues(0, 0, 0));
    }

    // -------------------------------------------------------------

    // Lift off ----------------------------------------------------
    if (this.gui.isKeyPressed("KeyP") && !this.inFlight && !this.isLandingBuilding && !this.isLandingLake) {
        this.isLiftingOff = true;
        this.awaitLiftOff = false;
    }

    if (this.isLiftingOff) {
        this.helicopter.y += 0.1;

        if (this.helicopter.isBucketFilled()) { // If the bucket is filled, we are lifting off in the lake
            this.helicopter.y += 0.1;
        } else {
            this.isLiftingOffBuilding = true;
        }

        if (this.helicopter.y >= 5) {
            this.isLiftingOff = false;
            this.isLiftingOffBuilding = false;
            this.reset = true;
            this.inFlight = true; // Enable user control
            this.helicopter.deploy();
        }

        this.rotationFactor = (t * 360 / 1000);
    }

    // -------------------------------------------------------------

    // Landing Handling --------------------------------------------

    // Land Building
    if (this.gui.isKeyPressed("KeyL") && this.inFlight && !this.isLiftingOff && !this.helicopter.isBucketFilled() && !this.helicopter.canLandLake()) {
        this.inFlight = false; // Disable user control
        this.isLandingBuilding = true;
        this.helicopter.retract();
    }

    // Land Lake
    if (this.gui.isKeyPressed("KeyL") && this.inFlight && !this.isLiftingOff && this.helicopter.canLandLake()) {
        this.inFlight = false; // Disable user control
        this.isLandingLake = true;
    }

    // Helicopter landing on building
    if (this.isLandingBuilding) {
        const targetX = -10;
        const targetY = -0.25;
        const targetZ = -9;

        // Calculate the angle to the target position
        const dx = targetX - this.helicopter.x;
        const dz = targetZ - this.helicopter.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        const desiredAngle = Math.atan2(dx, dz);

        // Normalize helicopter angle
        let currentAngle = ((this.helicopter.angle + Math.PI) % (2 * Math.PI)) - Math.PI;
        let angleDiff = desiredAngle - currentAngle;

        // Normalize angleDiff
        angleDiff = ((angleDiff + Math.PI) % (2 * Math.PI)) - Math.PI;

        const turnSpeed = 0.05;

        if (Math.abs(angleDiff) > 0.01 && !this.landing) {
            console.log("Turning towards target");
            this.helicopter.turn(Math.sign(angleDiff) * Math.min(turnSpeed, Math.abs(angleDiff)));
            this.helicopter.accelerate(0);

            this.rotationFactor = (t * 360 / 1000) * 2;
        } else {
            // Move forward if not at target, slow down when close
            if (distance > 1  && !this.landing) {
                const stoppingDistance = this.helicopter.distUntilStop();
                if (stoppingDistance >= distance) {
                    console.log("Decelerating to stop");
                    this.helicopter.accelerate(0);

                    this.rotationFactor = (t * 360 / 1000) * 2;
                } else {
                    console.log("Moving forward");
                    // Move forward, but slower as we get closer
                    let speed = 0.005 * (distance / 25);
                    if (speed < 0.002) speed = 0.002;
                    this.helicopter.accelerate(speed);

                    this.rotationFactor = (t * 360 / 1000) * 3;
                }
            } else {
                console.log("Landing");
                this.landing = true;
                this.helicopter.accelerate(0);
                if (this.helicopter.y > targetY) {
                    this.helicopter.y -= 0.1;
                    if (this.helicopter.y <= targetY) {
                        this.helicopter.y = targetY;
                        this.landing = false;
                        this.reset = true;
                        this.isLandingBuilding = false; // Finished landing
                    }
                } else {
                    this.helicopter.y = targetY;
                    this.landing = false;
                    this.reset = true;
                    this.isLandingBuilding = false; // Finished landing
                }

                this.rotationFactor = (t * 360 / 1000);
            }
        }
    }

    // Helicopter landing on lake
    if (this.isLandingLake) {
        this.helicopter.y -= 0.2;

        if (this.helicopter.y <= -16.5) {
            this.isLandingLake = false;
            this.helicopter.fillBucket();
            this.awaitLiftOff = true;
        }

        this.rotationFactor = (t * 360 / 1000);
    }

    // -------------------------------------------------------------

    // Extinguishing fire ------------------------------------------
    if (this.extingishing) {
        this.inFlight = false; // Disable user control while extinguishing
        this.awaitLiftOff = true; // Keep hovering

        if (this.helicopter.emptyBucket()) {
            this.flameScaler -= 0.01;
        } else {
            this.flameScaler = 0;
            this.extingishing = false; // Stop extinguishing when bucket is empty
            this.inFlight = true;
            this.awaitLiftOff = false;
        }
    }

    // -------------------------------------------------------------

    // Flying Handling ---------------------------------------------

    // Maintain helicopter hovering
    if (this.awaitLiftOff) {
        this.rotationFactor = (t * 360 / 1000);
    }

    // Helicopter in flight (with user control)
    if (this.inFlight) {
        this.checkKeys();

        // Camera offset
        const distance = 20;
        const height = 15;
        const offsetX = Math.sin(this.helicopter.angle) * distance;
        const offsetZ = Math.cos(this.helicopter.angle) * distance;

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
      this.scale(600, 1, 600);
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

    // Forest ------------------------------------------------------
    let forestSelector = true;

    if (this.displayForest) {
      for (let i = 0; i < 6; i++) {
        this.pushMatrix();
        this.rotate(i * Math.PI / 3, 0, 1, 0);
        this.translate(0, -20.2, 100);
        this.scale(0.25, 0.25, 0.25);
        if (forestSelector) {
          this.forest1.display();
          forestSelector = false;
        } else {
          this.forest2.display();
          forestSelector = true;
        }
        this.popMatrix();
      }
    }
    // -------------------------------------------------------------

    // Helicopter --------------------------------------------------
      this.pushMatrix();
      this.helicopter.display();
      this.popMatrix();
    // -------------------------------------------------------------

    // Lake --------------------------------------------------------
      this.pushMatrix();
      this.translate(this.lakePositionX, this.lakePositionY, this.lakePositionZ);
      this.scale(40, 1, 40);
      this.rotate(-Math.PI / 2, 1, 0, 0);
      this.lake.display();
      this.popMatrix();
    // -------------------------------------------------------------

    // Fireplace ---------------------------------------------------
      this.pushMatrix();
      this.translate(this.flamePositionX, this.flamePositionY + 1.25, this.flamePositionZ);
      this.fireplace.display();
      this.popMatrix();
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

    // Fire --------------------------------------------------------
      this.pushMatrix();
      this.translate(this.flamePositionX, this.flamePositionY, this.flamePositionZ);
      this.scale(this.flameScaler, this.flameScaler, this.flameScaler);
      this.fire.display();
      this.popMatrix();
    // -------------------------------------------------------------
  }
}
