/**
 * Base image builder
 * - Generates image from json data
 * - ### Generates normal image from json data
 * @extends {ImageBuilder}
 * @classdesc Base image builder to generate normal image from json
 */
class BaseImageBuilder extends ImageBuilder {
    /**
     * Build image from json data
     * @override
     * @param {string} root File root path
     * @param {JSON} image Image json data
     * @return {GameImage} Maked image
     */
    build(root, image) {
        let ret = null;
        const id = image.file === undefined ? -1 : ResourceManager.image.load(`${root}/${image.file}`);
        // build base
        switch (image.type) {
            case `tile`:
                {
                    const width = image.w === undefined ? image.width : image.w;
                    const height = image.h === undefined ? image.height : image.h;
                    ret = new TileImage(id, width, height, image.x, image.y, image.width, image.height);
                    break;
                }
            case `single`:
                ret = new SingleImage(id, image.width, image.height);
                break;
            case `anime`:
                ret = new SingleAnimation(image.loop);
                break;
            case `multianime`:
                ret = new MultiNamedAnimation();
                break;
        }
        // build transitional
        if (image.transition !== undefined) {
            switch (image.transition.type) {
                case `blink`:
                    if (ret instanceof NamedAnimation) {
                        ret = new TransitionalNamedAnimation(ret, image.transition.time, image.transition.interval);
                    }
                    break;
                case `stripe`:
                    if (ret instanceof NamedAnimation) {
                        ret = new TransitionalStripeAnimation(ret, image.transition.time);
                        image.clip = true;
                    }
                    break;
            }
        }
        // build clip
        if (image.clip) {
            if (ret instanceof NamedAnimation) {} else if (ret instanceof GameAnimation) {
                ret = new ClipAnimation(ret);
            } else if (ret instanceof GameImage) {
                ret = new ClipImage(ret);
            }
        }
        // build directional
        if (image.directional) {
            if (ret instanceof NamedAnimation) {
                ret = new DirectionalNamedAnimation(ret);
            } else if (ret instanceof GameAnimation) {
                ret = new DirectionalAnimation(ret);
            } else if (ret instanceof GameImage) {
                ret = new DirectionalImage(ret);
            }
        }
        if (ret instanceof MultiAnimation) {
            for (const anime of image.animations) {
                ret.setName(anime.name);
                anime.type = `anime`;
                anime.directional = image.directional;
                anime.clip = image.clip;
                const element = this.build(root, anime);
                if (element instanceof GameAnimation) {
                    ret.setAnimation(element);
                }
            }
            ret.setAllImageID(id);
            ret.setAllSize(image.width, image.height);
        } else if (ret instanceof GameAnimation) {
            for (const it of image.animation) {
                it.type = `tile`;
                it.directional = image.directional;
                it.clip = image.clip;
                ret.addAnimation(this.build(root, it), it.delta);
            }
            ret.setImageID(id);
            ret.setSize(image.width, image.height);
        }
        return ret;
    }
}
