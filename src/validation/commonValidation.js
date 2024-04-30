const MINIMUM_REQUIRED_PASSWORD_LENGTH = 8

export default function commonValidation(values) {
    let errors = {}

    if (!values.email) {
        errors.email = 'Email masih kosong'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Format email tidak sesuai"
    }

    if (!values.password) {
        errors.password = 'Kata Sandi masih kosong'
    } else if (values.password.length < MINIMUM_REQUIRED_PASSWORD_LENGTH) {
        errors.password = `Kata Sandi harus memiliki setidaknya ${MINIMUM_REQUIRED_PASSWORD_LENGTH} karakter`
    }

    return errors
}