import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,    //0
            1, 1, 0,    //1
            1, 0, 0,    //2
            2, 1, 0,    //3
            2, 0, 0,    //4
            3, 1, 0,    //5
			0, 0, 0,    //0 -> 6
            1, 1, 0,    //1 -> 7
            1, 0, 0,    //2 -> 8
            2, 1, 0,    //3 -> 9
            2, 0, 0,    //4 -> 10
            3, 1, 0     //5 -> 11
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
            1, 2, 4,
            1, 4, 3,
            3, 4, 5,
            7, 8, 6,
			10, 8, 7,
			9, 10, 7,
			11, 10, 9
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
