import { NamedAnimation } from "../../../base/resources/image/NamedAnimation";
import { GameAnimation } from "../../../base/resources/image/GameAnimation";

/**
 * Multi named animation
 * - Sets and gets by currently name
 * @extends {NamedAnimation}
 * @classdesc Multi named animation to set and get by currently name
 */
export class MultiNamedAnimation extends NamedAnimation {
    /**
     * Dictionary of animation by string
     * @protected
     * @type {Object<string, GameAnimation>}
     */
    protected animation: { [s: string]: GameAnimation; };

    /**
     * Running animation name
     * @protected
     * @type {string}
     */
    protected name: string | null;

    /**
     * Multi named animation constructor
     * @constructor
     */
    constructor() {
        super();

        this.animation = {};
        this.name = null;
    }

    /**
     * Set running animation name
     * @override
     * @param {string} name Running animation name
     */
    setName(name: string) {
        this.name = name;
    }

    /**
     * Get animation from animations
     * @override
     * @return {GameAnimation} animation
     */
    getAnimation(): GameAnimation | null {
        if (this.name === null) {
            return null;
        }
        const ret = this.animation[this.name];
        return ret !== undefined ? ret : null;
    }

    /**
     * Get list of animation
     * @override
     * @protected
     * @return {Array<GameAnimation>} List of animation
     */
    getAnimations(): Array<GameAnimation> {
        const list = [];
        for (const it in this.animation) {
            if (this.animation.hasOwnProperty(it)) {
                list.push(this.animation[it]);
            }
        }
        return list;
    }

    /**
     * Set animation into animations
     * @override
     * @param {GameAnimation} animation
     */
    setAnimation(animation: GameAnimation) {
        if (this.name !== null) {
            this.animation[this.name] = animation;
        }
    }
}
