import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
import { MyWindow } from './MyWindow.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';
import { MySemiSphere } from '../helicopter/MySemiSphere.js';

/**
 * MyModule
 * @constructor
 * @param scene - Reference to MyScene object
 * @param width - Width of the building module
 * @param length - Length of the building module
 * @param numFloors - Number of floors with constant height in the building module
 * @param numWindows - Number of windows per floor in the building module
 * @param windowTex - Texture to be applied to the windows
 * @param wallColor - Color of the walls
 * @param isCenter - Boolean to check if the building module is the center one
 */
export class MyModule extends CGFobject {
    constructor(scene, width, length, numFloors, numWindows, windowTex, wallColor, isCenter) {
        super(scene);
        this.width = width;
        this.length = length;
        this.numFloors = numFloors;
        this.numWindows = numWindows;
        this.windowTex = windowTex;
        this.wallColor = wallColor;
        this.isCenter = isCenter;

        this.incrementValue = 0.0385;

        this.mixer = 0.0;
        this.increment = this.incrementValue;

        this.floorHeight = 15.0; // Fixed height for each floor
        this.unitCube = new MyUnitCubeQuad(this.scene);
        this.initMaterials();
        this.initComponents();
    }

    initMaterials() {
        // Wall material
        this.wallMaterial = new CGFappearance(this.scene);
        this.wallMaterial.setAmbient(this.wallColor[0], this.wallColor[1], this.wallColor[2], 1);
        this.wallMaterial.setDiffuse(this.wallColor[0], this.wallColor[1], this.wallColor[2], 1);
        this.wallMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.wallMaterial.setShininess(10.0);
        this.wallMaterial.setTexture(this.scene.wallTexture);
        this.wallMaterial.setTextureWrap('REPEAT', 'REPEAT');

        if (this.isCenter) {
            // Blinker material
            this.blinkerMaterial = new CGFappearance(this.scene);
            this.blinkerMaterial.setAmbient(0.8, 0.5, 0.1, 1);
            this.blinkerMaterial.setShininess(10.0);
            this.blinkerMaterial.setTexture(this.scene.blinkerTexture);
            this.blinkerMaterial.setTextureWrap('REPEAT', 'REPEAT');
        }
    }

    initComponents() {
        // Create windows
        this.windows = [];
        for (let i = 0; i < this.numFloors; i++) {
            for (let j = 0; j < this.numWindows; j++) {
                const window = new MyWindow(this.scene, this.windowTex);
                this.windows.push(window);
            }
        }

        // Create door and sign if center module
        if (this.isCenter) {
            this.door = new MyWindow(this.scene, this.windowTex);
            this.sign = new MyWindow(this.scene, this.scene.signTexture);
            this.helipad = new MyWindow(this.scene, this.scene.helipadTexture);
            this.blinker = new MySemiSphere(this.scene, 20, 20);
        }
    }

