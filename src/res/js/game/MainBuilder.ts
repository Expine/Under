import { PreventKeyInput } from './../under/extend/input/PreventKeyInput';
import { UnderEngineBuilder } from './../under/extend/UnderEngineBuilder';
import { GameScreen } from "../under/base/screen/GameScreen";
import { Input } from "../under/base/input/Input";

/**
 * - Generates unique instance for 'under'.
 * - Do not require mouse input, and require to block input for page.
 * @classdesc Generate unique input for 'under'.
 */
export class MainBuilder
    extends UnderEngineBuilder
{
    /**
     * @override
     */
    protected makeInput(screen: GameScreen): Input
    {
        return new PreventKeyInput(screen);
    }
}
