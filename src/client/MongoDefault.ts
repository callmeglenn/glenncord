import { Document, Model, UpdateQuery } from "mongoose";
import { MongoCache, MongoModel } from "../typings/types";

class MongoDefault {
	public cache: MongoCache
	public model: Model<unknown, unknown, unknown, {}, any>
	public query: object
	constructor(cache: MongoCache, query: object, model: MongoModel) {
		this.cache = cache
		this.model = model
		this.query = query
	}
	public async find(): Promise<Document> {
		let data = this.cache.get(JSON.stringify(this.query))
		if (!data) {
			data = await this.model.findOne(this.query) ?? await new this.model(this.query).save()
			this.cache.set(JSON.stringify(this.query), data)
		}
		return data
	}
	public async update(query: UpdateQuery<unknown>): Promise<Document> {
		const data = await this.model.findOneAndUpdate(this.query, query, { upsert: true, new: true })
		this.cache.set(JSON.stringify(this.query), data)
		return data
	}
}
export default MongoDefault