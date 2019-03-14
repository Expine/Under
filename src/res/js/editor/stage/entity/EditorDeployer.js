/**
 * Editor deployer
 * - Object present on the stage that has coordinate and size
 * - It can save data
 * - Stores ID
 * - Tile in editor
 * - ### Deployer in edito
 * @extends {EditorTile}
 * @classdesc Editor deployer in editor
 */
class EditorDeployer extends EditorTile {
    /**
     * Judege whether entity is deployer
     * @override
     * @return {boolen} Whether entity is deployer
     */
    isDeployer() {
        return true;
    }
}
