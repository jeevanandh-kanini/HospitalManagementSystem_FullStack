using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagementServer.Models;
using HospitalManagementServer.Repositories;
using static HospitalManagementServer.Repositories.AppointmentRepository;

namespace HospitalManagementServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly IAppointmentRepository _appointmentRepository;

        public AppointmentsController(IAppointmentRepository appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            var appointments = await _appointmentRepository.GetAllAppointments();
            return appointments;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var appointment = await _appointmentRepository.GetAppointmentById(id);

            if (appointment == null)
            {
                return NotFound();
            }

            return appointment;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointment(int id, Appointment appointment)
        {
            try
            {
                await _appointmentRepository.UpdateAppointment(id, appointment);
                return NoContent();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (ArgumentException)
            {
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(Appointment appointment)
        {
            try
            {
                await _appointmentRepository.AddAppointment(appointment);
                return CreatedAtAction("GetAppointment", new { id = appointment.Id }, appointment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            try
            {
                await _appointmentRepository.DeleteAppointment(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
