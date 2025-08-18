export function donationUserDetailsTemplate(data: any) {
  console.log(data);

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>New Donation Received</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f7f7f7; color: #333;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f7f7f7; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background-color: #004aad; color: #ffffff; padding: 20px; text-align: center;">
                  <h1 style="margin: 0; font-size: 22px;">🎉 New Donation Received</h1>
                  <p style="margin: 5px 0 0; font-size: 14px;">A user has successfully made a donation. Here are the details:</p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 20px;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px; line-height: 1.6;">
                    <tr><td width="30%"><strong>First Name:</strong></td><td>${data.firstName}</td></tr>
                    ${data.lastName ? `<tr><td><strong>Last Name:</strong></td><td>${data.lastName}</td></tr>` : ''}
                    ${data.email ? `<tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>` : ''}
                    ${data.phoneNumber ? `<tr><td><strong>Phone:</strong></td><td>${data.phoneNumber}</td></tr>` : ''}
                    ${data.country ? `<tr><td><strong>Country:</strong></td><td>${data.country}</td></tr>` : ''}
                    ${data.state ? `<tr><td><strong>State:</strong></td><td>${data.state}</td></tr>` : ''}
                    ${data.city ? `<tr><td><strong>City:</strong></td><td>${data.city}</td></tr>` : ''}
                    ${data.address ? `<tr><td><strong>Address:</strong></td><td>${data.address}</td></tr>` : ''}
                    ${data.zipCode ? `<tr><td><strong>Zip Code:</strong></td><td>${data.zipCode}</td></tr>` : ''}
                    ${data.comments ? `<tr><td><strong>Comments:</strong></td><td>${data.comments}</td></tr>` : ''}
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                  Deaf Reach Initiative © ${new Date().getFullYear()} <br/>
                  This is an automated notification for internal use only.
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
