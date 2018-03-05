/**
 * Impulse based collision response
 * Performs collision response by impulse based method
 * @implements {CollisionResponse}
 * @classdesc Collision response to performs collision response by impulse based method
 */
class ImpulseBased extends CollisionResponse { // eslint-disable-line  no-unused-vars
    /**
     * Perform collision response
     * @param {CollisionData} data Collision data
     * @param {number} dt delta time
     */
    collisionResponse(data, dt) {
        let nx = data.nx;
        let ny = data.ny;
        let d = data.depth * 600;
        let b1 = data.e1.body;
        let b2 = data.e2.body;
        if (b2 !== undefined) {
            let dot1 = b1.velocityX * nx + b1.velocityY * ny;
            let dot2 = b2.velocityX * nx + b2.velocityY * ny;
            let v1x = dot1 * nx;
            let v1y = dot1 * ny;
            let v2x = dot2 * nx;
            let v2y = dot2 * ny;
            let vdx = v2x - v1x;
            let vdy = v2y - v1y;
            let m1 = data.e1.material.mass;
            let m2 = data.e2.material.mass;
            let e = Math.max(data.e1.material.e, data.e2.material.e);
            let n1 = data.e1.collider.collisions.length;
            let n2 = data.e1.collider.collisions.length;
            let j = (1 + e) * m1 * m2 / (m1 + m2) * 1000 / dt;
            let j1 = j / n1;
            let j2 = j / n2;
            let d1 = d / n1;
            let d2 = d / n2;
            b1.enforce(j1 * vdx - d1 * nx, j1 * vdy - d1 * ny);
            b2.enforce(-j2 * vdx + d2 * nx, -j2 * vdy + d2 * ny);
        } else {
            let dot1 = b1.velocityX * nx + b1.velocityY * ny;
            let v1x = dot1 * nx;
            let v1y = dot1 * ny;
            let m1 = data.e1.material.mass;
            let e = data.e1.material.e;
            let n1 = data.e1.collider.collisions.length;
            let j = (1 + e) * m1 * 1000 / -dt / n1;
            let dd = d / n1 * 4;
            b1.enforce(j * v1x - dd * nx, j * v1y - dd * ny);
        }
    }
}
