import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
import { MySemiSphere } from './MySemiSphere.js';
import { MyCylinder } from './MyCylinder.js';
import { MyCone } from '../forest/MyCone.js';

/**
 * MyBucket
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyBucket extends CGFobject {
    constructor(scene) {
        super(scene);

        this.filled = false;

        this.initComponents();
        this.initMaterials(scene);
    }

    initMaterials(scene) {
        // Bucket Material
        this.bucketMaterial = new CGFappearance(scene);
        this.bucketMaterial.setAmbient(0.5, 0, 0, 1);
        this.bucketMaterial.setDiffuse(0.5, 0, 0, 1);
        this.bucketMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.bucketMaterial.setShininess(10.0);
        this.bucketMaterial.setTexture(scene.bucketTexture);
        this.bucketMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Water Material
        this.waterMaterial = new CGFappearance(scene);
        this.waterMaterial.setAmbient(0, 0.2, 0.4, 1);
        this.waterMaterial.setDiffuse(0, 0.7, 0.9, 0.7);
        this.waterMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.waterMaterial.setShininess(10.0);
        this.waterMaterial.setTexture(scene.waterTexture);
        this.waterMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Cable Material
        this.cableMaterial = new CGFappearance(scene);
        this.cableMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.cableMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
        this.cableMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.cableMaterial.setShininess(10.0);
        this.cableMaterial.setTexture(scene.bladeTexture);
        this.cableMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    initComponents() {
        this.bucket = new MySemiSphere(this.scene, 32, 32);
        this.cable = new MyCylinder(this.scene, 32, 32, 0.01, 2);
        this.water = new MyCone(this.scene, 1.3, 1);
    }

    display() {
        this.scene.pushMatrix();
            if (this.filled) {
                this.cableAngle = Math.PI / 4;
                this.distFromCenter = -1.4;
                this.distToBottom = -3.55;

                this.scene.translate(0, 0.32, 0);

                // Water
                this.waterMaterial.apply();
                this.scene.pushMatrix();
                this.scene.translate(0, -0.5, 0);
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.water.display();
                this.scene.popMatrix();
            } else {
                this.cableAngle = Math.PI / 6;
                this.distFromCenter = -1;
                this.distToBottom = -1.55;
            }

            // Bucket
            this.bucketMaterial.apply();
            this.scene.pushMatrix();
            if (this.filled) {
                this.scene.scale(1.4, 3.5, 1.4);
            } else {
                this.scene.scale(1, 1.5, 1);
            }
            this.scene.rotate(Math.PI, 1, 0, 0);
            this.bucket.display();
            this.scene.popMatrix();

            // Cables
            this.cableMaterial.apply();
            this.scene.pushMatrix();
            this.scene.translate(0, 0, this.distFromCenter);
            this.scene.rotate(this.cableAngle, 1, 0, 0);
            this.cable.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(Math.PI / 4, 0, 1, 0);
            this.scene.translate(0, 0, this.distFromCenter);
            this.scene.rotate(this.cableAngle, 1, 0, 0);
            this.cable.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(2 * Math.PI / 4, 0, 1, 0);
            this.scene.translate(0, 0, this.distFromCenter);
            this.scene.rotate(this.cableAngle, 1, 0, 0);
            this.cable.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(3 * Math.PI / 4, 0, 1, 0);
            this.scene.translate(0, 0, this.distFromCenter);
            this.scene.rotate(this.cableAngle, 1, 0, 0);
            this.cable.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(4 * Math.PI / 4, 0, 1, 0);
            this.scene.translate(0, 0, this.distFromCenter);
            this.scene.rotate(this.cableAngle, 1, 0, 0);
            this.cable.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(5 * Math.PI / 4, 0, 1, 0);
            this.scene.translate(0, 0, this.distFromCenter);
            this.scene.rotate(this.cableAngle, 1, 0, 0);
            this.cable.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(6 * Math.PI / 4, 0, 1, 0);
            this.scene.translate(0, 0, this.distFromCenter);
            this.scene.rotate(this.cableAngle, 1, 0, 0);
            this.cable.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.rotate(7 * Math.PI / 4, 0, 1, 0);
            this.scene.translate(0, 0, this.distFromCenter);
            this.scene.rotate(this.cableAngle, 1, 0, 0);
            this.cable.display();
            this.scene.popMatrix();

            // Release Valve
            this.scene.pushMatrix();
            this.scene.translate(0, this.distToBottom, 0);
            this.scene.scale(10, 0.03, 10);
            this.cable.display();
            this.scene.popMatrix();
        this.scene.popMatrix();

        // Main Cable
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(3) - 0.02, 0);
        this.scene.scale(2, 3, 2);
        this.cable.display();
        this.scene.popMatrix();
    }
}