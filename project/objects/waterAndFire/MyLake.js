import { CGFobject} from '../../../lib/CGF.js';
import { MyPlane } from '../MyPlane.js';

/**
 * MyLake
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyLake extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initComponents();
    }

    initComponents() {
        this.lake = new MyPlane(this.scene, 64, 0, 1, 0, 1, true);
    }

    display() {
        this.lake.display();
    }
}
