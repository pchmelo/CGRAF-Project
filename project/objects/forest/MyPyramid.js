import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
import { MyHexagon } from './MyHexagon.js';
import { MyTriangle } from './MyTriangle.js';

/**
 * MyPyramid
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {number} radius - Radius of the hexagonal base
 * @param {number} height - Height of the pyramid
 */
export class MyPyramid extends CGFobject {
    constructor(scene, radius, height, crownColor, isTop = false) {
        super(scene);
        this.radius = radius;
        this.height = height;

        this.crownColor = crownColor;
        this.isTop = isTop;

        this.initMaterials();
        this.initComponents();
    }

    initMaterials() {
        if (!this.isTop) {
            // Middle crown material
            this.crownMaterial = new CGFappearance(this.scene);
            this.crownMaterial.setAmbient(this.crownColor[0], this.crownColor[1], this.crownColor[2], 1);
            this.crownMaterial.setDiffuse(this.crownColor[0], this.crownColor[1], this.crownColor[2], 1);
            this.crownMaterial.setSpecular(0.1, 0.1, 0.1, 1);
            this.crownMaterial.setShininess(10.0);
            this.crownMaterial.setTexture(this.scene.crownTexture);
            this.crownMaterial.setTextureWrap('REPEAT', 'REPEAT');
        } else {
            // Top crown material
            this.crownMaterial = new CGFappearance(this.scene);
            this.crownMaterial.setAmbient(this.crownColor[0], this.crownColor[1], this.crownColor[2], 1);
            this.crownMaterial.setDiffuse(this.crownColor[0], this.crownColor[1], this.crownColor[2], 1);
            this.crownMaterial.setSpecular(0.1, 0.1, 0.1, 1);
            this.crownMaterial.setShininess(10.0);
            this.crownMaterial.setTexture(this.scene.crownTopTexture);
            this.crownMaterial.setTextureWrap('REPEAT', 'REPEAT');
        }

        // Bottom crown material
        this.crownBottomMaterial = new CGFappearance(this.scene);
        this.crownBottomMaterial.setAmbient(this.crownColor[0], this.crownColor[1], this.crownColor[2], 1);
        this.crownBottomMaterial.setDiffuse(this.crownColor[0], this.crownColor[1], this.crownColor[2], 1);
        this.crownBottomMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.crownBottomMaterial.setShininess(10.0);
        this.crownBottomMaterial.setTexture(this.scene.crownBottomTexture);
        this.crownBottomMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    initComponents() {
        // Create the hexagonal base
        this.base = new MyHexagon(this.scene, this.radius);

        // Create a triangle for the sides
        this.side = new MyTriangle(this.scene);
    }

    display() {
        // Draw the base
        this.crownBottomMaterial.apply();
        this.scene.pushMatrix();
        this.base.display();
        this.scene.popMatrix();
    
        // Draw the six triangular faces
        const sides = 6;
        const sideLength = 2 * this.radius * Math.sin(Math.PI / sides);
        const faceHeight = Math.sqrt((this.height ** 2) + ((this.radius * Math.cos(Math.PI/sides)) ** 2));
    
        this.crownMaterial.apply();
        for (let i = 0; i < sides; i++) {
            this.scene.pushMatrix();
    
            // Rotate for each triangular face
            this.scene.rotate((i * 2 * Math.PI) / sides, 0, 1, 0);
    
            // Translate and orient the triangular face
            this.scene.translate(0, 0, this.radius * Math.cos(Math.PI / sides));
            this.scene.rotate(-Math.atan(this.radius * Math.cos(Math.PI / sides) / this.height), 1, 0, 0);
            this.scene.scale(sideLength, faceHeight, 1);
    
            this.side.display();
            this.scene.popMatrix();
        }
    }
}
