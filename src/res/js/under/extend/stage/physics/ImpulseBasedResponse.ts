import { CollisionResponse } from "../../../base/stage/physics/CollisionResponse";
import { CollisionData } from "../../../base/stage/physics/collider/CollisionData";
import { MutableEntity } from "../../../base/stage/entity/MutableEntity";

/**
 * Impulse based collision response
 * - Performs collision response by impulse based method
 * @extends {CollisionResponse}
 * @classdesc Collision response to performs collision response by impulse based method
 */
export class ImpulseBasedResponse extends CollisionResponse {
    /**
     * Perform collision response
     * @param {CollisionData} data Collision data
     * @param {number} dt delta time
     */
    collisionResponse(data: CollisionData, dt: number) {
        const nx = data.nx;
        const ny = data.ny;
        const d = data.depth * 200;
        const e1 = data.colliding;
        const e2 = data.collided;
        const b1 = e1.body;
        const b2 = e2 instanceof MutableEntity ? e2.body : null;
        if (b1 === null || e1.collider === null || e2.collider === null || e1.material === null || e2.material === null || b1.material === null) {
            return;
        }
        if (e2 instanceof MutableEntity && b2 !== null) {
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
            const d1 = d / n1 * m1;
            const d2 = d / n2 * m2;
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
            const dd = d / n1 * 4 * m1;
            b1.enforce(j * v1x - dd * nx, j * v1y - dd * ny);
        }

        // friction
        const e1aabb = e1.collider.getAABB();
        const e2aabb = e2.collider.getAABB();
        if (e1aabb !== null && e2aabb !== null && e1aabb.startY < e2aabb.startY) {
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
            // Apply only to down wall
            b1.setNextAddVelocity(-dvx * b1.material.frictionX, dvy < 0 ? 0 : -dvy * b1.material.frictionY);
        } else if (b2 !== null && b2.material !== null) {
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
            // Apply only to down wall
            b2.setNextAddVelocity(-dvx * b2.material.frictionX, dvy < 0 ? 0 : -dvy * b2.material.frictionY);
        }
    }
}
