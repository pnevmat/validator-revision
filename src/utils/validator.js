let validationResult = null;
// TODO: разобраться с багом залипания валидации во всех функциях, исправить потерю одного ключа в функции custom
function Validator(phrase, validationSchema, validation) {

    // pattern validations (validations on predefined schemas)
    function email() {
        
        const emailValidationSchema = /@/;

        validationResult = emailValidationSchema.test(phrase);
        if (!validationResult) {
            validationResult = validationSchema.errors.email;
            // console.log('Email validation result: ', validationResult);
            return validationResult;
        } else {
            return false;
        };
    };

    // Min/max phrase length validation
    function minMax() {

        if (validationSchema.length) {
            // console.log('Validation schema length: ', validationSchema.length);
            if (typeof validationSchema.length === 'object') {
                // console.log('Is validation schema length object: ', typeof validationSchema.length);
                // console.log('Phrase length: ', phrase.length);
                if (typeof validationSchema.length.min === 'number' && phrase.length < validationSchema.length.min) {
                    return validationSchema.errors.length.min;
                };
    
                if (typeof validationSchema.length.max === 'number' && phrase.length > validationSchema.length.max) {
                    return validationSchema.errors.length.max;
                };

                return false;
    
            } else {
                return;
            };
        } else {
            return;
        };
    };

    // Exact length validation (работает не корректно - надо поправить)
    function exactLength() {

        if (typeof validationSchema.length === 'number') {
            if (phrase.length < validationSchema.length || phrase.length > validationSchema.length) {
                // console.log('Validation schema length in exactLangth func: ', validationSchema.length);
                // console.log('Phrase length: ', phrase.length);
                validationResult = validationSchema.errors.length;
                return validationResult;
            } else {
                return false;
            };
        } else {
            return;
        };
    };
    
    // Custom validation (put validation Regexp to validation schema)
    function custom() {
        
        const validationSchemaKeys = Object.keys(validationSchema);

        for (let key of validationSchemaKeys) {
            if (key === 'custom') {
                
                if (typeof validationSchema[key] === 'object') {
                    const customKeys = Object.keys(validationSchema[key]);
                    for (let customKey of customKeys) {
                        console.log('Phrase: ', phrase);
                        console.log('Custom key value: ', validationSchema.custom[customKey]);
                        validationResult = validationSchema.custom[customKey].test(phrase);
                        console.log('Validation result: ', validationResult);
                        if (!validationResult) {
                            validationResult = validationSchema.errors.symbols;
                            return validationResult;
                        }
                    };
                } else {
                    validationResult = validationSchema[key].test(phrase);
    
                    if (!validationResult) {
                        validationResult = validationSchema.errors.symbols;
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
    };

    const validationKeys = Object.keys(validation);
    for (let key of validationKeys) {
        if (key === 'email') {
            validationResult = email();
            break;
        } else if (key === 'minMax') {
            validationResult = minMax();
            break;
        } else if (key === 'exactLength') {
            validationResult = exactLength();
            break;
        } else if (key === 'custom') {
            validationResult = custom();
            break;
        } else {
            return;
        }
    };

    return validationResult;
};

export default Validator;