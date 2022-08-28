import * as path from 'path'
import * as Discord from 'discord.js'
import mongoose from 'mongoose'
import DisTube from 'distube'
import { promises as fs } from 'fs'
import { LoginCredentials, DirectorySettings, GlennOptions } from '../typings/types'
import type { DisTubeEvents } from 'distube'
import ClientEvent from './ClientEvent'
import ClientCommand from './ClientCommand'
class Client extends Discord.Client {
	public commands: Discord.Collection<string, ClientCommand> = new Discord.Collection()
	public credentials: LoginCredentials
	public directories: DirectorySettings
	public distube: DisTube
	constructor(public extensions: GlennOptions) {
		super(extensions)
		this.credentials = extensions.credentials
		this.directories = extensions.directories

		if (extensions.music) {
			this.distube = new DisTube(this, {
				leaveOnStop: false,
				leaveOnFinish: true,
				emitNewSongOnly: true
			})
		}
	}
	public async start(): Promise<void> {
		if (this.directories?.commands) await this.registerCommandFiles(`${path.dirname(require.main.filename)}/${this.directories.commands}`)
		if (this.directories?.events) await this.registerEventFiles(`${path.dirname(require.main.filename)}/${this.directories.events}`)

		if (!this.credentials?.token) throw Error("credentials/token parameter missing.")
		if (this.credentials.mongo) await this.connectToMongo()

		this.login(this.credentials.token)
	}
	private async connectToMongo(): Promise<void> {
		mongoose.connect(this.credentials.mongo)
		console.log("Successfully connected to Mongo.")
	}
	private async registerCommandFiles(dir: string): Promise<void> {
		const folder = await fs.readdir(path.join(dir))
		for (const file of folder) {
			const stat = await fs.lstat(path.join(dir, file))
			if (stat.isDirectory()) this.registerCommandFiles(path.join(dir, file))
			else if (file.endsWith('.ts') || file.endsWith('.js')) {
				const data = await import(`${path.join(dir, file)}`)
				const module = (data.default ? data.default : data) as ClientCommand
				this.commands.set(module.data.name, module)
			}
		}
	}
	private async registerEventFiles(dir: string): Promise<void> {
		const folder = await fs.readdir(path.join(dir))
		for (const file of folder) {
			const stat = await fs.lstat(path.join(dir, file))
			if (stat.isDirectory()) this.registerEventFiles(path.join(dir, file))
			else if (file.endsWith('.ts') || file.endsWith('.js')) {
				const data = await import(`${path.join(dir, file)}`)
				const module = (data.default ? data.default : data) as ClientEvent
				if (!module.music) this.on(module.event as string, module.on.bind(null, this))
				else this.distube.on(module.event as keyof DisTubeEvents, module.on.bind(null, this))
			}
		}
	}
}
export default Client