import amqp from 'amqplib'
import { injectable } from 'tsyringe'

@injectable()
export class ProducerService {
    async sendMessage(queue: string, message: any) {
        const connection = await amqp.connect(process.env.RABBITMQ_SERVER as string)
        const channel = await connection.createChannel()

        await channel.assertQueue(queue, { durable: true })
        await channel.sendToQueue(queue, Buffer.from(message))

        setTimeout(() => {
            connection.close()
        }, 1000);
    }
}