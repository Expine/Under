/**
 * Impulse based collision response
 * Performs collision response by impulse based method
 * @extends {CollisionResponse}
 * @classdesc Collision response to performs collision response by impulse based method
 */
class ImpulseBasedResponse extends CollisionResponse { // eslint-disable-line  no-unused-vars
    /**
     * Perform collision response
     * @param {CollisionData} data Collision data
     * @param {number} dt delta time
     */
    collisionResponse(data, dt) {
        const nx = data.nx;
        const ny = data.ny;
        const d = data.depth * 600;
        const e1 = data.colliding;
        const e2 = data.collided;
        const b1 = e1.body;
        if (e2 instanceof MutableEntity) {
            const b2 = e2.body;
            const dot1 = b1.velocityX * nx + b1.velocityY * ny;
            const dot2 = b2.velocityX * nx + b2.velocityY * ny;
            const v1x = dot1 * nx;
            const v1y = dot1 * ny;
            const v2x = dot2 * nx;
            const v2y = dot2 * ny;
            const vdx = v2x - v1x;
            const vdy = v2y - v1y;
            const m1 = e1.material.mass;
            const m2 = e2.material.mass;
            const e = Math.max(e1.material.e, e2.material.e);
            const n1 = e1.collider.collisions.length;
            const n2 = e2.collider.collisions.length;
            const j = (1 + e) * m1 * m2 / (m1 + m2) * 1000 / dt;
            const j1 = j / n1;
            const j2 = j / n2;
            const d1 = d / n1;
            const d2 = d / n2;
            b1.enforce(j1 * vdx - d1 * nx, j1 * vdy - d1 * ny);
            b2.enforce(-j2 * vdx + d2 * nx, -j2 * vdy + d2 * ny);
        } else {
            const dot1 = b1.velocityX * nx + b1.velocityY * ny;
            const v1x = dot1 * nx;
            const v1y = dot1 * ny;
            const m1 = e1.material.mass;
            const e = e1.material.e;
            const n1 = e1.collider.collisions.length;
            const j = (1 + e) * m1 * 1000 / -dt / n1;
            const dd = d / n1 * 4;
            b1.enforce(j * v1x - dd * nx, j * v1y - dd * ny);
        }
    }
}
