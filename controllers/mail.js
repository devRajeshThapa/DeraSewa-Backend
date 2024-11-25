const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.VERIFICATION_EMAIL,
    pass: process.env.VERIFICATION_EMAIL_APP_PASS,
  },
});

const registerUserOTPMail = async (userData) => {
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: {
        name: "DeraSewa",
        address: process.env.VERIFICATION_EMAIL,
      },
      to: `${userData.email}`, // list of receivers
      subject: "User Verification", // Subject line
      html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">DeraSewa</a>
    </div>
    <p style="font-size:1.1em">Dear, ${userData.firstName} ${userData.lastName}</p>
    <p>Thank you for choosing DeraSewa. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${userData.OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />DeraSewa</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>DeraSewa</p>
      <p>Maitidevi, Kathmandu</p>
    </div>
  </div>
</div>
            `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};

const accountCreatedNotification = async (userData) => {
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: {
        name: "DeraSewa",
        address: process.env.VERIFICATION_EMAIL,
      },
      to: `${userData.email}`, // list of receivers
      subject: "Notification", // Subject line
      html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">DeraSewa</a>
    </div>
    <p style="font-size:1.1em">Dear, ${userData.firstName} ${userData.lastName}</p>
    <p>Welcome to DeraSewa, You have successfully created your account on DeraSewa. Now You can now find rooms according to your requirements and can host your own rooms as well. Thank you for choosing DeraSewa.</p>
    <p style="font-size:0.9em;">Regards,<br />DeraSewa</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>DeraSewa</p>
      <p>Maitidevi, Kathmandu</p>
    </div>
  </div>
</div>
            `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};

const loginAlert = async (userData) => {
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: {
        name: "DeraSewa",
        address: process.env.VERIFICATION_EMAIL,
      },
      to: `${userData.email}`, // list of receivers
      subject: "Security Alert", // Subject line
      html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">DeraSewa</a>
    </div>
    <p style="font-size:1.1em">Dear, ${userData.firstName} ${userData.lastName}</p>
    <p>We have noticed a new login to your account from DeraSewa. If this was you, there's nothing to worry about. If you did not authorize this login, please change your account password ASAP.</p>
    <p style="font-size:0.9em;">Regards,<br />DeraSewa</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>DeraSewa</p>
      <p>Maitidevi, Kathmandu</p>
    </div>
  </div>
</div>
            `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};

const accountDeletedNotification = async (userData) => {

    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: {
                name: "DeraSewa",
                address: process.env.VERIFICATION_EMAIL
            },
            to: `${userData.email}`, // list of receivers
            subject: "Notification", // Subject line
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">DeraSewa</a>
    </div>
    <p style="font-size:1.1em">Dear, ${userData.firstName} ${userData.lastName}</p>
    <p>Your DeraSewa account has been deleted permanently as per your request. Now you are no longer a part of DeraSewa community and all the information we have collected from you will not be tracked from now on as they are removed permanently and cannot be recovered. Thank you for being part of DeraSewa.</p>
    <p style="font-size:0.9em;">Regards,<br />DeraSewa</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>DeraSewa</p>
      <p>Maitidevi, Kathmandu</p>
    </div>
  </div>
</div>
            `, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);
}

const passwordChangedAlert = async (userData) => {

    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: {
                name: "DeraSewa",
                address: process.env.VERIFICATION_EMAIL
            },
            to: `${userData.email}`, // list of receivers
            subject: "Security Alert", // Subject line
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">DeraSewa</a>
    </div>
    <p style="font-size:1.1em">Dear, ${userData.firstName} ${userData.lastName}</p>
    <p>We have noticed your account password has been changed from your account on DeraSewa. If this was you, there's nothing to worry about. If you did not authorize this activity, please change your account password ASAP.</p>
    <p style="font-size:0.9em;">Regards,<br />DeraSewa</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>DeraSewa</p>
      <p>Maitidevi, Kathmandu</p>
    </div>
  </div>
</div>
            `, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);
}

const passwordChangeOTPMail = async(userData)=>{
  async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: {
                name: "DeraSewa",
                address: process.env.VERIFICATION_EMAIL
            },
            to: `${userData.email}`, // list of receivers
            subject: "User Verification", // Subject line
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">DeraSewa</a>
    </div>
    <p style="font-size:1.1em">Dear, ${userData.firstName} ${userData.lastName}</p>
    <p>Thank you for choosing DeraSewa. Use the following OTP to change your password. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${userData.OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />DeraSewa</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>DeraSewa</p>
      <p>Maitidevi, Kathmandu</p>
    </div>
  </div>
</div>
            `, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);
}


module.exports = {
  registerUserOTPMail,
  accountCreatedNotification,
  loginAlert,
  accountDeletedNotification,
  passwordChangeOTPMail,
  passwordChangedAlert,
};
