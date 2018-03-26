/**
 * Replusion collision response
 * Performs collision response by replusion
 * @implements {CollisionResponse}
 * @classdesc Collision response to performs collision response by replusion
 */
class UnderRepulsionResponse extends CollisionResponse { // eslint-disable-line  no-unused-vars
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
        if (b1 === undefined || (b1.preVelocityX * nx + b1.preVelocityY * ny <= 0)) {
            nx = -nx;
            ny = -ny;
            if (b2 === undefined || (b2.preVelocityX * nx + b2.preVelocityY * ny <= 0)) {
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
        if (b2 !== undefined && (ny < 1 || b1.preVelocityX * b2.preVelocityX + b1.preVelocityY * b2.preVelocityY < 0)) {
            let dot1 = b1.preVelocityX * nx + b1.preVelocityY * ny;
            let dot2 = b2.preVelocityX * nx + b2.preVelocityY * ny;
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
            nx = 0; // no sliding friction
            let mu = e2.material.mu;
            let dotp = b1.preAccelerationX * nx + b1.preAccelerationY * ny;
            let px = dotp * nx;
            let py = dotp * ny;
            let p = Math.sqrt(px * px + py * py);
            let dot = Math.sign(b1.preVelocityX * -ny + b1.preVelocityY * nx);
            let dvx = -dot * ny * p * mu * dt / 1000;
            let dvy = dot * nx * p * mu * dt / 1000;
            if (Math.abs(dvx) > Math.abs(b1.preVelocityX)) {
                dvx = b1.preVelocityX;
            }
            if (Math.abs(dvy) > Math.abs(b1.preVelocityY)) {
                dvy = b1.preVelocityY;
            }
            b1.setNextAddVelocity(vdx * (1 + e) / 2 - dvx, vdy * (1 + e) / 2 - dvy);

            mu = e1.material.mu;
            dotp = b2.preAccelerationX * nx + b2.preAccelerationY * ny;
            px = dotp * nx;
            py = dotp * ny;
            p = Math.sqrt(px * px + py * py);
            dot = Math.sign(b2.preVelocityX * -ny + b2.preVelocityY * nx);
            dvx = -dot * ny * p * mu * dt / 1000;
            dvy = dot * nx * p * mu * dt / 1000;
            if (Math.abs(dvx) > Math.abs(b2.preVelocityX)) {
                dvx = b2.preVelocityX;
            }
            if (Math.abs(dvy) > Math.abs(b2.preVelocityY)) {
                dvy = b2.preVelocityY;
            }
            b2.setNextAddVelocity(-vdx * (1 + e) / 2 - dvx, -vdy * (1 + e) / 2 - dvy);
        } else {
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
            if (e2.material === undefined) {
                e2.material;
            }
            let e = e2.material.e;
            // friction
            nx = 0; // no sliding friction
            let mass = e1.material.mass;
            let mu = e2.material.mu;
            let dotp = b1.preAccelerationX * nx + b1.preAccelerationY * ny;
            let px = dotp * nx;
            let py = dotp * ny;
            let p = Math.sqrt(px * px + py * py);
            let dot = Math.sign(b1.preVelocityX * -ny + b1.preVelocityY * nx);
            let dvx = -dot * ny * p * mass * mu * dt / 1000;
            let dvy = dot * nx * p * mass * mu * dt / 1000;
            if (Math.abs(dvx) > Math.abs(b1.preVelocityX)) {
                dvx = b1.preVelocityX;
            }
            if (Math.abs(dvy) > Math.abs(b1.preVelocityY)) {
                dvy = b1.preVelocityY;
            }
            b1.setNextAddVelocity(-v1x * (1 + e) - dvx, -v1y * (1 + e) - dvy);
        }
    }
}
