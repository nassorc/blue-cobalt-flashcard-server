const buildMakeUser = ({ isEmail, passwordSchema, encryptPassword }) => {
    return async function makeUser({
        email,
        password,
        firstName = "",
        lastName = "",
        userType = "",
        biography = "",
        userPhoto = "",
    }) {
        if(!isEmail(email)) {
            throw new Error('Invalid email')
        }
        const isPasswordvalid = passwordSchema.validate(password)
        if(!isPasswordvalid) {
            throw new Error('Invalid Password')
        }

        // encrypt password
        const encryptedPassword = await encryptPassword(password, 10)

        return Object.freeze({
            getEmail: () => email,
            getPassword: () => encryptedPassword,
            getFirstName: () => firstName,
            getLastName: () => lastName,
            getUserType: () => userType,
            getBiography: () => biography,
            getUserPhoto: () => userPhoto
        })
    }
}

module.exports = buildMakeUser