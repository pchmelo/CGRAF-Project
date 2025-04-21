import { CGFobject } from '../../../lib/CGF.js';

/**
 * MyHexagon
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {number} radius - Radius of the hexagon
 */
export class MyHexagon extends CGFobject {
    constructor(scene, radius) {
        super(scene);
        this.radius = radius;

        this.initBuffers();
    }

    initBuffers() {
        const sides = 6;
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Add vertices for the hexagon
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides;
            this.vertices.push(Math.cos(angle) * this.radius, 0, Math.sin(angle) * this.radius);
            this.normals.push(0, -1, 0);    // Inverted normals for shadow effect illusion
            this.texCoords.push((Math.cos(angle) + 1) / 2, (Math.sin(angle) + 1) / 2);
        }
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0.5);

        // Add indices for the hexagon
        const centerIndex = sides;
        for (let i = 0; i < sides; i++) {
            this.indices.push(centerIndex, i, (i + 1) % sides);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
