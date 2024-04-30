import commonValidation from "./commonValidation"


export default function loginValidation(values) {
    return {
        ...commonValidation(values)
    }
}