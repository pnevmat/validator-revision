let validationResult = null;
// TODO: создать вариант валидации емейла и схемы валидации на маленькие буквы
const validator = (phrase, validationSchema, errors) => {

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

export default validator;