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
            if (b1 === undefined || (b1.velocityX * nx + b1.velocityY * ny <= 0)) {
                data.nx = -data.nx;
                data.ny = -data.ny;
                nx = -nx;
                ny = -ny;
                if (b2 === undefined || (b2.velocityX * nx + b2.velocityY * ny <= 0)) {
                    data.nx = -data.nx;
                    data.ny = -data.ny;
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
                    data.e1 = e1;
                    data.e2 = e2;
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
                    if (dot2 > 0 || e1 instanceof AutonomyObject) {
                        while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                            e1.deltaMove(-nx * d / 10, -ny * d / 10);
                        }
                    } else if (e2 instanceof AutonomyObject) {
                        while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                            e2.deltaMove(nx * d / 10, ny * d / 10);
                        }
                    } else if (v1 > v2) {
                        while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                            e1.deltaMove(-nx * d / 10, -ny * d / 10);
                        }
                    } else if (v2 < v1) {
                        while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                            e2.deltaMove(nx * d / 10, ny * d / 10);
                        }
                    } else {
                        while (i++ < 10 && e1.collider.isCollision(e2.collider)) {
                            e1.deltaMove(-nx * d / 10, -ny * d / 10);
                            e2.deltaMove(nx * d / 10, ny * d / 10);
                        }
                    }
                }
                // check impossible collision
                if (Math.abs(v1) < Math.abs(v2) && dot2 >= 0) {
                    return;
                }
                // repulsion
                let e = (e1.material.e + e2.material.e) / 2;
                vdx1 = (v2x - v1x) * (1 + e) * (e2.material.mass) / (e1.material.mass + e2.material.mass);
                vdy1 = (v2y - v1y) * (1 + e) * (e2.material.mass) / (e1.material.mass + e2.material.mass);
                vdx2 = -(v2x - v1x) * (1 + e) * (e1.material.mass) / (e1.material.mass + e2.material.mass);
                vdy2 = -(v2y - v1y) * (1 + e) * (e1.material.mass) / (e1.material.mass + e2.material.mass);
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
                vdx1 = -v1x * (1 + e) / 2;
                vdy1 = -v1y * (1 + e) / 2;
            }

            // friction
            // nx = 0; // no sliding friction
            if (e1.collider.getAABB().startY < e2.collider.getAABB().startY) {
                // e1 on e2
                let mu = e2.material.mu;
                let dotp = b1.accelerationX * nx + b1.accelerationY * ny;
                let px = dotp * nx;
                let py = dotp * ny;
                let p = Math.sqrt(px * px + py * py);
                let dvx = 0;
                let dvy = 0;
                if (b2 === undefined || (b2.isFixX && b2.iFixY)) {
                    let dot = Math.sign((b1.velocityX) * -ny + (b1.velocityY) * nx);
                    dvx = dot * -ny * p * mu * dt / 1000;
                    dvy = dot * nx * p * mu * dt / 1000;
                    if (Math.abs(dvx) > Math.abs(b1.velocityX)) {
                        dvx = b1.velocityX;
                    }
                    if (Math.abs(dvy) > Math.abs(b1.velocityY)) {
                        dvy = b1.velocityY;
                    }
                } else {
                    let dot = Math.sign((b2.diffX * b2.velocityX < 0 ? b1.velocityX : b1.diffX - b2.diffX) * -ny + (b2.diffY * b2.velocityY < 0 ? b1.velocityY : b1.diffY - b2.diffY) * nx);
                    dvx = dot * -ny * p * mu * dt / 1000;
                    dvy = dot * nx * p * mu * dt / 1000;
                    if (b2.diffX * b2.velocityX < 0) {
                        if (Math.abs(dvx) > Math.abs(b1.velocityX)) {
                            dvx = b1.velocityX;
                        }
                    }
                    if (b2.diffY * b2.velocityY < 0) {
                        if (Math.abs(dvy) > Math.abs(b1.velocityY)) {
                            dvy = b1.velocityY;
                        }
                    }
                }
                vdx1 -= dvx * b1.frictionX;
                // Apply only to down wall
                vdy1 -= dvy < 0 ? 0 : dvy * b1.frictionY;
            } else if (b2 !== undefined) {
                // e2 on e1
                let mu = e1.material.mu;
                let dotp = b2.accelerationX * nx + b2.accelerationY * ny;
                let px = dotp * nx;
                let py = dotp * ny;
                let p = Math.sqrt(px * px + py * py);
                let dvx = 0;
                let dvy = 0;
                if (b1.isFixX && b1.isFixY) {
                    let dot = Math.sign((b2.velocityX) * -ny + (b2.velocityY) * nx);
                    dvx = dot * -ny * p * mu * dt / 1000;
                    dvy = dot * nx * p * mu * dt / 1000;
                    if ((Math.abs(dvx) > Math.abs(b2.velocityX))) {
                        dvx = b2.velocityX;
                    }
                    if ((Math.abs(dvy) > Math.abs(b2.velocityY))) {
                        dvy = b2.velocityY;
                    }
                } else {
                    let dot = Math.sign((b1.diffX * b1.velocityX < 0 ? b2.velocityX : b2.diffX - b1.diffX) * -ny + (b1.diffY * b1.velocityY < 0 ? b2.velocityY : b2.diffY - b1.diffY) * nx);
                    dvx = dot * -ny * p * mu * dt / 1000;
                    dvy = dot * nx * p * mu * dt / 1000;
                    if (b1.diffX * b1.velocityX < 0) {
                        if (Math.abs(dvx) > Math.abs(b2.velocityX)) {
                            dvx = b2.velocityX;
                        }
                    }
                    if (b1.diffY * b1.velocityY < 0) {
                        if (Math.abs(dvy) > Math.abs(b2.velocityY)) {
                            dvy = b2.velocityY;
                        }
                    }
                }
                vdx2 -= dvx * b2.frictionX;
                // Apply only to down wall
                vdy2 -= dvy < 0 ? 0 : dvy * b2.frictionY;
            }


            b1.setNextAddVelocity(vdx1, vdy1);
            if (b2 !== undefined) {
                b2.setNextAddVelocity(vdx2, vdy2);
            }
        }
    }
