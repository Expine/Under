import { TileBuilder } from "./TileBuilder";
import { GameImage } from "../../../base/resources/image/GameImage";
import { RigidBody } from "../../../base/stage/physics/body/RigidBody";
import { MaxAdoptBody } from "../physics/body/MaxAdoptBody";
import { PreciseBody } from "../physics/body/PreciseBody";
import { PlayerBody } from "../physics/body/PlayerBody";
import { FixBody } from "../physics/body/FixBody";
import { RigidMaterial } from "../../../base/stage/physics/body/RigidMaterial";
import { ImmutableRigidMaterial } from "../physics/body/ImmutableRigidMaterial";
import { MutableRigidMaterial } from "../physics/body/MutableRigidMaterial";
import { AI } from "../../../base/stage/ai/AI";
import { EnemyAI } from "../ai/EnemyAI";
import { StraightAI } from "../ai/StraightAI";
import { JumpAI } from "../ai/JumpAI";
import { ElevatorAI } from "../ai/gimmick/ElevatorAI";
import { VanishStateAI } from "../ai/gimmick/vanish/VanishStateAI";
import { PlayerGameoverStateAI } from "../ai/player/PlayerGameoverStateAI";
import { PlayerBaseStateAI } from "../ai/player/PlayerBaseStateAI";
import { AttackObjectAI } from "../ai/attack/AttackObjectAI";
import { StraightAttackAI } from "../ai/attack/StarightAttackAI";
import { Entity } from "../../../base/stage/entity/Entity";
import { OnlyImageEntity } from "../entity/OnlyImageEntity";
import { AIListedObject } from "../entity/AIListedObject";
import { Character } from "../entity/character/Character";
import { StateCharacter } from "../entity/character/StateCharacter";
import { Player } from "../entity/character/Player";
import { Enemy } from "../entity/character/Enemy";
import { Obstacle } from "../entity/Obstacle";
import { EnemyRespawnEntity } from "../entity/respawn/EnemyRespawnEntity";
import { PlayerRespawnEntity } from "../entity/respawn/PlayerRespawnEntity";
import { DoorObject } from "../entity/object/DoorObject";
import { SignObject } from "../entity/object/SignObject";
import { AttackObject } from "../entity/happen/attack/AttackObject";
import { OnceEventEntity } from "../entity/fire/OnceEventEntity";
import { ImmutableEvent } from "../entity/fire/ImmutableEvent";
import { MutableEntity } from "../../../base/stage/entity/MutableEntity";
import { AutonomyEntity } from "../../../base/stage/entity/AutonomyEntity";
import { IOwned, isIOwned } from "../../../base/stage/entity/interface/IOwned";
import { ImagedEntity } from "../../../base/stage/entity/ImagedEntity";
import { InfluentialEntity } from "../../../base/stage/entity/InfluentialEntity";

/**
 * Character builder
 * - Generate not tile but mutable entity from json data
 * @extends {TileBuilder}
 * @classdesc Character builder to generate mutable entity
 */
export class CharacterBuilder extends TileBuilder {
    /**
     * Make image
     * @override
     * @protected
     * @param {any} image Entity information json data
     * @return {GameImage} Image
     */
    makeImage(image: any): GameImage | null {
        return this.imageBuilder === null ? null : this.imageBuilder.build(`chara`, image);
    }

    /**
     * Make rigid body
     * @protected
     * @param {any} body Rigid body information json data
     * @return {RigidBody} Rigid body
     */
    makeBody(body: any): RigidBody | null {
        switch (body.type) {
            case `MaxAdopt`:
                return new MaxAdoptBody(body.fix);
            case `Precise`:
                return new PreciseBody(body.fix);
            case `Player`:
                return new PlayerBody(body.fix);
            case `Fix`:
                return new FixBody(body.fix);
            default:
                return null;
        }
    }

