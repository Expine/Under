// TODO: Should be implement by Inheritance
/**
 * Camera unparser
 * - ### Unparses from camera to json
 * @classdesc Camera unparser to unparse from camera to json
 */
class CameraUnparser { // eslint-disable-line  no-unused-vars
    /**
     * Unparser and add information
     * @param {JSON} ret JSON data for adding
     * @param {Camera} camera Camera to unparse
     */
    unparseAndAdd(ret, camera) {
        if (camera instanceof CenterCamera) {
            ret.type = `center`;
        } else if (camera instanceof MovingCamera) {
            ret.moving = true;
            this.unparseAndAdd(ret, camera.baseCamera);
        } else if (camera instanceof ClipCamera) {
            ret.cliping = true;
            this.unparseAndAdd(ret, camera.baseCamera);
        }
    }

    /**
     * Unparses from camera to json
     * @param {Camera} camera Camera to unparse
     * @return {JSON} Json data
     */
    unparse(camera) {
        let ret = {};
        this.unparseAndAdd(ret, camera);
        return ret;
    }
}
