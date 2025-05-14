import { CGFobject } from '../../../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';

/**
 * MyLandingGear
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyLandingGear extends CGFobject {
    constructor(scene, inverted) {
        super(scene);

        this.inverted = inverted; // true for right landing gear, false for left landing gear

        this.initComponents();
    }

    initComponents() {
        this.landingGear = new MyCylinder(this.scene, 20, 20, 0.25, 8);
        this.landingAux = new MyCylinder(this.scene, 20, 20, 0.2, 2);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.landingGear.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-7.85, -0.05, 0);
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.scene.scale(1, 0.2, 1);
        this.landingGear.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0);
        if (this.inverted) {
            this.scene.rotate(Math.PI / 4, 1, 0, 0);
        }
        else {
            this.scene.rotate(-Math.PI / 4, 1, 0, 0);
        }
        this.landingAux.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-6, 0, 0);
        if (this.inverted) {
            this.scene.rotate(Math.PI / 4, 1, 0, 0);
        }
        else {
            this.scene.rotate(-Math.PI / 4, 1, 0, 0);
        }
        this.landingAux.display();
        this.scene.popMatrix();
    }
}
