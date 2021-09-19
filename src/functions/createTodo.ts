import { APIGatewayProxyHandler } from 'aws-lambda'
import { document } from '../database/dynamodbClient'
import dayjs from 'dayjs'

interface IToDo {
    id: string
    title: string
    deadline: Date
}

export const handle: APIGatewayProxyHandler = async(event) => {
    const { id, title, deadline } = JSON.parse(event.body) as IToDo
    const { user_id } = event.pathParameters

    await document.put({
        TableName: 'users_certificates',
        Item: {
            id,
            user_id,
            title,
            deadline: dayjs(deadline).format('DD/MM/YYYY'),
            done: false
        }
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'toDo saved',
            title
        })
    }
}