    /**
     * Make rigid body material
     * @protected
     * @param {any} material Rigid body material
     * @return {RigidMaterial} Rigid body material
     */
    makeBodyMaterial(material: any): RigidMaterial | null {
        switch (material.type) {
            case `Immutable`:
                return new ImmutableRigidMaterial(material.k, material.frictionX, material.frictionY, material.g);
            case `Mutable`:
                return new MutableRigidMaterial(material.k, material.frictionX, material.frictionY, material.g);
            default:
                return null;
        }
    }

    /**
     * Make AI
     * @protected
     * @param {any} ai AI information json data
     * @return {AI} AI
     */
    makeAI(ai: any): AI | null {
        switch (ai.type) {
            case `EnemyAI`:
                const base = this.makeAI(ai.ai);
                return base === null ? null : new EnemyAI(base);
            case `StraightAI`:
                return new StraightAI(ai.mvx, ai.px);
            case `JumpAI`:
                return new JumpAI(ai.jump);
            case `ElevatorAI`:
                {
                    const ret = new ElevatorAI(ai.velocity, ai.power);
                    for (const it of ai.floors) {
                        ret.addPosition(it.x, it.y);
                    }
                    return ret;
                }
            case `VanishStateAI`:
                return new VanishStateAI(ai.hide, ai.show, ai.interval);
            case `PlayerGameoverStateAI`:
                return new PlayerGameoverStateAI();
            case `PlayerBaseStateAI`:
                return new PlayerBaseStateAI();
            case `AttackObjectAI`:
                return new AttackObjectAI();
            case `StraightAttackAI`:
                return new StraightAttackAI(ai.vx === undefined ? 0 : ai.vx, ai.vy === undefined ? 0 : ai.vy, ai.px === undefined ? 0 : ai.px, ai.py === undefined ? 0 : ai.py);
            default:
                return null;
        }
    }

    /**
     * Make underlying entity
     * @protected
     * @param {any} deploy Entity deploy json data
     * @param {any} entity Entity information json data
     * @return {Entity} Underlying entity
     */
    makeEntityBase(deploy: any, entity: any): Entity | null {
        switch (entity.type) {
            case `OnlyImage`:
                return new OnlyImageEntity();
            case `AIObject`:
                return new AIListedObject();
            case `Character`:
                return new Character();
            case `StateCharacter`:
                return new StateCharacter();
            case `Player`:
                return new Player();
            case `Enemy`:
                return new Enemy();
            case `Obstacle`:
                return new Obstacle();
            case `EnemyRespawn`:
                {
                    const ret = new EnemyRespawnEntity(this.tryReplace(deploy, entity, `interval`), this.tryReplace(deploy, entity, `max`));
                    for (let it of this.tryReplace(deploy, entity, `enemies`)) {
                        ret.addEnemyID(it);
                    }
                    return ret;
                }
            case `PlayerRespawn`:
                {
                    const ret = new PlayerRespawnEntity(this.tryReplace(deploy, entity, `player`), this.tryReplace(deploy, entity, `priority`));
                    const colliderData = this.tryReplace(deploy, entity, `collider`);
                    const collider = this.makeCollider(colliderData);
                    if (collider === null) {
                        return null;
                    }
                    collider.setAABB(this.makeAABB(colliderData));
                    ret.setCollider(collider);
                    return ret;
                }
            case `Door`:
                {
                    const ret = new DoorObject(deploy.stage, deploy.replace, deploy.pop);
                    const colliderData = this.tryReplace(deploy, entity, `collider`);
                    const collider = this.makeCollider(colliderData);
                    if (collider === null) {
                        return null;
                    }
                    collider.setAABB(this.makeAABB(colliderData));
                    ret.setCollider(collider);
                    return ret;
                }
            case `Sign`:
                {
                    const ret = new SignObject();
                    const colliderData = this.tryReplace(deploy, entity, `collider`);
                    const collider = this.makeCollider(colliderData);
                    if (collider === null) {
                        return null;
                    }
                    collider.setAABB(this.makeAABB(colliderData));
                    ret.setCollider(collider);
                    const signData = this.tryReplace(deploy, entity, `sign`);
                    const signImage = this.imageBuilder === null ? null : this.imageBuilder.build(`event`, signData.image);
                    if (signImage !== null) {
                        ret.setSign(signImage, signData.x, signData.y);
                    }
                    return ret;
                }
            case `Event`:
                {
                    const once = this.tryReplace(deploy, entity, `once`);
                    const ret = once ? new OnceEventEntity() : new ImmutableEvent();
                    const colliderData = this.tryReplace(deploy, entity, `collider`);
                    const collider = this.makeCollider(colliderData);
                    if (collider === null) {
                        return null;
                    }
                    collider.setAABB(this.makeAABB(colliderData));
                    ret.setCollider(collider);
                    return ret;
                }
            case `Attack`:
                return new AttackObject(this.tryReplace(deploy, entity, `lifespan`));
            default:
                return null;
        }
    }

