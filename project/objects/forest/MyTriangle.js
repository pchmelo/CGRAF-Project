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
            -0.5, 0, 0,  //0
            0.5, 0, 0,   //1
            0, 1, 0,     //2

            -0.5, 0, 0,  //3
            0.5, 0, 0,   //4
            0, 1, 0,     //5

            -0.5, 0, 0,  //6
            0.5, 0, 0,   //7
            0, 1, 0,     //8
        ];

        this.indices = [
            0, 1, 2,
            3, 4, 5,
            6, 7, 8
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            0, 1, 0,
            0, 1, 0,
            0, 1, 0,

            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
        ];

        this.texCoords = [
            0, 0,
            1, 0,
            0.5, 1,

            0, 0,
            1, 0,
            0.5, 1,

            0, 0,
            1, 0,
            0.5, 1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
