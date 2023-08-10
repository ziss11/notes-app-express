import Redis from 'ioredis';
import { injectable } from "tsyringe";

@injectable()
export class CacheService {
    private redis: any

    constructor() {
        this.redis = new Redis({
            host: process.env.REDIS_SERVER,
        });
    }

    async set(key: string, value: any, expirationInSecond: number = 3600) {
        await this.redis.set(key, value)
        this.redis.expire(key, expirationInSecond);
    }

    async get(key: string): Promise<any> {
        const result = await this.redis.get(key)

        if (result === null) {
            throw new Error('Cache tidak ditemukan')
        }
        console.log(result)

        return result
    }

    delete(key: string) {
        return this.redis.del(key)
    }
} 