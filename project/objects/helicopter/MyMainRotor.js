import { CGFobject } from '../../../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';

/**
 * MyMainRotor
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyMainRotor extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initComponents();
    }

    initComponents() {
        this.rotor = new MyCylinder(this.scene, 4, 4, 0.2, 8);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate( 90 * (Math.PI / 180), 1, 0, 0);
        this.scene.scale(3.5, 1.5, 0.5);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.rotor.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate((Math.PI * 2) / 3, 0, 1, 0);
        this.scene.rotate( 90 * (Math.PI / 180), 1, 0, 0);
        this.scene.scale(3.5, 1.5, 0.5);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.rotor.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate((Math.PI * 4) / 3, 0, 1, 0);
        this.scene.rotate( 90 * (Math.PI / 180), 1, 0, 0);
        this.scene.scale(3.5, 1.5, 0.5);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.rotor.display();
        this.scene.popMatrix();
    }
}
