using HospitalManagementServer.Models;
using HospitalManagementServer.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace HospitalManagementServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;

        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpGet]
        public IActionResult GetAllAdmins()
        {
            try
            {
                var admins = _adminRepository.GetAllAdmins();
                return Ok(admins);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetAdminById(int id)
        {
            try
            {
                var admin = _adminRepository.GetAdminById(id);

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

        [HttpPost]
        public IActionResult PostAdmin([FromBody] Admin admin)
        {
            try
            {
                _adminRepository.AddAdmin(admin);
                return Ok(admin);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult PutAdmin(int id, [FromBody] Admin adminData)
        {
            try
            {
                _adminRepository.UpdateAdmin(id, adminData);
                var admin = _adminRepository.GetAdminById(id);

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

        [HttpDelete("{id}")]
        public IActionResult DeleteAdmin(int id)
        {
            try
            {
                var admin = _adminRepository.GetAdminById(id);

                if (admin == null)
                {
                    return NotFound();
                }

                _adminRepository.DeleteAdmin(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

