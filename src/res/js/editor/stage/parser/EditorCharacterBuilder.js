/**
 * Under character builder
 * - Generates entity from json data
 * - Generate tile from json data
 * - Generate not tile but mutable entity from json data
 * - Gemerates under player
 * - ### Generate editor character
 * @extends {UnderCharacterBuilder}
 * @classdesc Under character builder to generate editor character
 */
class EditorCharacterBuilder extends UnderCharacterBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build tile from json data
     * @override
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json tile json data
     * @return {Entity} Generated tile
     */
    build(deploy, json) {
        return new EditorDeployer(super.build(deploy, json), json.id, json.autoID);
    }
}
