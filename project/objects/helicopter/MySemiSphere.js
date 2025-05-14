import { CGFobject } from '../../../lib/CGF.js';

/**
 * MySemiSphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of divisions around the Y axis
 * @param stacks - Number of layers from the equator to the pole
 */
export class MySemiSphere extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    const dAlpha = Math.PI / 2 / this.stacks; // Angular increment for stacks
    const dBeta = (2 * Math.PI) / this.slices; // Angular increment for slices

    // Generate vertices, normals, and texture coordinates
    for (let stack = 0; stack <= this.stacks; stack++) {
        const alpha = stack * dAlpha;
        const cosAlpha = Math.cos(alpha);
        const sinAlpha = Math.sin(alpha);

        for (let slice = 0; slice <= this.slices; slice++) {
            const beta = slice * dBeta;
            const cosBeta = Math.cos(beta);
            const sinBeta = Math.sin(beta);

            const x = sinAlpha * cosBeta;
            const y = cosAlpha;
            const z = sinAlpha * sinBeta;

            this.vertices.push(x, y, z);

            const normalX = x;
            const normalY = y;
            const normalZ = z;

            this.normals.push(normalX, normalY, normalZ);
            this.texCoords.push(slice / this.slices, stack / this.stacks);
        }
    }

    // Generate indices
    for (let stack = 0; stack < this.stacks; stack++) {
        for (let slice = 0; slice < this.slices; slice++) {
            const first = stack * (this.slices + 1) + slice;
            const second = first + this.slices + 1;

            // Front-facing triangles
            this.indices.push(first, second, first + 1);
            this.indices.push(second, second + 1, first + 1);

            // Back-facing triangles
            this.indices.push(first + 1, second, first);
            this.indices.push(second + 1, second, first + 1);
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
}