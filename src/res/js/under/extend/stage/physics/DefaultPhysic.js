/**
 * @implements {PhysicalWorld}
 * @classdesc
 */
class DefaultPhysic extends PhysicalWorld { // eslint-disable-line  no-unused-vars
    /**
     * Update physical world
     * @param {number} dt Delta time
     * @param {Array<Entity>} targets List of targets to which physical operation is applied
     */
    update(dt, targets) {
        for (let target of targets) {
            if (target.body !== undefined) {
                target.body.update(dt);
            }
        }
        for (let target of targets) {
            if (target.collider !== undefined) {
                let col = false;
                for (let it of this.entities) {
                    if (it.collider !== undefined && target.collider.isCollisionRoughly(it.collider) && it !== target) {
                        if (target.collider.isCollision(it.collider)) {
                            target.collider.collisionResponse(it.collider, target.body.velocityX, target.body.velocityY);
                            col = true;
                        }
                    }
                }
                if (col) {
                    target.body.repulsion();
                }
            }
        }
    }
}
