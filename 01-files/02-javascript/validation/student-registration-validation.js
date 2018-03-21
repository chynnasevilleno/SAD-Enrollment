$("#studentProfile").validate()({
    rules: {
        firstName: {
            required: true,
            pattern: "^[a-zA-Z_]*$"
        }
        //       midName: "required",
        //       lastName: "required",
        //       birthplace: "required",
        //       dob: "required",
        //       gender: "required"
    },
    messages: {
        firstName: {
            required: "Please enter your first name",
            pattern: "Please enter your name:"

        }
    }
});