/**
 * Editor event builder
 * - Generates event from json data
 * - Generate simple event
 * - Gemerates under event
 * - ### Generates editor event
 * @extends {UnderEventBuilder}
 * @classdesc Editor event builder to generate editor event
 */
class EditorEventBuilder extends UnderEventBuilder {
    /**
     * Build event from json data
     * @override
     * @param {JSON} json Event json data
     * @return {GameEvent} Generated event
     */
    build(json) {
        return new EditorEvent(super.build(json));
    }
}
