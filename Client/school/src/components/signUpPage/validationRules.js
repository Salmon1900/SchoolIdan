import { validate } from "@material-ui/pickers";

export const getRules = (values) => {
    let rules = {
        id: {
            required: "שדה חובה",
            minLength: {
                value: 9,
                message: "יש להזין 9 תווים"
            },
            maxLength: {
                value: 9,
                message: "יש להזין 9 תווים"
            },
        },
        firstName: {
            required: "שדה חובה"
        },
        lastName: {
            required: "שדה חובה"
        },
        dateOfBirth: {
            required: "שדה חובה"
        },
        password: {
            required: "שדה חובה",
            minLength: {
                value: 6,
                message: "על הסיסמה להיות באורך 6 תווים לפחות"
            },
        },
        repeat: {
            required: "שדה חובה",
            // validate: (value) => value === values.password || "סיסמאות לא תואמות"
        }
    }

    return rules
}