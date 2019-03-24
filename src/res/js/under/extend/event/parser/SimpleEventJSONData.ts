/**
 * Simple event JSON data
 * - represents event JSON data
 * @classdesc Simple event JSON data that represents event JSON data
 */
export class SimpleEventJSONData {
    /**
     * Type of event
     * @type {string}
     */
    type: string = "";
}

/**
 * Talk event JSON data
 * - represents talk event
 * @classdesc Talk event JSON data that represents talk event
 */
export class TalkEventJSONData extends SimpleEventJSONData {
    /**
     * Sentence of event
     * @type {string}
     */
    sentence: string = "";
}

/**
 * Image event JSON data
 * - represents image event
 * @classdesc Image event JSON data that represents image event
 */
export class ImageEventJSONData extends SimpleEventJSONData {
    /**
     * Name of image
     * @type {string}
     */
    name: string = "";
    /**
     * X position of image
     * @type {number}
     */
    x: number = 0;
    /**
     * Y position of image
     * @type {number}
     */
    y: number = 0;
}

/**
 * Delete event JSON data
 * - represents delete event
 * @classdesc Delete event JSON data that represents delete event
 */
export class DeleteEventJSONData extends SimpleEventJSONData {
    /**
     * Name of delete
     * @type {string}
     */
    name: string = "";
}

/**
 * Delay event JSON data
 * - represents delay event
 * @classdesc Delay event JSON data that represents delay event
 */
export class DelayEventJSONData extends SimpleEventJSONData {
    /**
     * Time of delay
     * @type {number}
     */
    delay: number = 0;
}


/**
 * Type guard for SimpleEventJSONData
 */
export const isSimpleEventJSONData = (arg: any): arg is SimpleEventJSONData => arg !== null && arg.type !== undefined;
/**
 * Type guard for TalkEventJSONData
 */
export const isTalkEventJSONData = (arg: any): arg is TalkEventJSONData => arg !== null && arg.sentence !== undefined;
/**
 * Type guard for ImageEventJSONData
 */
export const isImageEventJSONData = (arg: any): arg is ImageEventJSONData => arg !== null && arg.name !== undefined;
/**
 * Type guard for DeleteEventJSONData
 */
export const isDeleteEventJSONData = (arg: any): arg is DeleteEventJSONData => arg !== null && arg.name !== undefined;
/**
 * Type guard for DeleteEventJSONData
 */
export const isDelayEventJSONData = (arg: any): arg is DelayEventJSONData => arg !== null && arg.name !== undefined;
