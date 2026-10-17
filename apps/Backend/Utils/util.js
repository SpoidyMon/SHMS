export function generateSecureOtp() {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);

    return (100000 + (array[0] % 900000)).toString();
}

export function getOtpHtml(otp) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Your OTP Code</h2>
        <p class="otp">${otp}</p>
        <p>Please use this code to verify your email address.</p>
    </div>
</body>
</html>`;
}

export const staffInviteTemplate = (inviteLink, role) => {
    return `
    < !DOCTYPE html >
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Staff Invitation</title>
            </head>

            <body style="
      margin: 0;
      padding: 0;
      background-color: #f4f5f7;
      font-family: Arial, Helvetica, sans-serif;
    ">

                <table
                    role="presentation"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    style="background-color: #f4f5f7; padding: 40px 12px;"
                >
                    <tr>
                        <td align="center">

                            <table
                                role="presentation"
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                                style="
                max-width: 560px;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
              "
                            >

                                <!-- Header -->
                                <tr>
                                    <td style="
                  background-color: #fe4c4d;
                  padding: 28px 24px;
                  text-align: center;
                ">
                                        <h1 style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 26px;
                    font-weight: 700;
                  ">
                                            SMHS
                                        </h1>

                                        <p style="
                    margin: 8px 0 0;
                    color: #ffffff;
                    font-size: 14px;
                  ">
                                            Smart Management &amp; Hospitality System
                                        </p>
                                    </td>
                                </tr>

                                <!-- Email Content -->
                                <tr>
                                    <td style="padding: 36px 30px 24px;">

                                        <h2 style="
                    margin: 0 0 16px;
                    color: #1f2937;
                    font-size: 23px;
                    line-height: 1.4;
                  ">
                                            You're Invited to Join Our Team!
                                        </h2>

                                        <p style="
                    margin: 0 0 16px;
                    color: #4b5563;
                    font-size: 15px;
                    line-height: 1.8;
                  ">
                                            Hello,
                                        </p>

                                        <p style="
                    margin: 0 0 20px;
                    color: #4b5563;
                    font-size: 15px;
                    line-height: 1.8;
                  ">
                                            You've been invited to join our team on SMHS.
                                            Your assigned role is:
                                        </p>

                                        <!-- Assigned Role -->
                                        <div style="
                    margin: 0 0 24px;
                    padding: 16px;
                    background-color: #fff5f5;
                    border: 1px solid #fecaca;
                    border-radius: 8px;
                    text-align: center;
                  ">
                                            <p style="
                      margin: 0 0 6px;
                      color: #6b7280;
                      font-size: 12px;
                      text-transform: uppercase;
                      letter-spacing: 1px;
                    ">
                                                Assigned Role
                                            </p>

                                            <p style="
                      margin: 0;
                      color: #fe4c4d;
                      font-size: 20px;
                      font-weight: 700;
                    ">
                                                ${role}
                                            </p>
                                        </div>

                                        <p style="
                    margin: 0 0 24px;
                    color: #4b5563;
                    font-size: 15px;
                    line-height: 1.8;
                  ">
                                            Click the button below to accept your invitation
                                            and complete your staff account setup.
                                        </p>

                                        <!-- Invitation Button -->
                                        <table
                                            role="presentation"
                                            cellspacing="0"
                                            cellpadding="0"
                                            border="0"
                                            align="center"
                                            style="margin: 0 auto 24px;"
                                        >
                                            <tr>
                                                <td
                                                    align="center"
                                                    bgcolor="#fe4c4d"
                                                    style="border-radius: 8px;"
                                                >
                                                    <a
                                                        href="${inviteLink}"
                                                        target="_blank"
                                                        style="
                            display: inline-block;
                            padding: 15px 32px;
                            color: #ffffff;
                            text-decoration: none;
                            font-size: 15px;
                            font-weight: 700;
                            border-radius: 8px;
                          "
                                                    >
                                                        Accept Invitation
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Fallback Link -->
                                        <p style="
                    margin: 0 0 12px;
                    color: #6b7280;
                    font-size: 13px;
                    line-height: 1.7;
                  ">
                                            If the button doesn't work, copy and paste this
                                            link into your browser:
                                        </p>

                                        <p style="
                    margin: 0 0 24px;
                    padding: 12px;
                    background-color: #f9fafb;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                    overflow-wrap: anywhere;
                    font-size: 13px;
                    line-height: 1.7;
                  ">
                                            <a
                                                href="${inviteLink}"
                                                target="_blank"
                                                style="color: #fe4c4d; text-decoration: underline;"
                                            >
                                                ${inviteLink}
                                            </a>
                                        </p>

                                        <!-- Security Notice -->
                                        <div style="
                    padding: 16px;
                    background-color: #fff7ed;
                    border-left: 4px solid #f59e0b;
                    border-radius: 4px;
                  ">
                                            <p style="
                      margin: 0;
                      color: #92400e;
                      font-size: 13px;
                      line-height: 1.7;
                    ">
                                                <strong>Security Notice:</strong>
                                                This invitation is intended only for the
                                                recipient. Please do not share this link with
                                                anyone else. If you weren't expecting this
                                                invitation, you can safely ignore this email.
                                            </p>
                                        </div>

                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="
                  padding: 22px 24px;
                  background-color: #f9fafb;
                  border-top: 1px solid #e5e7eb;
                  text-align: center;
                ">
                                        <p style="
                    margin: 0 0 8px;
                    color: #6b7280;
                    font-size: 12px;
                    line-height: 1.6;
                  ">
                                            This is an automated email from SMHS.
                                            Please do not reply to this message.
                                        </p>

                                        <p style="
                    margin: 0;
                    color: #9ca3af;
                    font-size: 12px;
                  ">
                                            &copy; ${new Date().getFullYear()} SMHS.
                                            All rights reserved.
                                        </p>
                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>
                </table>

            </body>
        </html>
`;
};