/**
 * Edit builder
 * - ### Generates edit tools
 * @interface
 * @classdesc Edit builder to generate edit tools
 */
class EditBuilder {
    /**
     * Build entity from json data
     * @abstract
     * @return {EditorBase} Generated edit tool
     */
    build() {}
}
