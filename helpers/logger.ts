import pino from "pino";

export const parentLogger = pino(
    {
        base: {
            logGroup: process.env.AWS_LAMBDA_LOG_GROUP_NAME,
            logStream: process.env.AWS_LAMBDA_LOG_STREAM_NAME,
            memorySize: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
            region: process.env.AWS_REGION,
            runtime: process.env.AWS_EXECUTION_ENV,
            traceId: process.env._X_AMZN_TRACE_ID,
            version: process.env.AWS_LAMBDA_FUNCTION_VERSION
        },
        level: process.env.LOG_LEVEL || "info",
        name: process.env.AWS_LAMBDA_FUNCTION_NAME || "PIIs",
        prettyPrint: !!process.env.IS_OFFLINE
    },
    {
        write(msg) {
            console.log(msg);
        }
    }
);
