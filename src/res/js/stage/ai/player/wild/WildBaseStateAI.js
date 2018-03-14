/**
 * Wild base State AI
 * AI with state
 * @classdesc AI with state for determining action
 */
class WildBaseStateAI extends BaseStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Wild base State AI Constructor
     * @param {Entity} entity Entity to which AI is attached
     */
    constructor(entity) {
        super(entity, new WildStationaryState());
        entity.imageID = Context.image.loadImage(`res/image/chara/wild.png`);
    }
}
