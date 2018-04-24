/**
 * Talk event
 * - Updates and renders event
 * - Controls the stage
 * - ### Start talking and stop stage
 * @classdesc Talk event to control the stage
 */
class TalkEvent extends GameEvent /* , IStageEvent */ { // eslint-disable-line  no-unused-vars
    /**
     * Talk event constructor
     * @constructor
     * @param {string} sentence Talking sentence
     */
    constructor(sentence) {
        super();

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
         * @type {boolean}
         */
        this.talked = false;

        /**
         * Stage for constrol
         * @protected
         * @type {Stage}
         */
        this.stage = null;
    }

    /**
     * Set stage
     * @param {Stage} stage Stage to set
     */
    setStage(stage) {
        this.stage = stage;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.talkCount = 0;
        this.stage.setEnable(false);
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        this.stage.setEnable(true);
    }

    /**
     * Update event
     * @override
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
                this.op.stopUpdate(this);
                this.op.stopRender(this);
                this.op.next();
            } else {
                this.talkCount = this.sentence.length;
                this.talked = true;
            }
        }
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        let id = ResourceManager.image.load(`window/win2.png`);
        let face = ResourceManager.image.load(`face/actor.png`);
        Util.renderWindow(ctx, id, 0, 0, 600, 200);
        Util.renderWindow(ctx, id, 610, 10, 180, 180);
        ctx.drawImage(face, 636, 36, 128, 128);
        ctx.fillText(this.sentence.substr(0, this.talkCount), 32, 32, 0, 0, 25);
    }
}
