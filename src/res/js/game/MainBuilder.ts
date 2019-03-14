import { PreventKeyInput } from './../under/extend/input/PreventKeyInput';
import { UnderEngineBuilder } from './../under/extend/UnderEngineBuilder';
import { GameScreen } from "../under/base/screen/GameScreen";
import { Input } from "../under/base/input/Input";

/**
 * Main game engine builder
 * - Generates unique instance
 * @extends {UnderEngineBuilder}
 * @classdesc Main game engine builder to perform initial construction of the game engine
 */
export class MainBuilder extends UnderEngineBuilder {
    /**
     * Make input system
     * @override
     * @protected
     * @param {GameScreen} screen Screen system
     * @return {Input} Input system
     */
    makeInput(screen: GameScreen): Input {
        return new PreventKeyInput(screen);
    }
}
