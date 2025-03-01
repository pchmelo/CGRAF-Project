import { CGFobject, CGFappearance } from '../lib/CGF.js';

/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.initMaterials();
    }
    
    initBuffers() {
        this.vertices = [
            -0.5, -0.5, -0.5,   //0 -> A
            0.5, -0.5, -0.5,    //1 -> B
            0.5, 0.5, -0.5,     //2 -> C
            -0.5, 0.5, -0.5,    //3 -> D
            -0.5, -0.5, 0.5,    //4 -> E
            0.5, -0.5, 0.5,     //5 -> F
            0.5, 0.5, 0.5,      //6 -> G
            -0.5, 0.5, 0.5      //7 -> H
        ];

        this.indices = [
            // Back face
            0, 2, 1,
            0, 3, 2,

            // Front face
            4, 5, 6,
            4, 6, 7,

            // Top face
            7, 6, 2,
            7, 2, 3,

            // Bottom face
            4, 1, 5,
            4, 0, 1,

            // Right face
            5, 2, 6,
            5, 1, 2,

            // Left face
            4, 7, 3,
            4, 3, 0
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    initMaterials() {
        this.cubeMaterial = new CGFappearance(this.scene);
        this.cubeMaterial.setAmbient(0.75, 0.75, 0.75, 1.0); // Light grey
        this.cubeMaterial.setDiffuse(0.75, 0.75, 0.75, 1.0);
        this.cubeMaterial.setSpecular(0.75, 0.75, 0.75, 1.0);
        this.cubeMaterial.setShininess(10.0);
    }

    display() {
        this.cubeMaterial.apply();
        super.display();
    }
}