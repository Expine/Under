/**
 * Terrainable interface
 * It can be gotten terrain ID
 * @implements {Interface}
 * @classdesc Under playable interface for under player function
 */
class Terrainable extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Terrainable constructor
     * @constructor
     */
    constructor() {
        super();

        this.addMethod(this.getTerrainID);
    }

    /**
     * Get terrain ID
     * @interface
     * @return {number} Terrain ID
     */
    getTerrainID() {}
}
