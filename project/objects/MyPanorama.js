import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 * @param panorama - Panorama texture to be passed along to the MySphere
 */
export class MyPanorama extends CGFobject {
    constructor(scene, panorama) {
        super(scene);
        this.panoram = panorama;
        this.initShapes();
        this.initMaterials(panorama);
    }

    initMaterials(panorama) {
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(0.5, 0.5, 0.5, 1);
        this.material.setShininess(10.0);
        this.material.setTexture(panorama);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    initShapes() {
        this.sphere = new MySphere(this.scene, 124, 124, true);
    }

    display() {
        this.material.apply();
        this.scene.pushMatrix();
        
        this.scene.translate(
            this.scene.camera.position[0],
            0,
            this.scene.camera.position[2]
        );

        this.scene.scale(200, 200, 200);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
