import { Resend } from 'resend';
// import DonationUserDetailsEmail from '@/emails/resend/DonationUserDetails';
import { donationUserDetailsTemplate } from '@/emails/resend/company/donationUserDetails';
import { donationThankYouTemplate } from '@/emails/resend/user/donationThankYou';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();

  try {
    // 2. Email to company
    const companyTemplate = donationUserDetailsTemplate(body.data);
    const { data, error } = await resend.emails.send({
      from: 'Deaf Reach UK <noreply@deiuk.org>',
      to: ['hassan.ahmed@fesf.org.pk', 'faysal.soomro@fesf.org.pk'],
      subject: 'Donation Received',
      // react: <DonationUserDetailsEmail {...body.data} />,
      html: companyTemplate,
    });

    // 2. Email to donor
    if (body.data.email) {
      const donorTemplate = donationThankYouTemplate(body.data);
      const { data, error } = await resend.emails.send({
        from: 'Deaf Reach UK <noreply@deiuk.org>',
        to: body.data.email,
        subject: 'Thank You for Your Donation',
        html: donorTemplate,
      });

      if (error) {
        console.error(error);
        return Response.json({ error }, { status: 500 });
      }
    }
    if (error) {
      console.error(error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
