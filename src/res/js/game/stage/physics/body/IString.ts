import { RigidBody } from "../../../../under/base/stage/physics/body/RigidBody";

/**
 * String interface
 * - It can add or remove rigid body
 * @interface
 * @classdesc String interface that can add or remove rigid body
 */
export interface IString {
    /**
     * Get string length
     * @abstract
     * @return {number} String length
     */
    getLength(): number;

    /**
     * Get body list
     * @abstract
     * @return {Array<RigidBody>} Body list
     */
    getBodies(): Array<RigidBody>;

    /**
     * Add entity for string
     * @abstract
     * @param {RigidBody} jointing Jointing body
     * @param {number} jointingX Jointing x position
     * @param {number} jointingY Jointing y position
     * @param {number} length Jointing length
     */
    addBody(jointing: RigidBody, jointingX: number, jointingY: number, length: number): void;

    /**
     * Remove body from string
     * @abstract
     * @param {RigidBody} body Joiting body
     */
    removeBody(body: RigidBody): void;
}

/**
 * Type guard for IString
 */
export const isIString = (arg: any): arg is IString => arg !== null && arg.removeBody !== undefined;
