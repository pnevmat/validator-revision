let validationResult = null;
// TODO: разобратьс почему одна функция валидации не вызываетс за другой как например map().find() и т.п.
const Validator = {

    // pattern validations (validations on predefined schemas)
    email: function(phrase, validationSchema, errors) {
        
        const emailValidationSchema = /@/;

        validationResult = emailValidationSchema.test(phrase);

        if (!validationResult) {
            validationResult = errors.email;
            return validationResult;
        } else {
            return false;
        };
    },

    // Min/max phrase length validation
    minMax: function(phrase, validationSchema, errors) {
        if (validationSchema.length) {
            if (typeof validationSchema.length === 'object') {
               
                if (typeof validationSchema.length.min === 'number' && phrase.length < validationSchema.length.min) {
                    return errors.length.min;
                };
    
                if (typeof validationSchema.length.max === 'number' && phrase.length > validationSchema.length.max) {
                    return errors.length.max;
                };
    
            } else {
                return;
            };
        } else {
            return;
        };
    },

    // Exact length validation
    exactLength: function(phrase, validationSchema, errors) {
        if (typeof validationSchema.length === 'number') {
            if (phrase.length < validationSchema.length || phrase.length > validationSchema.length) {
                validationResult = errors.length;
                return validationResult;
            } else {
                return false;
            };
        } else {
            return;
        };
    },
    
    // Custom validation (put validation Regexp to validation schema)
    custom: function(phrase, validationSchema, errors) {
        const validationSchemaKeys = Object.keys(validationSchema);

        for (let key of validationSchemaKeys) {
            if (key === 'custom') {

                for (let customKey of key) {

                    validationResult = validationSchema.custom[customKey].test(phrase);

                    if (!validationResult) {
                        validationResult = errors.symbols;
                        return validationResult;
                    } else {
                        continue;
                    };
                };

            } else {
                continue;
            };
        };

        if (validationResult) {
            validationResult = false;
        };
    }
};

export default Validator;