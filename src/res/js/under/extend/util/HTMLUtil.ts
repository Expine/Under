/**
 * - Utility group for operatig HTML.
 * - Almost document wrapper.
 * @classdesc Almost document wrapper for operating HTML.
 */
export class HTMLUtil
{
    /**
     * Wrapper for querySelector to do null check.
     * @param selectors Selectors for using querySelector.
     */
    static querySelectorNotNull<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K]
    {
        const ret = document.querySelector(selectors);
        if(ret === null) {
            alert(`Error: ${selectors} is not found.`);
        }
        return ret!;
    }
}
