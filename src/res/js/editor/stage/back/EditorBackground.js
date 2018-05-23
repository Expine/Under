/**
 * Editor background
 * - Renders and update background image
 * - It can save data
 * - ### Delegate background and enable to save
 * @interface
 * @extends {Background}
 * @implements {IEditorSave}
 * @classdesc Editor background to delegate background and enable to save
 */
class EditorBackground extends Background /* , IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor background constructor
     * @constructor
     * @param {BackGround} baseBackground Base delegation background
     */
    constructor(baseBackground) {
        super();

        /**
         * Base delegation background
         * @type {Background}
         * @protected
         */
        this.baseBackground = baseBackground;
    }

    /**
     * Unparses from background to json
     * @protected
     * @param {Background} back Background to unparse
     * @return {JSON} Json data
     */
    unparse(back) {
        const ret = {};
        if (back instanceof EditorBackground) {
            back = back.baseBackground;
        }
        if (back instanceof SequentialBackground) {
            ret.type = `Sequential`;
            ret.backs = [];
            for (const it of back.backs) {
                ret.backs.push(this.unparse(it));
            }
        } else if (back instanceof InvariantBackground) {
            ret.type = `Invariant`;
        } else if (back instanceof MovementBackground) {
            ret.type = `Movement`;
            ret.x = back.x;
            ret.y = back.y;
            ret.rx = back.speedRatioX;
            ret.ry = back.speedRatioY;
        } else if (back instanceof AreaBackground) {
            ret.type = `Area`;
            ret.x = back.x;
            ret.y = back.y;
            ret.width = back.areaWidth;
            ret.height = back.areaHeight;
        } else if (back instanceof FixedBackground) {
            ret.type = `Fixed`;
            ret.x = back.x;
            ret.y = back.y;
        }
        if (back instanceof ImageBackground && BaseUtil.implementsOf(back.backImage, IEditorSave)) {
            ret.image = back.backImage.getSaveData();
        }
        return ret;
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        return this.unparse(this.baseBackground);
    }

    /**
     * Initialize background
     * @override
     */
    init() {
        this.baseBackground.update();
    }

    /**
     * Update background
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        this.baseBackground.update(dt);
    }

    /**
     * Render background
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenWidth Scren height
     */
    render(ctx, shiftX, shiftY, screenWidth, screenHeight) {
        this.baseBackground.render(ctx, shiftX, shiftY, screenWidth, screenHeight);
    }
}
