import Client from './client/Client';
import ClientEvent from './client/ClientEvent';
import ClientCommand from './client/ClientCommand';
import MongoDefault from './client/MongoDefault';
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
