const Boom = require('@hapi/boom');

/**
 * Add Generic routes for all the models created with sequelize
 * 
 * REST standards inspired from https://docs.python-eve.org/en/stable/#
 * 
 * | Method | URL                                        | Description                                                                       |
 * |--------|--------------------------------------------|-----------------------------------------------------------------------------------|
 * | GET    | /model                                     | Get all the records in the model                                                  |
 * | GET    | /model/{id}                                | Get the specific record based on unique ID (pk)                                   |
 * | GET    | /model/?where={"age": 25}                  | Get all the records satisfying the condition                                      |
 * | GET    | /model/?projection={"name":1, "email": 1}  | Get all the records with only with the mentioned fields in the projection as 1.   |
 * | GET    | /model/?projection={'dob':0}               | 0 will exclude them from the field list                                           |
 * | POST   | /model                                     | Will create a new record                                                          |
 * | PUT    | /model/{id}                                | Update the record for the mentioned ID (pk)                                       |
 * | DELETE | /model/{id}                                | Delete the record with the mentioned ID (pk)                                      |
 */


const addBaseRoutes = (server, sequelize) => {
    return (modelName) => {
        /**
         * @api {get} /{model} Get all the records in the model
         * @api {get} /{model}/:id Get the specific record based on unique ID (pk) 
         * @api {get} /{model}/?where={"age": 25} Get all the records satisfying the condition
         * @api {get} /{model}/?projection={"name":1, "email": 1} Get all the records with only with the mentioned fields in the projection as 1
         * @api {get} /{model}/?projection={'dob':0} 0 will exclude them from the field list
         * @apiParam {Number} id Users unique ID.
         *
         * @apiResponse {Object} All fields from the model based on the query params.
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       "firstname": "John",
         *       "lastname": "Doe"
         *     }
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 404 Not Found
         *     {
         *       "error": "UserNotFound"
         *     }
         */
        server.route({
            method: 'GET',
            path: `/${modelName}/{id?}`,
            handler: async (request, h) => {
                const id = request.params.id ? encodeURIComponent(request.params.id) : null;
                const projection = request.query.projection ? JSON.parse(request.query.projection) : null;
                const where = request.query.where ? JSON.parse(request.query.where) : null;

                const options = {};

                // GET: /users/{id}
                if (id) options[`where`] = { id }

                // GET: /users/?projection={"name":1, "email": 1}
                // GET: /users/?projection={"dob":0}
                if (projection) {
                    options.attributes = {};
                    Object.keys(projection).forEach(field => {
                        if (projection[field] === 1) {
                            options.attributes.include = options.attributes.include || [];
                            options.attributes.include.push(field);
                        }
                        if (projection[field] === 0) {
                            options.attributes.exclude = options.attributes.exclude || [];
                            options.attributes.exclude.push(field);
                        }
                    });
                    if (!options.attributes.exclude) {
                        options.attributes = options.attributes.include;
                    }
                }

                // GET: /users/?where={"name":"giri"}
                if (where) {
                    options.where = {};
                    Object.keys(where).forEach(field => {
                        options.where[field] = where[field];
                    });
                }
                try {
                    const records = await sequelize.models[modelName].findAll(options);
                    return records;
                } catch (e) {
                    Boom.badImplementation('server error');
                }
            }
        });


        /*
        * @api {POST} /{model} Will create a new record 
        * @apiRequestExample:
        * {
        *    "firstName":"John",
        *    "lastName":"Doe"
        * }
        * @apiResponse {Object} Created record.
        * 
        * @apiSuccessExample Success-Response:
        *     HTTP/1.1 200 OK
        *     {
        *       "firstname": "John",
        *       "lastname": "Doe"
        *     }
        * @apiErrorExample Error-Response:
        *     HTTP/1.1 400 Bad Request
        *     {
        *       "statusCode": 400,
        *        "error": "Bad Request",
        *        "message": "invalid query"
        *     }
        */
        server.route({
            method: 'POST',
            path: `/${modelName}/`,
            handler: async (request, h) => {
                const data = Object.keys(request.payload).length > 0 ? request.payload : null;
                if (data) {
                    try {
                        const records = await sequelize.models[modelName].create(data);
                        return records;
                    } catch (e) {
                        Boom.badImplementation('server error');
                    }
                } else {
                    return Boom.badRequest('invalid query');
                }
            }
        });


        /*
        * @api {PUT} /{model}/{id} Update the record with the mentioned ID (pk)
        * @apiRequestExample:
        * {
        *    "firstName":"John",
        *    "lastName":"Doe"
        * }
        * @apiResponse {Object} Number of record updated.
        * 
        * @apiSuccessExample Success-Response:
        *     HTTP/1.1 200 OK
        *       {
        *           "rowsAffected": 1
        *       }
        * @apiErrorExample Error-Response:
        *     HTTP/1.1 400 Bad Request
        *     {
        *       "statusCode": 400,
                "error": "Bad Request",
                "message": "invalid query"
        *     }
        */
        server.route({
            method: 'PUT',
            path: `/${modelName}/{id?}`,
            handler: async (request, h) => {
                const data = Object.keys(request.payload).length > 0 ? request.payload : null;
                const id = request.params.id ? encodeURIComponent(request.params.id) : null;
                if (data && id) {
                    try {
                        const records = await sequelize.models[modelName].update(data, { where: { 'id': id } });
                        return { "rowsAffected": records[0] };
                    } catch (e) {
                        Boom.badImplementation('server error');
                    }
                } else {
                    return Boom.badRequest('params not found');
                }
            }
        });


        /*
        * @api {DELETE} /{model}/{id} Delete the record with the mentioned ID (pk)
        *
        * @apiResponse {Object} Number of records deleted.
        * 
        * @apiSuccessExample Success-Response:
        *     HTTP/1.1 200 OK
        *     {
        *       "rowsDeleted": 1
        *      }
        * @apiErrorExample Error-Response:
        *     HTTP/1.1 400 Bad Request
        *     {
        *       "statusCode": 400,
                "error": "Bad Request",
                "message": "params not found"
        *     }
        */
        server.route({
            method: 'DELETE',
            path: `/${modelName}/{id?}`,
            handler: async (request, h) => {
                const id = request.params.id ? encodeURIComponent(request.params.id) : null;
                if (id) {
                    try {
                        const records = await sequelize.models[modelName].destroy({ where: { 'id': id } });
                        return { "rowsDeleted": records };
                    } catch (e) {
                        Boom.badImplementation('server error');
                    }
                } else {
                    return Boom.badRequest('params not found');
                }
            }
        });
    }
};

module.exports = addBaseRoutes;