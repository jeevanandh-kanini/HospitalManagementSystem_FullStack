using HospitalManagementServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System;
using System.Linq;
namespace SchoolManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public PatientController(ApplicationDbContext context)
        {
            _context = context;
        }

       
        [HttpGet("patients")]
        public IActionResult GetAllPatients()
        {
            var students = _context.Patients.Include(s => s.Doctors).ToList();
            return Ok(students);
        }


     


        [HttpGet("{id}")]
        public ActionResult<Patient> GetPatient(int id)
        {
            var student = _context.Patients.Find(id);

            if (student == null)
            {
                return NotFound();
            }

            var teacherIds = _context.DoctorPatients
                .Where(st => st.PatientId == id)
                .Select(st => st.DoctorId)
                .ToList();

            var teachers = _context.Doctors
                .Where(t => teacherIds.Contains(t.Id))
                .ToList();

            student.Doctors = teachers;

            return Ok(student);
        }


    
        [HttpPost]
        public IActionResult PostPatient([FromBody] Patient student)
        {
            try
            {
                _context.Patients.Add(student);
                _context.SaveChanges();

                return Ok(student);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/student/{id}
        [HttpPut("{id}")]
        public IActionResult PutPatient(int id, [FromBody] Patient studentData)
        {
            try
            {
                var student = _context.Patients.FirstOrDefault(s => s.Id == id);

                if (student == null)
                {
                    return NotFound();
                }

                // Update the student data
                student.Name = studentData.Name;

                _context.SaveChanges();

                return Ok(student);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/student/{id}
        [HttpDelete("{id}")]
        public IActionResult DeletePatient(int id)
        {
            try
            {
                var student = _context.Patients.FirstOrDefault(s => s.Id == id);

                RegisterUser ru = _context.RegisterUser.FirstOrDefault(t => t.Id == id);

                if (student == null)
                {
                    return NotFound();
                }

                _context.Patients.Remove(student);
                _context.RegisterUser.Remove(ru);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }






        [HttpPost("~/api/patients/{patientId}/doctors/{doctorId}")]
        public IActionResult AddDoctorToPatient(int patientId, int doctorId)
        {
            var student = _context.Patients.Find(patientId);
            var teacher = _context.Doctors.Find(doctorId);

            if (student == null || teacher == null)
            {
                return NotFound();
            }

            var studentTeacher = new DoctorPatient
            {
                PatientId = patientId,
                DoctorId = doctorId
            };

            _context.DoctorPatients.Add(studentTeacher);
            _context.SaveChanges();

            return Ok();
        }





        // DELETE: api/students/{studentId}/teachers/{teacherId}
        [HttpDelete("~/api/patients/{patientId}/doctors/{doctorId}")]
        public IActionResult RemoveTeacherFromStudent(int patientId, int doctorId)
        {
            var studentTeacher = _context.DoctorPatients.FirstOrDefault(st => st.PatientId == patientId && st.DoctorId == doctorId);

            if (studentTeacher == null)
            {
                return NotFound();
            }

            _context.DoctorPatients.Remove(studentTeacher);
            _context.SaveChanges();

            return NoContent();
        }

    }
}
