// Проблемма залипания и опаздывания значений из инпута для валидатора в использовании useState в реакте

let validationResult = null;
let isValidEmail = null;
let isValidMinMax = null;
let isValidExactLength = null;
let isValidCustom = null;

console.log('Validation result announcement: ', validationResult);
// TODO: 
    // исправить: проблемму невозможности валидировать один инпут по более 2-м параметрам изза того что функция 
                // валидатора объвлена и переменные isValid так же объвлены и обновятся только при перерендере приложения а 
                // обновить их в функции валидатора невозможно так как это сделает невозможным валидацию по нескольким 
                // параметрам(условие запуска функции валидации по параметру будет зацыклено на первом параметре валидации)
    //  исправить: отставание валидации от ввода пользователя когда идет валидация по 2 и более параметрам
function Validator(phrase, validationSchema, validation) {

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
    function minMax() {
        if (validationSchema.length) {
            // console.log('Validation schema length: ', validationSchema.length);
            if (typeof validationSchema.length === 'object') {
                // console.log('Is validation schema length object: ', typeof validationSchema.length);
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
                if (Object.keys(validation).find(key => key !== 'minMax')) {
                    console.log('minMax other valids nulling started');
                    isValidEmail = null;
                    isValidExactLength = null;
                    isValidCustom = null;
                } else {
                    isValidEmail = false;
                    isValidExactLength = false;
                    isValidCustom = false;
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
                // console.log('Validation schema length in exactLangth func: ', validationSchema.length);
                // console.log('Phrase length: ', phrase.length);
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
    function custom() {
        
        const validationSchemaKeys = Object.keys(validationSchema);

        for (let key of validationSchemaKeys) {
            if (key === 'custom') {
                
                if (typeof validationSchema[key] === 'object') {
                    const customKeys = Object.keys(validationSchema[key]);
                    for (let customKey of customKeys) {
                        // console.log('Phrase: ', phrase);
                        // console.log('Custom key value: ', validationSchema.custom[customKey]);
                        validationResult = validationSchema.custom[customKey].test(phrase);
                        // console.log('Validation result: ', validationResult);
                        if (!validationResult) {
                            validationResult = validationSchema.errors.symbols;

                            isValidEmail = true;
                            isValidMinMax = true;
                            isValidExactLength = true;
                            isValidCustom = false;

                            return validationResult;
                        };

                        isValidEmail = false;
                        isValidMinMax = false;
                        isValidExactLength = false;
                        isValidCustom = true;
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
                    } else {
                        isValidEmail = false;
                        isValidMinMax = false;
                        isValidExactLength = false;
                        isValidCustom = true;

                        return validationResult = false;
                    };
                };

            } else {
                continue;
            };
        };

        // if (validationResult) {
        //     validationResult = false;
        // };
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
            if (isValidMinMax) {continue};
            minMax();
            break;
        } else if (key === 'exactLength') {
            if (isValidExactLength) {continue};
            exactLength();
            break;
        } else if (key === 'custom') {
            console.log('custom condition mached');
            if (isValidCustom) {continue};
            custom();
            break;
        } else {
            return;
        };
    };

    return validationResult;
};

export default Validator;