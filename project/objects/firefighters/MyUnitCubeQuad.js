import { CGFobject } from '../../../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, topTexture = null) {
        super(scene);
        this.topTex = topTexture;
        this.initShapes();
    }
    
    initShapes() {
        this.top = new MyQuad(this.scene);
        this.side = new MyQuad(this.scene);
        this.bottom = new MyQuad(this.scene);
    }

    display() {
        // Top face
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.top.display();
        this.scene.popMatrix();

        // Bottom face
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.bottom.display();
        this.scene.popMatrix();

        // Front face
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.side.display();
        this.scene.popMatrix();

        // Back face
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.side.display();
        this.scene.popMatrix();

        // Right face
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.side.display();
        this.scene.popMatrix();

        // Left face
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.side.display();
        this.scene.popMatrix();
    }
}