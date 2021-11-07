const {google} = require('googleapis');
const nodemailer = require("nodemailer");

class MailService{
   constructor(){
      // this.name = req.body.name;
      this.CLIENT_ID='748279439100-pg6t01mol7fualmcr45obp4qljb4cbog.apps.googleusercontent.com';
      this.CLIENT_SECRET='Mg5iXE1hvML0uL94K-xpP0Ri';
      this.REDIRECT_URI='https://developers.google.com/oauthplayground';
      this.REFRESH_TOKEN='1//04q8Rp8-zGBtUCgYIARAAGAQSNwF-L9IrcwytPPbMu1U8uZDV6kBtUpMhodyulk1yleUOgpZyOAQ2znlblD4MQAAYE7YH_ezzLSE';
      
      this.oAuth2Client = new google.auth.OAuth2(this.CLIENT_ID, this.CLIENT_SECRET, this.REDIRECT_URI);
      this.oAuth2Client.setCredentials({refresh_token: this.REFRESH_TOKEN});

   }
   async smtpTransport() {
    const accessToken = await this.oAuth2Client.getAccessToken();
    return nodemailer.createTransport({
          service: "gmail",
          auth: {
              type: 'OAuth2',
              user: "junrey.gonzales.07@gmail.com",
              clientId: this.CLIENT_ID,
              clientSecret: this.CLIENT_SECRET,
              refreshToken: this.REFRESH_TOKEN,
              accessToken: accessToken
              
          }
      }); 
   }

   async send({from, to, subject, message}) {      
      
        const smtpTransport = await this.smtpTransport();

        const mailOptions = {
            from: from,
            to: to, 
            subject: subject || 'Password',
            html: message
          }

        return smtpTransport.sendMail(mailOptions);
   }
}

module.exports = new MailService;