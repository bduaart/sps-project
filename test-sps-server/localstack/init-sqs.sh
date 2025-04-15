#!/bin/bash

echo "Create email-queue SQS"
awslocal sqs create-queue --queue-name email-queue