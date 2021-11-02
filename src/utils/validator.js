let validationResult = null;
// TODO: создать вариант схемы валидации на маленькие буквы
function Validator(phrase, validationSchema, errors) {
    console.log('Phrase in validator: ', phrase);

    // pattern validations (validations on predefined schemas)
    this.email = function() {
        const emailValidationSchema = /@/;

        validationResult = emailValidationSchema.test(phrase);

        if (!validationResult) {
            validationResult = errors.email;
            return validationResult;
        } else {
            return false;
        };
    };

    // Min/max phrase length validation
    if (validationSchema.length) {
        if (typeof validationSchema.length === 'object') {
           
            if (typeof validationSchema.length.min === 'number' && phrase.length < validationSchema.length.min) {
                return errors.length.min;
            };

            if (typeof validationSchema.length.max === 'number' && phrase.length > validationSchema.length.max) {
                console.log('Length max');
                return errors.length.max;
            };

        } else {
            // Exact length validation
            if (phrase.length < validationSchema.length || phrase.length > validationSchema.length) {
                validationResult = errors.length;
                return validationResult;
            };
        };
    };
    
    const validationSchemaKeys = Object.keys(validationSchema);

    // Capital letter, number and symbol validation
    for (let key of validationSchemaKeys) {
        if (key !== 'length') {
            validationResult = validationSchema[key].test(phrase);

            if (!validationResult) {
                validationResult = errors.symbols;
                return validationResult;
            } else {
                continue;
            };
        };
    };

    if (validationResult) {
        validationResult = false;
    }

    return validationResult;
};

export default Validator;