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
        // Vertices for a single triangle
        this.vertices = [
            -0.5, 0, 0,   // 0
             0.5, 0, 0,   // 1
             0,   1, 0    // 2
        ];

        // Indices for both front and back faces
        this.indices = [
            0, 1, 2,  // front face
            2, 1, 0   // back face
        ];

        // Normals: front face (0,0,1), back face (0,0,-1)
        this.normals = [
            0, 0, 1,  // 0
            0, 0, 1,  // 1
            0, 0, 1,  // 2

            0, 0, -1, // 0 (back)
            0, 0, -1, // 1 (back)
            0, 0, -1  // 2 (back)
        ];

        // Texture coordinates (same for both faces)
        this.texCoords = [
            0, 0,    // 0
            1, 0,    // 1
            0.5, 1,  // 2

            0, 0,    // 0 (back)
            1, 0,    // 1 (back)
            0.5, 1   // 2 (back)
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}