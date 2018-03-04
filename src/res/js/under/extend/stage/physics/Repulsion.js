/**
 * Replusion collision response
 * Performs collision response by replusion
 * @implements {CollisionResponse}
 * @classdesc Collision response to performs collision response by replusion
 */
class Repulsion extends CollisionResponse { // eslint-disable-line  no-unused-vars
    /**
     * Perform collision response
     * @param {CollisionData} data Collision data
     * @param {number} dt delta time
     */
    collisionResponse(data, dt) {
        let b1 = data.e1.body;
        let b2 = data.e2.body;
        let nx = data.nx;
        let ny = data.ny;
        let d = data.depth;
        if (b2 !== undefined) {
            let dot1 = b1.velocityX * nx + b1.velocityY * ny;
            let dot2 = b2.velocityX * nx + b2.velocityY * ny;
            let v1x = dot1 * nx;
            let v1y = dot1 * ny;
            let v2x = dot2 * nx;
            let v2y = dot2 * ny;
            if (d > 1.0e-6) {
                while (b1.entity.collider.isCollision(data.e2.collider)) {
                    b1.entity.deltaMove(-nx * d / 10, -ny * d / 10);
                    b2.entity.deltaMove(nx * d / 10, ny * d / 10);
                }
            }
            b1.velocityX -= v1x * (1 + b1.e);
            b1.velocityY -= v1y * (1 + b1.e);
            b2.velocityX -= v2x * (1 + b1.e);
            b2.velocityY -= v2y * (1 + b1.e);
        } else {
            let dot1 = b1.velocityX * nx + b1.velocityY * ny;
            let v1x = dot1 * nx;
            let v1y = dot1 * ny;
            if (d > 1.0e-6) {
                while (b1.entity.collider.isCollision(data.e2.collider)) {
                    b1.entity.deltaMove(-nx * d / 10, -ny * d / 10);
                }
            }
            b1.velocityX -= v1x * (1 + b1.e);
            b1.velocityY -= v1y * (1 + b1.e);
        }
    }
}
