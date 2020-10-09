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
        birthYear: {
            required: "שדה חובה",
            validate: (value) => !Number.isNaN(Number(value)) || "שנה לא תקינה",
        },
    }

    return rules
}