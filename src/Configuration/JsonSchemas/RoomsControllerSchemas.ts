const schemas = {
    basicBody: {
        type: 'object',
        properties: {
            Name: {
                type: 'string',
                required: true
            },
            Base: {
                type: 'number',
                required: true
            }
        }
    }
}

export default schemas;