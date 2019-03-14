/**
 * Replusion collision response
 * Performs collision response by replusion
 * @extends {CollisionResponse}
 * @classdesc Collision response to performs collision response by replusion
 */
class UnderRepulsionResponse extends CollisionResponse {
    /**
     * Whether it is constrained in a certain direction or not
     * @protected
     * @param {InfluentialEntity} entity
     * @param {number} dirX Direction of x
     * @param {number} dirY Direction of y
     * @return {boolean} Whether it is constrained in a certain direction or not
     */
    asGround(entity, dirX, dirY) {
        if (entity.body.asGrounds[dirX + 1 + (dirY + 1) * 3]) {
            return true;
        }
        for (const it of entity.collider.collisions) {
            const checkX = dirX !== 0 && ((it.colliding === entity && it.nx === dirX) || (it.collided === entity && it.nx === -dirX));
            const checkY = dirY !== 0 && ((it.colliding === entity && it.ny === dirY) || (it.collided === entity && it.ny === -dirY));
            if (checkX || checkY) {
                const opponent = Util.getCollidedEntity(entity, it);
                if (!(opponent instanceof MutableEntity) || opponent.body.isFixed() || this.asGround(opponent, dirX, dirY)) {
                    entity.body.asGrounds[dirX + 1 + (dirY + 1) * 3] = true;
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Perform collision response
     * @param {CollisionData} data Collision data
     * @param {number} dt delta time
     */
    collisionResponse(data, dt) {
        // set data
        const e1 = data.colliding;
        const e2 = data.collided;
        const b1 = e1.body;
        const b2 = e2 instanceof MutableEntity ? e2.body : null;
        const nx = data.nx;
        const ny = data.ny;
        const d = data.depth;
        // only push back if not actively colliding
        if (b1.velocityX * nx + b1.velocityY * ny <= 0) {
            if (d < 1.0e-4) {
                return;
            }
            if (e2 instanceof MutableEntity) {
                const nm1 = d > 1 ? d / 5 : d;
                const n1x = b1.fixed && !b2.fixed ? 0 : -nx * nm1;
                const n1y = b1.fixed && !b2.fixed ? 0 : -ny * nm1;
                const nm2 = d > 1 ? d / 100 : d;
                const n2x = b2.fixed && !b1.fixed ? 0 : nx * nm2;
                const n2y = b2.fixed && !b1.fixed ? 0 : ny * nm2;
                // push back
                let i = 0;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    e1.deltaMove(n1x, n1y);
                    e2.deltaMove(n2x, n2y);
                }
            } else {
                // push back
                let i = 0;
                const nm = d > 1 ? d / 10 : d;
                const n1x = -nx * nm;
                const n1y = -ny * nm;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    e1.deltaMove(n1x, n1y);
                }
            }
            return;
        }

        // replusion calculate
        let vdx1 = 0;
        let vdy1 = 0;
        let vdx2 = 0;
        let vdy2 = 0;
        if (b2 !== null && !b2.isFixed() && !this.asGround(e2, nx, ny)) {
            const dot1 = b1.velocityX * nx + b1.velocityY * ny;
            const dot2 = b2.velocityX * nx + b2.velocityY * ny;
            const v1x = dot1 * nx;
            const v1y = dot1 * ny;
            const v2x = dot2 * nx;
            const v2y = dot2 * ny;
            const v1 = v1x * v1x + v1y * v1y;
            const v2 = v2x * v2x + v2y * v2y;
            // push back
            if (d > 1.0e-4) {
                let i = 0;
                const nm1 = d > 1 ? d / 5 : d;
                const n1x = b1.fixed && !b2.fixed ? 0 : -nx * nm1;
                const n1y = b1.fixed && !b2.fixed ? 0 : -ny * nm1;
                const nm2 = d > 1 ? d / 100 : d;
                const n2x = b2.fixed && !b1.fixed ? 0 : nx * nm2;
                const n2y = b2.fixed && !b1.fixed ? 0 : ny * nm2;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    e1.deltaMove(n1x, n1y);
                    e2.deltaMove(n2x, n2y);
                }
            }
            // check impossible collision
            if (Math.abs(v1) < Math.abs(v2) && dot2 >= 0) {
                return;
            }
            // repulsion
            const e = (e1.material.e + e2.material.e) / 2;
            vdx1 = (v2x - v1x) * (1 + e) * (e2.material.mass) / (e1.material.mass + e2.material.mass);
            vdy1 = (v2y - v1y) * (1 + e) * (e2.material.mass) / (e1.material.mass + e2.material.mass);
            vdx2 = -(v2x - v1x) * (1 + e) * (e1.material.mass) / (e1.material.mass + e2.material.mass);
            vdy2 = -(v2y - v1y) * (1 + e) * (e1.material.mass) / (e1.material.mass + e2.material.mass);
        } else {
            const dot1 = b1.velocityX * nx + b1.velocityY * ny;
            const v1x = dot1 * nx;
            const v1y = dot1 * ny;
            // push back
            if (d > 1.0e-4) {
                let i = 0;
                const nm = d > 1 ? d / 10 : d;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    e1.deltaMove(-nx * nm, -ny * nm);
                }
            }
            // repulsion
            const e = e2.material.e;
            vdx1 = -v1x * (1 + e);
            vdy1 = -v1y * (1 + e);
        }

        // friction
        if (e1.collider.getAABB().startY < e2.collider.getAABB().startY) {
            // e1 on e2
            const mu = e2.material.mu;
            const dotp = b1.accelerationX * nx + b1.accelerationY * ny;
            const px = dotp * nx;
            const py = dotp * ny;
            const p = Math.sqrt(px * px + py * py);
            let dvx = 0;
            let dvy = 0;
            const ovx = (b2 === null || b2.diffX * b2.velocityX < 0) ? b1.velocityX : b1.diffX - b2.diffX;
            const ovy = (b2 === null || b2.diffY * b2.velocityY < 0) ? b1.velocityY : b1.diffY - b2.diffY;
            const dot = Math.sign(ovx * -ny + ovy * nx);
            dvx = dot * -ny * p * mu * dt / 1000;
            dvy = dot * nx * p * mu * dt / 1000;
            if (ovx === b1.velocityX && Math.abs(dvx) > Math.abs(b1.velocityX)) {
                dvx = b1.velocityX;
            }
            if (ovy === b1.velocityY && Math.abs(dvy) > Math.abs(b1.velocityY)) {
                dvy = b1.velocityY;
            }
            vdx1 -= dvx * b1.material.frictionX;
            // Apply only to down wall
            vdy1 -= dvy < 0 ? 0 : dvy * b1.material.frictionY;
        } else if (b2 !== null && !b2.isFixed()) {
            // e2 on e1
            const mu = e1.material.mu;
            const dotp = b2.accelerationX * nx + b2.accelerationY * ny;
            const px = dotp * nx;
            const py = dotp * ny;
            const p = Math.sqrt(px * px + py * py);
            let dvx = 0;
            let dvy = 0;
            const ovx = (b1.diffX * b1.velocityX < 0) ? b2.velocityX : b2.diffX - b1.diffX;
            const ovy = (b1.diffY * b1.velocityY < 0) ? b2.velocityY : b2.diffY - b1.diffY;
            const dot = Math.sign(ovx * -ny + ovy * nx);
            dvx = dot * -ny * p * mu * dt / 1000;
            dvy = dot * nx * p * mu * dt / 1000;
            if (ovx === b2.velocityX && Math.abs(dvx) > Math.abs(b2.velocityX)) {
                dvx = b2.velocityX;
            }
            if (ovy === b2.velocityY && Math.abs(dvy) > Math.abs(b2.velocityY)) {
                dvy = b2.velocityY;
            }
            vdx2 -= dvx * b2.material.frictionX;
            // Apply only to down wall
            vdy2 -= dvy < 0 ? 0 : dvy * b2.material.frictionY;
        }

        b1.setNextAddVelocity(vdx1, vdy1);
        if (b2 !== null && !b2.isFixed()) {
            b2.setNextAddVelocity(vdx2, vdy2);
        }
    }
}
