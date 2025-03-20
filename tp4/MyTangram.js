import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from './previous_shapes/MyDiamond.js';
import { MyTriangle } from './previous_shapes/MyTriangle.js';
import { MyParallelogram } from './previous_shapes/MyParallelogram.js';
import { MyTriangleSmall } from './previous_shapes/MyTriangleSmall.js';
import { MyTriangleBig } from './previous_shapes/MyTriangleBig.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initShapes();
        this.initMaterials();
    }
    
    initShapes() {
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleSmall1 = new MyTriangleSmall(this.scene);
        this.triangleSmall2 = new MyTriangleSmall(this.scene);
        this.triangleBig1 = new MyTriangleBig(this.scene);
        this.triangleBig2 = new MyTriangleBig(this.scene);
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/tangram.png');
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        // Display diamond
        this.scene.pushMatrix();
        this.scene.translate(0, 2 * Math.sqrt(2) + Math.sqrt(2) / 2, 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.material.apply();
        this.diamond.display();
        this.scene.popMatrix();
    
        // Display triangle
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), (-4) + 2 * Math.sqrt(2), 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.material.apply();
        this.triangle.display();
        this.scene.popMatrix();
    
        // Display parallelogram
        this.scene.pushMatrix();
        this.scene.translate(0, -3 + 2 * Math.sqrt(2), 0);
        this.scene.scale(1, -1, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.material.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
    
        // Display small triangle 1
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), -5.5 + 2 * Math.sqrt(2), 0);
        this.scene.rotate(-(Math.PI / 2), 0, 0, 1);
        this.material.apply();
        this.triangleSmall1.changeColour();
        this.triangleSmall1.display();
        this.scene.popMatrix();
    
        // Display small triangle 2
        this.scene.pushMatrix();
        this.scene.translate(-2, -4 - 1 / 6, 0);
        this.scene.rotate(-(3 *Math.PI / 4), 0, 0, 1);
        this.scene.translate(-1, 0, 0);
        this.material.apply();
        this.triangleSmall2.display();
        this.scene.popMatrix();
    
        // Display big triangle 1
        this.scene.pushMatrix();
        this.scene.translate(0, 2 * Math.sqrt(2) - 2, 0);
        this.scene.rotate(-(Math.PI / 2), 0, 0, 1);
        this.material.apply();
        this.triangleBig1.changeColour();
        this.triangleBig1.display();
        this.scene.popMatrix();
    
        // Display big triangle 2
        this.scene.pushMatrix();
        this.scene.rotate(-(3 * Math.PI / 4), 0, 0, 1);
        this.scene.translate(0, -2, 0);
        this.material.apply();
        this.triangleBig2.display();
        this.scene.popMatrix();
    }
}