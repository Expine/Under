/**
 * Generate a stage from a file
 * Has file parsing
 * @classdesc Parser to generate stage
 */
class StageParser { // eslint-disable-line  no-unused-vars
    /**
     * Parse file to stage
     * @interface
     * @param {string} filePath stage file path
     * @param {number} width stage width for rendering area
     * @param {number} height stage height for rendering area
     * @return {Stage} generated stage
     */
    parse(filePath, width, height) {}
}
