/**
 * Generate tile from json data
 * Has json data parsing
 * @implements {EntityBuilder}
 * @classdesc Builder to generate tile
 */
class TileBuilder extends EntityBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Make collider
     * @param {json} collider Collider information json data
     * @return {Collider} Collider
     */
    makeCollider(collider) {
        if (collider.type == `Rectangle`) {
            return new RectangleCollider(collider.startX, collider.startY, collider.width, collider.height);
        } else if (collider.type == `Circle`) {
            return new CircleCollider(ret.radius, ret.shiftX, ret.shiftY);
        } else if (collider.type == `RoundRectangle`) {
            return new RoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut);
        }
    }

    /**
     * Make material
     * @param {json} material Material information json data
     * @return {Material} Material
     */
    makeMaterial(material) {
        return new DefaultMaterial(material.mass, material.elasticity, material.mu);
    }

    /**
     * Make underlying tile object
     * @protected
     * @param {number} x Entity x position
     * @param {number} y Entity y position
     * @param {json} tile Tile information json data
     * @return {Entity} Underlying tile object
     */
    makeTileBase(x, y, tile) {
        return new TileObject(tile.x, tile.y, tile.width, tile.height, x, y, tile.width, tile.height, tile.file);
    }

    /**
     * Make animation
     * @protected
     * @param {json} anime Animation json data
     * @return {NamedAnimation} Animation
     */
    makeAnimation(anime) {
        let base = anime.animation.length == 1 ? new SingleAnimation() : new MultiNamedAnimation();
        let id = ContextImage.it.loadImage(`chara/${anime.file}`);
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
     * @param {number} x Entity x position
     * @param {number} y Entity y position
     * @param {json} json tile json data
     * @return {Entity} Generated tile
     */
    build(x, y, json) {
        let base = this.makeTileBase(x, y, json);
        // set collider
        base.setCollider(this.makeCollider(json.collider));
        // set material
        base.setMaterial(this.makeMaterial(json.material));
        return base;
    }
}
