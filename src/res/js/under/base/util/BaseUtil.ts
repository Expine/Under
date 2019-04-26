/**
 * Convenient method group.
 */
export class BaseUtil
{
    /**
     * Get class name by instance.
     * @param instance Instance for getting class name.
     * @return Class name.
     */
    static getClassName(instance: object): string
    {
        return instance.constructor.toString().split(`\n`)[0].split(` `)[1];
    }
}
