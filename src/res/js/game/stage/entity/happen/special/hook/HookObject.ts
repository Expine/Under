import { PossessedObject } from "../../../../../../under/extend/stage/entity/happen/PossessedObject";
import { IBreakable } from "../../../../../../under/base/stage/entity/interface/IBreakable";
import { IHook } from "../../../interface/IHook";
import { IString } from "../../../../physics/body/IString";
import { MutableEntity } from "../../../../../../under/base/stage/entity/MutableEntity";
import { Entity } from "../../../../../../under/base/stage/entity/Entity";
import { isIExclude } from "../../../../physics/collider/IExclude";
import { StateAI } from "../../../../../../under/base/stage/ai/StateAI";
import { Context } from "../../../../../../under/base/resources/image/Context";

/**
 * Hook object
 * - Implements hook and automatically generates post hook object
 * @interface
 * @extends {PossessedObject}
 * @implements {IBreakable}
 * @implements {IHook}
 * @classdesc Hook object to implement hook and automatically generate post hook object
 */
export abstract class HookObject extends PossessedObject implements IBreakable, IHook {
    /**
     * Previous hook object
     * @protected
     * @type {HookObject}
     */
    protected previous: HookObject | null;
    /**
     * Post hook object
     * @protected
     * @type {HookObject}
     */
    protected post: HookObject | null;

    /**
     * Hook string
     * @protected
     * @type {IString}
     */
    protected string: IString | null;

    /**
     * Hook rest length
     * @protected
     * @type {number}
     */
    protected restLength: number;
    /**
     * Hook length of hooked
     * @protected
     * @type {number}
     */
    protected hookedLength: number;

    /**
     * Child id for generating child
     * @protected
     * @type {number}
     */
    protected childID: number;

    /**
     * Generated x position
     * @protected
     * @type {number}
     */
    protected generatedX: number;
    /**
     * Generated y position
     * @protected
     * @type {number}
     */
    protected generatedY: number;

    /**
     * Whether it is hooked or not
     * @protected
     * @type {boolean}
     */
    protected isHooked: boolean;

    /**
     * Hook object constructor
     * @constructor
     */
    constructor() {
        super();

        this.previous = null;
        this.post = null;
        this.string = null;
        this.restLength = 0;
        this.hookedLength = 0;
        this.childID = 0;
        this.generatedX = 0;
        this.generatedY = 0;
        this.isHooked = false;
    }

    /**
     * Hook center x position
     * @abstract
     * @protected
     * @return {number} Hook center x position
     */
    abstract getHookX(): number;

    /**
     * Hook center x position
     * @abstract
     * @protected
     * @return {number} Hook center x position
     */
    abstract getHookY(): number;

    /**
     * Set hook information
     * @protected
     * @param {HookObject} previous Previous hook object
     * @param {IString} string Hook string
     * @param {number} restLength Hook rest length
     * @param {number} hookedLength Hook length of hooked
     * @param {number} childID Child ID
     */
    protected setHookInfo(previous: HookObject | null, string: IString | null, restLength: number, hookedLength: number, childID: number) {
        this.previous = previous;
        this.string = string;
        this.restLength = restLength;
        this.hookedLength = hookedLength;
        this.childID = childID;
    }

    /**
     * Connect hook to player
     * @protected
     */
    connectPlayer() {
        let x = this.generatedX;
        let y = this.generatedY;
        if (this.owner instanceof MutableEntity) {
            x = this.owner.directionX >= 0 ? this.generatedX + this.owner.x + this.owner.width : this.owner.x - this.generatedX;
            y = this.owner.y - this.generatedY;
        }
        if (this.owner !== null) {
            this.post = new HookOwner();
            this.post.setPosition(x, y, this.z);
            this.post.setSize(8, 8);
            this.post.setOwner(this.owner);
            this.post.setHookInfo(this, this.string, this.restLength - 15, this.hookedLength, this.childID);
            this.post.init();
        }
    }

