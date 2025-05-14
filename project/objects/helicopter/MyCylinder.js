import { CGFobject } from '../../../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {number} slices - Number of divisions around the Y axis
 * @param {number} stacks - Number of divisions along the height
 * @param {number} radius - Radius of the cylinder
 * @param {number} height - Height of the cylinder
 */
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, radius, height) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.height = height;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const alphaInc = (2 * Math.PI) / this.slices; // Angular increment around Y axis
        const stackHeight = this.height / this.stacks; // Height increment per stack

        // Sides
        for (let stack = 0; stack <= this.stacks; stack++) {
            const y = stack * stackHeight; // Current height

            for (let slice = 0; slice <= this.slices; slice++) {
                const alpha = slice * alphaInc; // Angle around the Y axis
                const cosAlpha = Math.cos(alpha);
                const sinAlpha = Math.sin(alpha);

                const x = this.radius * cosAlpha;
                const z = this.radius * sinAlpha;

                this.vertices.push(x, y, z);
                this.normals.push(cosAlpha, 0, sinAlpha);
                this.texCoords.push(slice / this.slices, stack / this.stacks);
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                const first = stack * (this.slices + 1) + slice;
                const second = first + this.slices + 1;

                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }

        // Bottom base
        const bottomCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, 0, 0);
        this.normals.push(0, -1, 0);
        this.texCoords.push(0.5, 0.5);

        for (let slice = 0; slice <= this.slices; slice++) {
            const alpha = slice * alphaInc;
            const x = this.radius * Math.cos(alpha);
            const z = this.radius * Math.sin(alpha);

            this.vertices.push(x, 0, z);
            this.normals.push(0, -1, 0);
            this.texCoords.push(0.5 + 0.5 * Math.cos(alpha), 0.5 - 0.5 * Math.sin(alpha));

            if (slice > 0) {
                this.indices.push(bottomCenterIndex, bottomCenterIndex + slice, bottomCenterIndex + slice + 1);
            }
        }

        // Top base
        const topCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, this.height, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0.5);

        for (let slice = 0; slice <= this.slices; slice++) {
            const alpha = slice * alphaInc;
            const x = this.radius * Math.cos(alpha);
            const z = this.radius * Math.sin(alpha);

            this.vertices.push(x, this.height, z);
            this.normals.push(0, 1, 0);
            this.texCoords.push(0.5 + 0.5 * Math.cos(alpha), 0.5 - 0.5 * Math.sin(alpha));

            if (slice > 0) {
                this.indices.push(topCenterIndex, topCenterIndex + slice + 1, topCenterIndex + slice);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
