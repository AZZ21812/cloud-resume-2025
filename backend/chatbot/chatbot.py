import json
import boto3

# Initialize Bedrock client
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

def handler(event, context):
    """
    Lambda handler for AI chatbot using Amazon Bedrock (Claude 3.5 Sonnet).
    Answers questions about Amanuel Z. Alemu's resume.
    """
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    try:
        # CORS preflight
        if event.get('requestContext', {}).get('http', {}).get('method') == 'OPTIONS':
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'message': 'CORS OK'})}

        # Parse body
        raw_body = event.get('body', '{}')
        body = json.loads(raw_body) if raw_body else {}
        question = body.get('question', '').strip()

        if not question:
            return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Question is required'})}

        # System prompt
        system_prompt = """You are an AI assistant helping visitors learn about Amanuel Z. Alemu's professional background.
Answer professionally and concisely. If something is not in the resume, politely say you don't have that information."""

        # Bedrock request (Messages API format for Claude 3.5 Sonnet)
        bedrock_request = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 500,
            "system": system_prompt,
            "messages": [
                {"role": "user", "content": question}
            ]
        }

        # Invoke Bedrock model
        response = bedrock.invoke_model(
            modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
            contentType='application/json',
            body=json.dumps(bedrock_request)
        )

        # Parse response
        response_body = json.loads(response['body'].read())
        # Messages API returns content as an array with text blocks
        content = response_body.get('content', [])
        answer = content[0].get('text', '') if content else ''

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'question': question,
                'answer': answer,
                'model': 'claude-3-5-sonnet'
            })
        }

    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        print("Lambda error:", str(e))
        print("Full traceback:", error_trace)
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Failed to process request', 'message': str(e)})
        }
