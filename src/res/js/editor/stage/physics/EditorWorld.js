/**
 * Editor world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - Measure time for debugging by delegation
 * - It can save data
 * - ### Changes world type
 * @extends {DebugWorld}
 * @implements {IEditorSave}
 * @classdesc Editor world to chane world type
 */
class EditorWorld extends DebugWorld /* , IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        const ret = {};
        if (this.world instanceof SplitWorld) {
            ret.type = `split`;
        } else if (this.world instanceof SequentialWorld) {
            ret.type = `sequential`;
        } else if (this.world instanceof VariableGravityWorld) {
            ret.type = `gravity`;
            ret.gravity = [];
            for (let i = 0; i < this.world.gravityXs.length; ++i) {
                const data = {};
                data.x = this.world.gravityXs[i];
                data.y = this.world.gravityYs[i];
                data.delta = this.world.deltas[i];
                ret.gravity.push(data);
            }
        }
        return ret;
    }
}
