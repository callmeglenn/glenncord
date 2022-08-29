import Client from './client/Client';
import ClientEvent from './client/ClientEvent';
import ClientCommand from './client/ClientCommand';
import { ClientCommandType } from './typings/types';
/**
 * Examples can be found in the [npm page](https://npmjs.com/package/glenncord).
*/
declare const Glenncord: {
    Client: typeof Client;
    ClientEvent: typeof ClientEvent;
    ClientCommand: typeof ClientCommand;
    ClientCommandType: typeof ClientCommandType;
};
export = Glenncord;
