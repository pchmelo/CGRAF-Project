import {CGFobject} from '../../../lib/CGF.js';
import { MyModule } from './MyModule.js';

/**
 * MyBuilding
 * @constructor
 * @param scene - Reference to MyScene object
 * @param width - Width of the building module
 * @param numFloors - Number of floors in the building
 * @param numWindows - Number of windows per floor in the building
 * @param windowTex - Texture to be applied to the windows
 * @param wallColor - Color of the walls
 */
export class MyBuilding extends CGFobject {
    constructor(scene, width, numFloors, numWindows, windowTex, wallColor) {
        super(scene);
        this.width = width;
        this.numFloors = numFloors;
        this.numWindows = numWindows;
        this.windowTex = windowTex;
        this.wallColor = wallColor;

        this.modules = [];
        this.initComponents();
    }

    initComponents() {
        // Create the side module
        this.sideModule = new MyModule(this.scene, this.width, this.width * 0.75, this.numFloors, this.numWindows, this.windowTex, this.wallColor, false);

        // Create the center module
        this.centerModule = new MyModule(this.scene, this.width, this.width, this.numFloors, this.numWindows, this.windowTex, this.wallColor, true);
    }

    display() {
        // Display the center module
        this.scene.pushMatrix();
        this.centerModule.display();
        this.scene.popMatrix();

        // Display the side modules
        this.scene.pushMatrix();
        this.scene.translate(-this.width, 0, 0);
        this.sideModule.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.width, 0, 0);
        this.sideModule.display();
        this.scene.popMatrix();
    }
}
