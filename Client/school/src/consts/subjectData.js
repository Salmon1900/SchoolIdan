export const panel = {
    title: "ניהול מקצועות",
    addButtonLabel: "הוספת מקצוע",
    removeButtonLabel: "מחיקת מקצוע",
    table: {
        title: "רשימת מקצועות",
        columns: [
            {title: 'מס מקצוע', field: 'subject_id'},
            {title: 'שם מקצוע', field: 'subject_name'}
        ],
        dataIdProperty: 'subject_id',
        addLabel: 'הוספת מקצוע',
        removeLabel: 'מחיקת מקצוע'
    },
    addForm: {
        title: "הוספת מקצוע",
        buttonLabel: "הוספה",
        fields: [
            {
                id: "subjectName",
                name: "subjectName",
                label: "מקצוע",
                defaultValue: "",
                width: 12,
                rules: {
                    required: "שדה חובה"
                },
                required: true,
                fullWidth: true, 
            },
        ]
    }
}