import { AIListedObject } from "../AIListedObject";
import { IOwned } from "../../../../base/stage/entity/interface/IOwned";
import { Entity } from "../../../../base/stage/entity/Entity";

/**
 * Possessed object
 * - Generated and owned by someone
 * @extends {AIListedObject}
 * @classdesc Possessed object that is generated and owned by someone
 */
export class PossessedObject extends AIListedObject implements IOwned {
    /**
     * Owned entity
     * @protected
     * @type {Entity}
     */
    protected owner: Entity | null;

    /**
     * Possessed object constructor
     * @constructor
     */
    constructor() {
        super();
        this.owner = null;
    }

    /**
     * Set owned entity
     * @override
     * @param {Entity} owner Owned entity
     */
    setOwner(owner: Entity) {
        this.owner = owner;
    }

    /**
     * Get owned entity
     * @override
     * @return {Entity} Owned entity
     */
    getOwner(): Entity | null {
        return this.owner;
    }
}
