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
     * Make underlying tile object
     * @protected
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} tile Tile information json data
     * @return {InfluentialEntity} Underlying tile object
     */
    makeTileBase(x, y, tile) {
        return new TileObject(tile.x, tile.y, tile.width, tile.height, deploy.x, deploy.y, tile.width, tile.height, this.loadTileImage(tile.file));
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
     * Build tile from json data
     * @override
     * @param {JSON} deploy Entity deploy json data
     * @param {JSON} json tile json data
     * @return {Entity} Generated tile
     */
    build(deploy, json) {
        let base = this.makeTileBase(deploy, json);
        // set collider
        let collider = this.makeCollider(json.collider);
        if (collider != null) {
            collider.setAABB(this.makeAABB(json.collider));
        }
        base.setCollider(collider);
        // set material
        base.setMaterial(this.makeMaterial(json.material));
        return base;
    }
}
