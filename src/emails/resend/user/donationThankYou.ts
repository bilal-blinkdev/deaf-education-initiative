export function donationThankYouTemplate(data: any) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Thank You for Your Donation</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f7f7f7; color: #333;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f7f7f7; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background-color: #004aad; color: #ffffff; padding: 20px; text-align: center;">
                  <h1 style="margin: 0; font-size: 22px;">🙏 Thank You!</h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 20px; text-align: center; font-size: 16px; line-height: 1.6;">
                  <p>Dear ${data.firstName},</p>
                  <p>Thank you for your generous donation 💙</p>
                  <p>Your support helps us continue our mission.</p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                  Deaf Reach Initiative © ${new Date().getFullYear()}
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
