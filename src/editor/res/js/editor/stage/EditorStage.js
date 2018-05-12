/**
 * Editor stage
 * - Store stage size
 * - Performs updating and rendering stage
 * - Manages stage element such as entity
 * - Dividingly manages entities according to type
 * - Do not update immutable objects
 * - Executes debug process
 * - It can save data
 * - ### Enable to put, remove and replace entity
 * @extends {DebugStage}
 * @classdesc Editor stage that can put, remove and replace entity
 */
class EditorStage extends DebugStage /* , IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor stage constructor
     * @constructor
     * @param {Stage} stage Original stage for delegation
     * @param {Object<number, JSON>} tileInfo Tile information json data
     * @param {Object<number, JSON>} entityInfo Entity information json data
     */
    constructor(stage, tileInfo, entityInfo) {
        super(stage);

        /**
         * Tile information json data
         * @protected
         * @type {Object<number, JSON>}
         */
        this.tileInfo = tileInfo;
        /**
         * Entity information json data
         * @protected
         * @type {Object<number, JSON>}
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
         * @type {ISelection}
         */
        this.tileSelection = null;
        /**
         * Selection of the entity to be placed
         * @type {ISelection}
         */
        this.entitySelection = null;

        /**
         * Whether the test play is in progress or not
         * @protected
         * @type {boolean}
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
    }


    /**
     * Registers entity ID
     * @param {number} id Entity ID for registering
     */
    addEntityID(id) {
        this.entitiesID.push(id);
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
     * Remove entity from stage immediately
     * @abstract
     * @param {Entity} entity Entity object
     */
    removeEntityImmediately(entity) {
        let index = this.stage.getEntities().indexOf(entity);
        if (index >= 0) {
            this.entitiesID.splice(index, 1);
        }
        super.removeEntityImmediately(entity);
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        let data = {};
        data.width = this.stage.stageWidth;
        data.height = this.stage.stageHeight;
        data.background = (new BackgroundUnparser()).unparse(this.stage.back);
        data.camera = (new CameraUnparser()).unparse(this.stage.camera.baseCamera);
        data.tiles = this.tileInfo.tiles;
        data.entities = this.entityInfo.entities;
        data.layers = [];
        data.layers.push([]);
        data.deploy = [];
        let entities = this.getEntities();
        let unparser = new EntityUnparser();
        for (let i = 0; i < entities.length; ++i) {
            let it = entities[i];
            let id = this.entitiesID[i];
            let original = it instanceof TileObject ? this.tileInfo[id] : this.entityInfo[id];
            let entity = unparser.unparse(it, original);
            // unparse event
            if (BaseUtil.implementsOf(it, IEventEntity)) {
                entity.event = EventUnparser.unparse(it.getEvent());
            }
            // set
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
        let eventBuilder = new UnderEventBuilder();
        let imageBuilder = new BaseImageBuilder();
        charaBuilder.setImageBuilder(imageBuilder);
        let entities = this.getEntities();
        for (let i = entities.length - 1; i >= 0; --i) {
            if (!(entities[i] instanceof TileObject)) {
                this.removeEntityImmediately(entities[i]);
            }
        }
        for (let it of save.deploy) {
            let chara = charaBuilder.build(it, this.entityInfo[it.id]);
            if (BaseUtil.implementsOf(chara, IEventEntity)) {
                chara.setEvent(eventBuilder.build(it.event));
            }
            this.addEntity(chara);
            this.addEntityID(it.id);
        }
        EventManager.it.clear();
    }

    /**
     * Set tile selection
     * @param {ISelection} selection Tile selection
     */
    setTileSelection(selection) {
        this.tileSelection = selection;
        this.tileSelection.setSelectionInfo(this.tileInfo);
    }

    /**
     * Set entity selection
     * @param {ISelection} selection Entity selection
     */
    setEntitySelection(selection) {
        this.entitySelection = selection;
        this.entitySelection.setSelectionInfo(this.entityInfo);
    }

    /**
     * Update stage
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        // switch test play
        if (Input.key.isPress(Input.key.a() + 15)) {
            if (this.playMode) {
                this.stage.camera = this.preCamera;
                this.restore();
            } else {
                this.preCamera = this.stage.camera;
                // TODO: Should be abstracted
                this.stage.camera = this.preCamera.baseCamera;
                this.getSaveData();
            }
            this.playMode = !this.playMode;
        }

        // test play
        if (this.playMode) {
            if (Input.key.isPress(Input.key.a() + 5)) {
                if (this.debugMode) {
                    this.debugMode = false;
                } else {
                    this.debugMode = true;
                }
            }
            if (!this.debugMode || (Input.key.isPress(Input.key.a()) || Input.key.isPressed(Input.key.a() + 1))) {
                super.update(Input.key.isPressed(Input.key.a() + 8) ? dt * 10 : dt);
            }
        } else {
            // move camera to end
            if (Input.key.isPress(Input.key.a() + 4)) {
                for (let it of this.getEntities()) {
                    if (it instanceof Player) {
                        this.stage.camera.update(-it.x + GameScreen.it.width / 2, -it.y + GameScreen.it.height / 2, dt);
                    }
                }
            }

            // move camera
            if (Input.key.isPress(Input.key.right())) {
                this.stage.camera.update(this.stage.camera.cameraX - this.stage.camera.screenWidth / 2, this.stage.camera.cameraY, dt);
            }
            if (Input.key.isPress(Input.key.left())) {
                this.stage.camera.update(this.stage.camera.cameraX + this.stage.camera.screenWidth / 2, this.stage.camera.cameraY, dt);
            }
            if (Input.key.isPress(Input.key.up())) {
                this.stage.camera.update(this.stage.camera.cameraX, this.stage.camera.cameraY + this.stage.camera.screenHeight / 2, dt);
            }
            if (Input.key.isPress(Input.key.down())) {
                this.stage.camera.update(this.stage.camera.cameraX, this.stage.camera.cameraY - this.stage.camera.screenHeight / 2, dt);
            }

            // update camera
            this.stage.camera.update(1, 1, dt);
        }

        // update selected area
        this.selectedX = -1;
        this.selectedY = -1;
        let x = Math.floor((Input.mouse.getMouseX() - this.stage.camera.baseX - this.stage.camera.cameraX) / 32) * 32;
        let y = Math.floor((Input.mouse.getMouseY() - this.stage.camera.baseY - this.stage.camera.cameraY) / 32) * 32;
        // check camera position
        if (x + 32 >= -this.stage.camera.cameraX && x < this.stage.camera.screenWidth - this.stage.camera.cameraX && y + 32 >= -this.stage.camera.cameraY && y < this.stage.camera.screenHeight - this.stage.camera.cameraY) {
            // check background position
            if (0 <= x && x <= this.stageWidth && 0 <= y && y <= this.stageHeight) {
                this.selectedX = x + this.stage.camera.cameraX;
                this.selectedY = y + this.stage.camera.cameraY;
            }
        }

        // syrunge
        if (this.selectedX >= 0 && Input.mouse.isPressed(Input.mouse.mRight())) {
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
        if (this.selectedX >= 0 && Input.mouse.isPressed(Input.mouse.mLeft())) {
            let tileID = this.tileSelection.getSelected();
            let entityID = this.entitySelection.getSelected();
            if (entityID >= 0) {
                // remove
                for (let entity of this.getEntities()) {
                    if (entity.x <= x && x < entity.x + entity.width && entity.y <= y && y < entity.y + entity.height) {
                        if (!(entity instanceof TileObject)) {
                            this.removeEntityImmediately(entity);
                        }
                    }
                }
                let deploy = {
                    x: x,
                    y: y,
                    z: 0,
                };
                let builder = new UnderCharacterBuilder();
                builder.setImageBuilder(new BaseImageBuilder());
                this.addEntity(builder.build(deploy, this.entityInfo[entityID]));
                this.addEntityID(entityID);
            } else if (tileID >= 0) {
                // remove
                for (let entity of this.getEntities()) {
                    if (entity.x <= x && x < entity.x + entity.width && entity.y <= y && y < entity.y + entity.height) {
                        if (entity instanceof TileObject) {
                            this.removeEntityImmediately(entity);
                        }
                    }
                }
                let deploy = {
                    x: x,
                    y: y,
                    z: 0,
                };
                let builder = new UnderTileBuilder();
                builder.setImageBuilder(new BaseImageBuilder());
                this.addEntity(builder.build(deploy, this.tileInfo[tileID]));
                this.addEntityID(tileID);
            } else {
                // remove
                for (let entity of this.getEntities()) {
                    if (entity.x <= x && x < entity.x + entity.width && entity.y <= y && y < entity.y + entity.height) {
                        this.removeEntityImmediately(entity);
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
