const amqp = require('amqplib');

const exchangeName = "julestopic"; // listen to my topic "julestopic"
const routingKey = 'info'; // routing key

async function startSubscriber() {
  try {
    // Use localhost for local testing
    const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'topic', { durable: false });

    const { queue } = await channel.assertQueue('', { exclusive: true });
    console.log(`Consumer waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.bindQueue(queue, exchangeName, routingKey);

    channel.consume(queue, (message) => {
      if (message !== null) {
        const receivedJSON = JSON.parse(message.content.toString());
        console.log(`Received message:`, receivedJSON);
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
}

startSubscriber();