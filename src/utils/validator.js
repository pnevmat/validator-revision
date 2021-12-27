// Проблемма залипания и опаздывания значений из инпута для валидатора в использовании useState в реакте

let validationResult = null;
let isValidEmail = null;
let isValidMinMax = null;
let isValidExactLength = null;
let isValidCustom = null;

console.log('Validation result announcement: ', validationResult);
// DONE:
    // исправлена проблемма невозможности валидации по более чем 2 параметрам путем добавления в
        // каждую функцию вызова следующей по очереди валидации если такая есть 
    // исправлена ошибка периодического проскакивания ошибки валидации пароля после того как он стал валидным 
        // и пользователь продолжает набор
// TODO: 
    // Adapt validator for React:
        // исправить: Проблеммy залипания и опаздывания значений из инпута для валидатора в использовании useState в реакте
        // исправить: Проблемму опаздывания useState в реакте дл вывода ошибки валидации сразу после того как длинна фразы стала валидной
function validator(phrase, validationSchema, validation) {

    // pattern validations (validations on predefined schemas)
    function email() {
        
        const emailValidationSchema = /@/;

        validationResult = emailValidationSchema.test(phrase);
        if (!validationResult) {
            validationResult = validationSchema.errors.email;

            isValidEmail = false;
            isValidMinMax = true;
            isValidExactLength = true;
            isValidCustom = true;
            console.log('Email validation result: ', validationResult);
            return validationResult;
        } else {
            isValidEmail = true;
            isValidMinMax = false;
            isValidExactLength = false;
            isValidCustom = false;

            return validationResult = false;
        };
    };

    // Min/max phrase length validation
    function minMax(otherValidation=null) {
        if (validationSchema.length) {
            if (typeof validationSchema.length === 'object') {
                console.log('Phrase length: ', phrase.length);
                if (typeof validationSchema.length.min === 'number' && phrase.length < validationSchema.length.min) {
                    isValidEmail = true;
                    isValidMinMax = false;
                    isValidExactLength = true;
                    isValidCustom = true;
                    
                    return validationResult = validationSchema.errors.length.min;
                };
    
                if (typeof validationSchema.length.max === 'number' && phrase.length > validationSchema.length.max) {
                    isValidEmail = true;
                    isValidMinMax = false;
                    isValidExactLength = true;
                    isValidCustom = true;

                    return validationResult = validationSchema.errors.length.max;
                };

                isValidMinMax = true;
                if (otherValidation && otherValidation.find(key => key !== 'minMax')) {
                    // console.log('Other validation started');

                    const newValidation = otherValidation.filter(key => key !== 'minMax');

                    for (let key of newValidation) {
                        if (key === 'email') {
                            if (isValidEmail) {continue};
                            email();
                            break;
                        } else if (key === 'exactLength') {
                            if (isValidExactLength) {continue};
                            exactLength(newValidation);
                            break;
                        } else if (key === 'custom') {
                            // console.log('custom condition mached');
                            // console.log('Min max Is valid custom: ', isValidCustom);
                            if (isValidCustom) {continue};
                            custom(newValidation);
                            break;
                        } else {
                            return;
                        };
                    };

                    isValidEmail = false;
                    isValidExactLength = false;
                    isValidCustom = false;
                } else if (Object.keys(validation).find(key => key !== 'minMax') && isValidMinMax) {
                    const newValidation = Object.keys(validation).filter(key => key !== 'minMax');

                    isValidEmail = false;
                    isValidExactLength = false;
                    isValidCustom = false;

                    for (let key of newValidation) {
                        if (key === 'email') {
                            if (isValidEmail) {continue};
                            email();
                            break;
                        } else if (key === 'exactLength') {
                            if (isValidExactLength) {continue};
                            exactLength(newValidation);
                            break;
                        } else if (key === 'custom') {
                            // console.log('In isValidMinMax custom condition mached');
                            // console.log('Min max Is valid custom: ', isValidCustom);
                            if (isValidCustom) {continue};
                            // console.log('Min max custom validation function return value: ', custom(newValidation));
                            custom(newValidation);
                            break;
                        } else {
                            return;
                        };
                    };
                }

                return validationResult = false;
    
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
                validationResult = validationSchema.errors.length;

                isValidEmail = true;
                isValidMinMax = true;
                isValidExactLength = false;
                isValidCustom = true;

                return validationResult;
            } else {
                isValidEmail = false;
                isValidMinMax = false;
                isValidExactLength = true;
                isValidCustom = false;

                return validationResult = false;
            };
        } else {
            return;
        };
    };
    
    // Custom validation (put validation Regexp to validation schema)
    function custom(otherValidation=null) {
        // console.log('Custom validation started');
        const validationSchemaKeys = Object.keys(validationSchema);

        for (let key of validationSchemaKeys) {
            if (key === 'custom') {
                
                if (typeof validationSchema[key] === 'object') {
                    const customKeys = Object.keys(validationSchema[key]);
                    for (let customKey of customKeys) {
                        validationResult = validationSchema.custom[customKey].test(phrase);
                        // console.log('Custom Validation result: ', validationResult);
                        if (!validationResult) {
                            validationResult = validationSchema.errors.symbols;
                            // console.log('Custom Validation result changed to error: ', validationResult);
                            isValidEmail = true;
                            isValidMinMax = true;
                            isValidExactLength = true;
                            isValidCustom = false;

                            return validationResult;
                        };

                        isValidCustom = true;
                        if (otherValidation && otherValidation.find(key => key !== 'custom')) {
                                const newValidation = otherValidation.filter(key => key !== 'custom');

                                for (let key of newValidation) {
                                    if (key === 'email') {
                                        if (isValidEmail) {continue};
                                        email();
                                        break;
                                    } else if (key === 'minMax') {
                                        if (isValidMinMax) {continue};
                                        minMax(newValidation);
                                        break;
                                    } else if (key === 'exactLength') {
                                        if (isValidExactLength) {continue};
                                        exactLength(newValidation);
                                        break;
                                    } else {
                                        return;
                                    };
                                };

                            isValidEmail = false;
                            isValidMinMax = false;
                            isValidExactLength = false;
                        } else if (Object.keys(validation).find(key => key !== 'custom') && isValidCustom) {
                            const newValidation = Object.keys(validation).filter(key => key !== 'custom');

                                for (let key of newValidation) {
                                    if (key === 'email') {
                                        if (isValidEmail) {continue};
                                        email();
                                        break;
                                    } else if (key === 'minMax') {
                                        if (isValidMinMax) {continue};
                                        minMax(newValidation);
                                        break;
                                    } else if (key === 'exactLength') {
                                        if (isValidExactLength) {continue};
                                        exactLength(newValidation);
                                        break;
                                    } else {
                                        return;
                                    };
                                };

                            isValidEmail = false;
                            isValidMinMax = false;
                            isValidExactLength = false;
                        };
                    };
                } else {
                    validationResult = validationSchema[key].test(phrase);
    
                    if (!validationResult) {
                        validationResult = validationSchema.errors.symbols;

                        isValidEmail = true;
                        isValidMinMax = true;
                        isValidExactLength = true;
                        isValidCustom = false;

                        return validationResult;
                    }

                    isValidCustom = true;
                    if (otherValidation && otherValidation.find(key => key !== 'custom')) {
                        console.log('Other validation started');

                            const newValidation = otherValidation.filter(key => key !== 'custom');

                            for (let key of newValidation) {
                                if (key === 'email') {
                                    if (isValidEmail) {continue};
                                    email();
                                    break;
                                } else if (key === 'minMax') {
                                    console.log('minMax condition mached');
                                    console.log('is valid min max: ', isValidMinMax);
                                    if (isValidMinMax) {continue};
                                    minMax(newValidation);
                                    break;
                                } else if (key === 'exactLength') {
                                    if (isValidExactLength) {continue};
                                    exactLength(newValidation);
                                    break;
                                } else {
                                    return;
                                };
                            };

                        isValidEmail = false;
                        isValidMinMax = false;
                        isValidExactLength = false;
                    } else if (Object.keys(validation).find(key => key !== 'custom') && isValidCustom) {
                        const newValidation = Object.keys(validation).filter(key => key !== 'custom');

                            for (let key of newValidation) {
                                if (key === 'email') {
                                    if (isValidEmail) {continue};
                                    email();
                                    break;
                                } else if (key === 'minMax') {
                                    console.log('minMax condition mached');
                                    console.log('is valid min max: ', isValidMinMax);
                                    if (isValidMinMax) {continue};
                                    minMax(newValidation);
                                    break;
                                } else if (key === 'exactLength') {
                                    if (isValidExactLength) {continue};
                                    exactLength(newValidation);
                                    break;
                                } else {
                                    return;
                                };
                            };

                        isValidEmail = false;
                        isValidMinMax = false;
                        isValidExactLength = false;
                    };
                };

            } else {
                continue;
            };
        };
    };

    const validationKeys = Object.keys(validation);
    for (let key of validationKeys) {
        if (key === 'email') {
            if (isValidEmail) {continue};
            email();
            break;
        } else if (key === 'minMax') {
            console.log('minMax condition mached');
            console.log('is valid min max: ', isValidMinMax);
            if (validationSchema.length.max && phrase.length > validationSchema.length.max) {isValidMinMax = false}
            if (isValidMinMax && phrase.length < validationSchema.length.min) {isValidMinMax = false}
            if (isValidMinMax) {continue};
            minMax();
            break;
        } else if (key === 'exactLength') {
            if (isValidExactLength) {continue};
            exactLength();
            break;
        } else if (key === 'custom') {
            console.log('custom condition mached');
            console.log('Is valid custom: ', isValidCustom);
            if (isValidCustom) {continue};
            custom();
            break;
        } else {
            return;
        };
    };

    return validationResult;
};

export default validator;