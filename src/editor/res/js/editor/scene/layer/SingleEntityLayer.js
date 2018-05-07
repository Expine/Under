/**
 * Single entity layer
 * - Performs drawing processing collectively
 * - Clips area when rendering
 * - Selects something and set selected
 * - It can save data
 * - Selects something
 * - ### Selects a entity
 * @extends {SelectionLayer}
 * @classdesc Entity layer to select a entity
 */
class SingleEntityLayer extends SelectionLayer { // eslint-disable-line  no-unused-vars
    /**
     * Single entity layer constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Entity information json data
         * @protected
         * @type {JSON}
         */
        this.entityData = null;

        /**
         * Entity animation
         * @type {IClipImage}
         */
        this.animation = null;

        /**
         * Selection entity
         * @protected
         * @type {JSON}
         */
        this.selectEntity = null;

        /**
         * Selected entity
         * @protected
         * @type {JSON}
         */
        this.selectedEntity = null;
    }

    /**
     * Set information for selection
     * @override
     * @param {JSON} info Selection information
     */
    setSelectionInfo(info) {
        this.entityData = info;
    }

    /**
     * Get selected entity ID
     * @override
     * @return {number} Selected entity ID (return -1 if not selected)
     */
    getSelected() {
        return this.selectedEntity == null ? -1 : this.selectedEntity.id;
    }

    /**
     * Set selected entity by ID
     * @override
     * @param {number} id Entity ID (if not selected, -1)
     */
    setSelected(id) {
        this.selectedEntity = id == this.entityData.id ? this.entityData : null;
    }

    /**
     * Initialize layer
     * @override
     */
    init() {
        // set size
        this.setSize(this.entityData.width, this.entityData.height);

        // load animation
        let file = ResourceManager.image.load(`chara/${this.entityData.image.file}`);
        if (this.entityData.image.type == `single`) {
            this.animation = new SingleClipImage(file, this.entityData.image.width, this.entityData.image.height);
        } else if (this.entityData.image.type == `anime`) {
            let animation = new SingleClipAnimation();
            for (let it of this.entityData.image.animation) {
                animation.addAnimation(new TileClipImage(file, this.entityData.image.width, this.entityData.image.height, it.x, it.y, it.width, it.height), it.delta);
            }
            this.animation = animation;
        } else if (this.entityData.image.type == `multianime`) {
            let animation = new SingleClipAnimation();
            for (let it of this.entityData.image.animations[0].animation) {
                animation.addAnimation(new TileClipImage(file, this.entityData.image.width, this.entityData.image.height, it.x, it.y, it.width, it.height), it.delta);
            }
            this.animation = animation;
        }
        this.animation.init();
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.animation.update(dt);
        this.selectEntity = null;
        let x = Input.mouse.getMouseX();
        let y = Input.mouse.getMouseY();
        // check cliping
        if (x < this.clipX || this.clipX + this.clipWidth < x || y < this.clipY || this.clipY + this.clipHeight < y) {
            return;
        }
        x -= this.x;
        y -= this.y;
        // check layer
        if (0 <= x && x < this.width && 0 <= y && y < this.height) {
            this.selectEntity = this.entityData;
        }
        if (Input.mouse.isPress(Input.mouse.mLeft())) {
            this.selectedEntity = this.selectEntity;
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        if (this.x + this.width < this.clipX || this.clipX + this.clipWidth < this.x || this.y + this.height < this.clipY || this.clipY + this.clipHeight < this.y) {
            return;
        }
        this.animation.clipingRender(ctx, this.x, this.y, this.clipX, this.clipY, this.clipWidth, this.clipHeight);
        if (this.selectEntity != null) {
            ctx.strokeRect(this.x, this.y, this.width, this.height, `red`);
        }
        if (this.selectedEntity != null) {
            ctx.strokeRect(this.x, this.y, this.width, this.height, `white`);
        }
    }
}
