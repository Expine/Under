/**
 * Editor stage
 * Enable to put, remove and replace
 * @extends {SplitManagementStage}
 * @classdesc stage for editor
 */
class EditorStage extends SplitManagementStage { // eslint-disable-line  no-unused-vars
    /**
     * Editor stage constructor
     * @constructor
     * @param {Dictionary<number, json>} tileInfo Tile information json data
     * @param {Dictionary<number, json>} entityInfo Entity information json data
     */
    constructor(tileInfo, entityInfo) {
        super();

        /**
         * Tile information json data
         * @protected
         * @type {Dictionary<number, json>}
         */
        this.tileInfo = tileInfo;
        /**
         * Entity information json data
         * @protected
         * @type {Dictionary<number, json>}
         */
        this.entityInfo = entityInfo;

        /**
         * Selected x position
         * @protected
         * @type {number}
         */
        this.selectedX = -1;
        /**
         * Selected x position
         * @protected
         * @type {number}
         */
        this.selectedY = -1;

        /**
         * ID of the tile to be placed
         * @type {number}
         */
        this.placedTileID = -1;
        /**
         * ID of the entity to be placed
         * @type {number}
         */
        this.placedEntityID = -1;

        /**
         * Whether the test play is in progress or not
         * @protected
         * @type {bool}
         */
        this.playMode = false;
        /**
         * Save data of string
         * @protected
         * @type {string}
         */
        this.saveData = null;

        /**
         * Previous camera instance
         * @protected
         * @type {Camera}
         */
        this.preCamera = null;

        /**
         * List of entity ID
         * @protected
         * @type {Array<number>}
         */
        this.entitiesID = [];
    }

    /**
     * Registers entity ID
     * @param {number} id Entity ID for registering
     */
    addEntityID(id) {
        this.entitiesID.push(id);
    }

    /**
     * Set map manager
     * @override
     * @param {EditorMap} map map manager
     */
    setMap(map) {
        super.setMap(map);
    }

    /**
     * Get tile information
     * @return {Dictionary<number, json>} Tile information json data
     */
    getTileInfo() {
        return this.tileInfo;
    }

    /**
     * Remove entity from stage
     * @override
     * @param {Entity} entity - entity object
     */
    removeEntity(entity) {
        this.entitiesID.splice(this.entities_.indexOf(entity), 1);
        super.removeEntity(entity);
    }

    /**
     * Get json data for saving
     * @return {json} Json data for saving
     */
    getSaveData() {
        let data = {};
        data.map = this.map.getSaveData();
        // TODO: Should I save camera?
        data.camera = `Center`;
        data.tiles = this.tileInfo.tiles;
        data.entities = this.entityInfo.entities;
        data.layers = [];
        data.layers.push([]);
        data.deploy = [];
        let entities = this.getEntities();
        for (let i = 0; i < entities.length; ++i) {
            let it = entities[i];
            let entity = {};
            entity.id = this.entitiesID[i];
            entity.x = it.x;
            entity.y = it.y;
            if (it instanceof ImmutableObject) {
                data.layers[0].push(entity);
            } else {
                data.deploy.push(entity);
            }
        }
        this.saveData = JSON.stringify(data);
        return data;
    }

    /**
     * Restore stage mutable object data
     */
    restore() {
        let save = JSON.parse(this.saveData);
        let charaBuilder = new UnderCharacterBuilder();
        let entities = this.getEntities();
        for (let i = entities.length - 1; i >= 0; --i) {
            if (entities[i] instanceof MutableObject) {
                this.removeEntity(entities[i]);
            }
        }
        for (let it of save.deploy) {
            this.addEntity(charaBuilder.build(it.x, it.y, this.entityInfo[it.id]));
            this.addEntityID(it.id);
        }
    }

    /**
     * Update stage
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        // switch test play
        if (Input.it.isKeyPress(Input.it.A + 15)) {
            if (this.playMode) {
                this.camera = this.preCamera;
                this.restore();
            } else {
                this.preCamera = this.camera;
                this.camera = new CenterCamera(this.camera.screenWidth, this.camera.screenHeight);
                this.getSaveData();
            }
            this.playMode = !this.playMode;
        }
        // save
        if (Input.it.isKeyPress(Input.it.A + 18)) {
            this.getSaveData();
            console.log(this.saveData);
        }

        // test play
        if (this, this.playMode) {
            super.update(dt);
        } else {
            // update mutables and autonomies
            for (let it of this.mutables_) {
                it.update(dt);
            }
            // update camera
            this.camera.setCameraPosition(0, 0, this.map.width, this.map.height);
        }

        // update selected area
        this.selectedX = -1;
        this.selectedY = -1;
        let x = Math.floor((Input.it.getMouseX() - this.x - this.camera.cameraX) / 32) * 32;
        let y = Math.floor((Input.it.getMouseY() - this.y - this.camera.cameraY) / 32) * 32;
        // check camera position
        if (x + 32 >= -this.camera.cameraX && x < this.camera.screenWidth - this.camera.cameraX && y + 32 >= -this.camera.cameraY && y < this.camera.screenHeight - this.camera.cameraY) {
            // check map position
            if (0 <= x && x <= this.map.width && 0 <= y && y <= this.map.height) {
                this.selectedX = x + this.camera.cameraX;
                this.selectedY = y + this.camera.cameraY;
            }
        }

        // place tile
        if (this.selectedX >= 0 && Input.it.isMousePressed(Input.it.M.LEFT)) {
            // remove
            for (let entity of this.getEntities()) {
                if (entity.x == x && entity.y == y) {
                    this.removeEntity(entity);
                }
            }
            if (this.placedTileID >= 0) {
                this.addEntity(new UnderTileBuilder().build(x, y, this.tileInfo[this.placedTileID]));
                this.addEntityID(this.placedTileID);
            }
        }
    }

    /**
     * Render stage
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        super.render(ctx, shiftX, shiftY);

        if (this.selectedX >= 0) {
            ctx.strokeRect(this.selectedX, this.selectedY, 32, 32, `white`);
        }
    }
}
