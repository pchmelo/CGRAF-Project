import { CGFscene, CGFcamera, CGFaxis, CGFappearance } from "../lib/CGF.js";
import { MyPyramid } from "./MyPyramid.js";
import { MyCone } from "./MyCone.js";
import { MyPlane } from "./MyPlane.js";

import { MyTangram } from "./MyTangram.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyPrism } from "./MyPrism.js";
import { MyCylinder } from "./MyCylinder.js";

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
        this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 5);
        this.cone = new MyCone(this, 3, 1);
        this.pyramid = new MyPyramid(this, 3, 1);

        // -------------------------------------------

        this.unitCube = new MyUnitCube(this);
        this.tangram = new MyTangram(this);
        this.prism = new MyPrism(this, 8, 20);
        this.cylinder = new MyCylinder(this, 8, 20);

        // -------------------------------------------
        
        this.objects = [this.plane, this.pyramid, this.cone];

        // Labels and ID's for object selection on MyInterface
        this.objectIDs = { 'Plane': 0 , 'Pyramid': 1, 'Cone': 2};

        //Other variables connected to MyInterface
        this.selectedObject = 0;
        this.selectedMaterial = 0;
        this.displayAxis = true;
        this.displayNormals = false;
        this.objectComplexity = 0.5;
        this.scaleFactor = 1.0;

        this.displayObjects = false;
        this.displayUnitCube = false;
        this.displayTangram = false;
        this.displayPrism = false;
        this.displayCylinder = true;

        this.selectedCube = 1;

    }
    initLights() {
        this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

        this.lights[0].setPosition(2.0, 3.0, 3.0, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].setVisible(true);
        this.lights[0].update();

        this.lights[1].setPosition(0.0, -1.0, 2.0, 1.0);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setSpecular(1.0, 1.0, 0.0, 1.0);
        this.lights[1].disable();
        this.lights[1].setVisible(true);
        this.lights[1].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(10, 10, 10), vec3.fromValues(0, 0, 0));
    }

    hexToRgbA(hex)
    {
        var ret;
        //either we receive a html/css color or a RGB vector
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            ret=[
                parseInt(hex.substring(1,3),16).toPrecision()/255.0,
                parseInt(hex.substring(3,5),16).toPrecision()/255.0,
                parseInt(hex.substring(5,7),16).toPrecision()/255.0,
                1.0
            ];
        }
        else
            ret=[
                hex[0].toPrecision()/255.0,
                hex[1].toPrecision()/255.0,
                hex[2].toPrecision()/255.0,
                1.0
            ];
        return ret;
    }

    updateCustomMaterial() {
        this.customMaterial.setAmbient(...this.hexToRgbA(this.customMaterialValues['Ambient']));
        this.customMaterial.setDiffuse(...this.hexToRgbA(this.customMaterialValues['Diffuse']));
        this.customMaterial.setSpecular(...this.hexToRgbA(this.customMaterialValues['Specular']));

        this.customMaterial.setShininess(this.customMaterialValues['Shininess']);

    };

    updateObjectComplexity(){
        this.objects[this.selectedObject].updateBuffers(this.objectComplexity);
    }


    initMaterials() {
        // Red Ambient (no diffuse, no specular)
        this.material1 = new CGFappearance(this);
        this.material1.setAmbient(1, 0, 0, 1.0);
        this.material1.setDiffuse(0, 0, 0, 1.0);
        this.material1.setSpecular(0, 0, 0, 1.0);
        this.material1.setShininess(10.0);

        // Red Diffuse (no ambient, no specular)
        this.material2 = new CGFappearance(this);
        this.material2.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.material2.setDiffuse(1, 0, 0, 1.0);
        this.material2.setSpecular(0, 0, 0, 1.0);
        this.material2.setShininess(10.0);

        // Red Specular (no ambient, no diffuse)
        this.material3 = new CGFappearance(this);
        this.material3.setAmbient(0, 0, 0, 1.0);
        this.material3.setDiffuse(0, 0, 0, 1.0);
        this.material3.setSpecular(1, 0, 0, 1.0);
        this.material3.setShininess(10.0);

        this.cubeMaterial = new CGFappearance(this);
        this.cubeMaterial.setAmbient(0.75, 0.75, 0.75, 1.0);
        this.cubeMaterial.setDiffuse(0.75, 0.75, 0.75, 1.0);
        this.cubeMaterial.setSpecular(0.75, 0.75, 0.75, 1.0);
        this.cubeMaterial.setShininess(10.0);

        // Wood material
        this.woodMaterial = new CGFappearance(this);
        this.woodMaterial.setAmbient(0.4, 0.2, 0.1, 1.0);
        this.woodMaterial.setDiffuse(0.6, 0.3, 0.15, 1.0);
        this.woodMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.woodMaterial.setShininess(10.0);

        // Custom material (can be changed in the interface)
        // initially midrange values on ambient, diffuse and specular, on R, G and B respectively

        this.customMaterialValues = {
            'Ambient': '#0000ff',
            'Diffuse': '#ff0000',
            'Specular': '#000000',
            'Shininess': 10
        }
        this.customMaterial = new CGFappearance(this);

        this.updateCustomMaterial();

        this.materials = [this.material1, this.material2, this.material3, this.customMaterial];

        this.cubeMaterials = [this.cubeMaterial, this.woodMaterial];

        // Labels and ID's for object selection on MyInterface
        this.materialIDs = {'Red Ambient': 0, 'Red Diffuse': 1, 'Red Specular': 2, 'Custom': 3 };

        this.cubeMaterialIDs = {'Default': 0, 'Wood': 1};
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
        
        this.lights[0].update();
        this.lights[1].update();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // ---- BEGIN Primitive drawing section

        this.materials[this.selectedMaterial].apply();

        var sca = [
            this.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            this.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            this.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
          ];
      
          this.multMatrix(sca);

        this.pushMatrix();
        
        if (this.displayNormals)
            this.objects[this.selectedObject].enableNormalViz();
        else
            this.objects[this.selectedObject].disableNormalViz();
        
        if (this.displayObjects) this.objects[this.selectedObject].display();
        this.popMatrix();

        // -------------------------------------------

        this.pushMatrix();
        this.scale(9, 9, 9);
        this.translate(0.5, -0.5, 0.5);
        this.cubeMaterials[this.selectedCube].apply();
        if (this.displayUnitCube) this.unitCube.display();
        this.popMatrix();
    
        this.pushMatrix();
        this.translate(4.5, 0.01, 4.5);
        this.rotate(-Math.PI / 2, 1, 0, 0);
        if (this.displayTangram) this.tangram.display();
        this.popMatrix();

        this.pushMatrix();

        if (this.displayNormals)
            this.prism.enableNormalViz();
        else
            this.prism.disableNormalViz();

        this.cubeMaterials[this.selectedCube].apply();
        if (this.displayPrism) this.prism.display();
        this.popMatrix();

        this.pushMatrix();

        if (this.displayNormals)
            this.cylinder.enableNormalViz();
        else
            this.cylinder.disableNormalViz();

        this.cubeMaterials[this.selectedCube].apply();
        if (this.displayCylinder) this.cylinder.display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }
}