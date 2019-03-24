/**
 * Terrain interface
 * - It can be gotten terrain ID
 * @interface
 * @classdesc Terrain interface that can be gotten terrain ID
 */
export interface ITerrain {
    /**
     * Get terrain ID
     * @abstract
     * @return {number} Terrain ID
     */
    getTerrainID(): number;
}

/**
 * Type guard for ITerrain
 */
export const isITerrain = (arg: any): arg is ITerrain => arg !== null && arg.getTerrainID !== undefined;
