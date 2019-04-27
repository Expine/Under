/**
 * - Utility group for operatig HTML.
 * - Almost document wrapper.
 * @classdesc Almost document wrapper for operating HTML.
 */
export class HTMLUtil
{
    /**
     * Wrapper for querySelector to do null check.
     * @param aSelectors Selectors for using querySelector.
     */
    static querySelectorNotNull<K extends keyof HTMLElementTagNameMap>(aSelectors: K): HTMLElementTagNameMap[K]
    {
        const ret = document.querySelector(aSelectors);
        if(ret === null) {
            alert(`Error: ${aSelectors} is not found.`);
        }
        return ret!;
    }

    /**
     * Wrapper for getContext('2d') to do null check.
     * @param aCanvas  Canvas for getting context.
     */
    static getContext2D(aCanvas: HTMLCanvasElement): CanvasRenderingContext2D
    {
        const ret = aCanvas.getContext('2d');
        if(ret === null) {
            alert('Error: Fail to gey CanvasRenderingContext2D.');
        }
        return ret!;
    }
}
