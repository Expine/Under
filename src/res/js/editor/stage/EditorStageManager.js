/**
 * Editor stage manager
 * - Manages stage
 * - Uses the stack
 * - It can save data
 * - ### It can save the current stage
 * @extends {StackStageManager}
 * @implements {IEditorSave}
 * @classdesc Editor stage manager that can save the current stage
 */
class EditorStageManager extends StackStageManager /* , IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        const stage = this.getStage();
        if (BaseUtil.implementsOf(stage, IEditorSave)) {
            return stage.getSaveData();
        }
    }
}
