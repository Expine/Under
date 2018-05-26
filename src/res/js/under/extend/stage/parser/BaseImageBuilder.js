/**
 * Base image builder
 * - Generates image from json data
 * - ### Generates normal image from json data
 * @extends {ImageBuilder}
 * @classdesc Base image builder to generate normal image from json
 */
class BaseImageBuilder extends ImageBuilder { // eslint-disable-line  no-unused-vars
    /**
     * Build image from json data
     * @override
     * @param {string} root File root path
     * @param {JSON} image Image json data
     * @return {GameImage} Maked image
     */
    build(root, image) {
        const id = ResourceManager.image.load(`${root}/${image.file}`);
        switch (image.type) {
            case `tile`:
                {
                    const width = image.w === undefined ? image.width : image.w;
                    const height = image.h === undefined ? image.height : image.h;
                    if (image.directional) {
                        return new DirectionalTileImage(id, image.width, image.height, image.x, image.y, width, height);
                    } else {
                        return new TileImage(id, image.width, image.height, image.x, image.y, width, height);
                    }
                }
            case `single`:
                return new SingleImage(id, image.width, image.height);
            case `anime`:
                {
                    const base = image.directional ? new DirectionalSingleAnimation(image.loop) : new SingleAnimation(image.loop);
                    base.setSize(image.width, image.height);
                    for (const it of image.animation) {
                        base.addAnimation(image.directional ? new DirectionalTileImage(id, image.width, image.height, it.x, it.y, it.width, it.height) : new TileImage(id, image.width, image.height, it.x, it.y, it.width, it.height), it.delta);
                    }
                    return base;
                }
            case `multianime`:
                {
                    const base = image.directional ? new DirectionalMultiNamedAnimation() : new MultiNamedAnimation();
                    for (const anime of image.animations) {
                        base.setName(anime.name);
                        base.setAnimation(image.directional ? new DirectionalSingleAnimation(anime.loop) : new SingleAnimation(anime.loop));
                        base.setSize(image.width, image.height);
                        for (const it of anime.animation) {
                            base.addAnimation(image.directional ? new DirectionalTileImage(id, image.width, image.height, it.x, it.y, it.width, it.height) : new TileImage(id, image.width, image.height, it.x, it.y, it.width, it.height), it.delta);
                        }
                    }
                    return base;
                }
            default:
                return null;
        }
    }
}
