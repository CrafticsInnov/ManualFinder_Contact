// Azure Function: api/send-mail/index.js
// Envoi d'email via Azure Communication Services

const { EmailClient } = require('@azure/communication-email');

module.exports = async function (context, req) {
  const connectionString = process.env["AZURE_COMMUNICATION_CONNECTION_STRING"];
  const senderAddress = process.env["AZURE_EMAIL_SENDER"];

  if (req.method !== 'POST') {
    context.res = {
      status: 405,
      body: { error: 'Method not allowed' }
    };
    return;
  }

  const { name, company, email, message, role } = req.body || {};
  if (!name || !email || !message || !role) {
    context.res = {
      status: 400,
      body: { error: 'Missing required fields' }
    };
    return;
  }

  const client = new EmailClient(connectionString);
  const emailMessage = {
    senderAddress,
    content: {
      subject: `[ManualFinder Contact] ${role.toUpperCase()} - ${name}`,
      plainText: `Role: ${role}\nName: ${name}\nCompany: ${company || 'N/A'}\nEmail: ${email}\n\nMessage:\n${message}`,
    },
    recipients: {
      to: [
        { address: senderAddress, displayName: 'ManualFinder Contact' },
      ],
    },
    replyTo: [{ address: email, displayName: name }],
  };

  try {
    const poller = await client.beginSend(emailMessage);
    const result = await poller.pollUntilDone();
    if (result.status === 'Succeeded') {
      context.res = { status: 200, body: { success: true } };
    } else {
      context.res = { status: 500, body: { error: 'Failed to send email', details: result.error } };
    }
  } catch (err) {
    context.res = { status: 500, body: { error: 'Error sending email', details: err.message } };
  }
};
