/**
 * Special object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Generated and owned by someone
 * - Object that can be destroyed
 * - ### Object caused by special actions
 * @extends {PossessedObject}
 * @implements {IBreakable}
 * @classdesc Special object caused by special actions
 */
class SpecialObject extends PossessedObject /* , IBreakable */ { // eslint-disable-line  no-unused-vars
    /**
     * Destroy object
     * @override
     */
    destroy() {
        this.stage.removeEntity(this);
    }
}
