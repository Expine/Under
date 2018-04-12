/**
 * Stage parser
 * - ### Generates a stage from a file
 * @classdesc Stage parser to generate a stage from a file
 */
class StageParser { // eslint-disable-line  no-unused-vars
    /**
     * Parse file to stage
     * @interface
     * @param {string} filePath Stage file path
     * @param {number} width Stage width for rendering area
     * @param {number} height Stage height for rendering area
     * @return {Stage} Generated stage
     */
    parse(filePath, width, height) {}
}
