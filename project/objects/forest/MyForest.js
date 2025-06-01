import { CGFobject } from '../../../lib/CGF.js';
import { MyTree } from './MyTree.js';

/**
 * MyForest
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {number} rows - Number of rows in the forest
 * @param {number} cols - Number of columns in the forest
 * @param {number} width - Width of the forest area
 * @param {number} length - Length of the forest area
 */
export class MyForest extends CGFobject {
    constructor(scene, rows, cols, width, length) {
        super(scene);
        this.rows = rows;
        this.cols = cols;
        this.width = width;
        this.length = length;

        this.trees = [];
        this.initForest();
    }

    initForest() {
        const rowSpacing = this.length / this.rows;
        const colSpacing = this.width / this.cols;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                // Randomize tree parameters
                const treeTilt = [Math.max(Math.random() * 10, 0), Math.random() > 0.5 ? 0 : 1];
                const trunkRadius = Math.random() * 2 + 4.5;    // Between 3 and 4.5
                const treeHeight = Math.random() * 20 + 47.5;   // Between 27.5 and 47.5
                const crownColor = this.colorPicker();

                // Randomize position offset
                const xOffset = (Math.random() - 0.5) * colSpacing * 0.60;
                const zOffset = (Math.random() - 0.5) * rowSpacing * 0.60;

                // Calculate tree position
                const x = -this.width / 2 + j * colSpacing + xOffset;
                const z = -this.length / 2 + i * rowSpacing + zOffset;

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

    colorPicker() {
        const baseColors = [
            [0.80, 0.58, 0.15], // Brownish Yellow
            [0.32, 0.31, 0.00], // Military Green
            [0.73, 0.31, 0.00], // Dark Orange
            [0.00, 0.50, 0.00], // Dark Green
            [0.00, 0.40, 0.00], // Olive Green
            [0.00, 0.30, 0.00], // Forest Green
        ];
        
        const base = baseColors[Math.floor(Math.random() * baseColors.length)];

        // Add random variation to each component
        const randomness = 0.2; // 0: Base color without variation ; 1: Entirely random color
        return base.map(c => Math.min(1, Math.max(0, c + (Math.random() - 0.5) * randomness)));
    }
}
