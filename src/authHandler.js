const hapiJWT = require('hapi-auth-jwt2');

const generateAuth = require('./authGenerator').authGenerator;

let sequelize;
let authConfig;
// bring your own validation function
const validate = async (decoded) => {
    const user = await sequelize.models.User.findOne({ where: { id: decoded.id } });
    // do your checks to see if the person is valid
    if (!user) {
        return { isValid: false };
    }

    return { isValid: true };
};

module.exports = async (server, options) => {
    sequelize = options.sequelize;
    authConfig = options.config.authentication;
    /*
    * @api {POST} /{authenticate} Authenticate the user and generate a token.
    *
    * @apiResponse {Object} Access token and user id.
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidX4OSwiZXhwIjoxNTY1MjgxNDg5fQ.gx4Pn3dvv995e7i3L7VwTsdVi_1_CQFmEGVmW1stv-w",
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
            auth: false,
        },
        handler: async (request) => generateAuth(request, options),
    });
    if (authConfig.type === 'JWT') {
        await server.register(hapiJWT);

        server.auth.strategy('jwt', 'jwt',
            {
                key: authConfig.secret,
                validate,
                verifyOptions: { algorithms: ['HS256'] },
            });

        server.auth.default('jwt');
    }
};
