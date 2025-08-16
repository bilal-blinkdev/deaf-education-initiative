import { NextResponse } from "next/server";
import { sendEmail } from "@/app/lib/email/sendgrid/send";

export async function POST(req: Request) {
  const body = await req.json();

  await sendEmail({
    to: body.to,
    templateName: body.templateName,
    dynamicTemplateData: body.dynamicTemplateData,
  });

  return NextResponse.json({ success: true });
}