    /**
     * Generete hook child
     * @protected
     * @param {number} vx Generated velocity of x
     * @param {number} vy Generated velocity of y
     */
    makeChild(vx: number, vy: number) {
        // create player
        if (this.restLength - 15 <= 0) {
            this.connectPlayer();
            return;
        }
        if (this.string === null || this.stage === null) {
            return;
        }
        // check length
        let x = this.generatedX;
        let y = this.generatedY;
        if (this.owner instanceof MutableEntity) {
            x = this.owner.directionX >= 0 ? this.generatedX + this.owner.x + this.owner.width : this.owner.x - this.generatedX;
            y = this.owner.y - this.generatedY;
        }
        const dx = Math.abs(x - this.getHookX());
        const dy = Math.abs(y - this.getHookY());
        const d = Math.sqrt(dx * dx + dy * dy);
        const l = this.string.getLength() + 3;
        if (d > l) {
            // generate
            const post = this.stage.addEntityByID(this.childID, {
                x: x,
                y: y,
                z: this.z,
                owner: this.owner,
                collider: {
                    id: isIExclude(this.collider) ? this.collider.getTargetID() : undefined,
                },
            });
            if (post instanceof HookObject) {
                this.post = post;
                this.post.setHookInfo(this, this.string, this.restLength - 15, this.hookedLength, this.childID);
                // set initial info
                if (this.post.body !== null) {
                    this.post.body.setNextAddVelocity(vx, vy);
                    this.string.addBody(this.post.body, (this.post.directionX >= 0 ? this.post.getHookX() - this.post.x : this.post.x + this.post.width - this.post.getHookX()), (this.post.directionY > 0 ? this.post.getHookY() - this.post.y : this.post.y + this.post.height - this.post.getHookY()), 3);
                }
                this.post.deltaMove(-dx * (d - l) / d, -dy * (d - l) / d);
                // generate continuously
                this.post.makeChild(vx, vy);
            }
        }
    }

    /**
     * Get actor who it belongs to
     * @override
     * @return {Entity} Actor who it belongs to
     */
    getActor(): Entity | null {
        return this.owner;
    }

    /**
     * Create post hook (Do not create it if it already exists)
     * @override
     */
    createPost() {
        // check head or connected
        if (!this.isHead() && this.previous === null) {
            return;
        }
        // check already created
        if (this.post !== null) {
            return;
        }
        // check max length or hooked
        if (this.restLength <= 0 && this.isHooked) {
            return;
        }

        if (this.body !== null) {
            this.makeChild(this.body.velocityX, this.body.velocityY);
        }
    }

    /**
     * Hooked hook
     * @override
     */
    hooked() {
        this.isHooked = true;
        if (this.post !== null) {
            this.post.hooked();
        } else {
            this.connectPlayer();
        }
        if (this.restLength < this.hookedLength) {
            this.destroy();
            return;
        }
    }

    /**
     * Release hook
     * @override
     */
    release() {
        for (const it of this.ai) {
            if (it instanceof StateAI) {
                it.changeState(`released`);
            }
        }
        if ((this.isHead() || this.previous !== null) && this.post === null) {
            this.connectPlayer();
        }
    }

    /**
     * Try to remove it
     * @override
     * @return {boolean} Whether it was removed
     */
    tryRemove(): boolean {
        if (this.post instanceof HookOwner) {
            this.destroy();
            return true;
        }
        return false;
    }

    /**
     * Whether the tip of the hook
     * @override
     * @return {boolean} Whether the tip of the hook
     */
    isHead(): boolean {
        return false;
    }

    /**
     * Destroy object
     * @override
     */
    destroy() {
        if (this.previous !== null && this.post !== null) {
            this.post.previous = this.previous;
            this.previous.post = this.post;
        }
        this.previous = null;
        this.post = null;
        if (this.string !== null && this.body !== null) {
            this.string.removeBody(this.body);
        }
        if (this.stage !== null) {
            this.stage.removeEntity(this);
        }
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        this.generatedX = this.x;
        this.generatedY = this.y;
        if (this.owner instanceof MutableEntity) {
            this.generatedX = this.owner.directionX >= 0 ? this.x - this.owner.width - this.owner.x : this.owner.x - this.x;
            this.generatedY = this.owner.y - this.y;
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx: Context, shiftX: number = 0, shiftY: number = 0) {
        super.render(ctx, shiftX, shiftY);
        if (this.post !== null) {
            ctx.strokeLine(this.getHookX() + shiftX, this.getHookY() + shiftY, this.post.getHookX() + shiftX, this.post.getHookY() + shiftY, `#FFCC66`, 4);
        } else if (this.owner instanceof MutableEntity) {
            const x = this.owner.directionX >= 0 ? this.generatedX + this.owner.x + this.owner.width : this.owner.x - this.generatedX;
            const y = this.owner.y - this.generatedY;
            ctx.strokeLine(this.getHookX() + shiftX, this.getHookY() + shiftY, x + shiftX, y + shiftY, `#FFCC66`, 4);
        }
    }
}

// TODO: Circular reference
import { HookOwner } from "./HookOwner";
