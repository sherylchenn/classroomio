import { render } from 'svelte-email';
import { json } from '@sveltejs/kit';
import { getSendgrid, SENDGRID_FROM } from '$lib/utils/services/sendgrid';
import { getSupabase } from '$lib/utils/functions/supabase';

import { sendEmail } from '$lib/utils/services/notification/send';

const sendgrid = getSendgrid();
const supabase = getSupabase();

export async function POST({ request }) {
  const { to, name } = await request.json();
  const accessToken = request.headers.get('Authorization');
  console.log('/POST api/email/welcome', to, name);

  if (!to || !name) {
    return json({ success: false, message: 'Name and To are required fields' }, { status: 400 });
  }

  let user;
  try {
    const { data } = await supabase.auth.getUser(accessToken);
    user = data.user;
  } catch (error) {
    console.error(error);
  }

  if (!user) {
    return json({ success: false, message: 'Unauthenticated user' }, { status: 401 });
  }

  await sendEmail({
    to,
    subject: 'Thank you so so so much for choosing ClassroomIO!',
    content: `
    <p>Dear ${name},</p>
      <p>My name is Best the CEO of ClassroomIO and I will personally like to welcome to the vibrant community of ClassroomIO!</p>
      <p>
        We're thrilled to have you join us in shaping the future of education. Your decision to embark on
        this journey with us is deeply appreciated, and we're genuinely excited about the possibilities
        that lie ahead.
      </p>
      <p>
        Once again, welcome to the ClassroomIO family. We're here to help, to listen, and to celebrate
        your successes. Get ready to unlock a world of possibilities in education!
      </p>
      <p>
        If you have any question or face any issues just send me an email best@classroomio.com 😃
      </p>
      <div>
        <a href="https://app.classroomio.com">Go to Dashboard</a>
      </div>
    `
  });

  return json({
    success: true,
    message: 'Email sent'
  });
}
