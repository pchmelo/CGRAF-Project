import { CGFobject } from '../../../lib/CGF.js';

export class MyCircle extends CGFobject {
    /**
     * 
     * @param {CGFscene} scene - Reference to MyScene object
     * @param {number} slices - Number of segments (higher = smoother)
     * @param {number} radius - Circle radius
     */
    constructor(scene, slices, radius) {
        super(scene);
        this.slices = slices;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5, 0.5);

        for (let i = 0; i <= this.slices; i++) {
            const angle = 2 * Math.PI * i / this.slices;
            const x = this.radius * Math.cos(angle);
            const y = this.radius * Math.sin(angle);

            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, 1);
            this.texCoords.push(0.5 + 0.5 * Math.cos(angle), 0.5 + 0.5 * Math.sin(angle));
        }

        for (let i = 1; i <= this.slices; i++) {
            this.indices.push(0, i, i + 1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
