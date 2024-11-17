const sgMail = require('@sendgrid/mail');

//API KEY de SendGrid: jQ92-p3JSI6kOmGA5fHOyQ.L1qFOe10-bKTeF1yI_Eb8aWZypIPXCy4LLPPkfJrH5U, agregar el SG. al inicio

sgMail.setApiKey('');

module.exports = sgMail;