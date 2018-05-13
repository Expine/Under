/**
 * Punch object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - It can move by AI
 * - Manages AI by list
 * - Generated and owned by someone
 * - Object that can be destroyed
 * - Object indicating attack that have lifespan
 * - ### If it is collided and collided entity implements damagable interface, damage it
 * - ### Implements attack object resources
 * @extends {AttackObject}
 * @classdesc Punch object that damages entity If it is collided to entity and entity implements damagable interface
 */
class PunchObject extends AttackObject { // eslint-disable-line  no-unused-vars
    /**
     * Punch object constructor
     * @constructor
     */
    constructor() {
        super(400);
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        // TODO: Should be into a text file
        // set base data
        let imageID = ResourceManager.image.load(`chara/attack.png`);
        let anime = new SingleAnimation();
        anime.addAnimation(new TileImage(imageID, this.width, this.height, 0, 0, 32, 32), 100);
        anime.addAnimation(new TileImage(imageID, this.width, this.height, 32, 0, 32, 32), 100);
        anime.addAnimation(new TileImage(imageID, this.width, this.height, 64, 0, 32, 32), 100);
        anime.addAnimation(new TileImage(imageID, this.width, this.height, 96, 0, 32, 32), 100);
        anime.setSize(this.width, this.height);
        this.setImage(anime);
        this.setMaterial(new ImmutableMaterial());
        let col = new RectangleCollider(0, 0, this.width, this.height);
        col.setAABB(new SimpleAABB());
        col.response = false;
        this.setCollider(col);
        let body = new MaxAdoptBody();
        body.enable = false;
        body.setMaterial(new ImmutableRigidMaterial());
        this.setRigidBody(body);
        this.addAI(new AttackObjectAI(this.owner));
    }
}
