import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key");

export async function sendWelcomeEmail(toEmail: string, tempPassword: string, clientName: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: toEmail,
      subject: "Welcome to your Secure Digital Vault",
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #032b4e;">Welcome to Shantanu & Associates</h2>
          <p style="color: #475569; font-size: 16px;">Dear ${clientName},</p>
          <p style="color: #475569; font-size: 16px;">
            Your secure client portal has been provisioned successfully. You can now log in to upload documents, track work progress, and communicate directly with our team.
          </p>
          <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #059669; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #1e293b;">Your Temporary Login Credentials:</p>
            <p style="margin: 10px 0 0 0; color: #475569;">Email: <strong>${toEmail}</strong></p>
            <p style="margin: 5px 0 0 0; color: #475569;">Password: <strong>${tempPassword}</strong></p>
          </div>
          <p style="color: #475569; font-size: 14px;">
            <em>Note: You will be required to change this password immediately upon your first login to ensure the security of your financial data.</em>
          </p>
          <a href="http://ld9lmhwfryjdvsaopzuedtd4.187.127.150.158.sslip.io/login" style="display: inline-block; background-color: #059669; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; margin-top: 15px;">
            Access Secure Portal
          </a>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Email Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Resend API Error:", error);
    return { success: false, error };
  }
}

export async function sendAdminNotificationEmail(enquiry: { name: string, email: string, phone?: string, serviceRequested?: string, message: string }) {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ketanwrites@gmail.com",
      subject: `New Lead: ${enquiry.name} (${enquiry.serviceRequested || 'General'})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #032b4e; margin-bottom: 5px;">New Enquiry Received</h2>
          <p style="color: #475569; font-size: 14px; margin-top: 0;">A new lead has submitted the contact form on the website.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 120px;"><strong>Name:</strong></td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 500;">${enquiry.name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 500;"><a href="mailto:${enquiry.email}">${enquiry.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Phone:</strong></td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 500;">${enquiry.phone || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Service:</strong></td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 500;">${enquiry.serviceRequested || 'General Inquiry'}</td>
              </tr>
            </table>
          </div>
          
          <h3 style="color: #334155; margin-bottom: 8px; font-size: 15px;">Message Details:</h3>
          <div style="background-color: #ffffff; border: 1px solid #cbd5e1; padding: 15px; border-radius: 6px; color: #475569; font-size: 14px; white-space: pre-wrap;">${enquiry.message}</div>
          
          <div style="margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://ld9lmhwfryjdvsaopzuedtd4.187.127.150.158.sslip.io'}/admin/enquiries" style="display: inline-block; background-color: #032b4e; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; font-size: 14px;">
              View in Dashboard
            </a>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Admin Alert Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Resend API Error:", error);
    return { success: false, error };
  }
}
