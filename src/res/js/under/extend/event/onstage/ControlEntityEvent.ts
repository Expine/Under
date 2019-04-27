import { isIPlayable } from './../../../base/stage/entity/interface/IPlayable';
import { StageEvent } from "../../../base/event/onstage/StageEvent";
import { MutableEntity } from '../../../base/stage/entity/MutableEntity';
import { Context } from '../../../base/resources/image/Context';

/**
 * Control entity event
 * - Controls entity
 * @extends {StageEvent}
 * @classdesc Control entity event to control entity
 */
export class ControlEntityEvent extends StageEvent {
    /**
     * Target entity name
     * @protected
     * @type {string}
     */
    protected targetName: string;

    /**
     * Next velocity of x direction
     * @protected
     * @type {number}
     */
    protected vx: number;
    /**
     * Next velocity of y direction
     * @protected
     * @type {number}
     */
    protected vy: number;
    /**
     * Next force of x direction
     * @protected
     * @type {number}
     */
    protected fx: number;
    /**
     * Next force of y direction
     * @protected
     * @type {number}
     */
    protected fy: number;

    /**
     * Control entity event constructor
     * @constructor
     * @param {string} name Target entity name
     */
    constructor(name: string) {
        super();

        /**
         * Target entity name
         * @protected
         * @type {string}
         */
        this.targetName = name;

        /**
         * Next velocity of x direction
         * @protected
         * @type {number}
         */
        this.vx = 0;
        /**
         * Next velocity of y direction
         * @protected
         * @type {number}
         */
        this.vy = 0;
        /**
         * Next force of x direction
         * @protected
         * @type {number}
         */
        this.fx = 0;
        /**
         * Next force of y direction
         * @protected
         * @type {number}
         */
        this.fy = 0;
    }

    /**
     * Set next velocity
     * @param {number} vx Next velocity of x direction
     * @param {number} vy Next velocity of y direction
     */
    setVelocity(vx: number, vy: number) {
        this.vx = vx;
        this.vy = vy;
    }

    /**
     * Set force
     * @param {number} fx Next force of x direction
     * @param {number} fy Next force of y direction
     */
    setForce(fx: number, fy: number) {
        this.fx = fx;
        this.fy = fy;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        let target = null;
        // TODO: Improve search method
        if (this.targetName === 'player' && this.stage !== null) {
            target = this.stage.getEntitiesByInterface(isIPlayable)[0];
        }
        if (target !== null) {
            if (target instanceof MutableEntity && target.body !== null) {
                target.body.setNextAddVelocity(this.vx - target.body.velocityX, this.vy - target.body.velocityY);
                target.body.enforce(this.fx, this.fy);
            }
        }
        if (this.op !== null) {
            this.op.next();
        }
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() { }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(_dt: number): boolean {
        return true;
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(_ctx: Context) { }
}
