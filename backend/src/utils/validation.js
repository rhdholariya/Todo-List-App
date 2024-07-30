const Joi = require('joi');
const todoSchema = Joi.object({
    task: Joi.string().trim().min(1).optional().messages({
        'string.base': 'task must be a string',
        'string.empty': 'task is required',
        'string.min': 'Task must be at least 1 character long',
        'any.required': 'task is required'
    }),
    isCompleted: Joi.boolean().optional(),
});
module.exports = todoSchema;
