/**
 * Main game engine builder
 * - Performs initial construction of the game engine
 * - Generates all necessary instances
 * - ### Generates unique instance
 * @extends {UnderEngineBuilder}
 * @classdesc Main game engine builder to perform initial construction of the game engine
 */
class MainBuilder extends UnderEngineBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make input system
     * @override
     * @protected
     * @return {Input} Input system
     */
    makeInput() {
        return new PreventKeyInput();
    }
}
