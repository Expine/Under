/**
 * Single entity layer
 * - Performs drawing processing collectively
 * - Selects something and set selected
 * - Selects something
 * - ### Selects a entity
 * @implements {SelectionLayer}
 * @classdesc Entity layer to select a entity
 */
class SingleEntityLayer extends SelectionLayer { // eslint-disable-line  no-unused-vars
    /**
     * Single entity layer constructor
     * @constructor
     * @param {JSON} info Entity inforamtion json data
     */
    constructor(info) {
        super(-1);

        /**
         * Entity information json data
         * @protected
         * @type {JSON}
         */
        this.entity = info;

        /**
         * Entity animation
         * @type {Animation}
         */
        this.animation = new SingleAnimation();
        if (info.anime === undefined) {
            let file = ResourceManager.image.load(`chara/${info.file}`);
            if (file !== undefined) {
                this.animation.addAnimation(new AnimationElement(file, 0, 0, 32, 32, 200));
            }
        } else {
            let file = ResourceManager.image.load(`chara/${info.anime.file}`);
            let animes = info.anime.animation[0].list;
            for (let anime of animes) {
                this.animation.addAnimation(new AnimationElement(file, anime.srcX, anime.srcY, anime.srcW, anime.srcH, anime.delta));
            }
        }

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
        this.selectedEntity = id < 0 ? null : this.entity;
    }

    /**
     * Set Selection layer position
     * @override
     * @param {number} x Chip layer x position
     * @param {number} y Chip layer y position
     * @param {number} width Chip layer width
     * @param {number} height Chip layer height
     */
    setPosition(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = this.entity.width;
        this.height = this.entity.height;
    }

    /**
     * Update layer
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.animation.update(dt);
        this.selectEntity = null;
        let x = Input.mouse.getMouseX() - this.x + this.clipX;
        let y = Input.mouse.getMouseY() - this.y + this.clipY;
        // check layer
        if (0 <= x && x < this.width && 0 <= y && y < this.height) {
            this.selectEntity = this.entity;
        }
        if (Input.it.isPress(Input.mouse.mLeft())) {
            this.selectedEntity = this.selectEntity;
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        this.animation.render(ctx, this.x - this.clipX, this.y - this.clipY, this.width, this.height);
        if (this.selectEntity != null) {
            ctx.strokeRect(this.x - this.clipX, this.y - this.clipY, this.width, this.height, `red`);
        }
        if (this.selectedEntity != null) {
            ctx.strokeRect(this.x - this.clipX, this.y - this.clipY, this.width, this.height, `white`);
        }
    }
}
