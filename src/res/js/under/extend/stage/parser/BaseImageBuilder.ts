import { ImageBuilder } from "../../../base/stage/parser/ImageBuilder";
import { GameImage } from "../../../base/resources/image/GameImage";
import { ResourceManager } from "../../../base/resources/ResourceManager";
import { TileImage } from "../../resources/image/TileImage";
import { SingleImage } from "../../resources/image/SingleImage";
import { SingleAnimation } from "../../resources/image/SingleAnimation";
import { MultiNamedAnimation } from "../../resources/image/MultiNamedAnimation";
import { NamedAnimation } from "../../../base/resources/image/NamedAnimation";
import { GameAnimation } from "../../../base/resources/image/GameAnimation";
import { TransitionalStripeAnimation } from "../../resources/image/transition/TransitionalStripeAnimation";
import { ClipAnimation } from "../../resources/image/clip/ClipAnimation";
import { ClipImage } from "../../resources/image/clip/ClipImage";
import { DirectionalNamedAnimation } from "../../resources/image/directional/DirectionalNamedAnimation";
import { DirectionalAnimation } from "../../resources/image/directional/DirectionalAnimation";
import { DirectionalImage } from "../../resources/image/directional/DirectionalImage";
import { MultiAnimation } from "../../../base/resources/image/MultiAnimation";

/**
 * Base image builder
 * - Generates normal image from json data
 * @extends {ImageBuilder}
 * @classdesc Base image builder to generate normal image from json
 */
export class BaseImageBuilder extends ImageBuilder {
    /**
     * Build image from json data
     * @override
     * @param {string} root File root path
     * @param {any} image Image json data
     * @return {GameImage} Maked image
     */
    build(root: string, image: any): GameImage | null {
        let ret: GameImage | null = null;
        const id = image.file === undefined ? -1 : ResourceManager.image.load(`${root}/${image.file}`);
        // build base
        switch (image.type) {
            case 'tile':
                {
                    const width = image.w === undefined ? image.width : image.w;
                    const height = image.h === undefined ? image.height : image.h;
                    ret = new TileImage(id, width, height, image.x, image.y, image.width, image.height);
                    break;
                }
            case 'single':
                ret = new SingleImage(id, image.width, image.height);
                break;
            case 'anime':
                ret = new SingleAnimation(image.loop);
                break;
            case 'multianime':
                ret = new MultiNamedAnimation();
                break;
        }
        // build transitional
        if (image.transition !== undefined) {
            switch (image.transition.type) {
                case 'blink':
                    if (ret instanceof NamedAnimation) {
                        // TODO: Generate TransitionalNamedAnimation
                        // ret = new TransitionalNamedAnimation(ret, image.transition.time, image.transition.interval);
                    }
                    break;
                case 'stripe':
                    if (ret instanceof NamedAnimation) {
                        ret = new TransitionalStripeAnimation(ret, image.transition.time);
                        image.clip = true;
                    }
                    break;
            }
        }
        // build clip
        if (image.clip) {
            if (ret instanceof NamedAnimation) { } else if (ret instanceof GameAnimation) {
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
                if (ret instanceof NamedAnimation) {
                    ret.setName(anime.name);
                }
                anime.type = 'anime';
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
                it.type = 'tile';
                it.directional = image.directional;
                it.clip = image.clip;
                const cut = this.build(root, it);
                if (cut !== null) {
                    ret.addAnimation(cut, it.delta);
                }
            }
            ret.setImageID(id);
            ret.setSize(image.width, image.height);
        }
        return ret;
    }
}
