module GameShow {
    "use strict";

    export interface ISerializeToObject {
        serialize(): any;
        deserialize(object: any): void;
    }
}