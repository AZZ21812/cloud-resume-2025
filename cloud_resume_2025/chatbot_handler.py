import json
import boto3
from cloud_resume_2025.resume_data import get_formatted_resume

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

        # Get formatted resume data
        resume_data = get_formatted_resume()

        # System prompt with resume data
        system_prompt = f"""You are an AI assistant helping visitors learn about Amanuel Z. Alemu's professional background.

Here is the complete resume information:

{resume_data}

Answer questions professionally and concisely based on the resume above. If something is not in the resume, politely say you don't have that information."""

        # Try Amazon Nova Premier for better long-form content generation
        # Nova Premier is Amazon's most capable model and handles longer outputs well
        bedrock_request = {
            "messages": [
                {"role": "user", "content": [{"text": system_prompt + "\n\n" + question}]}
            ],
            "inferenceConfig": {
                "maxTokens": 16000,
                "temperature": 0.7
            }
        }

        # Invoke Bedrock model with Amazon Nova Premier
        response = bedrock.invoke_model(
            modelId='amazon.nova-premier-v1:0',
            contentType='application/json',
            body=json.dumps(bedrock_request)
        )

        # Parse response (Nova Premier format)
        response_body = json.loads(response['body'].read())

        # Nova Premier returns output in this format
        output = response_body.get('output', {})
        message = output.get('message', {})
        content = message.get('content', [])
        answer = content[0].get('text', '') if content else ''

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'question': question,
                'answer': answer,
                'model': 'amazon-nova-premier'
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
