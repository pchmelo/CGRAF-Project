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
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
    }

    initMaterials() {
        this.diamondMaterial = this.scene.customMaterial;

        this.triangleMaterial = new CGFappearance(this.scene);
        this.triangleMaterial.setAmbient(1.0, 0.75, 0.8, 1.0); // Pink
        this.triangleMaterial.setDiffuse(1.2, 0.75, 0.8, 1.0);
        this.triangleMaterial.setSpecular(1.0, 0.75, 0.8, 1.0);
        this.triangleMaterial.setShininess(50.0);

        this.parallelogramMaterial = new CGFappearance(this.scene);
        this.parallelogramMaterial.setAmbient(1.0, 1.0, 0.0, 1.0); // Yellow
        this.parallelogramMaterial.setDiffuse(1.0, 1.0, 0.0, 1.0);
        this.parallelogramMaterial.setSpecular(1.0, 1.0, 0.0, 1.0);
        this.parallelogramMaterial.setShininess(50.0);

        this.triangleSmall1Material = new CGFappearance(this.scene);
        this.triangleSmall1Material.setAmbient(1.0, 0.0, 0.0, 1.0); // Red
        this.triangleSmall1Material.setDiffuse(1.0, 0.0, 0.0, 1.0);
        this.triangleSmall1Material.setSpecular(1.0, 0.0, 0.0, 1.0);
        this.triangleSmall1Material.setShininess(50.0);

        this.triangleSmall2Material = new CGFappearance(this.scene);
        this.triangleSmall2Material.setAmbient(1.0, 0.0, 1.0, 1.0); // Purple
        this.triangleSmall2Material.setDiffuse(1.0, 0.0, 1.4, 1.0);
        this.triangleSmall2Material.setSpecular(1.0, 0.0, 1.0, 1.0);
        this.triangleSmall2Material.setShininess(50.0);

        this.triangleBig1Material = new CGFappearance(this.scene);
        this.triangleBig1Material.setAmbient(1.0, 0.5, 0.0, 1.0); // Orange
        this.triangleBig1Material.setDiffuse(1.0, 0.5, 0.0, 1.0);
        this.triangleBig1Material.setSpecular(1.0, 0.5, 0.0, 1.0);
        this.triangleBig1Material.setShininess(50.0);

        this.triangleBig2Material = new CGFappearance(this.scene);
        this.triangleBig2Material.setAmbient(0.0, 0.0, 1.0, 1.0); // Marine Blue
        this.triangleBig2Material.setDiffuse(0.0, 0.5, 1.0, 1.0);
        this.triangleBig2Material.setSpecular(0.0, 0.0, 1.0, 1.0);
        this.triangleBig2Material.setShininess(50.0)
    }

    display() {
        // Display diamond
        this.scene.pushMatrix();
        this.scene.translate(0, 2 * Math.sqrt(2) + Math.sqrt(2) / 2, 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.diamondMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();
    
        // Display triangle
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), (-4) + 2 * Math.sqrt(2), 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.triangleMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();
    
        // Display parallelogram
        this.scene.pushMatrix();
        this.scene.translate(0, -3 + 2 * Math.sqrt(2), 0);
        this.scene.scale(1, -1, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.parallelogramMaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
    
        // Display small triangle 1
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), -5.5 + 2 * Math.sqrt(2), 0);
        this.scene.rotate(-(Math.PI / 2), 0, 0, 1);
        this.triangleSmall1Material.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
    
        // Display small triangle 2
        this.scene.pushMatrix();
        this.scene.translate(-2, -4 - 1 / 6, 0);
        this.scene.rotate(-(3 *Math.PI / 4), 0, 0, 1);
        this.scene.translate(-1, 0, 0);
        this.triangleSmall2Material.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
    
        // Display big triangle 1
        this.scene.pushMatrix();
        this.scene.translate(0, 2 * Math.sqrt(2) - 2, 0);
        this.scene.rotate(-(Math.PI / 2), 0, 0, 1);
        this.triangleBig1Material.apply();
        this.triangleBig.display();
        this.scene.popMatrix();
    
        // Display big triangle 2
        this.scene.pushMatrix();
        this.scene.rotate(-(3 * Math.PI / 4), 0, 0, 1);
        this.scene.translate(0, -2, 0);
        this.triangleBig2Material.apply();
        this.triangleBig.display();
        this.scene.popMatrix();
    }
}