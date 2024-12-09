# Pub-Sub Pattern Implementation with RabbitMQ

## Overview

This project is designed to comply with the assignment requirements for Hands-on Exercise: Messaging Patterns
Medium: Implement a pub-sub pattern using RabbitMQ or AWS SNS. 

The application is built using Node.js and demonstrates a basic flow of the event publish and subscribe model using RabbitMQ as a message broker.

## Project Structure

The project consists of two main services:

1. **Publisher Service**: Responsible for publishing messages to a RabbitMQ exchange.
2. **Consumer Service**: Responsible for subscribing to the exchange and processing incoming messages.

## Tech Stack

- **Node.js**: JavaScript runtime for building the publisher and consumer services.
- **RabbitMQ**: Message broker used to implement the pub-sub pattern.
- **Docker**: Containerization platform for easy deployment and management of the application.
- **Docker Compose**: Tool for defining and running multi-container Docker applications.


## Implementation of Pub-Sub Pattern

### RabbitMQ Usage

The code utilizes RabbitMQ, which is a suitable choice for implementing the pub-sub pattern. RabbitMQ allows for efficient message routing and delivery between producers and consumers.

### Exchange Declaration

The application declares an exchange of type `fanout`. This type of exchange broadcasts messages to all queues that are bound to it, ensuring that every subscriber receives the same message. This is essential for the pub-sub model.

### Publishing Messages

The publisher service sends messages to the declared exchange. This ensures that all subscribers receive the same message, allowing for effective communication between different parts of the application.

### Multiple Consumers

The consumer service sets up a consumer that listens to the exchange and processes incoming messages. Multiple instances of this subscriber can be run simultaneously to demonstrate how multiple consumers can receive messages from the same exchange.


## Getting Started

### Prerequisites

- Node.js
- RabbitMQ server

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>

1. Install dependencies for both publisher and consumer services:
    ```bash
        npm install

3. Start the RabbitMQ server (if not already running). Access RabbitMQ UI Admin at http://localhost:15672 using the credentials:


    Username: guest

    Password: guest


### Running the Application
1. Start the publisher service by going to server-pub directory
    ```bash
        node app.js

2. Start one or more instances of the consumer service by going to server-sub directory
    ```bash
        node app.js

3. Publish messages using the publisher service, and observe how multiple consumers receive the messages.

### Docker
This project is available on docker via
    
    docker pull julescruz10015482/nodejs-rabbitmq-pub-sub-rabbitmq-1



### By Jules

[License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)


