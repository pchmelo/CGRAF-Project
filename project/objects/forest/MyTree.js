import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
import { MyCone } from './MyCone.js';
import { MyPyramid } from './MyPyramid.js';
import { MyWindow } from '../firefighters/MyWindow.js';

/**
 * MyTree
 * @constructor
 * @param scene - Reference to MyScene object
 * @param treeTilt - Array with angle of tilt and bool for axis of rotation (0 for x, 1 for z)
 * @param trunkRadius - Radius of the base of the trunk
 * @param treeHeight - Height of the tree
 * @param crownColor - Color for the tree crown
 */
export class MyTree extends CGFobject {
    constructor(scene, treeTilt, trunkRadius, treeHeight, crownColor) {
        super(scene);
        this.treeTilt = treeTilt;
        this.trunkRadius = trunkRadius;
        this.treeHeight = treeHeight;
        this.crownColor = crownColor;

        // Derived parameters
        this.crownHeight = 0.8 * this.treeHeight;
        this.numPyramids = Math.ceil(this.crownHeight / 10);

        this.initComponents();
        this.initMaterials();
    }

    initMaterials() {
        // Trunk material
        this.trunkMaterial = new CGFappearance(this.scene);
        this.trunkMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.trunkMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
        this.trunkMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.trunkMaterial.setShininess(10.0);
        this.trunkMaterial.setTexture(this.scene.trunkTexture);
        this.trunkMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    initComponents() {
        this.trunk = new MyCone(this.scene, this.trunkRadius, this.treeHeight, 8);
        this.shadow = new MyWindow(this.scene, this.scene.treeShadowTexture);

        this.crown = [];
        let scale = 0;

        for (let i = 0; i < this.numPyramids; i++) {
            if (i === this.numPyramids - 1) {
                this.crown.push(new MyPyramid(this.scene, (this.trunkRadius * 2.5) - (this.trunkRadius * 1.25), this.crownHeight / this.numPyramids, this.crownColor, true));
                continue;
            }

            this.crown.push(new MyPyramid(this.scene, (this.trunkRadius * 2.5) - ((this.trunkRadius * 1.25) * scale), (this.crownHeight * 1.5) / this.numPyramids, this.crownColor));
            scale += 1 / this.numPyramids;
        }
    }

    display() {
        // Apply tilt
        this.scene.pushMatrix();
        if (this.treeTilt[1] === 0) {
            this.scene.rotate(this.treeTilt[0] * (Math.PI / 180), 1, 0, 0);
        } else {
            this.scene.rotate(this.treeTilt[0] * (Math.PI / 180), 0, 0, 1);
        }

        // Draw trunk
        this.trunkMaterial.apply();
        this.scene.pushMatrix();
        this.trunk.display();
        this.scene.popMatrix();

        // Draw crown
        for (let i = 0; i < this.numPyramids - 1; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0, this.treeHeight - this.crownHeight + (i * this.crownHeight) / this.numPyramids, 0);
            this.crown[i].display();
            this.scene.popMatrix();
        }

        // Draw top crown
        this.scene.pushMatrix();
        this.scene.translate(0, this.treeHeight - this.crownHeight + ((this.numPyramids - 1) * this.crownHeight) / this.numPyramids, 0);
        this.crown[this.numPyramids - 1].display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        // Draw shadow
        this.scene.pushMatrix();
        this.scene.translate(0, 0.85, 0);
        this.scene.scale(this.trunkRadius * 6, 1, this.trunkRadius * 6);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.shadow.display();
        this.scene.popMatrix();
    }
}
