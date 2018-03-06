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
        let e1 = data.e1;
        let e2 = data.e2;
        let b1 = e1.body;
        let b2 = e2.body;
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
            let d2 = dot2 > 0 ? 0 : d;
            // push back
            if (d > 1.0e-4) {
                let i = 0;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    e1.deltaMove(-nx * d / 10, -ny * d / 10);
                    e2.deltaMove(nx * d2 / 10, ny * d2 / 10);
                }
            }
            // repulsion
            /*
            let vdx = v2x - v1x;
            let vdy = v2y - v1y;
            b1.velocityX += vdx * (1 + b2.e) / 2;
            b1.velocityY += vdy * (1 + b2.e) / 2;
            b2.velocityX -= vdx * (1 + b1.e) / 2;
            b2.velocityY -= vdy * (1 + b1.e) / 2;
            */
            if (dot1 >= 0) {
                let e = e2.material.e;
                b1.velocityX -= v1x * (1 + e);
                b1.velocityY -= v1y * (1 + e);
            }
            if (dot2 <= 0) {
                let e = e1.material.e;
                b2.velocityX -= v2x * (1 + e);
                b2.velocityY -= v2y * (1 + e);
            }
            // friction
            let mu = e2.material.mu;
            let dot = Math.sign(b1.velocityX * -ny + b1.velocityY * nx);
            let dvx = -dot * ny * 9.8 * 20 * mu * dt / 1000;
            let dvy = dot * nx * 9.8 * 20 * mu * dt / 1000;
            if (Math.abs(dvx) <= Math.abs(b1.velocityX)) {
                b1.velocityX -= dvx;
            } else {
                b1.velocityX = 0;
            }
            if (Math.abs(dvy) <= Math.abs(b1.velocityY)) {
                b1.velocityY -= dvy;
            } else {
                b1.velocityY = 0;
            }
            mu = e1.material.mu;
            dot = Math.sign(b2.velocityX * -ny + b2.velocityY * nx);
            dvx = -dot * ny * 9.8 * 20 * mu * dt / 1000;
            dvy = dot * nx * 9.8 * 20 * mu * dt / 1000;
            if (Math.abs(dvx) <= Math.abs(b2.velocityX)) {
                b2.velocityX -= dvx;
            } else {
                b2.velocityX = 0;
            }
            if (Math.abs(dvy) <= Math.abs(b2.velocityY)) {
                b2.velocityY -= dvy;
            } else {
                b2.velocityY = 0;
            }
        } else {
            let n1 = e1.collider.collisions.length;
            let dot1 = b1.preVelocityX * nx + b1.preVelocityY * ny;
            let v1x = dot1 * nx;
            let v1y = dot1 * ny;
            // push back
            if (d > 1.0e-4) {
                let i = 0;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    e1.deltaMove(-nx * d / 10, -ny * d / 10);
                }
            }
            // repulsion
            if (dot1 >= 0) {
                let e = e2.material.e;
                b1.velocityX -= v1x * (1 + e) / n1;
                b1.velocityY -= v1y * (1 + e) / n1;
            }
            // friction
            let mu = e2.material.mu;
            let dot = Math.sign(b1.velocityX * -ny + b1.velocityY * nx);
            let dvx = -dot * ny * 9.8 * 20 * mu * dt / 1000 / n1;
            let dvy = dot * nx * 9.8 * 20 * mu * dt / 1000 / n1;
            if (Math.abs(dvx) <= Math.abs(b1.velocityX)) {
                b1.velocityX -= dvx;
            } else {
                b1.velocityX = 0;
            }
            if (Math.abs(dvy) <= Math.abs(b1.velocityY)) {
                b1.velocityY -= dvy;
            } else {
                b1.velocityY = 0;
            }
        }
    }
}
