export default function productValidation(values) {
    let errors = {}

    if (!values.name) {
        errors.name = 'Nama harus di isi'
    }

    if (!values.subtitle) {
        errors.subtitle = "Judul harus di isi"
    }

    // if (!values.twitter) {
    //     errors.twitter = 'Username Twitter harus di isi'
    // }

    if (!values.url) {
        errors.url = 'Link wajib di isi'
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = 'Link tidak valid'
    }

    if (!values.description) {
        errors.description = 'Deskripsi wajib di isi'
    }

    // if(!values.tags){
    //     errors.tags = "Define at least 2 tags"
    // }

    return errors
}