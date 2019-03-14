/**
 * Talk event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Start talking and stop stage
 * @classdesc Talk event to control the stage
 */
class TalkEvent extends StageEvent {
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
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.talkCount = 0;
        this.talked = false;
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
     * @return {boolean} Whether update is endped or not
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

        if (Input.key.isPress(Input.key.yes())) {
            if (this.talked) {
                this.op.next();
                return true;
            } else {
                this.talkCount = this.sentence.length;
                this.talked = true;
            }
        }
        return false;
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        const id = ResourceManager.image.load(`window/win2.png`);
        const face = ResourceManager.image.load(`face/actor.png`);
        Util.renderWindow(ctx, id, 0, 0, 600, 200);
        Util.renderWindow(ctx, id, 610, 10, 180, 180);
        ctx.drawImage(face, 636, 36, 128, 128);
        // measure text
        const texts = [];
        texts.push(``);
        for (const word of this.sentence.substr(0, this.talkCount)) {
            if (ctx.measureText(texts[texts.length - 1] + word, 25) <= 536) {
                texts[texts.length - 1] += word;
            } else {
                texts.push(word);
            }
        }
        for (let i = 0; i < texts.length; ++i) {
            ctx.fillText(texts[i], 32, 32 + 35 * i, 0, 0, 25);
        }
        // render press z
        if (this.talked) {
            ctx.fillText(`...Press Z key`, 570, 150, 1.0, 0.0, 16);
        }
    }
}
