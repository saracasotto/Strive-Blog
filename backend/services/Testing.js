import transporter from "../config/emailConfig.js";

const sendTestEmail = async () => {
    try {
      const info = await transporter.sendMail({
        from: '"Test Sender" <test@example.com>', 
        to: 'recipient@example.com', 
        subject: 'Test Email', 
        text: 'Ciao a tutti.', 
        html: '<p>Ciao a tutti</p>', 
      });
  
      console.log('Email sent:', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  sendTestEmail(); 
