import { CGFobject } from '../../../lib/CGF.js';

/**
 * MyTriangle
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5, 0, 0,   // 0
             0.5, 0, 0,   // 1
             0,   1, 0    // 2
        ];

        this.indices = [
            0, 1, 2,  // front face
            2, 1, 0   // back face
        ];

        this.normals = [
            0, 0, 1,  // 0
            0, 0, 1,  // 1
            0, 0, 1,  // 2
        ];

        this.texCoords = [
            0, 0,    // 0
            1, 0,    // 1
            0.5, 1,  // 2
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}