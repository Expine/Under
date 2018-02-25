/**
 * Default stage sample
 * @implements {Stage}
 * @classdesc Stage sample
 */
class DefaultStage extends Stage {
    /**
     * Cnstructor for default stage
     * @constructor
     */
    constructor() {
        super();
        /**
         * Immutable entity list
         * @private
         * @type {Array}
         */
        this.immutables_ = new Array();
        /**
         * Mutable entity list
         * @private
         * @type {Array}
         */
        this.mutables_ = new Array();
        /**
         * Charactr list
         * @private
         * @type {Array}
         */
        this.characters_ = new Array();
        /**
         * Processing list for next method
         * @private
         * @type {Array}
         */
        this.proccessingList_ = null;
        /**
         * Iterator for loop
         * @private
         * @type {Iterator}
         */
        this.iterator_ = null;
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity - entity object
     */
    addEntity(entity) {
        if (entity instanceof ImmutableObject)
            this.immutables_.push(entity);
        else if (entity instanceof MutableObject)
            this.mutables_.push(entity);
        else if (entity instanceof Character)
            this.characters_.push(entity);
    }

    /**
     * Get entity iterator
     * @override
     * @return {Iterator} entity iterator
     */
    next() {
        if (this.proccessingList_ == null) {
            this.proccessingList_ = this.immutables_;
            this.iterator_ = this.proccessingList_[Symbol.iterator]();
        }
        let it;
        while (true) {
            it = this.iterator_.next();
            if (it.done) {
                if (this.proccessingList_ == this.immutables_)
                    this.proccessingList_ = this.mutables_;
                else if (this.proccessingList_ == this.mutables_)
                    this.proccessingList_ = this.characters_;
                else {
                    this.proccessingList_ = null;
                    break;
                }
                this.iterator_ = this.proccessingList_[Symbol.iterator]();
                continue;
            }
            break;
        }
        return it;
    }
}