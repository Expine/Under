import { CharacterBuilder } from "../../../under/extend/stage/parser/CharacterBuilder";
import { RigidBody } from "../../../under/base/stage/physics/body/RigidBody";
import { StringBody } from "../physics/body/StringBody";
import { Collider } from "../../../under/base/stage/physics/collider/Collider";
import { ExcludedRectangleCollider } from "../physics/collider/ExcludedRectangleCollider";
import { ExcludedRoundRectangleCollider } from "../physics/collider/ExcludedRoundRectangleCollider";
import { AI } from "../../../under/base/stage/ai/AI";
import { Entity } from "../../../under/base/stage/entity/Entity";
import { UnderPlayer } from "../entity/character/UnderPlayer";
import { HookHead } from "../entity/happen/special/hook/HookHead";
import { HookChild } from "../entity/happen/special/hook/HookChild";
import { TextSignObject } from "../entity/object/TextSignObject";
import { HeadHookStateAI } from "../ai/special/hook/HeadHookStateAI";
import { HookStateAI } from "../ai/special/hook/HookStateAI";
import { NormalBaseStateAI } from "../ai/player/normal/NormalBaseStateAI";
import { CommonBaseStateAI } from "../ai/player/common/CommonBaseStateAI";
import { PropellerBaseStateAI } from "../ai/player/propeller/PropellerBaseStateAI";
import { WildBaseStateAI } from "../ai/player/wild/WildBaseStateAI";
import { AdventurerBaseStateAI } from "../ai/player/adventurer/AdventurerBaseStateAI";

/**
 * Under character builder
 * - Gemerates under player
 * - Automatically sets normal none state
 * @extends {CharacterBuilder}
 * @classdesc Under character builder to generate under player and sets normal none state automatically
 */
export class UnderCharacterBuilder extends CharacterBuilder {
    /**
     * Make rigid body
     * @protected
     * @param {any} body Rigid body information json data
     * @return {RigidBody} Rigid body
     */
    makeBody(body: any): RigidBody | null {
        switch (body.type) {
            case 'String':
                const baseBody = this.makeBody(body.body);
                return baseBody === null ? null : new StringBody(baseBody, body.x, body.y, body.length, body.k, body.count);
            default:
                return super.makeBody(body);
        }
    }

    /**
     * Make collider
     * @protected
     * @param {any} collider Collider information json data
     * @return {Collider} Collider
     */
    makeCollider(collider: any): Collider | null {
        if (collider.excluded) {
            switch (collider.type) {
                case 'Rectangle':
                    return new ExcludedRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.id);
                case 'RoundRectangle':
                    return new ExcludedRoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, collider.cut, collider.id);
            }
        }
        return super.makeCollider(collider);
    }

    /**
     * Make AI
     * @override
     * @protected
     * @param {any} ai AI information json data
     * @return {AI} AI
     */
    makeAI(ai: any): AI | null {
        switch (ai.type) {
            case 'CommonBaseStateAI':
                return new CommonBaseStateAI();
            case 'NormalBaseStateAI':
                return new NormalBaseStateAI();
            case 'WildBaseStateAI':
                return new WildBaseStateAI();
            case 'AdventurerBaseStateAI':
                return new AdventurerBaseStateAI();
            case 'PropellerBaseStateAI':
                return new PropellerBaseStateAI();
            case 'HookStateAI':
                return new HookStateAI();
            case 'HeadHookStateAI':
                return new HeadHookStateAI();
            default:
                return super.makeAI(ai);
        }
    }

    /**
     * Make underlying entity
     * @override
     * @protected
     * @param {any} deploy Entity deploy json data
     * @param {any} entity Entity information json data
     * @return {Entity} Underlying entity
     */
    makeEntityBase(deploy: any, entity: any): Entity | null {
        switch (entity.type) {
            case 'Player':
                return new UnderPlayer();
            case 'HookHead':
                return new HookHead(this.tryReplace(deploy, entity, 'max'), this.tryReplace(deploy, entity, 'hook'), this.tryReplace(deploy, entity, 'child'));
            case 'HookChild':
                return new HookChild();
            case 'Sign':
                {
                    const signData = this.tryReplace(deploy, entity, 'sign');
                    if (signData.image !== undefined) {
                        return super.makeEntityBase(deploy, entity);
                    }
                    const ret = new TextSignObject();
                    const colliderData = this.tryReplace(deploy, entity, 'collider');
                    const collider = this.makeCollider(colliderData);
                    if (collider !== null) {
                        collider.setAABB(this.makeAABB(colliderData));
                        ret.setCollider(collider);
                    }
                    ret.setSignText(signData.x, signData.y, signData.size, signData.text);
                    return ret;
                }
            default:
                return super.makeEntityBase(deploy, entity);
        }
    }
}
