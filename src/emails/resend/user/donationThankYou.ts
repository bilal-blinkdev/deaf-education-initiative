export function donationThankYouTemplate(data: any) {
  // Determine the final amount. 'amount' is from paymentDetails,
  // 'otherAmount' and 'donationFixedAmount' are from donationDetails.
  const finalAmount = data.amount || data.otherAmount || data.donationFixedAmount || '0';

  // Create a full name, fallback to "Donor"
  const fullName =
    data.firstName || data.lastName
      ? `${data.firstName || ''} ${data.lastName || ''}`.trim()
      : 'Donor';

  // Determine if we should show state and city separately or combined
  const showSeparateStateCity = data.state && data.city && data.state !== data.city;

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-R" />
      <title>Thank You for Your Donation!</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f7f7f7; color: #333;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f7f7f7; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background-color: #004aad; color: #ffffff; padding: 25px 30px; text-align: left;">
                  <!-- New Header -->
                  <h1 style="margin: 0; font-size: 20px; font-weight: bold;">Hello ${fullName},</h1>
                  <p style="margin: 5px 0 0; font-size: 16px;">Thank you for your contribution to Deaf Reach</p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 30px 20px; font-size: 15px; line-height: 1.6;">
                  
                  <p>Here are the details of your contribution:</p>

                  <!-- New Details Table -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px; line-height: 1.8; margin-top: 20px; margin-bottom: 25px; border: 1px solid #eee;">
                    <tr style="background-color: #f9f9f9;">
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;" width="35%"><strong>Name:</strong></td>
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${fullName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;" width="35%"><strong>Email:</strong></td>
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.email || 'N/A'}</td>
                    </tr>
                    ${
                      data.phoneNumber
                        ? `
                    <tr style="background-color: #f9f9f9;">
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;" width="35%"><strong>Phone:</strong></td>
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.phoneNumber}</td>
                    </tr>`
                        : ''
                    }
                    ${
                      data.country
                        ? `
                    <tr>
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;" width="35%"><strong>Country:</strong></td>
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.country}</td>
                    </tr>`
                        : ''
                    }
                    ${
                      showSeparateStateCity
                        ? `
                    ${
                      data.state
                        ? `
                    <tr style="background-color: #f9f9f9;">
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;" width="35%"><strong>State:</strong></td>
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.state}</td>
                    </tr>`
                        : ''
                    }
                    ${
                      data.city
                        ? `
                    <tr>
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;" width="35%"><strong>City:</strong></td>
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.city}</td>
                    </tr>`
                        : ''
                    }`
                        : `
                    ${
                      data.state || data.city
                        ? `
                    <tr style="background-color: #f9f9f9;">
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;" width="35%"><strong>City/State:</strong></td>
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.state || data.city}</td>
                    </tr>`
                        : ''
                    }`
                    }
                    <tr style="background-color: #f9f9f9;">
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;" width="35%"><strong>Donation Amount:</strong></td>
                      <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><strong>£${finalAmount}</strong></td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 12px;" width="35%"><strong>Donation Details:</strong></td>
                      <td style="padding: 8px 12px;">${data.projectType || 'N/A'}</td>
                    </tr>
                  </table>
                  
                  <p>With gratitude,</p>
                  <p>Team Deaf Education Initiative</p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f0f0f0; padding: 20px; text-align: left; font-size: 12px; color: #666; line-height: 1.6;">
                  
                  <p style="margin: 0;">
                    Deaf Education Initiative (DEI) is a registered charity under the UK Charity Commission (Charity Number: 1209822). Donations made to Deaf Education Initiative are eligible for tax relief in the UK, where applicable. You will receive an official receipt by email from Deaf Education Initiative for your contribution.
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
}
