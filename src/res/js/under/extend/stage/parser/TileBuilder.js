/**
 * Tile builder
 * - Generates entity from json data
 * - ### Generate tile from json data
 * @extends {EntityBuilder}
 * @classdesc Tile builder to generate tile from json data
 */
class TileBuilder extends EntityBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make image
     * @protected
     * @param {JSON} image Entity information json data
     * @return {GameImage} Image
     */
    makeImage(image) {
        return this.imageBuilder.build(`tile`, image);
    }

    /**
     * Try to replace deploy data
     * @protected
     * @param {JSON} deploy Deploy json data
     * @param {JSON} json Information json data
     * @param {JSON} data Data name
     * @return {JSON} Replaced JSON data
     */
    tryReplace(deploy, json, data) {
        return (deploy === undefined || deploy[data] === undefined) ? json[data] : deploy[data];
    }

    /**
     * Make collider
     * @protected
     * @param {JSON} collider Collider information json data
     * @return {Collider} Collider
     */
    makeCollider(collider) {
        switch (collider.type) {
            case `Rectangle`:
                return new RectangleCollider(collider.startX, collider.startY, collider.width, collider.height);
            case `Circle`:
                return new CircleCollider(ret.radius, ret.shiftX, ret.shiftY);
            case `RoundRectangle`:
                return new RoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut);
            default:
                return null;
        }
    }

    /**
     * Make AABB
     * @protected
     * @param {JSON} collider Collider information json data
     * @return {AABB} AABB
     */
    makeAABB(collider) {
        if (collider.directional) {
            return new DirectionalAABB();
        } else {
            return new SimpleAABB();
        }
    }

    /**
     * Make material
     * @protected
     * @param {JSON} material Material information json data
     * @return {Material} Material
     */
    makeMaterial(material) {
        if (material !== undefined) {
            return new ImmutableMaterial(material.mass, material.elasticity, material.mu);
        }
        return null;
    }

    /**
     * Make underlying tile object
     * @protected
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} tile Tile information json data
     * @return {Entity} Underlying tile object
     */
    makeTileBase(deploy, tile) {
        return new TileObject();
    }

    /**
     * Build base data from json data
     * @param {Entity} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildBase(base, deploy, json) {
        if (deploy !== undefined) {
            base.setPosition(deploy.x, deploy.y, deploy.z);
        }
        base.setSize(this.tryReplace(deploy, json, `width`), this.tryReplace(deploy, json, `height`));
    }

    /**
     * Build image data from json data
     * @param {ImagedEntity} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildImage(base, deploy, json) {
        let image = this.tryReplace(deploy, json, `image`);
        if (image !== undefined) {
            base.setImage(this.makeImage(image));
        }
    }

    /**
     * Build physical parameter from json data
     * @protected
     * @param {InfluentialEntity} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildPhysical(base, deploy, json) {
        let colliderData = this.tryReplace(deploy, json, `collider`);
        let materialData = this.tryReplace(deploy, json, `material`);
        // set collider
        let collider = this.makeCollider(colliderData);
        if (collider !== null) {
            collider.enable = colliderData.enable === undefined ? true : colliderData.enable;
            collider.response = colliderData.response === undefined ? true : colliderData.response;
            collider.setAABB(this.makeAABB(colliderData));
        }
        base.setCollider(collider);
        // set material
        base.setMaterial(this.makeMaterial(materialData));
    }

    /**
     * Build tile from json data
     * @override
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json tile json data
     * @return {Entity} Generated tile
     */
    build(deploy, json) {
        let base = this.makeTileBase(deploy, json);
        this.buildBase(base, deploy, json);
        if (base instanceof ImagedEntity) {
            this.buildImage(base, deploy, json);
        }
        if (base instanceof InfluentialEntity) {
            this.buildPhysical(base, deploy, json);
        }
        return base;
    }
}
