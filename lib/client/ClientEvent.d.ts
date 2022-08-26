import { BaseEvent, On } from '../typings/types';
declare class ClientEvent implements BaseEvent {
    event: string;
    music: boolean;
    on: On;
    constructor(params: BaseEvent);
}
export default ClientEvent;
