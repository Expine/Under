import { ITakeOver } from "../../../../base/stage/entity/interface/ITakeOver";
import { IPlayable } from "../../../../base/stage/entity/interface/IPlayable";
import { StateCharacter } from "./StateCharacter";
import { Context } from "../../../../base/resources/image/Context";

/**
 * Player
 * - Entity operated by the player
 * @extends {StateCharacter}
 * @implements {IPlayable}
 * @implements {ITakeOver}
 * @classdesc Player to be operate by the player
 */
export class Player extends StateCharacter implements IPlayable, ITakeOver {
    /**
     * Remaining time of invincible state
     * @protected
     * @type {number}
     */
    protected invincible: number;

    /**
     * Player unique name
     * @protected
     * @type {string}
     */
    protected uniqueName: string

    /**
     * Player constructor
     * @constructor
     */
    constructor() {
        super();

        // initialize
        this.setHP(3);
        this.setDirection(1);

        this.invincible = 0;
        this.uniqueName = '';
    }

    /**
     * Set unique name
     * @param {string} name Unique name
     */
    setUniqueName(name: string) {
        this.uniqueName = name;
    }

    /**
     * Damage object
     * @override
     * @param {number} damage Amount of damage
     */
    damage(damage: number) {
        if (this.invincible === 0 && this.hp > 0) {
            this.hp -= damage;
            this.invincible = 1000;
        }
    }

    /**
     * Get x position for camera
     * @override
     * @return {number} X position for camera
     */
    getCameraX(): number {
        return this.x + this.width / 2;
    }

    /**
     * Get y position for camera
     * @override
     * @return {number} y position for camera
     */
    getCameraY(): number {
        return this.y + this.height / 2;
    }

    /**
     * Judge whether game over or not
     * @override
     * @return {boolean} whether game over or not
     */
    isGameover(): boolean {
        return this.getHP() <= 0 || this.stage === null || this.stage.getStageHeight() < this.y;
    }

    /**
     * Judged whether it is the same entity to be handed over
     * @override
     * @param {Object} target Target element
     * @return {boolean} Whether it is the same entity to be handed over
     */
    equals(target: object): boolean {
        return target instanceof Player && target.uniqueName === this.uniqueName;
    }

    /**
     * Take over information
     * @override
     * @param {Object} target Target element
     */
    takeOver(target: object) {
        if (target instanceof Player) {
            target.setHP(this.getHP());
        }
    }

    /**
     * Update object
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        this.invincible -= dt;
        if (this.invincible <= 0) {
            this.invincible = 0;
        }
        super.update(dt);
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx: Context, shiftX: number = 0, shiftY: number = 0) {
        if (this.invincible % 2 === 0 || this.hp <= 0) {
            super.render(ctx, shiftX, shiftY);
        }
    }
}
