import {
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from "@aws-sdk/client-sqs";
import { sqs } from "../SqsClient";
import { logger } from "../../Utils/Logger";

const QUEUE_URL =
  "http://localhost.localstack.cloud:4566/queue/us-east-1/000000000000/email-queue";

async function poll() {
  try {
    const command = new ReceiveMessageCommand({
      QueueUrl: QUEUE_URL,
      MaxNumberOfMessages: 1,
      WaitTimeSeconds: 10,
    });

    const response = await sqs.send(command);

    if (response.Messages && response.Messages.length > 0) {
      for (const message of response.Messages) {
        if (message.Body) {
          const { name, email } = JSON.parse(message.Body);
          logger.info("Consuming message SQS");
          logger.info(`Simulando envio de email para ${email}`);
          logger.info(`Olá, ${name}`);

          if (message.ReceiptHandle) {
            await sqs.send(
              new DeleteMessageCommand({
                QueueUrl: QUEUE_URL,
                ReceiptHandle: message.ReceiptHandle,
              }),
            );
          }
        }
      }
    }

    setTimeout(poll, 1000);
  } catch (error: any) {
    if (
      error.name === "QueueDoesNotExist" ||
      error.Code === "AWS.SimpleQueueService.NonExistentQueue"
    ) {
      console.warn("Retry Worker...");
      setTimeout(poll, 3000);
    } else {
      console.error("Error:", error);
      setTimeout(poll, 5000);
    }
  }
}

poll();
