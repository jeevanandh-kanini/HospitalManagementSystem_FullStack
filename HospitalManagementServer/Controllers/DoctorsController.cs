/*

using HospitalManagementServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

using System.Collections.Generic;
using System.Linq;

namespace SchoolManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IWebHostEnvironment _hostEnvironment;

        public DoctorsController(ApplicationDbContext dbContext, IWebHostEnvironment hostEnvironment)
        {
            _dbContext = dbContext;
            this._hostEnvironment = hostEnvironment;
        }

       




        [HttpGet]
        public ActionResult<IEnumerable<DoctorResponse>> GetTeachers(bool? approved = null)
        {
            IQueryable<Doctor> filteredTeachers = _dbContext.Doctors;

            if (approved.HasValue)
            {
                filteredTeachers = filteredTeachers.Where(t => t.Approved == approved.Value);
            }

            IEnumerable<DoctorResponse> teacherResponses = filteredTeachers.Select(t => new DoctorResponse
            {
                Id = t.Id,
                Name = t.Name,
                Specialization = t.Specialization,
                ImageName = t.ImageName,    
                Approved = t.Approved
            }).ToList();

            return Ok(teacherResponses);
        }


        // POST: api/teachers
        [HttpPost]
        public ActionResult<Doctor> CreateTeacher(DoctorCreateUpdateRequest request)
        {
            Doctor doctor = new Doctor
            {
                Name = request.Name,
                Specialization = request.Specialization,
                ImageName="",
                Approved = false
            };

            _dbContext.Doctors.Add(doctor);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetTeacher), new { id = doctor.Id }, doctor);
        }

        // PATCH: api/teachers/{id}/approval
        [HttpPatch("{id}/approval"),Authorize(Roles = "admin")]
        public IActionResult UpdateTeacherApproval(int id, bool approved)
        {
            Doctor teacher = _dbContext.Doctors.FirstOrDefault(t => t.Id == id);

            if (teacher == null)
            {
                return NotFound();
            }

            teacher.Approved = approved;
            _dbContext.SaveChanges();

            return NoContent();
        }

        // GET: api/teachers/{id}
        [HttpGet("{id}")]
        public ActionResult<Doctor> GetTeacher(int id)
        {
            Doctor teacher = _dbContext.Doctors.FirstOrDefault(t => t.Id == id);

            if (teacher == null)
            {
                return NotFound();
            }

            return Ok(teacher);
        }



        // DELETE: api/teachers/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteTeacher(int id)
        {
            Doctor teacher = _dbContext.Doctors.FirstOrDefault(t => t.Id == id);

            RegisterUser ru = _dbContext.RegisterUser.FirstOrDefault(t => t.Id == id);

            if (teacher == null)
            {
                return NotFound();
            }

            _dbContext.Doctors.Remove(teacher);
            _dbContext.RegisterUser.Remove(ru);
            _dbContext.SaveChanges();

            return NoContent();
        }



     




        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeacher(int id,[FromForm]DoctorWithImage request)
        {
            Doctor teacher = _dbContext.Doctors.FirstOrDefault(t => t.Id == id);

            if (teacher == null)
            {
                return NotFound();
            }

            teacher.Name = request.Name;
            teacher.Specialization = request.Specialization;

            if (request.ImageFile != null)
            {
               
               DeleteImage(teacher.ImageName);
               teacher.ImageName = await SaveImage(request.ImageFile);  
            }

            _dbContext.SaveChanges();

            return NoContent();
        }



        [HttpGet("{teacherId}/students")]
        public ActionResult<IEnumerable<Doctor>> GetStudentsByTeacher(int teacherId)
        {
            var studentIds = _dbContext.DoctorPatients
                .Where(st => st.DoctorId == teacherId)
                .Select(st => st.PatientId)
                .ToList();

            var students = _dbContext.Patients
                .Where(s => studentIds.Contains(s.Id))
                .ToList();

            if (students.Count == 0)
            {
                return NotFound();
            }

            return Ok(students);
        }












        private bool EmployeeModelExists(int id)
        {
            return _dbContext.Doctors.Any(e => e.Id == id);
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
*/


using HospitalManagementServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

using HospitalManagementServer.Repositories;

namespace SchoolManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorRepository _doctorRepository;

        public DoctorsController(IDoctorRepository doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorResponse>>> GetDoctors(bool? approved = null)
        {
            var doctors = await _doctorRepository.GetDoctors(approved);
            return Ok(doctors);
        }

        [HttpPost]
        public async Task<ActionResult<Doctor>> CreateDoctor(DoctorCreateUpdateRequest request)
        {
            var doctor = await _doctorRepository.CreateDoctor(request);
            return CreatedAtAction(nameof(GetDoctor), new { id = doctor.Id }, doctor);
        }

        [HttpPatch("{id}/approval")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateDoctorApproval(int id, bool approved)
        {
            return await _doctorRepository.UpdateDoctorApproval(id, approved);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> GetDoctor(int id)
        {
            return await _doctorRepository.GetDoctor(id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            return await _doctorRepository.DeleteDoctor(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, [FromForm] DoctorWithImage request)
        {
            return await _doctorRepository.UpdateDoctor(id, request);
        }

        [HttpGet("{doctorId}/patients")]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatientsByDoctor(int doctorId)
        {
            return await _doctorRepository.GetPatientsByDoctor(doctorId);
        }
    }
}