    display() {
        // Draw walls using MyUnitCubeQuad
        this.scene.pushMatrix();
        this.wallMaterial.apply();
        this.scene.translate(0, this.numFloors * this.floorHeight / 2, 0);
        this.scene.scale(this.width, this.numFloors * this.floorHeight, this.length);
        this.unitCube.display();
        this.scene.popMatrix();
    
        // Draw windows
        const windowWidth = this.width / (this.numWindows + 1);
        const windowHeight = this.floorHeight * 0.5;
        let windowIndex = 0;
    
        for (let i = 0; i < this.numFloors; i++) {
            for (let j = 0; j < this.numWindows; j++) {
                this.scene.pushMatrix();
                this.scene.translate(
                    -this.width / 2 + windowWidth * (j + 1),
                    this.floorHeight * (i + (this.isCenter ? 1 : 0)) + this.floorHeight / 2, // Raise windows by one floor if center
                    this.length / 2 + 0.05 // Offset to avoid z conflicts
                );
                this.scene.scale(windowWidth * 0.8, windowHeight, 1);
                this.windows[windowIndex++].display();
                this.scene.popMatrix();
            }
        }
    
        // Draw door and sign if center module
        if (this.isCenter) {
            // Draw the extra floor for the center building
            this.scene.pushMatrix();
            this.wallMaterial.apply();
            this.scene.translate(0, this.numFloors * this.floorHeight + this.floorHeight / 2, 0);
            this.scene.scale(this.width, this.floorHeight, this.length);
            this.unitCube.display();
            this.scene.popMatrix();
    
            // Draw the door
            this.scene.pushMatrix();
            this.scene.translate(0, this.floorHeight / 2 - 1.5, this.length / 2 + 0.05);
            this.scene.scale(this.width * 0.3, this.floorHeight - 3, 1);
            this.door.display();
            this.scene.popMatrix();
    
            // Draw the sign above the door
            this.scene.pushMatrix();
            this.scene.translate(0, this.floorHeight + 1, this.length / 2 + 0.05);
            this.scene.scale(20, 20, 20);
            this.sign.display();
            this.scene.popMatrix();

            // Draw the helipad
            this.scene.pushMatrix();
            this.scene.translate(0, this.numFloors * this.floorHeight + this.floorHeight + 0.05, 0.7);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.scene.scale(this.width, this.width, 1);
            if (this.scene.isLiftingOffBuilding) {
                this.scene.setActiveShader(this.scene.helipadShader);

                this.handleMixer();
                this.mixer += this.increment;

                this.scene.helipadTexture.bind(0);
                this.scene.upTexture.bind(1);

                this.scene.helipadShader.setUniformsValues({
                    mixer: this.mixer,
                    originTexture: 0,
                    newTexture: 1
                });
            } else if (this.scene.landing) {
                this.scene.setActiveShader(this.scene.helipadShader);

                this.handleMixer();
                this.mixer += this.increment;

                this.scene.helipadTexture.bind(0);
                this.scene.downTexture.bind(1);

                this.scene.helipadShader.setUniformsValues({
                    mixer: this.mixer,
                    originTexture: 0,
                    newTexture: 1
                });
            }

            this.helipad.display();

            if (this.scene.isLiftingOffBuilding || this.scene.landing) {
                this.scene.setActiveShader(this.scene.defaultShader);
            }

            this.scene.popMatrix();

            // Draw the blinkers on the helipad
            const blinkerPositions = [
                { x: -this.width / 2 + 1, z: this.length / 2 - 1 },
                { x: this.width / 2 - 1, z: this.length / 2 - 1 },
                { x: -this.width / 2 + 1, z: -this.length / 2 + 1 },
                { x: this.width / 2 - 1, z: -this.length / 2 + 1 }
            ];

            this.blinkerMaterial.apply();
            for (const pos of blinkerPositions) {
                this.scene.pushMatrix();
                this.scene.translate(pos.x - (0.3 * pos.x), this.numFloors * this.floorHeight + this.floorHeight + 0.05, pos.z - (0.3 * pos.z));
                this.scene.scale(0.5, 0.5, 0.5);

                if (this.scene.isLiftingOffBuilding || this.scene.landing) {
                    this.scene.setActiveShader(this.scene.blinkerShader);
                    this.scene.blinkerShader.setUniformsValues({
                        uTime: this.scene.time || 0,
                        emissionColor: [0.8, 0.5, 0.1]
                    });
                }

                this.blinker.display();

                if (this.scene.isLiftingOffBuilding || this.scene.landing) {
                    this.scene.setActiveShader(this.scene.defaultShader);
                }

                this.scene.popMatrix();
            }
        }
    }

    handleMixer() {
        if (this.mixer >= 1.0) {
            this.increment = - this.incrementValue;
        } else if (this.mixer <= 0.0) {
            this.increment = this.incrementValue;
        }

        if (this.scene.reset) {
            this.mixer = 0.0;
            this.increment = this.incrementValue;
            this.scene.reset = false;
        }
    }
}
