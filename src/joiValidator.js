const Joi = require('@hapi/joi');
const dataType = require('./dataTypes');
exports.joiValidator = (sequelize, modelName) => {
    let validate = {};
    const attributes = sequelize.models[modelName].tableAttributes;
    Object.keys(attributes).forEach((key) => {
        if (key != "createdAt" && key != "updatedAt" && key != "id") {
            let type = attributes[key].type.key;
            let joitype = dataType[type];
            validate[key] = Joi[joitype]().required();
        }
    });
    validate = Joi.object().keys(validate);
    return validate;
}
