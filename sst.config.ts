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
    // -----------------------------
    // DynamoDB table for visitor counter
    // -----------------------------
    const table = new sst.aws.Dynamo("VisitorCounter", {
      fields: {
        pk: "string",
      },
      primaryIndex: { hashKey: "pk" },
    });

    // -----------------------------
    // Lambda function: Visitor Counter
    // -----------------------------
    const counterApi = new sst.aws.Function("CounterFunction", {
      handler: "cloud_resume_2025/counter_handler.handler",
      runtime: "python3.12",
      url: {
        cors: true,
        authorization: "none",
      },
      link: [table],
      environment: {
        TABLE_NAME: table.name,
      },
    });

    // -----------------------------
    // Lambda function: AI Chatbot (Amazon Bedrock)
    // -----------------------------
   const chatbotApi = new sst.aws.Function("ChatbotFunction", {
        handler: "cloud_resume_2025/chatbot_handler.handler",
        runtime: "python3.12",
        url: {
          cors: true,
          authorization: "none",
        },
        timeout: "30 seconds",
        memory: "1024 MB",
        permissions: [
          {
            actions: ["bedrock:InvokeModel",
              "bedrock:InvokeModelWithResponseStream"
            ], // IAM for Bedrock
            resources: ["*"],
          },
        ],
    });

    // -----------------------------
    // Lambda function: ATS Resume Generator (Amazon Bedrock)
    // -----------------------------
    const atsGeneratorApi = new sst.aws.Function("ATSGeneratorFunction", {
        handler: "cloud_resume_2025/ats_handler.handler",
        runtime: "python3.12",
        url: {
          cors: true,
          authorization: "none",
        },
        timeout: "60 seconds",  // Longer timeout for resume generation
        memory: "1536 MB",       // More memory for larger prompts
        permissions: [
          {
            actions: ["bedrock:InvokeModel",
              "bedrock:InvokeModelWithResponseStream"
            ],
            resources: ["*"],
          },
        ],
    });

    // -----------------------------
    // Return outputs for frontend / other usage
    // -----------------------------
    return {
      tableName: table.name,
      counterUrl: counterApi.url,
      chatbotUrl: chatbotApi.url,
      atsGeneratorUrl: atsGeneratorApi.url,
    };
  },
});
