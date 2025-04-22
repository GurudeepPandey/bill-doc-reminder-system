import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;


const client = twilio(accountSid, authToken);

export default async function sendMessage(to, body) {
  try {
    await client.messages.create({
      body,
      from: twilioNumber,
      to
    });
  } catch (error) {
    console.error('Twilio send error:', error.message);
  }
}
