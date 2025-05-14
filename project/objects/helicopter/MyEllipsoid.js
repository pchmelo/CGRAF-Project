import { CGFobject } from '../../../lib/CGF.js';

/**
 * MyEllipsoid
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {number} slices - Number of divisions around the Y axis
 * @param {number} stacks - Number of layers from the equator to each pole
 * @param {number} radiusX - Radius along the X-axis
 * @param {number} radiusY - Radius along the Y-axis
 * @param {number} radiusZ - Radius along the Z-axis
 */
export class MyEllipsoid extends CGFobject {
    constructor(scene, slices, stacks, radiusX, radiusY, radiusZ) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.radiusZ = radiusZ;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const alpha_inc = (2 * Math.PI) / this.slices; // Angular increment around Y axis
        const beta_inc = Math.PI / this.stacks; // Angular increment from equator to poles

        for (let stack = 0; stack <= this.stacks; stack++) {
            const beta = stack * beta_inc; // Angle from the equator
            const sinBeta = Math.sin(beta);
            const cosBeta = Math.cos(beta);

            for (let slice = 0; slice <= this.slices; slice++) {
                const alpha = slice * alpha_inc; // Angle around the Y axis
                const sinAlpha = Math.sin(alpha);
                const cosAlpha = Math.cos(alpha);

                const x = this.radiusX * sinBeta * cosAlpha;
                const y = this.radiusY * cosBeta;
                const z = this.radiusZ * sinBeta * sinAlpha;

                this.vertices.push(x, y, z);
                this.normals.push(x / this.radiusX, y / this.radiusY, z / this.radiusZ);
                this.texCoords.push(slice / this.slices, stack / this.stacks);
            }
        }

        // Generate indices
        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                const first = stack * (this.slices + 1) + slice;
                const second = first + this.slices + 1;

                this.indices.push(first, first + 1, second);
                this.indices.push(second, first + 1, second + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
