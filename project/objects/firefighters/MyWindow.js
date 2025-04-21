import {CGFobject, CGFappearance} from '../../../lib/CGF.js';

/**
 * MyWindow
 * @constructor
 * @param scene - Reference to MyScene object
 * @param windowTex - Texture to be applied to the window
 */
export class MyWindow extends CGFobject {
	constructor(scene, windowTex) {
		super(scene);
		this.initBuffers();
        this.initMaterials(windowTex);
	}

    initMaterials(windowTex) {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.5, 0.5, 0.5, 1);
        this.material.setDiffuse(0.5, 0.5, 0.5, 1);
        this.material.setSpecular(0.5, 0.5, 0.5, 1);
        this.material.setShininess(10.0);
        this.material.setTexture(windowTex);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0,	//0
			0.5, -0.5, 0,	//1
			0.5, 0.5, 0,	//2
			-0.5, 0.5, 0    //3
		];

		this.indices = [
			0, 1, 2,
			0, 2, 3
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		this.texCoords = [
			0, 1,
            1, 1,
            1, 0,
            0, 0
		];

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

    display() {
        this.material.apply();
        this.scene.pushMatrix();
        super.display();
        this.scene.popMatrix();
    }
}
