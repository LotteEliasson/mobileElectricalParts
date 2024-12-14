
//imports the express module
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer')
require('dotenv').config();


//Creates an application instance app
const app = express();

app.use(cors({
  origin: '*',  // Allow requests from any origin
  methods: ['GET', 'POST'],  // Allow only necessary methods
}));

// All files in public folder handled by Express as static files - html accessible through urls.
app.use(express.static('public'));

// Middleware that automatically parse incoming requests to JSON
app.use(express.json());

// Basic route - if no express.static defined this can handle access to html.
app.get('/', (req, res) => {
  res.send('Hello, You!');  
});

// API route to handle sending email
app.post('/api/send-email', async (req, res) => {
  const { to, users, message, component_id, username, userEmail, componentName, componentDescription, componentItemId } = req.body;  // Destructure the incoming data

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Your Gmail email address
      pass: process.env.EMAIL_PASS,  // The 16-character App Password
    },
    logger: true,  // Enable detailed logging
    debug: true    // Enable debug mode
  });
  
 
 
  // Create a transporter object using SMTP service (for example, Gmail)
  // let transporter = nodemailer.createTransport({
  //  host: "sandbox.smtp.mailtrap.io",
  //  port: 2525,
  //  auth: {
  //    user: "b069c232e6a900",
  //    pass: "1c5658631dbd71"
  //  }
  // });
  
  // Define the email options (to, subject, text)
  let mailOptions = {
    from: process.env.EMAIL_USER,   // Sender address
    to: to,                        // Recipient address (from the request)
    subject: `New Order for Component: ${componentName}`,  // Subject
    text: `User Id: ${users} \n\nUser Name: ${username} \n\nUser Email: ${userEmail} \n\nComponent Id: ${component_id} \n\nComponent Name: ${componentName} \n\nComponent Description: ${componentDescription} \n\nComponent Item Id: ${componentItemId} \n\nMessage: ${message} `,          // Email message body
  };

  try {
    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    // Send a success response back to the client
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email: ', error);

    // Send an error response back to the client
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
