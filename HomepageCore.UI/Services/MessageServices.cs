using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomepageCore.Services.Interfaces;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;

namespace HomepageCore.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _configuration;

        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<bool> SendEmailAsync(string email, string subject, string message, string name = "")
        {
            var emailConfig = _configuration.GetSection("email");
            var msg = new MimeMessage();
            msg.To.Add(new MailboxAddress("", emailConfig["admin"]));
            msg.From.Add(new MailboxAddress(name, email));
            msg.Subject = subject;
            msg.Body = new TextPart(TextFormat.Html) {Text = message};

            try
            {
                using (var client = new SmtpClient())
                {
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.ConnectAsync(emailConfig["server"]);
                    await client.AuthenticateAsync(emailConfig["account"], emailConfig["password"]);
                    await client.SendAsync(msg);
                    await client.DisconnectAsync(true);
                }

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
