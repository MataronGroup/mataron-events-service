const schemas = {
    basicBody: {
        type: 'object',
        properties: {
            Name: {
                type: 'string',
                required: true
            },
            ArenaID: {
                type: 'number',
                required: true
            }
        }
    }
}

export default schemas;