import { CGFobject } from '../../../lib/CGF.js';

/**
 * MyCone
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {number} radius - Radius of the cone base
 * @param {number} height - Height of the cone
 */
export class MyCone extends CGFobject {
    constructor(scene, radius, height, slices = 64) {
        super(scene);
        this.radius = radius;
        this.height = height;
        this.slices = slices;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        // Base vertices
        for (let i = 0; i < this.slices; i++) {
            const angle = (i * 2 * Math.PI) / this.slices;
            const x = Math.cos(angle) * this.radius;
            const z = Math.sin(angle) * this.radius;
    
            this.vertices.push(x, 0, z);
            this.normals.push(0, -1, 0);
            this.texCoords.push((x / this.radius + 1) / 2, (z / this.radius + 1) / 2);
        }
    
        // Center of the base
        const baseCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, 0, 0);
        this.normals.push(0, -1, 0);
        this.texCoords.push(0.5, 0.5);
    
        // Indices for the base
        for (let i = 0; i < this.slices; i++) {
            this.indices.push(baseCenterIndex, i, (i + 1) % this.slices);
        }
    
        // Side vertices
        for (let i = 0; i <= this.slices; i++) {
            const angle = (i * 2 * Math.PI) / this.slices;
            const x = Math.cos(angle) * this.radius;
            const z = Math.sin(angle) * this.radius;
    
            this.vertices.push(x, 0, z);
    
            const normalX = x;
            const normalY = this.radius / this.height;
            const normalZ = z;
            const length = Math.sqrt(normalX * normalX + normalY * normalY + normalZ * normalZ);
    
            this.normals.push(normalX / length, normalY / length, normalZ / length); // Normalized normal
            this.texCoords.push(i / this.slices, 1);
        }
    
        // Tip of the cone
        const tipIndex = this.vertices.length / 3;
        this.vertices.push(0, this.height, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0);
    
        // Indices for the sides
        for (let i = 0; i < this.slices; i++) {
            this.indices.push(i + this.slices + 1, tipIndex, ((i + 1) % this.slices) + this.slices + 1);
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
