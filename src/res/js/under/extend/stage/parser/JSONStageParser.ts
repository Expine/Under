import { StageParser } from "../../../base/stage/parser/StageParser";
import { BaseImageBuilder } from "./BaseImageBuilder";
import { ImageBuilder } from "../../../base/stage/parser/ImageBuilder";
import { GameImage } from "../../../base/resources/image/GameImage";
import { Stage } from "../../../base/stage/Stage";
import { SplitManagementStage } from "../SplitManagementStage";
import { CurtainStage } from "../CurtainStage";
import { Background } from "../../../base/stage/back/Background";
import { SequentialBackground } from "../back/SequentialBackground";
import { InvariantBackground } from "../back/InvariantBackground";
import { MovementBackground } from "../back/MovementBackground";
import { AreaBackground } from "../back/AreaBackground";
import { FixedBackground } from "../back/FixedBackground";
import { Camera } from "../../../base/stage/camera/Camera";
import { CenterCamera } from "../camera/CenterCamera";
import { ClipCamera } from "../camera/ClipCamera";
import { MovingCamera } from "../camera/MovingCamera";
import { ForceMoveCamera } from "../camera/ForceMoveCamera";
import { PhysicalWorld } from "../../../base/stage/physics/PhysicalWorld";
import { SequentialWorld } from "../physics/SequentialWorld";
import { SplitWorld } from "../physics/SplitWorld";
import { VariableGravityWorld } from "../physics/VariableGravityWorld";
import { CollisionResponse } from "../../../base/stage/physics/CollisionResponse";
import { RepulsionResponse } from "../physics/RepulsionResponse";
import { EntityFactory } from "../../../base/stage/parser/EntityFactory";
import { JSONEntityFactory } from "./JSONEntityFactory";
import { Util } from "../../util/Util";

/**
 * JSON stage parser
 * - Parses JSON file
 * @extends {StageParser}
 * @classdesc JSON stage parser to parse JSON file
 */
export class JSONStageParser extends StageParser {
    /**
     * Image builder instance
     * @protected
     * @type {ImageBuilder}
     */
    protected imageBuilder: ImageBuilder;


    /**
     * JSON stage parser
     * @param {ImageBuilder} [image = BaseImageBuilder] Image builder instance
     */
    constructor(image: ImageBuilder = new BaseImageBuilder()) {
        super();
        this.imageBuilder = image;
    }

    /**
     * Make background image
     * @protected
     * @param {any} image Background image json data
     * @return {GameImage} Background image
     */
    makeBackgroundImage(image: any): GameImage | null {
        return this.imageBuilder.build('back', image);
    }

    /**
     * Make base stage for parsing stage
     * @protected
     * @param {any} stage Stage json data
     * @return {Stage} Stage instance for base of parsing
     */
    makeBaseStage(stage: any): Stage {
        let ret: Stage = new SplitManagementStage(stage.name, stage.width, stage.height);
        if (stage.transition !== undefined) {
            const transition = stage.transition;
            switch (transition.type) {
                case 'curtain':
                    ret = new CurtainStage(ret, transition.nameTime, transition.transitionTime);
                    break;
            }
        }
        return ret;
    }

    /**
     * Make background for parsing stage
     * @protected
     * @param {any} back Background json data
     * @return {Background} Background instance for base of parsing
     */
    makeBackground(back: any): Background | null {
        const backImage = back.image === undefined ? null : this.makeBackgroundImage(back.image);
        switch (back.type) {
            case 'Sequential':
                const ret = new SequentialBackground();
                for (const it of back.backs) {
                    const sub = this.makeBackground(it);
                    if (sub !== null) {
                        ret.addBackground(sub);
                    }
                }
                return ret;
            case 'Invariant':
                return backImage === null ? null : new InvariantBackground(backImage);
            case 'Movement':
                return backImage === null ? null : new MovementBackground(backImage, back.x, back.y, back.rx, back.ry);
            case 'Area':
                return backImage === null ? null : new AreaBackground(backImage, back.x, back.y, back.width, back.height);
            case 'Fixed':
                return backImage === null ? null : new FixedBackground(backImage, back.x, back.y);
            default:
                return null;
        }
    }

