import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyTriangle } from './MyTriangle.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
import { MyTriangleBig } from './MyTriangleBig.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.initMaterials();
    }
    
    initBuffers() {
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleSmall1 = new MyTriangleSmall(this.scene);
        this.triangleSmall2 = new MyTriangleSmall(this.scene);
        this.triangleBig1 = new MyTriangleBig(this.scene);
        this.triangleBig2 = new MyTriangleBig(this.scene);
    }

    initMaterials() {
        this.diamondMaterial = new CGFappearance(this.scene);
        this.diamondMaterial.setAmbient(0.0, 1.0, 0.0, 1.0); // Green
        this.diamondMaterial.setDiffuse(0.0, 1.0, 0.0, 1.0);
        this.diamondMaterial.setSpecular(0.0, 1.0, 0.0, 1.0);
        this.diamondMaterial.setShininess(10.0);

        this.triangleMaterial = new CGFappearance(this.scene);
        this.triangleMaterial.setAmbient(1.0, 0.75, 0.8, 1.0); // Pink
        this.triangleMaterial.setDiffuse(1.0, 0.0, 0.0, 1.0);
        this.triangleMaterial.setSpecular(1.0, 0.0, 0.0, 1.0);
        this.triangleMaterial.setShininess(10.0);

        this.parallelogramMaterial = new CGFappearance(this.scene);
        this.parallelogramMaterial.setAmbient(1.0, 1.0, 0.0, 1.0); // Yellow
        this.parallelogramMaterial.setDiffuse(1.0, 1.0, 0.0, 1.0);
        this.parallelogramMaterial.setSpecular(1.0, 1.0, 0.0, 1.0);
        this.parallelogramMaterial.setShininess(10.0);

        this.triangleSmall1Material = new CGFappearance(this.scene);
        this.triangleSmall1Material.setAmbient(1.0, 0.0, 0.0, 1.0); // Red
        this.triangleSmall1Material.setDiffuse(0.0, 0.0, 1.0, 1.0);
        this.triangleSmall1Material.setSpecular(0.0, 0.0, 1.0, 1.0);
        this.triangleSmall1Material.setShininess(10.0);

        this.triangleSmall2Material = new CGFappearance(this.scene);
        this.triangleSmall2Material.setAmbient(1.0, 0.0, 1.0, 1.0); // Purple
        this.triangleSmall2Material.setDiffuse(1.0, 0.0, 1.0, 1.0);
        this.triangleSmall2Material.setSpecular(1.0, 0.0, 1.0, 1.0);
        this.triangleSmall2Material.setShininess(10.0);

        this.triangleBig1Material = new CGFappearance(this.scene);
        this.triangleBig1Material.setAmbient(1.0, 0.5, 0.0, 1.0); // Orange
        this.triangleBig1Material.setDiffuse(1.0, 0.5, 0.0, 1.0);
        this.triangleBig1Material.setSpecular(1.0, 0.5, 0.0, 1.0);
        this.triangleBig1Material.setShininess(10.0);

        this.triangleBig2Material = new CGFappearance(this.scene);
        this.triangleBig2Material.setAmbient(0.0, 0.0, 1.0, 1.0); //Blue
        this.triangleBig2Material.setDiffuse(0.0, 1.0, 1.0, 1.0);
        this.triangleBig2Material.setSpecular(0.0, 1.0, 1.0, 1.0);
        this.triangleBig2Material.setShininess(10.0);
    }

    display() {
        // Display diamond
        this.scene.pushMatrix();
        this.diamond.tra
        this.diamondMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        // Display triangle
        this.scene.pushMatrix();
        this.triangleMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // Display parallelogram
        this.scene.pushMatrix();
        this.parallelogramMaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        // Display small triangle 1
        this.scene.pushMatrix();
        this.triangleSmall1Material.apply();
        this.triangleSmall1.display();
        this.scene.popMatrix();

        // Display small triangle 2
        this.scene.pushMatrix();
        this.triangleSmall2Material.apply();
        this.triangleSmall2.display();
        this.scene.popMatrix();

        // Display big triangle 1
        this.scene.pushMatrix();
        this.triangleBig1Material.apply();
        this.triangleBig1.display();
        this.scene.popMatrix();

        // Display big triangle 2
        this.scene.pushMatrix();
        this.triangleBig2Material.apply();
        this.triangleBig2.display();
        this.scene.popMatrix();
    }
}
