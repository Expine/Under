/**
 * Replusion collision response
 * Performs collision response by replusion
 * @implements {CollisionResponse}
 * @classdesc Collision response to performs collision response by replusion
 */
class RepulsionResponse extends CollisionResponse { // eslint-disable-line  no-unused-vars
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
        // e1 is the colliding side
        if (b1 === undefined || (b1.velocityX * nx + b1.velocityY * ny <= 0)) {
            nx = -nx;
            ny = -ny;
            if (b2 === undefined || (b2.velocityX * nx + b2.velocityY * ny <= 0)) {
                nx = -nx;
                ny = -ny;
                // push back
                if (d > 1.0e-4) {
                    let i = 0;
                    while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                        if (b1 !== undefined) {
                            e1.deltaMove(-nx * d / 10, -ny * d / 10);
                        }
                        if (b2 !== undefined) {
                            e2.deltaMove(nx * d / 10, ny * d / 10);
                        }
                    }
                }
                return;
            } else {
                let swt = e1;
                e1 = e2;
                e2 = swt;
                swt = b1;
                b1 = b2;
                b2 = swt;
            }
        }
        if (b2 !== undefined && (ny < 1 || b1.velocityX * b2.velocityX + b1.velocityY * b2.velocityY < 0)) {
            let dot1 = b1.velocityX * nx + b1.velocityY * ny;
            let dot2 = b2.velocityX * nx + b2.velocityY * ny;
            let v1x = dot1 * nx;
            let v1y = dot1 * ny;
            let v2x = dot2 * nx;
            let v2y = dot2 * ny;
            let v1 = v1x * v1x + v1y * v1y;
            let v2 = v2x * v2x + v2y * v2y;
            // push back
            if (d > 1.0e-4) {
                let i = 0;
                while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                    if (v1 >= v2) {
                        e1.deltaMove(-nx * d / 10, -ny * d / 10);
                    }
                    if (v2 >= v1) {
                        e2.deltaMove(nx * d / 10, ny * d / 10);
                    }
                }
            }
            // repulsion
            let e = (e1.material.e + e2.material.e) / 2;
            let vdx = v2x - v1x;
            let vdy = v2y - v1y;
            // friction
            let mu = e2.material.mu;
            let dotp = b1.accelerationX * nx + b1.accelerationY * ny;
            let px = dotp * nx;
            let py = dotp * ny;
            let p = Math.sqrt(px * px + py * py);
            let dot = Math.sign(b1.velocityX * -ny + b1.velocityY * nx);
            let dvx = -dot * ny * p * mu * dt / 1000;
            let dvy = dot * nx * p * mu * dt / 1000;
            if (Math.abs(dvx) > Math.abs(b1.velocityX)) {
                dvx = b1.velocityX;
            }
            if (Math.abs(dvy) > Math.abs(b1.velocityY)) {
                dvy = b1.velocityY;
            }
            b1.setNextAddVelocity(vdx * (1 + e) / 2 - dvx, vdy * (1 + e) / 2 - dvy);

            mu = e1.material.mu;
            dotp = b2.accelerationX * nx + b2.accelerationY * ny;
            px = dotp * nx;
            py = dotp * ny;
            p = Math.sqrt(px * px + py * py);
            dot = Math.sign(b2.velocityX * -ny + b2.velocityY * nx);
            dvx = -dot * ny * p * mu * dt / 1000;
            dvy = dot * nx * p * mu * dt / 1000;
            if (Math.abs(dvx) > Math.abs(b2.velocityX)) {
                dvx = b2.velocityX;
            }
            if (Math.abs(dvy) > Math.abs(b2.velocityY)) {
                dvy = b2.velocityY;
            }
            b2.setNextAddVelocity(-vdx * (1 + e) / 2 - dvx, -vdy * (1 + e) / 2 - dvy);
        } else {
            let dot1 = b1.velocityX * nx + b1.velocityY * ny;
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
            let e = e2.material.e;
            // friction
            let mass = e1.material.mass;
            let mu = e2.material.mu;
            let dotp = b1.accelerationX * nx + b1.accelerationY * ny;
            let px = dotp * nx;
            let py = dotp * ny;
            let p = Math.sqrt(px * px + py * py);
            let dot = Math.sign(b1.velocityX * -ny + b1.velocityY * nx);
            let dvx = -dot * ny * p * mass * mu * dt / 1000;
            let dvy = dot * nx * p * mass * mu * dt / 1000;
            if (Math.abs(dvx) > Math.abs(b1.velocityX)) {
                dvx = b1.velocityX;
            }
            if (Math.abs(dvy) > Math.abs(b1.velocityY)) {
                dvy = b1.velocityY;
            }
            b1.setNextAddVelocity(-v1x * (1 + e) - dvx, -v1y * (1 + e) - dvy);
        }
    }
}
