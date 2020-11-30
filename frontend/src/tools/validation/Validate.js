class Validate {

    CONFIG_FUNCTIONS = {
        "no_spaces": this.checkSpaces,
        "no_caps": this.checkCaps,
        "is_email": this.checkEmail,
        "max_length": this.checkLengthLong,
        "min_length": this.checkLengthShort,
        "needs_num": this.checkNumbers,
        "needs_special": this.checkSpecial,
        "needs_caps": this.checkNumCaps,
    }

    constructor() {
        this.fields = {}
        this.config_dictionary = {}
    }

    addBaseField(name, config) {
        this.fields[name] = "";
        this.config_dictionary[name] = config;
    }

    validate(name, value) {
        let config = this.config_dictionary[name];
        for (var param in config) {
            let checkFunction = this.CONFIG_FUNCTIONS[param];
            let error_string = checkFunction(value, config[param]);
            if (error_string !== "valid") {
               return error_string; 
            }
        }
        
        return "valid"
    } 


    checkSpaces() {

        return "valid"
    }

    checkCaps() {
        return "valid"

    }

    checkEmail() {
        return "valid"
    }

    checkNumCaps(number) {

        return "valid"
    }

    checkLengthLong(value, max) {
        if (value.length > max) return "too long"

        return "valid"
    }

    checkLengthShort(value, min) {
        if (value.length > min) return "too short"

        return "valid"
    }

    checkNumbers() {

        return "valid"
    }

    checkSpecial() {

        return "valid"
    }

}

export default Validate;