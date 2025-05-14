import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
import { MyEllipsoid } from './MyEllipsoid.js';
import { MyCylinder } from './MyCylinder.js';
import { MyCone } from '../forest/MyCone.js';
import { MyMainRotor } from './MyMainRotor.js';
import { MyLandingGear } from './MyLandingGear.js';
import { MyBucket } from './MyBucket.js';

/**
 * MyMainBody
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyMainBody extends CGFobject {
    constructor(scene) {
        super(scene);

        this.deployed = false;

        this.initComponents();
        this.initMaterials(scene);
    }

    initMaterials(scene) {
        // Body Fuselage Materials
        this.bodyMaterial = new CGFappearance(scene);
        this.bodyMaterial.setAmbient(1, 0, 0, 1);
        this.bodyMaterial.setDiffuse(1, 0, 0, 1);
        this.bodyMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.bodyMaterial.setTexture(scene.fuselageTexture);
        this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.bodyAuxMaterial = new CGFappearance(scene);
        this.bodyAuxMaterial.setAmbient(1, 1, 1, 1);
        this.bodyAuxMaterial.setDiffuse(1, 1, 1, 1);
        this.bodyAuxMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.bodyAuxMaterial.setTexture(scene.fuselageTexture);
        this.bodyAuxMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Glass Window Material
        this.windowMaterial = new CGFappearance(scene);
        this.windowMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.windowMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.windowMaterial.setSpecular(0.9, 0.9, 0.9, 1);
        this.windowMaterial.setShininess(100.0);
        this.windowMaterial.setTexture(scene.tintedGlassTexture);
        this.windowMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Blade Metal Material
        this.bladeMaterial = new CGFappearance(scene);
        this.bladeMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.bladeMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
        this.bladeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.bladeMaterial.setShininess(10.0);
        this.bladeMaterial.setTexture(scene.bladeTexture);
        this.bladeMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    initComponents() {
        this.body = new MyEllipsoid(this.scene, 64, 64, 8.8, 2.8, 3.8);
        this.bodyAux = new MyEllipsoid(this.scene, 64, 64, 5.25, 3.5, 3.7);
        this.window = new MyEllipsoid(this.scene, 64, 64, 5.9, 3.3, 3.7);
        this.tail = new MyCone(this.scene, 3.3, 22);
        this.tailAux = new MyCone(this.scene, 2, 8);
        this.rudder = new MyCylinder(this.scene, 4, 4, 0.4, 2);
        this.rotorAux = new MyCylinder(this.scene, 20, 4, 0.2, 1.3);
        this.mainRotor = new MyMainRotor(this.scene);
        this.landingGearLeft = new MyLandingGear(this.scene, false);
        this.landingGearRight = new MyLandingGear(this.scene, true);
        this.bucket = new MyBucket(this.scene);
    }

    display() {
        // Body
        this.bodyAuxMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.2, -0.15, 0);
        this.body.display();
        this.scene.popMatrix();

        // Tail
        this.bodyMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(1.7, 0.28, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.scale(1, 1, 1.2);
        this.tail.display();
        this.scene.popMatrix();

        // Top Tail Rudder
        this.scene.pushMatrix();
        this.scene.translate(22.5, 0.28, 0);
        this.scene.scale(2, 1.3, 0.3);
        this.scene.rotate( -10 * (Math.PI / 180), 0, 0, 1);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.rudder.display();
        this.scene.popMatrix();

        // Bottom Tail Rudder
        this.scene.pushMatrix();
        this.scene.translate(22.5, 0.28, 0);
        this.scene.scale(2, 0.7, 0.3);
        this.scene.rotate( -160 * (Math.PI / 180), 0, 0, 1);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.rudder.display();
        this.scene.popMatrix();

        // Horizontal Tail Stabilizer
        this.scene.pushMatrix();
        this.scene.translate(18, 0.28, -4);
        this.scene.scale(2, 0.3, 4);
        this.scene.rotate( 90 * (Math.PI / 180), 1, 0, 0);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.rudder.display();
        this.scene.popMatrix();

        // Auxiliary Tail Rotor
        this.scene.pushMatrix();
        this.scene.translate(21, 0.3, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.rotorAux.display();
        this.scene.popMatrix();

        // Auxiliary Main Rotor
        this.scene.pushMatrix();
        this.scene.translate(1.5, 4, 0);
        this.scene.scale(2.4, 2, 2.4);
        this.rotorAux.display();
        this.scene.popMatrix();

        // Auxiliary Body
        this.bodyAuxMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(2, 2, 0);
        this.bodyAux.display();
        this.scene.popMatrix();

        // Auxiliary Tail
        this.scene.pushMatrix();
        this.scene.translate(5, 1.6, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.scale(1.6, 1, 1.3);
        this.tailAux.display();
        this.scene.popMatrix();

        // Tail Rotor
        this.bladeMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(21, 0.3, 1);
        this.scene.rotate(this.scene.rotationFactor * (Math.PI / 180), 0, 0, 1);
        this.scene.translate(0, -2, 0);
        this.scene.scale(1, 2, 0.3);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.rudder.display();
        this.scene.popMatrix();

        // Main Rotor
        this.scene.pushMatrix();
        this.scene.translate(1.5, 6, 0);
        this.scene.rotate(this.scene.rotationFactor * (Math.PI / 180), 0, 1, 0);
        this.mainRotor.display();
        this.scene.popMatrix();

        // Landing Gear Left
        this.scene.pushMatrix();
        this.scene.translate(5, -3.7, 3);
        this.landingGearLeft.display();
        this.scene.popMatrix();

        // Landing Gear Right
        this.scene.pushMatrix();
        this.scene.translate(5, -3.7, -3);
        this.landingGearRight.display();
        this.scene.popMatrix();

        // Cockpit
        this.windowMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(1, 1.7, 0);
        this.scene.scale(1, 0.9, 1);
        this.window.display();
        this.scene.popMatrix();

        // Bucket
        if (this.deployed) {
            this.scene.pushMatrix();
            this.scene.translate(0, -17, 0);
            this.scene.scale(2, 2, 2);
            this.bucket.display();
            this.scene.popMatrix();
        }
    }
}