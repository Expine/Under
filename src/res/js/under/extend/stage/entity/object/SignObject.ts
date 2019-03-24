import { ImagedEntity } from "../../../../base/stage/entity/ImagedEntity";
import { IColliderable } from "../../../../base/stage/entity/interface/IColliderable";
import { GameImage } from "../../../../base/resources/image/GameImage";
import { Collider } from "../../../../base/stage/physics/collider/Collider";
import { Util } from "../../../util/Util";
import { isIPlayable } from "../../../../base/stage/entity/interface/IPlayable";
import { Context } from "../../../../base/resources/image/Context";
import { InfluentialEntity } from "../../../../base/stage/entity/InfluentialEntity";

/**
 * Immutable event object
 * - Show sign
 * @extends {ImagedEntity}
 * @implements {IColliderable}
 * @classdesc Immutable event object to show sign
 */
export class SignObject extends ImagedEntity implements IColliderable {
    /**
     * Sign image
     * @protected
     * @type {GameImage}
     */
    protected signImage: GameImage | null;
    /**
     * Sign realative x position
     * @protected
     * @type {number}
     */
    protected signX: number;
    /**
     * Sign realative y position
     * @protected
     * @type {number}
     */
    protected signY: number;

    /**
     * Sign collider for
     * @protected
     * @type {Collider}
     */
    protected signCollider: Collider | null;

    /**
     * Whether sign can be showed or not
     * @protected
     * @type {boolean}
     */
    protected isShowSign: boolean;

    /**
     * Show speed
     * @protected
     * @type {number}
     */
    protected speed: number;

    /**
     * Influential event object constructor
     * @constructor
     */
    constructor() {
        super();

        this.signImage = null;
        this.signX = 0;
        this.signY = 0;
        this.signCollider = null;
        this.isShowSign = false;
        this.speed = 100;
    }

    /**
     * Set sign information
     * @param {GameImage} signImage Sign image
     * @param {number} x Sign relative x position
     * @param {number} y Sign relative y position
     */
    setSign(signImage: GameImage | null, x: number, y: number) {
        this.signImage = signImage;
        this.signX = x;
        this.signY = y;
    }

    /**
     * Set collider
     * @param {Collider} collider collider
     */
    setCollider(collider: Collider) {
        this.signCollider = collider;
        this.signCollider.setEntity(this);
        this.signCollider.init();
    }

    /**
     * Get collider
     * @override
     * @return {Collider} Collider that object has
     */
    getCollider(): Collider | null {
        return this.signCollider;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        if (this.signCollider !== null) {
            this.signCollider.init();
        }
        if (this.signImage !== null) {
            this.signImage.init();
        }
        this.isShowSign = false;
    }

    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        this.isShowSign = false;
        if (this.stage === null || this.signCollider === null) {
            return;
        }
        const physic = this.stage.getPhysicalWorld();
        if (physic === null) {
            return;
        }
        for (const it of physic.getCollisionData(this.signCollider)) {
            const you = Util.getCollidedEntity(<unknown>this as InfluentialEntity, it);
            if (isIPlayable(you)) {
                this.isShowSign = true;
            }
        }
        if (this.isShowSign && this.image !== null) {
            super.update(dt);
            // show
            if (this.signImage !== null && Util.canEnd(this.image)) {
                this.signImage.update(dt);
            }
        } else {
            // hide
            if (this.signImage !== null) {
                this.signImage.init();
            }
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
        if (this.signImage !== null && this.image !== null && this.isShowSign && Util.canEnd(this.image)) {
            this.signImage.render(ctx, this.x + shiftX + this.signX, this.y + shiftY + this.signY);
        }
    }
}
