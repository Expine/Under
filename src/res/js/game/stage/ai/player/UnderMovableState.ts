import { UnderPlayerState } from "./UnderPlayerState";
import { Input } from "../../../../under/base/input/Input";
import { IMovableState } from "../IMovableState";

/**
 * Under movable state that can be movable
 * - Enable to set velocity and power
 * @interface
 * @extends {UnderPlayerState}
 * @implements {IMovableState}
 * @classdesc Under movable state to enable to set velocity and power
 */
export abstract class UnderMovableState extends UnderPlayerState implements IMovableState {
    /**
     * Maximum speed x vector
     * @protected
     * @type {number}
     */
    protected maxVelocityX: number;
    /**
     * Maximum speed y vector
     * @protected
     * @type {number}
     */
    protected maxVelocityY: number;

    /**
     * Force of x direction applied when moving
     * @protected
     * @type {number}
     */
    protected movePowerX: number;
    /**
     * Force of x direction applied when moving
     * @protected
     * @type {number}
     */
    protected movePowerY: number;

    /**
     * Under movable state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed x vector
     * @param {number} maxVelocityY Maximum speed y vector
     * @param {number} movePowerX Force of x direction applied when moving
     * @param {number} movePowerY Force of y direction applied when moving
     */
    constructor(maxVelocityX: number, maxVelocityY: number, movePowerX: number, movePowerY: number) {
        super();

        this.maxVelocityX = maxVelocityX;
        this.maxVelocityY = maxVelocityY;
        this.movePowerX = movePowerX;
        this.movePowerY = movePowerY;
    }

    /**
     * Get max velocity of x
     * @override
     * @return {number} Max velocity of x
     */
    getMaxVX(): number {
        return this.maxVelocityX;
    }

    /**
     * Get max velocity of y
     * @override
     * @return {number} Max velocity of y
     */
    getMaxVY(): number {
        return this.maxVelocityY;
    }

    /**
     * Get power of x
     * @override
     * @return {number} Power of x
     */
    getMovePX(): number {
        return this.movePowerX;
    }

    /**
     * Get power of y
     * @override
     * @return {number} Power of y
     */
    getMovePY(): number {
        return this.movePowerY;
    }

    /**
     * Set max velocity
     * @override
     * @param {number} maxVelocityX The max velocity of x direction
     * @param {number} maxVelocityY The max velocity of y direction
     */
    setMaxVelocity(maxVelocityX: number, maxVelocityY: number) {
        this.maxVelocityX = maxVelocityX;
        this.maxVelocityY = maxVelocityY;
    }

    /**
     * Set moving power
     * @override
     * @param {number} movePowerX The power of x direction
     * @param {number} movePowerY The power of y direction
     */
    setMovePower(movePowerX: number, movePowerY: number) {
        this.movePowerX = movePowerX;
        this.movePowerY = movePowerY;
    }

    /**
     * Move x direction by input
     * @protected
     * @param {number} vx X direction
     * @param {number} dt Delta time
     */
    moveX(vx: number, dt: number) {
        if (this.entity === null || this.entity.body === null || this.entity.material === null) {
            return;
        }
        this.entity.setDirection(vx === 0 ? /*this.directionX*/ undefined : vx);
        if (this.entity.body.velocityX * vx < 0 || Math.abs(this.entity.body.velocityX) < Math.abs(this.maxVelocityX)) {
            this.entity.body.enforce(this.movePowerX * this.entity.material.mass * vx / dt, 0);
        }
    }

    /**
     * Move y direction by input
     * @protected
     * @param {number} vy y direction
     * @param {number} dt Delta time
     */
    moveY(vy: number, dt: number) {
        if (this.entity === null || this.entity.body === null || this.entity.material === null) {
            return;
        }
        this.entity.setDirection(undefined, vy === 0 ? /*this.directionY*/ undefined : vy);
        if (this.entity.body.velocityY * vy < 0 || Math.abs(this.entity.body.velocityY) < Math.abs(this.maxVelocityY)) {
            this.entity.body.enforce(0, this.movePowerY * this.entity.material.mass * vy / dt);
        }
    }

    /**
     * Move by input
     * @protected
     * @param {number} dt Delta time
     * @return {boolean} Whether move or not
     */
    moveByInput(dt: number): boolean {
        let moved = false;
        // input
        if (this.movePowerX > 0) {
            let vx = 0;
            if (Input.key.isPressed(Input.key.left())) {
                vx += -1;
            }
            if (Input.key.isPressed(Input.key.right())) {
                vx += 1;
            }
            if (vx !== 0) {
                this.moveX(vx, dt);
                moved = true;
            }
        }
        if (this.movePowerY > 0) {
            let vy = 0;
            if (Input.key.isPressed(Input.key.up())) {
                vy += -1;
            }
            if (Input.key.isPressed(Input.key.down())) {
                vy += 1;
            }
            if (vy !== 0) {
                this.moveY(vy, dt);
                moved = true;
            }
        }
        return moved;
    }
}
