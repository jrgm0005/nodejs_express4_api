var nodemailer = require('nodemailer');

exports.sendEmail = function(req, res){
  // get needed post data
  var user = req.body.user;
  var pass = req.body.pass;
  var from = req.body.from;
  var to = req.body.to;
  var subject = req.body.subject;
  var text = req.body.text;
  var service = req.body.service || "Gmail";

  // configure transporter (which sent the email)
  var transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: user,
      pass: pass
    }
  });

  // configure email options
  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text
  };

  // send the email
  transporter.sendMail(mailOptions, function(error, info){
    console.log("sending email...");
    if (error){
      console.log(error.message);
      return res.status(500).send("There is a problem sending email. " + error.message);
    } else {
      console.log("Email sent");
      res.status(200).jsonp(req.body);
    }
  });
};
