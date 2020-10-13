const baseEnumSchemas = {
    basicBody: {
        type: 'object',
        properties: {
            BaseName: {
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

export default baseEnumSchemas;