/**
 * Editor world
 * - Performs a physical operation
 * - Registers entities and apply a physical operation
 * - Measure time for debugging by delegation
 * - ### Changes world type
 * @implements {DebugWorld}
 * @classdesc Editor world to chane world type
 */
class EditorWorld extends DebugWorld { // eslint-disable-line  no-unused-vars
    /**
     * Editor world constructor
     * @param {PhysicalWorld} world Original world for delegation
     * @param {number} stageWidth Stage width (pixel)
     * @param {number} stageHeight Stage height (pixel)
     * @constructor
     */
    constructor(world, stageWidth, stageHeight) {
        super(world);

        /**
         * Stage width (pixel)
         * @protected
         * @type {number}
         */
        this.stageWidth = stageWidth;
        /**
         * Stage height (pixel)
         * @protected
         * @type {number}
         */
        this.stageHeight = stageHeight;
    }
    /**
     * Update physical world
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    update(dt) {
        // w key
        if (Input.it.isPress(Input.key.a() + 22)) {
            let world;
            if (this.world instanceof SplitWorld) {
                world = new SequentialWorld(this.gravity / 10000);
            } else {
                world = new SplitWorld(this.stageWidth, this.stageHeight, this.gravity / 10000);
            }
            world.setResponse(this.world.getResponse());
            for (let it of this.world.entities) {
                world.addEntity(it);
            }
            this.world = world;
            return;
        }
        super.update(dt);
    }
}
