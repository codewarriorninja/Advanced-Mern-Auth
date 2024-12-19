import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { client, sender } from "./mailtrap.config.js"


export const sendVerificationEmail = async(email, verificationToken) => {
    const recipient = [{email}];

    try {
        const response = await client.send({
            from:sender,
            to:recipient,
            subject:'Verify Your email',
            html:VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
            category:'Email Verification'
        });
        console.log('Email sent successfully', response)
    } catch (error) {
        console.log(`error sending verification`, error)
        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail = async(email, name) => {
   const recipient =[ {email} ]

   try {
    await client.send({
        from:sender,
        to:recipient,
        template_uuid:"507c2bab-c4bb-49fb-a067-f26bc5166c58",
        template_variables:{
      "company_info_address": "Addis Ababa",
      "company_info_city": "Addis Ababa",
      "company_info_zip_code": "1100",
      "company_info_country": "Ethiopia",
      "company_info_name":"Little Tech",
      "name":name
        }
    });
   } catch (error) {
    throw new Error(`Error sending welcome email: ${error}`)
   }
}

export const sendPasswordResetEmail = async(email, resetURL) => {
  const recipient =[{email}]

  try {
    const response = await client.send({
     from:sender,
     to:recipient,
     subject:'Reset Your Password',
     html:PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
     category:'Password Reset',
    });

    console.log('reset password send successfully', response)
  } catch (error) {
    console.log('Error sending password reset email', error);
    throw new Error(`Error sending password reset email: ${error}`)
  }
}

export const sendRestSuccessEmail = async(email) => {
    const recipient =[{email}]

    try {
       const response = await client.send({
        from:sender,
        to:recipient,
        subject:'Password Reset Successful',
        html:PASSWORD_RESET_SUCCESS_TEMPLATE,
        category:'Password reset',
       });
       console.log('Password reset email sent successfully', response)
    } catch (error) {
        throw new Error(`Error sending password reset success email: ${error}`);
    }
}