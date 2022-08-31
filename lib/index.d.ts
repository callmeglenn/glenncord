import Client from './classes/Client';
import ClientEvent from './classes/ClientEvent';
import ClientCommand from './classes/ClientCommand';
import MongoDefault from './classes/MongoDefault';
/**
 * Examples can be found in the [npm page](https://npmjs.com/package/glenncord).
*/
declare const Glenncord: {
    Client: typeof Client;
    ClientEvent: typeof ClientEvent;
    ClientCommand: typeof ClientCommand;
    MongoDefault: typeof MongoDefault;
};
export = Glenncord;
