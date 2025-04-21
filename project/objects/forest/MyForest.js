import { CGFobject } from '../../../lib/CGF.js';
import { MyTree } from './MyTree.js';

/**
 * MyForest
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {number} rows - Number of rows in the forest
 * @param {number} cols - Number of columns in the forest
 * @param {number} width - Width of the forest area
 * @param {number} height - Height of the forest area
 */
export class MyForest extends CGFobject {
    constructor(scene, rows, cols, width, height) {
        super(scene);
        this.rows = rows;
        this.cols = cols;
        this.width = width;
        this.height = height;

        this.trees = [];
        this.initForest();
    }

    initForest() {
        const rowSpacing = this.height / this.rows;
        const colSpacing = this.width / this.cols;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                // Randomize tree parameters
                const treeTilt = [Math.max(Math.random() * 10, 0), Math.random() > 0.5 ? 0 : 1]; // Tilt angle and axis
                const trunkRadius = Math.random() * 2 + 2; // Between 5 and 10
                const treeHeight = Math.random() * 20 + 15; // Between 10 and 30
                const crownColor = [Math.random() * 0.3 + 0.4, Math.random() * 0.3 + 0.6, Math.random() * 0.3 + 0.2]; // Random green shades

                // Randomize position offset
                const xOffset = (Math.random() - 0.5) * colSpacing * 0.5; // Small offset within 30% of spacing
                const zOffset = (Math.random() - 0.5) * rowSpacing * 0.5;

                // Calculate tree position
                const x = -this.width / 2 + j * colSpacing + xOffset;
                const z = -this.height / 2 + i * rowSpacing + zOffset;

                // Create and store the tree
                const tree = new MyTree(this.scene, treeTilt, trunkRadius, treeHeight, crownColor);
                this.trees.push({ tree, x, z });
            }
        }
    }

    display() {
        for (const { tree, x, z } of this.trees) {
            this.scene.pushMatrix();
            this.scene.translate(x, 0, z);
            tree.display();
            this.scene.popMatrix();
        }
    }
}
