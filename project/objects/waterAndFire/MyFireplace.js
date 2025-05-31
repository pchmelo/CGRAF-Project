import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
import { MyCylinder } from '../helicopter/MyCylinder.js';

/**
 * MyFireplace
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyFireplace extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initMaterials();
        this.initComponents();
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
		this.material.setDiffuse(1, 1, 1, 1);
		this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(50.0);
        this.material.setTexture(this.scene.trunkTexture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    initComponents() {
        this.log = new MyCylinder(this.scene, 12, 12, 0.2, 4);
    }

    display() {
        let angle = 2 * Math.PI / 12;

        this.material.apply();
        for (let i = 0; i < 12; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(i * angle, 0, 1, 0);
            this.scene.rotate((Math.PI / 10), 1, 0, 0);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.log.display();
            this.scene.popMatrix();
        }
    }
}