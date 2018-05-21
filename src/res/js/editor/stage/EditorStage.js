/**
 * Editor stage
 * - Store stage size
 * - Performs updating and rendering stage
 * - Manages stage element such as entity
 * - Dividingly manages entities according to type
 * - Do not update immutable objects
 * - Executes debug process
 * - It can save data
 * - Target for editing
 * - ### Enable to put, remove and replace entity
 * @extends {DebugStage}
 * @implements {IEditorSave}
 * @implements {IEditable}
 * @implements {IEditorTarget}
 * @classdesc Editor stage that can put, remove and replace entity
 */
class EditorStage extends DebugStage /* , IEditorSave, IEditable, IEditorTarget */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor stage constructor
     * @constructor
     * @param {Stage} stage Original stage for delegation
     * @param {Array<string>} tileFiles Tile information json file
     * @param {Array<string>} entityFiles Entity information json file
     */
    constructor(stage, tileFiles, entityFiles) {
        super(stage);

        /**
         * Tile information json files
         * @protected
         * @type {Array<string>}
         */
        this.tileFiles = tileFiles;
        /**
         * Entity information json files
         * @protected
         * @type {Array<string>}
         */
        this.entityFiles = entityFiles;

        /**
         * Whether the test play is in progress or not
         * @protected
         * @type {boolean}
         */
        this.playMode = false;
        /**
         * Save data of string
         * @protected
         * @type {JSON}
         */
        this.saveData = null;

        /**
         * Previous camera instance
         * @protected
         * @type {Camera}
         */
        this.preCamera = null;

        /**
         * List of editor entity
         * @protected
         * @type {Array<IEditorEntity>}
         */
        this.editorEntities = [];

        /**
         * Editor for editing
         * @protected
         * @type {EditorBase}
         */
        this.editor = null;
    }

    /**
     * Restore stage mutable object data
     * @protected
     */
    restore() {
        // remove not tile object
        let entities = this.getEntities();
        for (let i = entities.length - 1; i >= 0; --i) {
            if (!(entities[i] instanceof TileObject)) {
                this.removeEntityImmediately(entities[i]);
            }
        }
        // add saved object
        for (let it of this.saveData.deploy) {
            this.addEntityByID(it.id, it);
        }
        EventManager.it.clear();
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        let data = {};
        data.width = this.getStageWidth();
        data.height = this.getStageHeight();
        if (BaseUtil.implementsOf(this.stage.back, IEditorSave)) {
            data.background = this.stage.back.getSaveData();
        }
        if (BaseUtil.implementsOf(this.getCamera(), IEditorSave)) {
            data.camera = this.getCamera().getSaveData();
        }
        if (BaseUtil.implementsOf(this.getPhysicalWorld(), IEditorSave)) {
            data.world = this.getPhysicalWorld().getSaveData();
        }
        data.tiles = this.tileFiles;
        data.entities = this.entityFiles;
        data.layers = [];
        data.layers.push([]);
        data.deploy = [];
        for (let it of this.editorEntities) {
            // set
            if (it.isDeployer()) {
                data.deploy.push(it.getSaveData());
            } else {
                data.layers[0].push(it.getSaveData());
            }
        }
        return data;
    }

    /**
     * Set editor base
     * @override
     * @param {EditorBase} editor Editor base
     */
    setEditor(editor) {
        this.editor = editor;
        this.editor.setTarget(this);
        this.editor.init();
    }

    /**
     * Set tile selection
     * @override
     * @param {ISelection} selection Tile selection
     */
    setTileSelection(selection) {
        let factory = this.getFactory();
        if (BaseUtil.implementsOf(factory, IEditorInfo)) {
            selection.setSelectionInfo(factory.getTileInfo());
        }
        this.editor.addSelector(selection);
    }

    /**
     * Set entity selection
     * @override
     * @param {ISelection} selection Entity selection
     */
    setEntitySelection(selection) {
        let factory = this.getFactory();
        if (BaseUtil.implementsOf(factory, IEditorInfo)) {
            selection.setSelectionInfo(factory.getEntityInfo());
        }
        this.editor.addSelector(selection);
    }

    /**
     * Replace and paint
     * @override
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    paint(x, y, id) {
        let replaceTile = id === -1 || this.getFactory().createEntity(id) instanceof TileObject;
        // remove
        for (let entity of this.getEntities()) {
            if (entity.x <= x && x < entity.x + entity.width && entity.y <= y && y < entity.y + entity.height) {
                if (!(entity instanceof TileObject) || replaceTile) {
                    this.removeEntityImmediately(entity);
                }
            }
        }
        // deploy
        if (id !== -1) {
            let deploy = {
                x: x,
                y: y,
                z: 0,
            };
            this.addEntityByID(id, deploy);
        }
    }

    /**
     * Get painting ID by position
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @return {number} Painting ID
     */
    getID(x, y) {
        for (let entity of this.getEntities()) {
            if (entity.x <= x && x < entity.x + entity.width && entity.y <= y && y < entity.y + entity.height) {
                let target = this.editorEntities.find((it) => it.equals(entity));
                if (target !== null) {
                    return target.getID();
                }
            }
        }
        return -1;
    }

    /**
     * Add enttiy to stage by ID
     * @override
     * @param {Object} id Added entity ID
     * @param {JSON} deploy Deploy json data
     * @param {Function<((Entity) => void)>} init Initialize function
     * @return {Entity} Added entity
     */
    addEntityByID(id, deploy, init) {
        let entity = super.addEntityByID(id, deploy, init);
        this.editorEntities.push(entity instanceof TileObject ? new EditorTile(entity, id) : new EditorDeployer(entity, id));
        return entity;
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
     * Remove entity from stage
     * @override
     * @param {Entity} entity Entity object
     */
    removeEntity(entity) {
        let index = this.editorEntities.findIndex((it) => it.equals(entity));
        if (index >= 0) {
            this.editorEntities.splice(index, 1);
        }
        super.removeEntity(entity);
    }

    /**
     * Remove entity from stage immediately
     * @abstract
     * @protected
     * @param {Entity} entity Entity object
     */
    removeEntityImmediately(entity) {
        let index = this.editorEntities.findIndex((it) => it.equals(entity));
        if (index >= 0) {
            this.editorEntities.splice(index, 1);
        }
        super.removeEntityImmediately(entity);
    }

    /**
     * Update camera
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCamera(dt) {
        super.updateCamera(dt);

        // move camera to player (E)
        if (!this.playMode && Input.key.isPress(Input.key.a() + 4)) {
            let player = this.getEntities().filter((it) => BaseUtil.implementsOf(it, IPlayable));
            if (player.length > 0) {
                let p = player[0];
                this.getCamera().init(p.getCameraX(), p.getCameraY());
            }
        }
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
                this.setCamera(this.preCamera);
                this.restore();
            } else {
                this.preCamera = this.getCamera();
                if (this.preCamera instanceof DelegateCamera) {
                    this.setCamera(this.preCamera.getBaseCamera());
                }
                this.saveData = this.getSaveData();
            }
            this.playMode = !this.playMode;
        }

        // test play
        this.stage.setEnable(this.playMode);
        super.update(dt);
        this.stage.setEnable(true);

        // update editor
        let x = Input.mouse.getMouseX() - this.getCamera().baseX - this.getCamera().cameraX;
        let y = Input.mouse.getMouseY() - this.getCamera().baseY - this.getCamera().cameraY;
        // check camera position
        if (x + 32 >= -this.stage.camera.cameraX && x < this.stage.camera.screenWidth - this.stage.camera.cameraX && y + 32 >= -this.stage.camera.cameraY && y < this.stage.camera.screenHeight - this.stage.camera.cameraY) {
            // check background position
            if (0 <= x && x <= this.stageWidth && 0 <= y && y <= this.stageHeight) {
                this.editor.update(x, y, dt);
            }
        }
    }

    /**
     * Render stage
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        super.render(ctx, shiftX, shiftY);
        // render editor
        this.editor.render(ctx, this.getCamera().cameraX, this.getCamera().cameraY);
    }
}
