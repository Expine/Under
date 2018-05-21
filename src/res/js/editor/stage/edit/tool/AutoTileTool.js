/**
 * Pencil tool
 * - Tool for editing
 * - Selects something
 * - ### Paints one by one and automaticaly tiling
 * @extends {BaseTool}
 * @classdesc Pencil tool to paint one by one and automaticaly tiling
 */
class AutoTileTool extends BaseTool { // eslint-disable-line  no-unused-vars
    /**
     * Calclulate auto tile ID
     * @protected
     * @param {number} baseID Base tile ID
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @return {number} Auto tile ID
     */
    calculateID(baseID, x, y) {
        let willID = baseID;
        let spaceCount = 0;
        let checkLT = true;
        let checkRT = true;
        let checkLU = true;
        let checkRU = true;
        let top = this.editor.getTarget().getEditorEntity(x, y - 32);
        if (top === null || !top.isAutoTile() || top.getAutoTileBaseID() !== baseID) {
            checkLT = false;
            checkRT = false;
            willID = baseID + 16;
            top = null;
        } else {
            top = 1;
        }
        let right = this.editor.getTarget().getEditorEntity(x + 32, y);
        if (right === null || !right.isAutoTile() || right.getAutoTileBaseID() !== baseID) {
            checkRT = false;
            checkRU = false;
            willID = top === null ? baseID + 34 : baseID + 20;
            right = null;
        } else {
            right = 1;
        }
        let under = this.editor.getTarget().getEditorEntity(x, y + 32);
        if (under === null || !under.isAutoTile() || under.getAutoTileBaseID() !== baseID) {
            checkLU = false;
            checkRU = false;
            willID = top === null ? (right === null ? baseID + 43 : baseID + 40) : (right === null ? baseID + 36 : baseID + 24);
            under = null;
        } else {
            under = 1;
        }
        let left = this.editor.getTarget().getEditorEntity(x - 32, y);
        if (left === null || !left.isAutoTile() || left.getAutoTileBaseID() !== baseID) {
            checkLT = false;
            checkLU = false;
            willID = top === null ? (right === null ? (under === null ? baseID + 46 : baseID + 42) : (under === null ? baseID + 45 : baseID + 32)) : (right === null ? (under === null ? baseID + 44 : baseID + 41) : (under === null ? baseID + 38 : baseID + 28));
        }
        if (checkLT) {
            let check = this.editor.getTarget().getEditorEntity(x - 32, y - 32);
            if (check === null || !check.isAutoTile() || check.getAutoTileBaseID() !== baseID) {
                willID += 1 << spaceCount;
            }
            ++spaceCount;
        }
        if (checkRT) {
            let check = this.editor.getTarget().getEditorEntity(x + 32, y - 32);
            if (check === null || !check.isAutoTile() || check.getAutoTileBaseID() !== baseID) {
                willID += 1 << spaceCount;
            }
            ++spaceCount;
        }
        if (checkRU) {
            let check = this.editor.getTarget().getEditorEntity(x + 32, y + 32);
            if (check === null || !check.isAutoTile() || check.getAutoTileBaseID() !== baseID) {
                willID += 1 << spaceCount;
            }
            ++spaceCount;
        }
        if (checkLU) {
            let check = this.editor.getTarget().getEditorEntity(x - 32, y + 32);
            if (check === null || !check.isAutoTile() || check.getAutoTileBaseID() !== baseID) {
                willID += 1 << spaceCount;
            }
        }
        return willID;
    }

    /**
     * Paint auto tile
     * @protected
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    paint(x, y, id) {
        let check = this.editor.getTarget().getEditorEntity(x, y);
        if (check !== null && check.isAutoTile() && check.getAutoTileBaseID() === id) {
            this.editor.getTarget().paint(x, y, this.calculateID(id, x, y));
        }
    }

    /**
     * Paint around
     * @protected
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    paintAround(x, y, id) {
        for (let i = -1; i < 2; ++i) {
            for (let j = -1; j < 2; ++j) {
                this.paint(x + i * 32, y + j * 32, id);
            }
        }
    }


    /**
     * Update tool
     * @override
     * @protected
     */
    shortcut() {
        this.editor.changeTool(`tile`);
    }

    /**
     * Use tool by ID
     * @override
     * @param {number} x Target x position
     * @param {number} y Target y position
     * @param {number} id Painting ID
     */
    use(x, y, id) {
        super.use(x, y, id);
        if (id >= 0 && Input.mouse.isPressed(Input.mouse.mLeft())) {
            let calcID = this.calculateID(id, this.selectedX, this.selectedY);
            this.editor.getTarget().paint(this.selectedX, this.selectedY, calcID);
            this.paintAround(this.selectedX, this.selectedY, id);
        }
    }
}
