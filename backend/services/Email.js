import transporter from "../config/emailConfig.js";

// Invia email di benvenuto
const sendWelcomeEmail = async (author) => {
  const mailOptions = {
    from: '"Strive Blog" <strive@blog.com>',
    to: author.email,
    subject: 'Welcome to Strive Blog!',
    text: `Hello, ${author.name}, welcome to Strive Blog!`,
    html: `<p>Hello, ${author.name}, welcome to Strive Blog!</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email di benvenuto inviata');
  } catch (error) {
    console.error('Errore nell\'invio della mail di benvenuto:', error);
  }
};

// Invia email di notifica post pubblicato
const sendPostPublishedEmail = async (author, blogPost) => {
  const mailOptions = {
    from: '"Strive Blog" <strive@blog.com>',
    to: author.email,
    subject: 'You have published a new post!',
    text: `Your post "${blogPost.title}" has been successfully published!`,
    html: `<p>Your post "${blogPost.title}" has been successfully published!</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email di notifica post pubblicato inviata');
  } catch (error) {
    console.error('Errore nell\'invio della mail di post pubblicato:', error);
  }
};

export { sendWelcomeEmail, sendPostPublishedEmail };
