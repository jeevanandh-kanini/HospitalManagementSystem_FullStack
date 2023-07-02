using Azure.Core;
using HospitalManagementServer.DTO;
using HospitalManagementServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using NuGet.DependencyResolver;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HospitalManagementServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly ApplicationDbContext uDbC;
        private readonly IWebHostEnvironment _hostEnvironment;

        public AuthController(ApplicationDbContext udb, IConfiguration configuration, IWebHostEnvironment hostEnvironment)
        {
            this.uDbC = udb;
            this.configuration = configuration;
            this._hostEnvironment = hostEnvironment;
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register([FromForm] RegisterUserDto ud)
        {
            var existingUser = uDbC.RegisterUser.FirstOrDefault(u => u.UserName == ud.UserName);
            if (existingUser != null)
            {
                return BadRequest("Username already exists");
            }

            // Hash the password before storing it
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(ud.Password);

            var user = new RegisterUser()
            {
                UserName = ud.UserName,
                Password = passwordHash,
                Email = ud.Email,
                Role = ud.Role,
                
            };

            uDbC.RegisterUser.Add(user);
            uDbC.SaveChanges();

            // Check the role and add the user to the respective table
            switch (ud.Role)
            {
                case "admin":
                    var admin = new Admin()
                    {
                        Id = user.Id,
                        Name = user.UserName,
                        
                    };
                    uDbC.Admins.Add(admin);
                    uDbC.SaveChanges();
                    break;

                case "doctor":


                    var doctor = new Doctor()
                    {
                        Id = user.Id,
                        Name = user.UserName,
                        Specialization = ud.Specialization,
                        Experience =ud.Experience,
                        ImageName="",
                        Approved = false,

                       
            };
                    uDbC.Doctors.Add(doctor);
                    uDbC.SaveChanges();



                    Doctor doc = uDbC.Doctors.FirstOrDefault(t => t.Id == user.Id);

                    if (ud.ImageFile != null)
                    {

                        DeleteImage(doc.ImageName);
                        doc.ImageName = await SaveImage(ud.ImageFile);
                    }

                    uDbC.SaveChanges();

                    break;

                case "patient":
                    var patient = new Patient()
                    {
                        Id = user.Id,
                        Name = user.UserName,
                        Age = ud.Age 
                    };
                    uDbC.Patients.Add(patient);
                    uDbC.SaveChanges();
                    break;

                default:
                    return BadRequest("Invalid role");
            }

            return Ok("User registered successfully");
        }

        [HttpPost("Login")]
        public async Task<ActionResult> SignIn(LoginUser ud)
        {
            string uname = ud.UserName;
            string pass = ud.Password;
            var user = uDbC.RegisterUser.FirstOrDefault(x => x.UserName == uname);
            if (user != null && BCrypt.Net.BCrypt.Verify(pass, user.Password))
            {
                var token = CreateToken(user);
                return Ok(new { token, user });
            }
            else
            {
                return BadRequest("User not found or invalid password");
            }
        }






        /* private string CreateToken(RegisterUser ud)
         {
             var validAudience = configuration.GetSection("JWT:ValidAudience").Value;
             var validIssuer = configuration.GetSection("JWT:ValidIssuer").Value;
             var secretKey = configuration.GetSection("JWT:Secret").Value;

             List<Claim> claims = new List<Claim>
     {
         new Claim(ClaimTypes.Name, ud.UserName),
         new Claim(ClaimTypes.Role, ud.Role),
         new Claim("UserId", ud.Id.ToString())
     };

             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
             var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha384); // Set algorithm to HS384
             var token = new JwtSecurityToken(
                 issuer: validIssuer,
                 audience: validAudience,
                 claims: claims,
                 expires: DateTime.Now.AddDays(1),
                 signingCredentials: cred
             );

             var jwt = new JwtSecurityTokenHandler().WriteToken(token);
             return jwt;
         }*/





        private string CreateToken(RegisterUser ud)
        {
            var validAudience = configuration.GetSection("JWT:ValidAudience").Value;
            var validIssuer = configuration.GetSection("JWT:ValidIssuer").Value;
            var secretKey = configuration.GetSection("JWT:Secret").Value;

            List<Claim> claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, ud.UserName),
                    new Claim(ClaimTypes.Role, ud.Role),
                    new Claim("UserId", ud.Id.ToString())

                };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("AppSetting:Token").Value!));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                issuer: validIssuer,
                audience: validAudience,
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }


        /*  private string CreateToken(RegisterUser ud)
          {
              List<Claim> claims = new List<Claim>
              {
                  new Claim(ClaimTypes.Name, ud.UserName),
                  new Claim(ClaimTypes.Role, ud.Role)
              };

              var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("AppSetting:Token").Value!));
              var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
              var token = new JwtSecurityToken(
                  claims: claims,
                  expires: DateTime.Now.AddDays(1),
                  signingCredentials: cred
              );

              var jwt = new JwtSecurityTokenHandler().WriteToken(token);
              return jwt;
          }*/










        private bool EmployeeModelExists(int id)
        {
            return uDbC.Doctors.Any(e => e.Id == id);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }
}
