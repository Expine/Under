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
        const removeList = [];
        for (const it of this.editorEntities) {
            if (it.isDeployer()) {
                removeList.push(it);
            }
        }
        for (const it of removeList) {
            this.removeEntityImmediately(it.getEntity());
        }
        // add saved object
        for (const it of this.saveData.deploy) {
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
        const data = {};
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
        for (const it of this.editorEntities) {
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
        const factory = this.getFactory();
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
        const factory = this.getFactory();
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
        let replaceTile = true;
        if (id !== -1) {
            const willEntity = this.getFactory().createEntity(id);
            replaceTile = !BaseUtil.implementsOf(willEntity, IEditorEntity) || !willEntity.isDeployer();
        }
        // remove
        for (const it of this.editorEntities) {
            const entity = it.getEntity();
            if (entity.x <= x && x < entity.x + entity.width && entity.y <= y && y < entity.y + entity.height) {
                if (it.isDeployer() || replaceTile) {
                    this.removeEntityImmediately(entity);
                }
            }
        }
        // deploy
        if (id !== -1) {
            this.addEntityByID(id, {
                x: x,
                y: y,
                z: 0,
            });
        }
    }

    /**
     * Get editor entity
     * @abstract
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @return {IEditorEntity} Editor entity
     */
    getEditorEntity(x, y) {
        for (const it of this.editorEntities) {
            const entity = it.getEntity();
            if (entity.x <= x && x < entity.x + entity.width && entity.y <= y && y < entity.y + entity.height) {
                return it;
            }
        }
        return null;
    }

    /**
     * Add entity to stage by ID
     * @param {Object} id Added entity ID
     * @param {JSON} deploy Deploy json data
     * @param {Function<((Entity) => void)>} [init=null] Initialize function
     * @return {Entity} Added entity
     */
    addEntityByID(id, deploy, init = null) {
        let ret = super.addEntityByID(id, deploy, (it) => {
            if (init !== null && BaseUtil.implementsOf(it, IEditorEntity)) {
                init(it.getEntity());
            }
        });
        if (BaseUtil.implementsOf(ret, IEditorEntity)) {
            ret = ret.getEntity();
        }
        return ret;
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity Entity object
     */
    addEntity(entity) {
        if (BaseUtil.implementsOf(entity, IEditorEntity)) {
            this.editorEntities.push(entity);
            entity = entity.getEntity();
        }
        super.addEntity(entity);
    }
    /**
     * Remove entity from stage
     * @override
     * @param {Entity} entity Entity object
     */
    removeEntity(entity) {
        const index = this.editorEntities.findIndex((it) => it.equals(entity));
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
        const index = this.editorEntities.findIndex((it) => it.equals(entity));
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
            const player = this.getEntities().filter((it) => BaseUtil.implementsOf(it, IPlayable));
            if (player.length > 0) {
                const p = player[0];
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
        // switch test play (P)
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
        if (this.playMode) {
            super.update(dt);
        } else if (!this.getEntities().find((it) => BaseUtil.implementsOf(it, IPlayable))) {
            this.updateBackground(dt);
            this.getCamera().update(0, 0, dt);
        } else {
            this.updateBackground(dt);
            this.updateCamera(dt);
        }

        // update editor
        const x = Input.mouse.getMouseX() - this.getCamera().baseX - this.getCamera().cameraX;
        const y = Input.mouse.getMouseY() - this.getCamera().baseY - this.getCamera().cameraY;
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
