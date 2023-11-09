const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = process.env.PORT || 3000;

// Initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require("./vivvv");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());
app.post('/send-notification', (req, res) => {
  const { deviceToken } = req.body;
  const message = {
    data: {
      title: 'New Message',
      body: 'You have a new message!',
    },
    token: deviceToken,
  };
  admin.messaging().send(message)
    .then((response) => {
      console.log('Notification sent successfully:', response);
      res.status(200).send('Notification sent successfully');
    })
    .catch((error) => {
      console.error('Error sending notification:', error);
      res.status(500).send('Error sending notification');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
