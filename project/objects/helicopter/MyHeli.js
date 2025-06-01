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

        this.scene.rotate(this.tiltAngle, 1, 0, 0);

        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.helicopter.display();
        this.scene.popMatrix();
    }

    turn(v) {
        this.angle += v;

        // Clamp the angle to the range [0, 2 * Math.PI]
        if (this.angle < 0) {
            this.angle += 2 * Math.PI;
        } else if (this.angle > 2 * Math.PI) {
            this.angle -= 2 * Math.PI;
        }
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
        this.x += (this.velocity* this.scene.speedFactor) * Math.sin(this.angle);
        this.z += (this.velocity * this.scene.speedFactor) * Math.cos(this.angle);
    }

    distUntilStop() {
        // Calculate the distance the helicopter will travel until it stops
        let v = this.velocity;
        let distance = 0;
        const speedFactor = this.scene.speedFactor;

        while (Math.abs(v) >= 0.01) {
            distance += Math.abs(v * speedFactor);
            if (v > 0) {
                v -= 0.01;
            } else if (v < 0) {
                v += 0.01;
            }
        }
        // Add the last small step if velocity < 0.01 but > 0
        if (v !== 0) {
            distance += Math.abs(v * speedFactor);
        }
        return distance;
    }

    isBucketFilled() {
        return this.helicopter.bucket.filled
    }

    canLandLake() {
        return (!this.helicopter.bucket.filled && this.velocity == 0 && this.x > this.scene.lakePositionX - 15 && this.x < this.scene.lakePositionX + 15 && this.z > this.scene.lakePositionZ - 15 && this.z < this.scene.lakePositionZ + 15);
    }

    canEmptyBucket() {
        return (this.helicopter.bucket.filled && this.velocity == 0 && this.x > this.scene.flamePositionX - 10 && this.x < this.scene.flamePositionX + 10 && this.z > this.scene.flamePositionZ - 10 && this.z < this.scene.flamePositionZ + 10);
    }

    deploy() {
        this.helicopter.deployed = true;
    }

    retract() {
        this.helicopter.deployed = false;
        this.helicopter.bucket.filled = false;
    }

    fillBucket() {
        this.helicopter.bucket.scaler = 1.0;
        this.helicopter.bucket.volume = 0;
        this.helicopter.bucket.drainWater = -0.5;
        this.helicopter.bucket.filled = true;
        this.helicopter.bucket.emptying = false;
    }

    emptyBucket() {
        return this.helicopter.bucket.empty();
    }
}
