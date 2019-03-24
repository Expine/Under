import { JSONStageParser } from "../../../under/extend/stage/parser/JSONStageParser";
import { JSONEntityFactory } from "../../../under/extend/stage/parser/JSONEntityFactory";
import { UnderEventBuilder } from "../../event/UnderEventBuilder";
import { Util } from "../../../under/extend/util/Util";
import { CollisionResponse } from "../../../under/base/stage/physics/CollisionResponse";
import { UnderRepulsionResponse } from "../physics/UnderRepulsionResponse";
import { EntityFactory } from "../../../under/base/stage/parser/EntityFactory";
import { UnderTileBuilder } from "./UnderTileBuilder";
import { UnderCharacterBuilder } from "./UnderCharacterBuilder";

/**
 * Under stage parser to generate stage
 * - Set original response
 * - Set unique builder by default
 * @extends {JSONStageParser}
 * @classdesc Under stage parser to set original response and unique builder by default
 */
export class UnderStageParser extends JSONStageParser {
    /**
     * Make entity factory
     * @override
     * @protected
     * @param {any} stage Stage json data
     * @return {EntityFactory} Entity factory
     */
    makeEntityFactory(stage: any): EntityFactory {
        const ret = new JSONEntityFactory(new UnderTileBuilder(), new UnderCharacterBuilder(), new UnderEventBuilder());
        for (const it of stage.tiles) {
            ret.addTileInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        for (const it of stage.entities) {
            ret.addEntityInfo(JSON.parse(Util.loadFile(`src/res/stage/${it}`)));
        }
        return ret;
    }

    /**
     * Make physical response
     * @override
     * @protected
     * @return {CollisionResponse} Physical response
     */
    makePhysicalResponse(): CollisionResponse {
        return new UnderRepulsionResponse();
    }
}
