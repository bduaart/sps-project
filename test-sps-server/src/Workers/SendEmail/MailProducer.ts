import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqs } from "../SqsClient";
import { logger } from "../../Utils/Logger";

const QUEUE_URL = "http://localstack:4566/000000000000/email-queue";

type EmailPayload = {
  name: string;
  email: string;
};

export const MailProducer = {
  async sendWelcomeEmail(payload: EmailPayload) {
    const command = new SendMessageCommand({
      QueueUrl: QUEUE_URL,
      MessageBody: JSON.stringify(payload),
    });

    await sqs.send(command);

    logger.info(`Sending message SQS Mail Producer Queue to ${payload.email}`);
  },
};
