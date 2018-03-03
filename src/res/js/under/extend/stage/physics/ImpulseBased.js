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
        let d = data.depth * 10;
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
            let m1 = b1.mass;
            let m2 = b2.mass;
            let e = Math.max(b1.e, b2.e);
            let j = (1 + e) * m1 * m2 / (m1 + m2) / dt;
            b1.enforce(j * vdx - d * nx, j * vdy - d * ny);
            b2.enforce(-j * vdx + d * nx, -j * vdy + d * ny);
        } else {
            let dot1 = b1.velocityX * nx + b1.velocityY * ny;
            let v1x = dot1 * nx;
            let v1y = dot1 * ny;
            let m1 = b1.mass;
            let e = b1.e;
            let j = (1 + e) * m1 / -dt;
            b1.enforce(j * v1x - d * nx, j * v1y - d * ny);
        }
    }
}
