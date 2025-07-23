import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const data = {
    projectType: formData.get('projectType'),
    supportType: formData.get('supportType'),
    donationFixedAmount: formData.get('donationFixedAmount'),
    otherAmount: formData.get('otherAmount'),
    donationType: formData.get('donationType'),
  };

  // const response = NextResponse.redirect(new URL('/donate', req.url));
  const response = NextResponse.json({ success: true });
  
  response.cookies.set('donationData', JSON.stringify(data), {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 300, // 5 minutes
  });

  return response;
}
