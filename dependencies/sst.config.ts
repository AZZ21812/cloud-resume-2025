/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "cloud-resume-2025",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    // DynamoDB table for visitor counter
    const table = new sst.aws.Dynamo("VisitorCounter", {
      fields: {
        pk: "string",
      },
      primaryIndex: { hashKey: "pk" },
    });

    // Lambda function for visitor counter
    const counterApi = new sst.aws.Function("CounterFunction", {
      handler: "backend/counter/index.handler",
      runtime: "python3.13",
      url: true,
      link: [table],
      environment: {
        TABLE_NAME: table.name,
      },
    });

    // Lambda function for AI chatbot (Bedrock)
    const chatbotApi = new sst.aws.Function("ChatbotFunction", {
      handler: "backend/chatbot/index.handler",
      runtime: "python3.13",
      timeout: "30 seconds",
      url: true,
      permissions: [
        {
          actions: ["bedrock:InvokeModel"],
          resources: ["*"],
        },
      ],
    });

    return {
      counterUrl: counterApi.url,
      chatbotUrl: chatbotApi.url,
      tableName: table.name,
    };
  },
});