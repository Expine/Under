/**
 * Image builder
 * - ### Generates image from json data
 * - Generates normal image from json data
 * @extends {ImageBuilder}
 * @classdesc Image builder to generate normal image from json
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
                    return new TileImage(id, image.width, image.height, image.x, image.y, width, height);
                }
            case `single`:
                return new SingleImage(id, image.width, image.height);
            case `anime`:
                {
                    const base = new SingleAnimation(image.loop);
                    base.setSize(image.width, image.height);
                    for (const it of image.animation) {
                        base.addAnimation(new TileImage(id, image.width, image.height, it.x, it.y, it.width, it.height), it.delta);
                    }
                    return base;
                }
            case `multianime`:
                {
                    const base = new MultiNamedAnimation();
                    for (const anime of image.animations) {
                        base.setName(anime.name);
                        base.setAnimation(new SingleAnimation(anime.loop));
                        base.setSize(image.width, image.height);
                        for (const it of anime.animation) {
                            base.addAnimation(new TileImage(id, image.width, image.height, it.x, it.y, it.width, it.height), it.delta);
                        }
                    }
                    return base;
                }
            default:
                return null;
        }
    }
}
