import commonValidation from "./commonValidation"

const MINIMUM_REQUIRED_NAME_LENGTH = 3

export default function registerValidation(values) {
    let errors = {
        ...commonValidation(values)
    }

    if (!values.name) {
        errors.name = 'Nama masih kosong'
    } else if (values.name.length < MINIMUM_REQUIRED_NAME_LENGTH) {
        errors.name = `Nama harus memiliki setidaknya ${MINIMUM_REQUIRED_NAME_LENGTH} karakter`
    }

    return errors
}