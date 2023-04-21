const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
const port = process.env.PORT || 3000;

// SendGridのAPIキーを設定
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

app.use(express.json());
app.use(cors());

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;
  const msg = {
    to,
    from: 'YOUR_FROM_EMAIL_ADDRESS',
    subject,
    text,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.send({ message: 'Email sent successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: 'Error sending email' });
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