    /**
     * Make base camera for parsing stage
     * @protected
     * @param {any} camera Camera json data
     * @return {Camera} Camera instance for base of parsing
     */
    makeBaseCamera(camera: any): Camera | null {
        let ret = null;
        if (camera.type === 'center') {
            ret = new CenterCamera();
        }
        if (camera.cliping && ret !== null) {
            ret = new ClipCamera(ret);
        }
        if (camera.moving && ret !== null) {
            ret = new MovingCamera(ret);
        }
        if (camera.force && ret !== null) {
            ret = new ForceMoveCamera(ret, camera.force.x, camera.force.y, camera.force.speed);
        }
        return ret;
    }

    /**
     * Make base phisical world for parsing stage
     * @protected
     * @param {any} stage Stage json data
     * @param {any} world World json data
     * @return {PhysicalWorld} Physical world instance for base of parsing
     */
    makeBaseWorld(stage: any, world: any): PhysicalWorld | null {
        switch (world.type) {
            case 'sequential':
                return new SequentialWorld();
            case 'split':
                return new SplitWorld(stage.width, stage.height);
            case 'gravity':
                {
                    const ret = new VariableGravityWorld(stage.width, stage.height);
                    for (const it of world.gravity) {
                        ret.addGravity(it.x, it.y, it.delta);
                    }
                    return ret;
                }
            default:
                return null;
        }
    }

    /**
     * Make physical response
     * @protected
     * @return {CollisionResponse} Physical response
     */
    makePhysicalResponse(): CollisionResponse {
        return new RepulsionResponse();
    }

    /**
     * Make entity factory
     * @protected
     * @param {any} stage Stage json data
     * @return {EntityFactory} Entity factory
     */
    makeEntityFactory(stage: any): EntityFactory {
        const ret = new JSONEntityFactory();
        for (const it of stage.tiles) {
            ret.addTileInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        for (const it of stage.entities) {
            ret.addEntityInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        return ret;
    }

    /**
     * Parset file to stage
     * @override
     * @param {string} filePath Stage file path
     * @param {number} width Stage width for rendering area
     * @param {number} height Stage height for rendering area
     * @return {Stage} Stage instance
     */
    parse(filePath: string, width: number, height: number): Stage {
        // get stage file data
        const stage = JSON.parse(Util.loadFile(filePath));
        if (stage.name === undefined) {
            stage.name = filePath.split('/')[filePath.split('/').length - 1].split('.')[0];
        }
        // make stage
        const base = this.makeBaseStage(stage);
        const background = this.makeBackground(stage.background);
        const camera = this.makeBaseCamera(stage.camera);
        const physic = this.makeBaseWorld(stage, stage.world);
        if (background !== null) {
            base.setBackground(background);
        }
        if (camera !== null) {
            base.setCamera(camera);
            camera.setScreenSize(width, height);
            camera.setMaxSize(base.getStageWidth(), base.getStageHeight());
        }
        if (physic !== null) {
            base.setPhysicalWorld(physic);
            physic.setResponse(this.makePhysicalResponse());
        }
        base.setFactory(this.makeEntityFactory(stage));
        let layerIndex = 0;
        // make tile
        for (const layer of stage.layers) {
            for (const chip of layer) {
                if (chip.z === undefined) {
                    chip.z = layerIndex;
                }
                base.addEntityByID(chip.id, chip);
            }
            layerIndex += 1;
        }
        // make entity
        for (const entity of stage.deploy) {
            if (entity.z === undefined) {
                entity.z = layerIndex;
            }
            base.addEntityByID(entity.id, entity);
        }
        return base;
    }
}
