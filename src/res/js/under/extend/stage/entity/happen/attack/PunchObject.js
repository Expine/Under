/**
 * Punch object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Generated and owned by someone
 * - Object that can be destroyed
 * - Enable to set animation
 * - Object indicating attack that have lifespan
 * - ### If it is collided and collided entity implements damagable interface, damage it
 * - ### Implements attack object resources
 * @implements {AttackObject}
 * @classdesc Punch object that damages entity If it is collided to entity and entity implements damagable interface
 */
class PunchObject extends AttackObject { // eslint-disable-line  no-unused-vars
    /**
     * Punch object constructor
     * @constructor
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Entity width
     * @param {number} height Entity height
     * @param {Entity} owner Owned entity
     */
    constructor(x, y, width, height, owner) {
        super(x, y, width, height, owner, -1, 400);

        // TODO: Should be into a text file
        // set base data
        let imageID = ResourceManager.image.load(`chara/attack.png`);
        let anime = new SingleAnimation();
        anime.addAnimation(new AnimationElement(imageID, 0, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 32, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 64, 0, 32, 32, 100));
        anime.addAnimation(new AnimationElement(imageID, 96, 0, 32, 32, 100));
        this.setAnimation(anime);
        this.setMaterial(new ImmutableMaterial());
        let col = new RectangleCollider(0, 0, this.width, this.height);
        col.setAABB(new SimpleAABB());
        this.setCollider(col);
        let body = new MaxAdoptBody();
        body.setMaterial(new ImmutableRigidMaterial());
        this.setRigidBody(body);
        this.addAI(new AttackObjectAI(owner));
    }

    /**
     * Set collider
     * @override
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        super.setCollider(collider);
        collider.response = false;
    }

    /**
     * Set rigid body
     * @param {RigidBody} body rigid body
     */
    setRigidBody(body) {
        super.setRigidBody(body);
        body.enable = false;
    }

    /**
     * Update attack after update it
     * @interface
     * @protected
     * @param {number} dt Delta time
     */
    updateAttack(dt) {
        // If damageable object is collided, damage
        for (let it of this.collider.collisions) {
            let entity = Util.getCollidedEntity(this.owner, it);
            if (this.owner !== entity && BaseUtil.implementsOf(entity, IDamagable)) {
                entity.damage(1);
            }
        }
    }
}
