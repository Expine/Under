/**
 * Tile builder
 * - Generates entity from json data
 * - ### Generate tile from json data
 * @implements {EntityBuilder}
 * @classdesc Tile builder to generate tile from json data
 */
class TileBuilder extends EntityBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Load tile image
     * @protected
     * @param {string} path Tile image path
     * @return {number} Tile image ID
     */
    loadTileImage(path) {
        return ResourceManager.image.load(`tile/${path}`);
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
     * Make animation
     * @protected
     * @param {JSON} anime Animation json data
     * @return {NamedAnimation} Animation
     */
    makeAnimation(anime) {
        let base = anime.animation.length == 1 ? new SingleAnimation() : new MultiNamedAnimation();
        let id = ResourceManager.image.load(`chara/${anime.file}`);
        for (let it of anime.animation) {
            if (base instanceof MultiAnimation) {
                base.setName(`${it.direction.x}-${it.direction.y}`).setAnimation(new SingleAnimation(it.loop));
            } else if (it.loop !== undefined) {
                base.setLoop(it.loop);
            }
            for (let e of it.list) {
                base.addAnimation(new AnimationElement(id, e.srcX, e.srcY, e.srcW, e.srcH, e.delta));
            }
        }
        return base;
    }

    /**
     * Make underlying tile object
     * @protected
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} tile Tile information json data
     * @return {InfluentialEntity} Underlying tile object
     */
    makeTileBase(deploy, tile) {
        let ret = new TileObject();
        ret.setPosition(deploy.x, deploy.y, deploy.z);
        ret.setSize(tile.width, tile.height);
        ret.setTileArea(tile.x, tile.y, tile.width, tile.height);
        ret.setImage(this.loadTileImage(tile.file));
        return ret;
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
        this.buildPhysical(base, deploy, json);
        return base;
    }
}
