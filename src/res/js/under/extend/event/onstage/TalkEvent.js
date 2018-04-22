/**
 * Stage event
 * - Updates and renders event
 * - ### Controls the stage
 * @classdesc Stage event to control the stage
 */
class TalkEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Stage event constructor
     * @constructor
     * @param {Stage} stage Stage for control
     * @param {string} sentence Talking sentence
     */
    constructor(stage, sentence) {
        super(stage);

        /**
         * Talking sentence
         * @protected
         * @type {string}
         */
        this.sentence = sentence;

        /**
         * Talking word count
         * @protected
         * @type {number}
         */
        this.talkCount = 0;

        /**
         * Whether talking is ended or not
         * @protected
         * @type {bool}
         */
        this.talked = false;
    }

    /**
     * Initialize event
     * @interface
     */
    init() {
        this.talkCount = 0;
        this.stage.setEnable(false);
    }

    /**
     * Update event
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {
        // count up talking
        if (!this.talked) {
            this.talkCount += dt / 100;
            if (this.talkCount > this.sentence.length) {
                this.talkCount = this.sentence.length;
                this.talked = true;
            }
        }

        if (Input.it.isPress(Input.key.yes())) {
            if (this.talked) {
                EventManager.it.dequeueEvent();
                this.stage.setEnable(true);
            } else {
                this.talkCount = this.sentence.length;
                this.talked = true;
            }
        }
    }

    /**
     * Render event
     * @interface
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        ctx.fillText(this.sentence.substr(0, this.talkCount), 400, 300, 0.5, 0.5, 50);
    }
}
