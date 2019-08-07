const addBaseRoutes = require('./src/baseRoutes');
const handleAuth = require('./src/authHandler');
const generateAuth = require('./src/authGenerator');

const register = async (server, options) => {
    if (!options.sequelize || !options.sequelize.models) {
        throw new Error("Not a valid sequelize instance. check https://sequelize.org.");
    }
    Object.keys(options.sequelize.models).forEach(addBaseRoutes(server, options.sequelize));
    /*
    * @api {POST} /{authenticate} Authenticate the user and generate a token.
    *
    * @apiResponse {Object} Access token and user id.
    * 
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJ0ZXN0aW5nIiwic2NvcGUiOiJhZG1pbiIsImlhdCI6MTU2NTE5NTA4OSwiZXhwIjoxNTY1MjgxNDg5fQ.gx4Pn3dvv995e7i3L7VwTsdVi_1_CQFmEGVmW1stv-w",
    *       "id": 9
    *     }
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 400 Bad Request
    *     {
    *        "statusCode": 401,
    *        "error": "Unauthorized",
    *        "message": "invalid username/password"
    *      }
    */
    server.route({
        method: 'POST',
        path: '/authenticate',
        config: {
            auth: false
        },
        handler: async (request, h) => {
            return await generateAuth(request);
        }
    });

    // Handle JWT authentication
    await handleAuth(server);
};

const baseRoutes = {
    register,
    name: 'hapi-sequelize-restify'
};

module.exports = baseRoutes;  