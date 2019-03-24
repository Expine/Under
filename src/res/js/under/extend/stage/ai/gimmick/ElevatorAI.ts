import { AI } from "../../../../base/stage/ai/AI";
import { Util } from "../../../util/Util";
import { isIPlayable } from "../../../../base/stage/entity/interface/IPlayable";

/**
 * Elevator AI
 * - Determines the behavior of an entity
 * @extends {AI}
 * @classdesc Elevator AI to go straight ahead and reverses direction if it hit something
 */
export class ElevatorAI extends AI {
    /**
     * Maximum speed velocity
     * @protected
     * @type {number}
     */
    protected maxVelocity: number;
    /**
     * Force applied when moving
     * @protected
     * @type {number}
     */
    protected movePower: number;

    /**
     * Elevator floor
     * @protected
     * @type {number}
     */
    protected floor: number;
    /**
     * Elevator x position list
     * @protected
     * @type {Array<number>}
     */
    protected elevatorXList: Array<number>
    /**
     * Elevator y position list
     * @protected
     * @type {Array<number>}
     */
    protected elevatorYList: Array<number>

    /**
     * Whether player is on it or not
     * @protected
     * @type {boolean}
     */
    protected onPlayer: boolean;
    /**
     * Whether it moves or not
     * @protected
     * @type {boolean}
     */
    protected isMoving: boolean;
    /**
     * Counter for not on player
     * @protected
     * @type {number}
     */
    protected notOnPlayercount: number;

    /**
     * Elevator AI Constructor
     * @constructor
     * @param {number} maxVelocity Maximum speed velocity
     * @param {number} movePower Force applied when moving
     */
    constructor(maxVelocity: number, movePower: number) {
        super();

        this.maxVelocity = maxVelocity;
        this.movePower = movePower;
        this.floor = -1;
        this.elevatorXList = [];
        this.elevatorYList = [];
        this.onPlayer = false;
        this.isMoving = false;
        this.notOnPlayercount = 0;
    }

    /**
     * Add elevator position
     * @param {number} x Elevator x position
     * @param {number} y Elevator y position
     */
    addPosition(x: number, y: number) {
        this.elevatorXList.push(x);
        this.elevatorYList.push(y);
    }

    /**
     * Initialize AI
     * @override
     */
    init() {
        // apply relative position
        if (this.entity !== null) {
            let x = this.entity.x;
            let y = this.entity.y;
            for (let i = 0; i < this.elevatorXList.length; ++i) {
                x += this.elevatorXList[i];
                y += this.elevatorYList[i];
                this.elevatorXList[i] = x;
                this.elevatorYList[i] = y;
            }
        }
    }

    /**
     * Update AI
     * @override
     * @param {number} dt Delta time
     */
    update(_dt: number) { }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt: number): boolean {
        let localCheck = false;
        // check on ground
        if (this.entity !== null && this.entity.collider !== null) {
            for (const it of this.entity.collider.collisions) {
                const you = Util.getCollidedEntity(this.entity, it);
                if (isIPlayable(you)) {
                    if (!this.isMoving && !this.onPlayer) {
                        // move next floor
                        this.floor = (this.floor + 1) % this.elevatorXList.length;
                        this.isMoving = true;
                        this.notOnPlayercount = 0;
                    }
                    localCheck = true;
                    break;
                }
            }
        }
        if (!localCheck) {
            this.notOnPlayercount += dt / 1000;
        }
        if (localCheck || (this.onPlayer && this.notOnPlayercount > 0.5)) {
            this.onPlayer = localCheck;
        }
        if (this.isMoving && this.entity !== null && this.entity.material !== null && this.entity.body !== null) {
            let dx = this.elevatorXList[this.floor] - this.entity.x;
            let dy = this.elevatorYList[this.floor] - this.entity.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (dx * this.entity.directionX < 0) {
                dx = 0;
                this.entity.setDirection(0);
                this.entity.body.setNextAddVelocity(-this.entity.body.velocityX, 0);
            }
            if (dy * this.entity.directionY < 0) {
                dy = 0;
                this.entity.setDirection(undefined, 0);
                this.entity.body.setNextAddVelocity(0, -this.entity.body.velocityY);
            }
            if (dx === 0 && dy === 0) {
                this.isMoving = false;
                return true;
            }
            this.entity.setDirection(Math.sign(dx), Math.sign(dy));
            const fx = Math.abs(this.entity.body.velocityX) < this.maxVelocity ? dx / d * this.movePower * this.entity.material.mass : 0;
            const fy = Math.abs(this.entity.body.velocityY) < this.maxVelocity ? dy / d * this.movePower * this.entity.material.mass : 0;
            this.entity.body.enforce(fx, fy);
        }
        return true;
    }
}
