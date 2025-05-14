import { CGFobject} from '../../../lib/CGF.js';
import { MyMainBody } from './MyMainBody.js';

/**
 * MyHeli
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {number} x - x position of the helicopter
 * @param {number} y - y position of the helicopter
 * @param {number} z - z position of the helicopter
 * @param {number} angle - Angle for the rotation of the helicopter
 * @param {number} velocity - Velocity of the helicopter
 */
export class MyHeli extends CGFobject {
    constructor(scene, x, y, z, angle, velocity) {
        super(scene);

        this.x = x;
        this.y = y;
        this.z = z;

        this.angle = angle;
        this.velocity = velocity;

        this.initComponents();
    }

    initComponents() {
        this.helicopter = new MyMainBody(this.scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angle, 0, 1, 0);

        this.tiltAngle = Math.min(this.velocity * this.scene.speedFactor, 0.5);
        this.tiltAngle = Math.max(this.tiltAngle, -0.5);


        this.scene.rotate(this.tiltAngle, 0, 0, 1);

        this.scene.scale(0.25, 0.25, 0.25);
        this.helicopter.display();
        this.scene.popMatrix();
    }

    turn(v) {
        this.angle += v;
    }

    accelerate(v) {
        this.velocity += v;

        // Clamp the velocity to the range [-1, 1]
        if (this.velocity < -1) {
            this.velocity = -1;
        } else if (this.velocity > 1) {
            this.velocity = 1;
        }

        // Deceleration logic when no acceleration is applied
        if (v == 0) {
            if (Math.abs(this.velocity) < 0.01) {
                // Stop the helicopter if the velocity is very small
                this.velocity = 0;
            } else if (this.velocity > 0) {
                this.velocity -= 0.01;
            } else if (this.velocity < 0) {
                this.velocity += 0.01;
            }
        }

        // Update the helicopter's position based on velocity and angle
        this.x += (this.velocity* this.scene.speedFactor) * Math.sin(this.angle - Math.PI / 2);
        this.z += (this.velocity * this.scene.speedFactor) * Math.cos(this.angle - Math.PI / 2);
    }

    deploy() {
        this.helicopter.deployed = true;
    }

    retract() {
        this.helicopter.deployed = false;
    }

    fillBucket() {
        this.helicopter.bucket.filled = true;
    }

    emptyBucket() {
        this.helicopter.bucket.filled = false;
    }
}
