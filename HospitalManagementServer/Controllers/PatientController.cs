using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HospitalManagementServer.Models;
using HospitalManagementServer.Repositories;
using Microsoft.AspNetCore.Mvc;


namespace SchoolManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientRepository _patientRepository;

        public PatientController(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }

        [HttpGet("patients")]
        public async Task<IActionResult> GetAllPatients()
        {
            var patients = await _patientRepository.GetAllPatients();
            return Ok(patients);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatient(int id)
        {
            var patient = await _patientRepository.GetPatient(id);

            if (patient == null)
            {
                return NotFound();
            }

            return Ok(patient);
        }

        [HttpPost]
        public async Task<IActionResult> PostPatient([FromBody] Patient patient)
        {
            try
            {
                var createdPatient = await _patientRepository.CreatePatient(patient);
                return Ok(createdPatient);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(int id, [FromBody] Patient patient)
        {
            try
            {
                var updatedPatient = await _patientRepository.UpdatePatient(id, patient);

                if (updatedPatient == null)
                {
                    return NotFound();
                }

                return Ok(updatedPatient);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            try
            {
                var result = await _patientRepository.DeletePatient(id);

                if (!result)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("~/api/patients/{patientId}/doctors/{doctorId}")]
        public async Task<IActionResult> AddDoctorToPatient(int patientId, int doctorId)
        {
            try
            {
                var result = await _patientRepository.AddDoctorToPatient(patientId, doctorId);

                if (!result)
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("~/api/patients/{patientId}/doctors/{doctorId}")]
        public async Task<IActionResult> RemoveDoctorFromPatient(int patientId, int doctorId)
        {
            try
            {
                var result = await _patientRepository.RemoveDoctorFromPatient(patientId, doctorId);

                if (!result)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
