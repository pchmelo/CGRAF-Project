import { CGFobject } from '../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyCylinder extends CGFobject {
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

        // -----------------------------------------------
    
        // Side surface
        for (var i = 0; i < this.slices; i++) {
            var x = Math.cos(ang);
            var y = Math.sin(ang);
    
            for (var j = 0; j <= this.stacks; j++) {
                this.vertices.push(x, y, j / this.stacks);

                this.normals.push(x, y, 0);
            }
            ang += alphaAng;
        }
    
        for (var i = 0; i < this.slices; i++) {
            for (var j = 0; j < this.stacks; j++) {
                var current = i * (this.stacks + 1) + j;
                var next = ((i + 1) % this.slices) * (this.stacks + 1) + j;
    
                this.indices.push(current, next, current + 1);
                this.indices.push(next, next + 1, current + 1);
            }
        }
    
        // Bottom base
        var baseCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, -1);
    
        ang = 0;
        for (var i = 0; i < this.slices; i++) {
            var x = Math.cos(ang);
            var y = Math.sin(ang);
            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, -1);
            ang += alphaAng;
        }
    
        for (var i = 0; i < this.slices; i++) {
            this.indices.push(baseCenterIndex, baseCenterIndex + 1 + (i + 1) % this.slices, baseCenterIndex + 1 + i);
        }
    
        // Top base
        var topBaseCenterIndex = this.vertices.length / 3;
        this.vertices.push(0, 0, 1);
        this.normals.push(0, 0, 1);
    
        ang = 0;
        for (var i = 0; i < this.slices; i++) {
            var x = Math.cos(ang);
            var y = Math.sin(ang);
            this.vertices.push(x, y, 1);
            this.normals.push(0, 0, 1);
            ang += alphaAng;
        }
    
        for (var i = 0; i < this.slices; i++) {
            this.indices.push(topBaseCenterIndex, topBaseCenterIndex + 1 + i, topBaseCenterIndex + 1 + (i + 1) % this.slices);
        }

        // -----------------------------------------------
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}