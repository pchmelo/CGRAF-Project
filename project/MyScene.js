import { CGFscene, CGFcamera, CGFaxis, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MySphere } from "./objects/MySphere.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyBuilding } from "./objects/firefighters/MyBuilding.js";

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
    // -------------------------------------------------------------

    //Initialize scene objects -------------------------------------
    this.axis = new CGFaxis(this, 20, 1);
    this.plane = new MyPlane(this, 64);

    this.sphere = new MySphere(this, 32, 32);
    this.panorama = new MyPanorama(this, this.panoramaTexture);

    this.building = new MyBuilding(this, 60, 4, 3, this.windowTexture, [0.5, 0.5, 0.5]);
    // -------------------------------------------------------------

    // Auxiliary variables -----------------------------------------
    this.displayAxis = false;
    this.displayEarth = false;
    this.displayPlane = true;
    this.displayPanorama = true;
    this.displayBuilding = true;
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
    this.lights[0].setPosition(60, 60, -30, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      keysPressed = true;
    }
    if (keysPressed)
      console.log(text);
  }

  update(t) {
    this.checkKeys();
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
      this.translate(-20, -20, -100);
      this.building.display();
      this.popMatrix();
    }
    // -------------------------------------------------------------
  }
}
