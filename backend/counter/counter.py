import json
import os
import boto3
from decimal import Decimal

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('TABLE_NAME')
table = dynamodb.Table(table_name)

# Custom JSON encoder to handle Decimal types
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return int(obj)
        return super(DecimalEncoder, self).default(obj)

def handler(event, context):
    """
    Lambda handler for visitor counter.
    Increments and returns the visitor count stored in DynamoDB.
    """
    # CORS headers
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    try:
        # Handle OPTIONS request for CORS preflight
        if event.get('requestContext', {}).get('http', {}).get('method') == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'message': 'CORS preflight successful'})
            }

        # Increment visitor count using atomic counter
        response = table.update_item(
            Key={'pk': 'visitor-count'},
            UpdateExpression='ADD #count :inc',
            ExpressionAttributeNames={'#count': 'count'},
            ExpressionAttributeValues={':inc': 1},
            ReturnValues='UPDATED_NEW'
        )

        # Get the updated count
        count = response['Attributes']['count']

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'count': count,
                'message': 'Visitor count updated successfully'
            }, cls=DecimalEncoder)
        }

    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        print(f"Error: {str(e)}")
        print(f"Full traceback: {error_trace}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'error': 'Failed to update visitor count',
                'message': str(e)
            })
        }
