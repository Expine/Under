/**
 * Editor stage
 * - Store stage size
 * - Performs updating and rendering stage
 * - Manages stage element such as entity
 * - Dividingly manages entities according to type
 * - Do not update immutable objects
 * - Executes debug process
 * - ### Enable to put, remove and replace entity
 * @extends {DebugStage}
 * @classdesc Editor stage that can put, remove and replace entity
 */
class EditorStage extends DebugStage { // eslint-disable-line  no-unused-vars
    /**
     * Editor stage constructor
     * @constructor
     * @param {Stage} stage Original stage for delegation
     * @param {Dictionary<number, json>} tileInfo Tile information json data
     * @param {Dictionary<number, json>} entityInfo Entity information json data
     */
    constructor(stage, tileInfo, entityInfo) {
        super(stage);

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
     * @param {Entity} entity Entity object
     */
    addEntity(entity) {
        super.addEntity(entity);
        // onece update
        entity.update(30);
        if (entity instanceof Player) {
            // this.stage.camera.setCameraPosition(-entity.x + Screen.it.width / 2, -entity.y + Screen.it.height / 2, this.stageWidth, this.stageHeight);
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
     * @param {Entity} entity Entity object
     */
    removeEntity(entity) {
        let index = this.stage.getEntities().indexOf(entity);
        if (index >= 0) {
            this.entitiesID.splice(index, 1);
        }
        super.removeEntity(entity);
    }

    /**
     * Get json data for saving
     * @return {json} Json data for saving
     */
    getSaveData() {
        let data = {};
        data.width = this.stage.stageWidth;
        data.height = this.stage.stageHeight;
        data.map = this.stage.map.getSaveData();
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
            if (it instanceof TileObject) {
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
            if (!(entities[i] instanceof TileObject)) {
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
     * @param {ISelection} selection Tile selection
     */
    setTileSelection(selection) {
        this.tileSelection = selection;
    }

    /**
     * Set entity selection
     * @param {ISelection} selection Entity selection
     */
    setEntitySelection(selection) {
        this.entitySelection = selection;
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
                this.stage.camera = this.preCamera;
                this.restore();
            } else {
                this.preCamera = this.stage.camera;
                this.stage.camera = new CenterCamera(this.stage.camera.screenWidth, this.stage.camera.screenHeight);
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
                        this.stage.camera.setCameraPosition(-it.x + Screen.it.width / 2, -it.y + Screen.it.height / 2, this.stageWidth, this.stageHeight);
                    }
                }
            }

            // move camera
            if (Input.it.isPress(Input.key.right())) {
                this.stage.camera.setCameraPosition(this.stage.camera.cameraX - this.stage.camera.screenWidth / 2, this.stage.camera.cameraY, this.stageWidth, this.stageHeight);
            }
            if (Input.it.isPress(Input.key.left())) {
                this.stage.camera.setCameraPosition(this.stage.camera.cameraX + this.stage.camera.screenWidth / 2, this.stage.camera.cameraY, this.stageWidth, this.stageHeight);
            }
            if (Input.it.isPress(Input.key.up())) {
                this.stage.camera.setCameraPosition(this.stage.camera.cameraX, this.stage.camera.cameraY + this.stage.camera.screenHeight / 2, this.stageWidth, this.stageHeight);
            }
            if (Input.it.isPress(Input.key.down())) {
                this.stage.camera.setCameraPosition(this.stage.camera.cameraX, this.stage.camera.cameraY - this.stage.camera.screenHeight / 2, this.stageWidth, this.stageHeight);
            }

            // update camera
            this.stage.camera.setCameraPosition(1, 1, this.stageWidth, this.stageHeight);
        }

        // update selected area
        this.selectedX = -1;
        this.selectedY = -1;
        let x = Math.floor((Input.mouse.getMouseX() - this.stage.camera.baseX - this.stage.camera.cameraX) / 32) * 32;
        let y = Math.floor((Input.mouse.getMouseY() - this.stage.camera.baseY - this.stage.camera.cameraY) / 32) * 32;
        // check camera position
        if (x + 32 >= -this.stage.camera.cameraX && x < this.stage.camera.screenWidth - this.stage.camera.cameraX && y + 32 >= -this.stage.camera.cameraY && y < this.stage.camera.screenHeight - this.stage.camera.cameraY) {
            // check map position
            if (0 <= x && x <= this.stageWidth && 0 <= y && y <= this.stageHeight) {
                this.selectedX = x + this.stage.camera.cameraX;
                this.selectedY = y + this.stage.camera.cameraY;
            }
        }

        // syrunge
        if (this.selectedX >= 0 && Input.it.isPressed(Input.mouse.mRight())) {
            if (this.entitySelection.getSelected() < 0) {
                let entities = this.getEntities();
                for (let i = 0; i < entities.length; ++i) {
                    let entity = entities[i];
                    if (entity.x <= x && x < entity.x + entity.width && entity.y <= y && y < entity.y + entity.height) {
                        if (entity instanceof ImmutableEntity) {
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
                        if (entity instanceof MutableEntity) {
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
                        if (entity instanceof ImmutableEntity) {
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
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
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
