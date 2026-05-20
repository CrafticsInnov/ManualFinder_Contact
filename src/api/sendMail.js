// src/api/sendMail.js
// Endpoint Express pour envoyer un email via Azure Communication Services

const express = require('express');
const { EmailClient, EmailMessage } = require('@azure/communication-email');
require('dotenv').config();

const router = express.Router();

const connectionString = process.env.AZURE_COMMUNICATION_CONNECTION_STRING;
const senderAddress = process.env.AZURE_EMAIL_SENDER;

router.post('/send-mail', async (req, res) => {
  const { name, company, email, message, role } = req.body;
  if (!name || !email || !message || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
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
      res.json({ success: true });
    } else {
      res.status(500).json({ error: 'Failed to send email', details: result.error });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error sending email', details: err.message });
  }
});

module.exports = router;
