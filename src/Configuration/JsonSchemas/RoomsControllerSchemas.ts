const schemas = {
    basicBody: {
        type: 'object',
        properties: {
            Name: {
                type: 'string',
                required: true
            },
            BaseID: {
                type: 'number',
                required: true
            },
            EventID: {
                type: 'number',
                required: true
            }
        }
    }
}

export default schemas;