import { APIGatewayProxyHandler } from "aws-lambda"

import { document } from "../database/dynamodbClient"

export const handle: APIGatewayProxyHandler = async (event) => {
    const { id } = event.pathParameters

    const todos = await document.query({
        TableName: 'todos',
        KeyConditionExpression: 'user_id = :id',
        ExpressionAttributeValues: {
            ':id': id
        }
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'All ToDos',
            todos: todos.Items
        })
    }
}