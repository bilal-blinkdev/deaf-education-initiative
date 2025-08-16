'use server';

import sgMail, { MailDataRequired } from '@sendgrid/mail';

type EmailProps = {
  to: string;
  templateName: 'userDetailsSubmission';
  dynamicTemplateData: Record<string, string>;
};

const templates = {
  userDetailsSubmission: 'd-0f21fa15b68a495f89c0e14e6d7016ee',
};

export const sendEmail = async ({ to, templateName, dynamicTemplateData }: EmailProps) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  console.log('to', to);
  console.log('email', dynamicTemplateData);

  const msg: MailDataRequired = {
    to,
    from: { email: 'noreply@blinkco.xyz', name: 'User Details' },
    // subject: 'Sending with Twilio SendGrid is Fun',
    templateId: templates[templateName],
    dynamicTemplateData,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};
