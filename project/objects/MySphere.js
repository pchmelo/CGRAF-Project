import { CGFobject, CGFappearance } from '../../lib/CGF.js';

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of divisions around the Y axis
 * @param stacks - Number of layers from the equator to each pole
 */
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initMaterials(scene);
        this.initBuffers();
    }

    initMaterials(scene) {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1, 1, 1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.setTexture(scene.earthTexture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const dPhi = (2 * Math.PI) / this.slices; // Angular increment around Y axis
        const dTheta = Math.PI / (2 * this.stacks); // Angular increment from equator to poles

        // Generate vertices, normals, and texture coordinates
        for (let stack = 0; stack <= 2 * this.stacks; stack++) {
            const theta = stack * dTheta - Math.PI / 2; // Angle from the Y axis
            const cosTheta = Math.cos(theta);
            const sinTheta = Math.sin(theta);

            for (let slice = 0; slice <= this.slices; slice++) {
                const phi = slice * dPhi; // Angle around the Y axis
                const cosPhi = Math.cos(phi);
                const sinPhi = Math.sin(phi);

                const x = cosTheta * cosPhi;
                const y = sinTheta;
                const z = cosTheta * sinPhi;

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z); // Normals are the same as the vertex positions for a sphere
                this.texCoords.push((1 - slice / this.slices), (1 - stack / (2 * this.stacks)));
            }
        }

        // Generate indices
        for (let stack = 0; stack < 2 * this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                const first = stack * (this.slices + 1) + slice;
                const second = first + this.slices + 1;

                if (stack === 0) {
                    // North pole triangles
                    this.indices.push(first, second, second + 1);
                } else if (stack === 2 * this.stacks - 1) {
                    // South pole triangles
                    this.indices.push(first, second + 1, first + 1);
                } else {
                    // Quadrilaterals
                    this.indices.push(first, second, second + 1);
                    this.indices.push(first, second + 1, first + 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.scale(20, 20, 20);
        super.display();
        this.scene.popMatrix();
    }
}