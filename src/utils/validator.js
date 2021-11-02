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

    // Exact length validation (работает не корректно - надо поправить)
    exactLength: function(phrase, validationSchema, errors) {
        console.log('Validation schema length in exactLangth func: ', validationSchema.length);
        console.log('Phrase length: ', phrase.length);
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
                
                if (typeof key === 'object') {
                    const customKeys = Object.keys(validationSchema[key]);
                    for (let customKey of customKeys) {

                        validationResult = validationSchema.custom[customKey].test(phrase);
    
                        if (!validationResult) {
                            validationResult = errors.symbols;
                            return validationResult;
                        } else {
                            continue;
                        };
                    };
                } else {
                    validationResult = validationSchema[key].test(phrase);
    
                    if (!validationResult) {
                        validationResult = errors.symbols;
                        return validationResult;
                    } else {
                        return false;
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