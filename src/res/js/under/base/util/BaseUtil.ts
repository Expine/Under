/**
 * Convenient method group.
 */
export class BaseUtil
{
    /**
     * Get class name by instance.
     * @param aInstance Instance for getting class name.
     * @return Class name.
     */
    static getClassName(aInstance: object): string
    {
        return aInstance.constructor.toString().split(`\n`)[0].split(` `)[1];
    }
}
