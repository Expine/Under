/**
 * Normal none state
 * @implements {UnderPlayerState}
 * @classdesc Normal none state to store state animation
 */
class NormalNoneState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        return false;
    }
}
