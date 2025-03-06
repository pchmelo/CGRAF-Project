import { CGFobject } from '../lib/CGF.js';

/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyPrism extends CGFobject {
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

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        for (var i = 0; i < this.slices; i++) {
            for (var j = 0; j <= this.stacks; j++) {
                var x1 = Math.cos(ang);
                var y1 = Math.sin(ang);
                var x2 = Math.cos(ang + alphaAng);
                var y2 = Math.sin(ang + alphaAng);

                // Vertices
                this.vertices.push(x1, y1, j / this.stacks);
                this.vertices.push(x2, y2, j / this.stacks);

                // Normals
                var normal = [
                    Math.cos(ang + alphaAng / 2),
                    Math.sin(ang + alphaAng / 2),
                    0
                ];
                this.normals.push(...normal);
                this.normals.push(...normal);

                if (j < this.stacks) {
                    var current = 2 * (i * (this.stacks + 1) + j);

                    // Indices
                    this.indices.push(current, current + 1, current + 2);
                    this.indices.push(current + 1, current + 3, current + 2);
                }
            }
            ang += alphaAng;
        }

        // Add vertices, normals, and indices for the bottom base
        ang = 0;
        var baseCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, -1);

        for (var i = 0; i < this.slices; i++) {
            var x1 = Math.cos(ang);
            var y1 = Math.sin(ang);
            this.vertices.push(x1, y1, 0);
            this.normals.push(0, 0, -1);
            ang += alphaAng;
        }

        for (var i = 0; i < this.slices; i++) {
            this.indices.push(baseCenterIndex, baseCenterIndex + 1 + (i + 1) % this.slices, baseCenterIndex + 1 + i);
        }

        // Add vertices, normals, and indices for the top base
        ang = 0;
        var topBaseCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, 0, 1);
        this.normals.push(0, 0, 1);

        for (var i = 0; i < this.slices; i++) {
            var x1 = Math.cos(ang);
            var y1 = Math.sin(ang);
            this.vertices.push(x1, y1, 1);
            this.normals.push(0, 0, 1);
            ang += alphaAng;
        }

        for (var i = 0; i < this.slices; i++) {
            this.indices.push(topBaseCenterIndex, topBaseCenterIndex + 1 + i, topBaseCenterIndex + 1 + (i + 1) % this.slices);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}