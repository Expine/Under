/**
 * State of normal special action
 * @implements {UnderPlayerState}
 * @classdesc State of normal special action
 */
class NormalSpecialState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        if (!Input.it.isKeyPressed(Input.it.sub)) {
            // change state
            if (this.entity.body.isFixX) {
                this.ai.changeState(`stationary`);
            } else {
                this.ai.changeState(`walk`);
            }
        }
        return true;
    }
}
