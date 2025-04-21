import { CGFobject } from '../../../lib/CGF.js';

/**
 * MyCone
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {number} radius - Radius of the cone base
 * @param {number} height - Height of the cone
 */
export class MyCone extends CGFobject {
    constructor(scene, radius, height) {
        super(scene);
        this.radius = radius;
        this.height = height;

        this.initBuffers();
    }

    initBuffers() {
        const slices = 64; // Number of slices for the cone
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Base vertices
        for (let i = 0; i < slices; i++) {
            const angle = (i * 2 * Math.PI) / slices;
            this.vertices.push(Math.cos(angle) * this.radius, 0, Math.sin(angle) * this.radius);
            this.normals.push(0, -1, 0);
            this.texCoords.push((Math.cos(angle) + 1) / 2, (Math.sin(angle) + 1) / 2);
        }
        this.vertices.push(0, 0, 0);
        this.normals.push(0, -1, 0);
        this.texCoords.push(0.5, 0.5);

        // Side vertices
        for (let i = 0; i < slices; i++) {
            const angle = (i * 2 * Math.PI) / slices;
            this.vertices.push(Math.cos(angle) * this.radius, 0, Math.sin(angle) * this.radius);
            this.normals.push(Math.cos(angle), this.height / this.radius, Math.sin(angle));
            this.texCoords.push(i / slices, 1);
        }
        this.vertices.push(0, this.height, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0);

        // Indices for the base
        const baseCenterIndex = slices;
        for (let i = 0; i < slices; i++) {
            this.indices.push(baseCenterIndex, i, (i + 1) % slices);
        }

        // Indices for the sides
        const tipIndex = slices * 2 + 1;
        for (let i = 0; i < slices; i++) {
            this.indices.push(i + slices + 1, tipIndex, ((i + 1) % slices) + slices + 1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
