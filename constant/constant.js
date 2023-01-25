'use strict'

module.exports = {
	responseObj: {
		'status': 500,
		'message': 'Internal Server Error',
		'body': {}
	},
	errorFileNotFound: {
		'status': 404,
		'message': 'PDF file not found',
		'body': {}
	},
	httpResponseStatusCode: {
		SUCCESS: 200,
		ENTITY_CREATED: 201,
		BAD_REQUEST: 400,
		FILE_NOT_FOUND: 404,
		INTERNAL_SERVER_ERROR: 500
	},
	databaseStatus: {
		ENTITY_CREATED: 'Entity created',
		ENTITY_MODIFIED: 'Entity modified',
		ENTITY_DELETED: 'Entity deleted',
		ENTITY_FETCHED: 'Entity fetched',
		ENTITY_NOT_FOUND: 'Entity not found',
		DATABASE_ERROR: 'Database error',
		DATABASE_CONNECTION_ESTABLISHED: 'Database Connection Established',
		ERP_DATABASE_CONNECTION_NOT_ESTABLISHED: 'ERP Database Connection Error',
		WRITE_IN_ENTITY: 'Write in entity successfully'
	},
	serviceStatus: {
		DATA_NOT_FOUND: 'Data not found',
		DATA_INVALID: 'Data invalid',
		INTERNAL_SERVER_ERROR: 'Internal server error',
		USER_AUTHENTICATED_SUCCESSFULLY: 'User authenticated successfully',
		USER_SUCCESSFULLY_CREATED: 'User created successfully',
		USER_EXIST: 'User is exist',
		ORDER_SUCCESSFULLY_CREATED: 'Order successfully created',
		USER_LIST_FETCHED: 'User successfully fetched',
		ORDER_LIST_FETCHED: 'Order successfully fetched',
		ORDER_UPDATED: 'Order successfully Updated'
	},
	controllerStatus: {
		BAD_REQUEST: 'Required fields missing',
		ACCESS_NOT_ALLOWED: 'Access not allowed',
		TOKEN_MISSING: 'Token missing from header',
		INVALID_TOKEN: 'Invalid Token'
	},
	serviceHelperStatus: {
		OPERATION_SUCCESSFULLY_EXECUTED: 'Operation executed successfully'
	}
}
