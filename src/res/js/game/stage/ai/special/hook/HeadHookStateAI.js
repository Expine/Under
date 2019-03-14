 /**
  * Head Hook state AI
  * - Determines the behavior of an entity
  * - Determines by state
  * - Manages state by name
  * - Indicates hooking and released state
  * - ### Also indicates hooked state
  * @extends {HookStateAI}
  * @classdesc AI with state for determining action
  */
 class HeadHookStateAI extends HookStateAI {
     /**
      * Head hook State AI Constructor
      * @constructor
      */
     constructor() {
         super();

         this.namedStates[`hooking`] = new HeadHookingState();
         this.namedStates[`hooked`] = new NoneState();
     }
 }
