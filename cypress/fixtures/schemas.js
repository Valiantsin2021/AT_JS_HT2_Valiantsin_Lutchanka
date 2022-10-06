exports.uploadResponseSchema = {
    "type": "object",
    "required": ['name', 'path_lower', 'path_display', 'id', 'client_modified', 'server_modified', 'rev', 'size', 'is_downloadable', 'content_hash'],
    "properties":  {
        "name": {
            "type": "string",
        },
        "path_lower": {
            "type": "string",
        },
        "path_display": {
            "type": "string",
        },
        "id": {
            "type": "string",
        },
        "client_modified": {
            "type": "string",
        },
        "server_modified": {
            "type": "string",
        },
        "rev": {
            "type": "string",
        },
        "size": {
            "type": "number",
        },
        "is_downloadable": {
            "type": "boolean",
        },
        "content_hash": {
            "type": "string",
        }
    }
}

exports.getMetadataResponseSchema = {
    "type": "object",
    "required": ['.tag', 'name', 'path_lower', 'path_display', 'id', 'client_modified', 'server_modified', 'rev', 'size', 'is_downloadable', 'content_hash'],
    "properties":  {
        ".tag": {
            "type": "string",
        },
        "name": {
            "type": "string",
        },
        "path_lower": {
            "type": "string",
        },
        "path_display": {
            "type": "string",
        },
        "id": {
            "type": "string",
        },
        "client_modified": {
            "type": "string",
        },
        "server_modified": {
            "type": "string",
        },
        "rev": {
            "type": "string",
        },
        "size": {
            "type": "number",
        },
        "is_downloadable": {
            "type": "boolean",
        },
        "content_hash": {
            "type": "string",
        }
    }
}

exports.deleteSchema = {
    "type": "object",
    "properties": {
        "metadata": {
            "type": "object",
            "properties": {
                ".tag": {
                    "type": "string",
                },
                    "name": {
                    "type": "string",
                },
                    "path_lower": {
                    "type": "string",
                },
                "path_display": {
                    "type": "string",
                },
                "id": {
                    "type": "string",
                },
                "client_modified": {
                    "type": "string",
                },
                "server_modified": {
                    "type": "string",
                },
                "rev": {
                    "type": "string",
                },
                "size": {
                    "type": "number",
                },
                "is_downloadable": {
                    "type": "boolean",
                },
                "content_hash": {
                    "type": "string",
                }
            }
        }
    },
}