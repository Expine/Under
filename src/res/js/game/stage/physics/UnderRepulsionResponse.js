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
        // set data
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

        // replusion calculate
        let vdx1 = 0;
        let vdy1 = 0;
        let vdx2 = 0;
        let vdy2 = 0;
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
                if (e1 instanceof AutonomyObject || (!(e2 instanceof AutonomyObject) && v1 >= v2)) {
                    while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                        e1.deltaMove(-nx * d / 10, -ny * d / 10);
                    }
                } else if (e2 instanceof AutonomyObject) {
                    while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                        e2.deltaMove(nx * d / 10, ny * d / 10);
                    }
                } else {
                    let p1 = v1 / (v1 + v2);
                    let p2 = v2 / (v1 + v2);
                    while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                        e1.deltaMove(-nx * d / 10 * p1, -ny * d / 10 * p1);
                        e2.deltaMove(nx * d / 10 * p2, ny * d / 10 * p2);
                    }
                }
            }
            // repulsion
            let e = (e1.material.e + e2.material.e) / 2;
            vdx1 = (v2x - v1x) * (1 + e) / 2;
            vdy1 = (v2y - v1y) * (1 + e) / 2;
            vdx2 = -vdx1;
            vdy2 = -vdy1;
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
            let e = e2.material.e;
            vdx1 = -v1x * (1 + e) / 2;
            vdy1 = -v1y * (1 + e) / 2;
        }

        // friction
        nx = 0; // no sliding friction
        if (e1.collider.getAABB().startY < e2.collider.getAABB().startY) {
            // e1 on e2
            let mu = e2.material.mu;
            let dotp = b1.preAccelerationX * nx + b1.preAccelerationY * ny;
            let px = dotp * nx;
            let py = dotp * ny;
            let p = Math.sqrt(px * px + py * py);
            let dot = Math.sign((b1.diffX - (b2 === undefined ? 0 : b2.diffX)) * -ny + (b1.diffY - (b2 === undefined ? 0 : b2.diffY)) * nx);
            let dvx = dot * -ny * p * mu * dt / 1000;
            let dvy = dot * nx * p * mu * dt / 1000;
            if (b2 === undefined) {
                if (Math.abs(dvx) > Math.abs(b1.diffX)) {
                    dvx = b1.diffX;
                }
                if (Math.abs(dvy) > Math.abs(b1.diffY)) {
                    dvy = b1.diffY;
                }
            } else if (b2.isFix) {
                if (Math.abs(dvx) > Math.abs(b1.diffX)) {
                    dvx = b1.diffX;
                }
                if (Math.abs(dvy) > Math.abs(b1.diffY)) {
                    dvy = b1.diffY;
                }
            }
            vdx1 -= dvx;
            vdy1 -= dvy;
        } else if (b2 !== undefined) {
            // e2 on e1
            let mu = e1.material.mu;
            let dotp = b2.preAccelerationX * nx + b2.preAccelerationY * ny;
            let px = dotp * nx;
            let py = dotp * ny;
            let p = Math.sqrt(px * px + py * py);
            let dot = Math.sign((b2.diffX - b1.diffX) * -ny + (b2.diffY - b1.diffY) * nx);
            let dvx = -dot * ny * p * mu * dt / 1000;
            let dvy = dot * nx * p * mu * dt / 1000;
            if (b1.isFix) {
                if ((Math.abs(dvx) > Math.abs(b2.diffX))) {
                    dvx = b2.diffX;
                }
                if ((Math.abs(dvy) > Math.abs(b2.diffY))) {
                    dvy = b2.diffY;
                }
            }
            vdx2 -= dvx;
            vdy2 -= dvy;
        }


        b1.setNextAddVelocity(vdx1, vdy1);
        if (b2 !== undefined) {
            b2.setNextAddVelocity(vdx2, vdy2);
        }
    }
}
