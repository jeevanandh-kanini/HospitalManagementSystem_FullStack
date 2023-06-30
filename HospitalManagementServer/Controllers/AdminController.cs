using HospitalManagementServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace HospitalManagementServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult GetAllAdmins()
        {
            try
            {
                var admins = _context.Admins.ToList();
                return Ok(admins);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/admin/{id}
        [HttpGet("{id}")]
        public IActionResult GetAdminById(int id)
        {
            try
            {
                var admin = _context.Admins.FirstOrDefault(a => a.Id == id);

                if (admin == null)
                {
                    return NotFound();
                }

                return Ok(admin);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/admin
        [HttpPost]
        public IActionResult PostAdmin([FromBody] Admin admin)
        {
            try
            {
                _context.Admins.Add(admin);
                _context.SaveChanges();

                return Ok(admin);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/admin/{id}
        [HttpPut("{id}")]
        public IActionResult PutAdmin(int id, [FromBody] Admin adminData)
        {
            try
            {
                var admin = _context.Admins.FirstOrDefault(a => a.Id == id);

                if (admin == null)
                {
                    return NotFound();
                }

                // Update the admin data
                admin.Name = adminData.Name;

                _context.SaveChanges();

                return Ok(admin);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/admin/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteAdmin(int id)
        {
            try
            {
                var admin = _context.Admins.FirstOrDefault(a => a.Id == id);
                RegisterUser ru = _context.RegisterUser.FirstOrDefault(t => t.Id == id);

                if (admin == null)
                {
                    return NotFound();
                }

                _context.Admins.Remove(admin);

                _context.RegisterUser.Remove(ru);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
