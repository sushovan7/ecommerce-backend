export const welcomeEmail = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      background-color: #4caf50;
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
      color: #555555;
    }
    .content h2 {
      color: #333333;
    }
    .button {
      display: inline-block;
      background-color: #4caf50;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888888;
      margin-top: 20px;
    }
    .footer a {
      color: #4caf50;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Welcome to BuyNova!</h1>
    </div>
    <div class="content">
      <h2>Hello [Recipient's Name],</h2>
      <p>
      We’re thrilled to have you on board! Thank you for joining BuyNova. Whether you’re here to discover amazing deals, shop for your favorite products, or explore the latest trends, we’re here to make your shopping experience seamless and enjoyable every step of the way.
      </p>
      <p>
        To get started, click the button below and explore your new dashboard:
      </p>
      <p style="text-align: center;">
        <a href="[Your Link Here]" class="button">Get Started</a>
      </p>
      <p>
        If you have any questions or need assistance, feel free to reply to this email or visit our 
        <a href="[Support Link]">Support Center</a>.
      </p>
      <p>
        Welcome aboard, and let’s make amazing things happen together!
      </p>
      <p>Best regards,</p>
      <p><strong>Sushovan Bhattarai</strong><br>BuyNova</p>
    </div>
    <div class="footer">
      <p>
        If you didn't sign up for this account, please <a href="[Contact Link]">contact us</a>.
      </p>
    </div>
  </div>
</body>
</html>
`;
