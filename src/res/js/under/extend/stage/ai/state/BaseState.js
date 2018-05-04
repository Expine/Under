/**
 * Base State
 * - Determines the operation by AI according to the state and renders based on state
 * - ### Initialize state image
 * @interface
 * @implements {State}
 * @classdesc Base state to initialize state image
 */
class BaseState extends State { // eslint-disable-line  no-unused-vars
    /**
     * Initialize
     * @override
     */
    init() {
        // set image
        let image = this.entity.getImage();
        if (image instanceof NamedAnimation) {
            image.setName(this.ai.getStateID());
        }
        image.init();
    }
}
