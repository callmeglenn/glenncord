import { BaseEvent, On } from '../typings/types'
class ClientEvent implements BaseEvent {
	public event: string
	public music: boolean
	public on: On
	constructor(params: BaseEvent) {
		this.event = params.event
		this.music = params.music ?? false
		this.on = params.on
	}
}
export default ClientEvent