    /**
     * Build phsical body from json data
     * @protected
     * @param {MutableEntity} base Base entity
     * @param {any} deploy Entity deploy json data
     * @param {any} json Character json data
     */
    buildBody(base: MutableEntity, deploy: any, json: any) {
        const bodyData = this.tryReplace(deploy, json, `body`);
        const body = this.makeBody(bodyData);
        if (body !== null) {
            base.setRigidBody(body);
        }
        if (base.body !== null) {
            base.body.enable = bodyData.enable === undefined ? true : bodyData.enable;
            const material = this.makeBodyMaterial(bodyData.material);
            if (material !== null) {
                base.body.setMaterial(material);
            }
        }
    }

    /**
     * Build AI from json data
     * @protected
     * @param {AutonomyEntity} base Base entity
     * @param {any} deploy Entity deploy json data
     * @param {any} json Character json data
     */
    buildAI(base: AutonomyEntity, deploy: any, json: any) {
        const aiData = [];
        if (json.ai !== undefined) {
            for (const it of json.ai) {
                aiData.push(it);
            }
        }
        if (deploy !== undefined && deploy.ai !== undefined) {
            for (const it of deploy.ai) {
                const index = aiData.findIndex((v) => v.type === it.type);
                if (index >= 0) {
                    for (const item in it) {
                        if (it.hasOwnProperty(item)) {
                            aiData[index][item] = it[item];
                        }
                    }
                } else {
                    aiData.push(it);
                }
            }
        }
        for (const ai of aiData) {
            const a = this.makeAI(ai);
            if (a !== null) {
                base.addAI(a, null);
            }
        }
    }

    /**
     * Build owner by json data
     * @protected
     * @param {IOwned} base Base entity
     * @param {any} deploy Entity deploy json data
     * @param {any} json Character json data
     */
    buildOwner(base: IOwned, deploy: any, _json: any) {
        if (deploy !== undefined && deploy.owner !== undefined) {
            base.setOwner(deploy.owner);
        }
    }

    /**
     * Build character from json data
     * @override
     * @param {any} deploy Entity deploy json data
     * @param {any} json Character json data
     * @return {Entity} Generated character
     */
    build(deploy: any, json: any): Entity | null {
        const base = this.makeEntityBase(deploy, json);
        if (base === null) {
            return null;
        }
        this.buildBase(base, deploy, json);
        if (isIOwned(base)) {
            this.buildOwner(base, deploy, json);
        }
        if (base instanceof ImagedEntity) {
            this.buildImage(base, deploy, json);
        }
        if (base instanceof InfluentialEntity) {
            this.buildPhysical(base, deploy, json);
        }
        if (base instanceof MutableEntity) {
            this.buildBody(base, deploy, json);
        }
        if (base instanceof AutonomyEntity) {
            this.buildAI(base, deploy, json);
        }
        return base;
    }
}
