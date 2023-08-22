# remember.me
A web server that reminds you when birthdays are!

# Known Problems
Gotta start Doccumentation right with problems!
1: when generating the js from the typescript sendReminderEmail.ts will have 

    `const transporter = nodemailer.createTransport`

Is turned into

    `var transporter = nodemailer_1.default.createTransport`

This crashes the program as default doesn't exist, I am currently manually deleting it.