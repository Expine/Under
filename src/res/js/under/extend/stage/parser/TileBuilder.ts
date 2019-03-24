import { EntityBuilder } from "../../../base/stage/parser/EntityBuilder";
import { GameImage } from "../../../base/resources/image/GameImage";
import { Entity } from "../../../base/stage/entity/Entity";
import { ImagedEntity } from "../../../base/stage/entity/ImagedEntity";
import { InfluentialEntity } from "../../../base/stage/entity/InfluentialEntity";
import { Collider } from "../../../base/stage/physics/collider/Collider";
import { RectangleCollider } from "../physics/collider/RectangleCollider";
import { CircleCollider } from "../physics/collider/CircleCollider";
import { RoundRectangleCollider } from "../physics/collider/RoundRectangleCollider";
import { AABB } from "../../../base/stage/physics/collider/AABB";
import { DirectionalAABB } from "../physics/collider/DirectionalAABB";
import { SimpleAABB } from "../physics/collider/SimpleAABB";
import { Material } from "../../../base/stage/physics/material/Material";
import { ImmutableMaterial } from "../physics/material/ImmutableMaterial";
import { OnlyImageEntity } from "../entity/OnlyImageEntity";
import { TileObject } from "../entity/TileObject";

/**
 * Tile builder
 * - Generate tile from json data
 * @extends {EntityBuilder}
 * @classdesc Tile builder to generate tile from json data
 */
export class TileBuilder extends EntityBuilder {
    /**
     * Make image
     * @protected
     * @param {any} image Entity information json data
     * @return {GameImage} Image
     */
    makeImage(image: any): GameImage | null {
        return this.imageBuilder === null ? null : this.imageBuilder.build(`tile`, image);
    }

    /**
     * Try to replace deploy data
     * @protected
     * @param {any} deploy Deploy json data
     * @param {any} json Information json data
     * @param {any} data Data name
     * @return {any} Replaced JSON data
     */
    tryReplace(deploy: any, json: any, data: any): any {
        return (deploy === undefined || deploy[data] === undefined) ? json[data] : deploy[data];
    }

    /**
     * Try to override by deploy data
     * @protected
     * @param {any} deploy Deploy json data
     * @param {any} json Information json data
     * @param {any} init Initial data name
     * @return {any} Replaced JSON data
     */
    tryOverride(deploy: any, json: any, init: any): any {
        if (init !== undefined) {
            if (deploy === undefined || deploy[init] === undefined) {
                return json[init];
            } else {
                return this.tryOverride(deploy[init], json[init], undefined);
            }
        }
        if (deploy === undefined) {
            return json;
        }
        for (let name in deploy) {
            if (deploy.hasOwnProperty(name)) {
                const e = deploy[name];
                if (typeof (e) !== `object` || e instanceof Array) {
                    json[name] = e;
                } else {
                    json[name] = this.tryOverride(e, json[name], undefined);
                }
            }
        }
        return json;
    }

    /**
     * Make collider
     * @protected
     * @param {any} collider Collider information json data
     * @return {Collider} Collider
     */
    makeCollider(collider: any): Collider | null {
        switch (collider.type) {
            case `Rectangle`:
                return new RectangleCollider(collider.startX, collider.startY, collider.width, collider.height);
            case `Circle`:
                return new CircleCollider(collider.radius, collider.shiftX, collider.shiftY);
            case `RoundRectangle`:
                return new RoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut);
            default:
                return null;
        }
    }

    /**
     * Make AABB
     * @protected
     * @param {any} collider Collider information json data
     * @return {AABB} AABB
     */
    makeAABB(collider: any): AABB {
        if (collider.directional) {
            return new DirectionalAABB();
        } else {
            return new SimpleAABB();
        }
    }

    /**
     * Make material
     * @protected
     * @param {any} material Material information json data
     * @return {Material} Material
     */
    makeMaterial(material: any): Material | null {
        if (material !== undefined) {
            return new ImmutableMaterial(material.mass, material.elasticity, material.mu);
        }
        return null;
    }

    /**
     * Make underlying tile object
     * @protected
     * @param {any} deploy Entity deploy json data
     * @param {any} tile Tile information json data
     * @return {Entity} Underlying tile object
     */
    makeTileBase(_deploy: any, tile: any): Entity | null {
        switch (tile.type) {
            case `image`:
                return new OnlyImageEntity();
            case undefined:
                return new TileObject();
            default:
                return null;
        }
    }

    /**
     * Build base data from json data
     * @param {Entity} base Base entity
     * @param {any} deploy Entity deploy json data
     * @param {any} json Character json data
     */
    buildBase(base: Entity, deploy: any, json: any) {
        if (deploy !== undefined) {
            base.setPosition(deploy.x, deploy.y, deploy.z);
        }
        base.setSize(this.tryReplace(deploy, json, `width`), this.tryReplace(deploy, json, `height`));
    }

    /**
     * Build image data from json data
     * @param {ImagedEntity} base Base entity
     * @param {any} deploy Entity deploy json data
     * @param {any} json Character json data
     */
    buildImage(base: ImagedEntity, deploy: any, json: any) {
        const image = this.tryReplace(deploy, json, `image`);
        if (image !== undefined) {
            const im = this.makeImage(image);
            if (im !== null) {
                base.setImage(im);
            }
        }
    }

    /**
     * Build physical parameter from json data
     * @protected
     * @param {InfluentialEntity} base Base entity
     * @param {any} deploy Entity deploy json data
     * @param {any} json Character json data
     */
    buildPhysical(base: InfluentialEntity, deploy: any, json: any) {
        const colliderData = this.tryOverride(deploy, json, `collider`);
        const materialData = this.tryReplace(deploy, json, `material`);
        // set collider
        if (colliderData !== undefined) {
            const collider = this.makeCollider(colliderData);
            if (collider !== null) {
                collider.enable = colliderData.enable === undefined ? true : colliderData.enable;
                collider.response = colliderData.response === undefined ? true : colliderData.response;
                collider.setAABB(this.makeAABB(colliderData));
                base.setCollider(collider);
            }
            // set material
            const material = this.makeMaterial(materialData);
            if (material !== null) {
                base.setMaterial(material);
            }
        }
    }

    /**
     * Build tile from json data
     * @override
     * @param {any} deploy Entity deploy json data
     * @param {any} json tile json data
     * @return {Entity} Generated tile
     */
    build(deploy: any, json: any): Entity | null {
        const base = this.makeTileBase(deploy, json);
        if (base === null) {
            return null;
        }
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
