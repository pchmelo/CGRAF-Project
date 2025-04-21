import { CGFobject } from '../../../lib/CGF.js';
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
    constructor(scene, radius, height) {
        super(scene);
        this.radius = radius;
        this.height = height;

        this.initComponents();
    }

    initComponents() {
        // Create the hexagonal base
        this.base = new MyHexagon(this.scene, this.radius);

        // Create a triangle for the sides
        this.side = new MyTriangle(this.scene);
    }

    display() {
        // Draw the base
        this.scene.pushMatrix();
        this.base.display();
        this.scene.popMatrix();
    
        // Draw the six triangular faces
        const sides = 6;
        const sideLength = 2 * this.radius * Math.sin(Math.PI / sides);
        const faceHeight = Math.sqrt((this.height ** 2) + ((this.radius * Math.cos(Math.PI/sides)) ** 2));
    
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
