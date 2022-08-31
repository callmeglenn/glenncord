import { Document, Model, UpdateQuery } from "mongoose";
import { MongoCache, MongoModel } from "../typings/types";
declare class MongoDefault {
    cache: MongoCache;
    model: Model<unknown, unknown, unknown, {}, any>;
    query: object;
    constructor(cache: MongoCache, query: object, model: MongoModel);
    find(): Promise<Document>;
    update(query: UpdateQuery<unknown>): Promise<Document>;
}
export default MongoDefault;
