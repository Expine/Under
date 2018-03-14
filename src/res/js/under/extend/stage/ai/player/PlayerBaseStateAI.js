/**
 * Player base State AI
 * AI with state
 * @classdesc AI with state for determining action
 */
class PlayerBaseStateAI extends BaseStateAI { // eslint-disable-line  no-unused-vars
    /**
     * Player base State AI Constructor
     * @param {Entity} entity Entity to which AI is attached
     */
    constructor(entity) {
        super(entity, new PStationaryState());
        entity.imageID = Context.image.loadImage(`res/image/chara/player.png`);
    }
}
