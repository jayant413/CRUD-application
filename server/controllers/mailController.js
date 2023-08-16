const nodemailer = require("nodemailer");
const { google } = require("googleapis");



const CLIENT_ID = "324941370313-gg0e667pu9k7becad363pm2kqbcdu6p6.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//04eaFDEPqfuS4CgYIARAAGAQSNwF-L9IrE-wKhVHA2oMH9ek8VS3z3elTyVCnTSMcDnoaWIQbc6OTa7pa-fCgH-5PxquwYiG5Sec";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const MY_EMAIL = "dummyxyz2611@gmail.com";


const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);


oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports.sendMail = async (req, res) => {
    const { selectedDetails, sendEmailTo } = req.body;
    const ACCESS_TOKEN = await oAuth2Client.getAccessToken();

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: MY_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: ACCESS_TOKEN,
            },
            tls: {
                rejectUnauthorized: true,
            },
        });

        const tableRows = selectedDetails.map(person => `
    <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${person.name}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${person.email}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${person.number}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${person.hobbies.join(', ')}</td>
    </tr>
`).join('');

        const info = await transporter.sendMail({
            from: '"Jayant Sawarkar " <dummyxyz2611@gmail.com>',
            to: `${sendEmailTo}`,
            subject: 'CRUD application user details from Jayant Sawarkar', // Subject line
            text: 'This is a test email sent from Nodemailer.',
            html: `<table style="border-collapse: collapse; width: 100%; border: 1px solid #ddd;">
            <thead style="background-color: #f2f2f2;">
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Name</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Email</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Mobile</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Hobbies</th>
                </tr>
            </thead>
            <tbody>
               ${tableRows}
            </tbody>
        </table>`       })
        res.status(200).json({
            message: 'Email sent successfully',
            success: true,
            info: info,
            messageID: info.messageId
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
            success: false
        })
    }
}


module.exports.checkMail = async (req, res) => {
    const { selectedDetails } = req.body;

    try {
        res.status(200).json({
            message: 'Email sent successfully',
            success: true,
            info: selectedDetails
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
            success: false
        })
    }
}