/**
 * Stage parser
 * - ### Generates a stage from a file
 * @interface
 * @classdesc Stage parser to generate a stage from a file
 */
export abstract class StageParser {
    /**
     * Parse file to stage
     * @abstract
     * @param {string} filePath Stage file path
     * @param {number} width Stage width for rendering area
     * @param {number} height Stage height for rendering area
     * @return {Stage} Generated stage
     */
    abstract parse(filePath: string, width: number, height: number): Stage;
}
