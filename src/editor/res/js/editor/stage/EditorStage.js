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
         * Selection of the tile to be placed
         * @type {Selection}
         */
        this.tileSelection = null;
        /**
         * Selection of the entity to be placed
         * @type {Selection}
         */
        this.entitySelection = null;

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
     * Add entity to stage
     * @override
     * @param {Entity} Pentity - entity object
     */
    addEntity(entity) {
        super.addEntity(entity);
        // onece update
        entity.update(30);
        if (entity instanceof Player) {
            // this.camera.setCameraPosition(-entity.x + Screen.it.width / 2, -entity.y + Screen.it.height / 2, this.map.width, this.map.height);
        }
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
     * Get entity information
     * @return {Dictionary<number, json>} Entity information json data
     */
    getEntityInfo() {
        return this.entityInfo;
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
     * Set tile selection
     * @param {Selection} selection Tile selection
     */
    setTileSelection(selection) {
        if (BaseUtil.implementsOf(selection, Selection)) {
            this.tileSelection = selection;
        }
    }

    /**
     * Set entity selection
     * @param {Selection} selection Entity selection
     */
    setEntitySelection(selection) {
        if (BaseUtil.implementsOf(selection, Selection)) {
            this.entitySelection = selection;
        }
    }

    /**
     * Update stage
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        // switch test play
        if (Input.it.isPress(Input.key.a() + 15)) {
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

        // test play
        if (this.playMode) {
            if (Input.it.isPress(Input.key.a() + 5)) {
                if (this.debugMode) {
                    this.debugMode = false;
                } else {
                    this.debugMode = true;
                }
            }
            if (!this.debugMode || (Input.it.isPress(Input.key.a()) || Input.it.isPressed(Input.key.a() + 1))) {
                super.update(dt);
            }
        } else {
            // move camera to end
            if (Input.it.isPress(Input.key.a() + 4)) {
                for (let it of this.getEntities()) {
                    if (it instanceof Player) {
                        this.camera.setCameraPosition(-it.x + Screen.it.width / 2, -it.y + Screen.it.height / 2, this.map.width, this.map.height);
                    }
                }
            }

            // move camera
            if (Input.it.isPress(Input.key.right())) {
                this.camera.setCameraPosition(this.camera.cameraX - this.camera.screenWidth / 2, this.camera.cameraY, this.map.width, this.map.height);
            }
            if (Input.it.isPress(Input.key.left())) {
                this.camera.setCameraPosition(this.camera.cameraX + this.camera.screenWidth / 2, this.camera.cameraY, this.map.width, this.map.height);
            }
            if (Input.it.isPress(Input.key.up())) {
                this.camera.setCameraPosition(this.camera.cameraX, this.camera.cameraY + this.camera.screenHeight / 2, this.map.width, this.map.height);
            }
            if (Input.it.isPress(Input.key.down())) {
                this.camera.setCameraPosition(this.camera.cameraX, this.camera.cameraY - this.camera.screenHeight / 2, this.map.width, this.map.height);
            }

            // update camera
            this.camera.setCameraPosition(1, 1, this.map.width, this.map.height);
        }

        // update selected area
        this.selectedX = -1;
        this.selectedY = -1;
        let x = Math.floor((Input.mouse.getMouseX() - this.x - this.camera.cameraX) / 32) * 32;
        let y = Math.floor((Input.mouse.getMouseY() - this.y - this.camera.cameraY) / 32) * 32;
        // check camera position
        if (x + 32 >= -this.camera.cameraX && x < this.camera.screenWidth - this.camera.cameraX && y + 32 >= -this.camera.cameraY && y < this.camera.screenHeight - this.camera.cameraY) {
            // check map position
            if (0 <= x && x <= this.map.width && 0 <= y && y <= this.map.height) {
                this.selectedX = x + this.camera.cameraX;
                this.selectedY = y + this.camera.cameraY;
            }
        }

        // syrunge
        if (this.selectedX >= 0 && Input.it.isPressed(Input.mouse.mRight())) {
            if (this.entitySelection.getSelected() < 0) {
                let entities = this.getEntities();
                for (let i = 0; i < entities.length; ++i) {
                    let entity = entities[i];
                    if (entity.x <= x && x < entity.x + entity.width && entity.y <= y && y < entity.y + entity.height) {
                        if (entity instanceof ImmutableObject) {
                            this.tileSelection.setSelected(this.entitiesID[i]);
                            break;
                        }
                    }
                }
            }
        }

        // place tile
        if (this.selectedX >= 0 && Input.it.isPressed(Input.mouse.mLeft())) {
            let tileID = this.tileSelection.getSelected();
            let entityID = this.entitySelection.getSelected();
            if (entityID >= 0) {
                // remove
                for (let entity of this.getEntities()) {
                    if (entity.x <= x && x < entity.x + entity.width && entity.y <= y && y < entity.y + entity.height) {
                        if (entity instanceof MutableObject) {
                            this.removeEntity(entity);
                        }
                    }
                }
                this.addEntity(new UnderCharacterBuilder().build(x, y, this.entityInfo[entityID]));
                this.addEntityID(entityID);
            } else if (tileID >= 0) {
                // remove
                for (let entity of this.getEntities()) {
                    if (entity.x <= x && x < entity.x + entity.width && entity.y <= y && y < entity.y + entity.height) {
                        if (entity instanceof ImmutableObject) {
                            this.removeEntity(entity);
                        }
                    }
                }
                this.addEntity(new UnderTileBuilder().build(x, y, this.tileInfo[tileID]));
                this.addEntityID(tileID);
            } else {
                // remove
                for (let entity of this.getEntities()) {
                    if (entity.x <= x && x < entity.x + entity.width && entity.y <= y && y < entity.y + entity.height) {
                        this.removeEntity(entity);
                    }
                }
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
            let tileID = this.tileSelection.getSelected();
            let entityID = this.entitySelection.getSelected();
            let width = 32;
            let height = 32;
            if (entityID >= 0) {
                width = this.entityInfo[entityID].width;
                height = this.entityInfo[entityID].height;
            } else if (tileID >= 0) {
                width = this.tileInfo[tileID].width;
                height = this.tileInfo[tileID].height;
            }
            ctx.strokeRect(this.selectedX, this.selectedY, width, height, `white`);
        }
    }
}
