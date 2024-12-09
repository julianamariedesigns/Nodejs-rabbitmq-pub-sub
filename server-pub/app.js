const express = require('express');
const { v4 } = require('uuid');
const amqp = require('amqplib');
const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let rabbitMQConnection;
const exchangeName = "julestopic"; // My exchange name to "julestopic"

async function initRabbitMQ() {
  try {
    rabbitMQConnection = await amqp.connect('amqp://localhost');
    const channel = await rabbitMQConnection.createChannel();
    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    console.log("RabbitMQ connection and exchange established.");
    return channel;
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    process.exit(1);
  }
}

app.post('/messages', async (req, res) => {
  try {
    if (!req.body?.message) {
      return res.status(400).json({
        detail: "The message property is required"
      });
    }

    const message = {
      id: v4(),
      message: req.body.message,
      date: new Date(),
    };

    const routingKey = 'info'; // routing key 
    const channel = await initRabbitMQ();
    channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(message)));
    console.log(`Publishing an Event using RabbitMQ: ${req.body.message}`);
    return res.json({
      detail: 'Publishing an Event using RabbitMQ successful',
    });
  } catch (error) {
    console.error("Error publishing message:", error);
    return res.status(500).json({
      detail: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`😀 Publisher server running on port ${PORT}`);
});

