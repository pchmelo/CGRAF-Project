import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initShapes();
        this.initMaterials();
    }
    
    initShapes() {
        this.quad = new MyQuad(this.scene);
    }

    initMaterials() {
        this.quadMaterial = new CGFappearance(this.scene);
        this.quadMaterial.setAmbient(0.75, 0.75, 0.75, 1.0); // Light grey
        this.quadMaterial.setDiffuse(0.75, 0.75, 0.75, 1.0);
        this.quadMaterial.setSpecular(0.75, 0.75, 0.75, 1.0);
        this.quadMaterial.setShininess(10.0);
    }

    display() {
        // Create a cube out of squares
    
        // Front face
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quadMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        // Back face
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.quadMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        // Top face
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.quadMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        // Bottom face
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0, -0.5);
        this.quadMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        // Right face
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.quadMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        // Left face
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.translate(0, 0, -0.5);
        this.quadMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();
    }
}
