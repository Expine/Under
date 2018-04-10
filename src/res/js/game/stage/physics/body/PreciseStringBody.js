/**
 * Precise string body
 * For string
 * @implements {PreciseBody}
 * @classdesc Precise string body for string
 */
class PreciseStringBody extends PreciseBody /* , Stringable */ { // eslint-disable-line  no-unused-vars
    /**
     * Precise string body constructor
     * @constructor
     * @param {number} jointingX Jointing x position
     * @param {number} jointingY Jointing y position
     * @param {number} length Jointing length
     */
    constructor(jointingX, jointingY, length) {
        super();

        this.jointingList = [];
        this.jointingXList = [];
        this.jointingYList = [];

        this.parent = null;

        this.jointingList.push(this);
        this.jointingXList.push(jointingX);
        this.jointingYList.push(jointingY);
    }

    /**
     * Update by rigid body
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        if (this.parent == null) {
            for (let it of this.jointingList) {
                it.body.update(dt);
            }
        }
    }

    /**
     * Add entity for string
     * @override
     * @param {StringBody} jointing Jointing body
     */
    addBody(jointing) {
        if (this.parent !== null) {
            this.parent.addBody(jointing);
        } else {
            let post = this;
            for (let it of jointing.jointingList) {
                this.jointingList.push(it.jointingList[0]);
                this.jointingXList.push(it.jointingXList[0]);
                this.jointingYList.push(it.jointingYList[1]);
                it.parent = post;
                post = it;
            }
        }
    }

    /**
     * Remove body from string
     * @override
     * @param {StringBody} body Joiting body
     */
    removeBody(body) {
        let index = this.jointingList.indexOf(jointed);
        if (index >= 0) {
            if (index != this.jointingList.length - 1 && index !== 0) {
                this.jointingList[index + 1].parent = this.jointingList[index - 1];
            }
            this.jointingList.splice(index, 1);
            this.jointingXList.splice(index, 1);
            this.jointingYList.splice(index, 1);
        }
    }
}
