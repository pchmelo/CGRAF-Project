import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
import { MyTriangle } from '../forest/MyTriangle.js';

/**
 * MyFire
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {number} numFlames - Number of triangles/flames
 * @param {number} minSize - Minimum flame height
 * @param {number} maxSize - Maximum flame height
 */
export class MyFire extends CGFobject {
    constructor(scene, numFlames = 7, minSize = 1, maxSize = 3) {
        super(scene);
        this.numFlames = numFlames;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.flames = [];
        this.initMaterials();
        this.initFlames();
    }

    initMaterials() {
        this.fireMaterial = new CGFappearance(this.scene);
        this.fireMaterial.setAmbient(1.0, 0.5, 0.0, 1.0);
        this.fireMaterial.setDiffuse(1.0, 0.7, 0.2, 1.0);
        this.fireMaterial.setSpecular(1.0, 0.9, 0.5, 1.0);
        this.fireMaterial.setShininess(50.0);
        this.fireMaterial.setTexture(this.scene.fireTexture);
        this.fireMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    initFlames() {
        let angleStep = 0;

        for (let i = 0; i < this.numFlames; i++) {
            const scale = Math.random() * (this.maxSize - this.minSize) + this.minSize;
            const angle = angleStep;
            const x = (Math.random() - 0.5) * 0.5;
            const z = (Math.random() - 0.5) * 0.5;
            this.flames.push({ triangle: new MyTriangle(this.scene), scale, angle, x, z });

            angleStep += (Math.PI * 2) / this.numFlames;
        }
    }

    display() {
        this.fireMaterial.apply();
        for (const flame of this.flames) {
            this.scene.pushMatrix();
            this.scene.translate(flame.x, 0, flame.z);
            this.scene.rotate(flame.angle + this.scene.flameFlickering, 0, 1, 0);
            this.scene.scale(flame.scale * 0.5, flame.scale, 1);
            flame.triangle.display();
            this.scene.popMatrix();
        }
    }
}