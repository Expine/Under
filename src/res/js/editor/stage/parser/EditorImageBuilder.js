/**
 * Editor image builder
 * - Generates image from json data
 * - Generates normal image from json data
 * - ### Generates editor image
 * @extends {BaseImageBuilder}
 * @classdesc Editor image builder to generate edito image
 */
class EditorImageBuilder extends BaseImageBuilder {
    /**
     * Build image from json data
     * @override
     * @param {string} root File root path
     * @param {JSON} image Image json data
     * @return {GameImage} Maked image
     */
    build(root, image) {
        return new EditorImage(super.build(root, image), root);
    }
}
