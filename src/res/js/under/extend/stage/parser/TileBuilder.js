/**
 * Tile builder
 * - Generates entity from json data
 * - ### Generate tile from json data
 * @implements {EntityBuilder}
 * @classdesc Tile builder to generate tile from json data
 */
class TileBuilder extends EntityBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Load image
     * @protected
     * @param {string} path Image file name
     * @return {number} Image ID
     */
    loadImage(path) {
        return ResourceManager.image.load(`tile/${path}`);
    }

    /**
     * Make image
     * @protected
     * @param {JSON} image Entity information json data
     * @return {GameImage} Image
     */
    makeImage(image) {
        let id = this.loadImage(image.file);
        switch (image.type) {
            case `tile`:
                return new TileImage(id, image.width, image.height, image.x, image.y, image.width, image.height);
            case `single`:
                return new SingleImage(id, image.width, image.height);
            case `anime`:
                {
                    let base = new SingleAnimation(image.loop);
                    let id = this.loadImage(image.file);
                    base.setSize(image.width, image.height);
                    for (let it of image.animation) {
                        base.addAnimation(new AnimationElement(id, it.x, it.y, it.width, it.height, it.delta));
                    }
                    return base;
                }
            case `multianime`:
                {
                    let base = new MultiNamedAnimation();
                    let id = this.loadImage(image.file);
                    for (let anime of image.animations) {
                        base.setName(anime.name);
                        base.setAnimation(new SingleAnimation(anime.loop));
                        base.setSize(image.width, image.height);
                        for (let it of anime.animation) {
                            base.addAnimation(new AnimationElement(id, it.x, it.y, it.width, it.height, it.delta));
                        }
                    }
                    return base;
                }
            default:
                return null;
        }
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
     * @return {InfluentialEntity} Underlying tile object
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
        base.setPosition(deploy.x, deploy.y, deploy.z);
        base.setSize(json.width, json.height);
        if (base instanceof ImagedEntity) {
            let image = deploy.image !== undefined ? deploy.image : json.image;
            base.setImage(this.makeImage(image));
        }
    }

    /**
     * Build physical parameter from json data
     * @protected
     * @param {Entity} base Base entity
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json Character json data
     */
    buildPhysical(base, deploy, json) {
        let colliderData = deploy.collider !== undefined ? deploy.collider : json.collider;
        let materialData = deploy.material !== undefined ? deploy.material : json.material;
        // set collider
        let collider = this.makeCollider(colliderData);
        if (collider != null) {
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
        this.buildPhysical(base, deploy, json);
        return base;
    }
}
