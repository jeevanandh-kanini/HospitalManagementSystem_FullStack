/*using HospitalManagementServer.Models;
using HospitalManagementServer.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using static HospitalManagementServer.Repositories.AppointmentRepository;

namespace HospitalManagementServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepository;

        public BookingController(IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        [HttpPost]
        public async Task<IActionResult> BookAppointment(int patientId, int doctorId, DateTime bookingDateTime, string diseaseDescription)
        {
            try
            {
                await _bookingRepository.BookAppointment(patientId, doctorId, bookingDateTime, diseaseDescription);
                return Ok();
            }
           
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPut("{bookingId}")]
        public async Task<IActionResult> UpdateBooking(int bookingId)
        {
            try
            {
                await _bookingRepository.UpdateBooking(bookingId);
                return Ok("Booking updated successfully.");
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("doctor/{doctorId}")]
        public async Task<IActionResult> GetBookingsByDoctor(int doctorId)
        {
            try
            {
                var bookings = await _bookingRepository.GetBookingsByDoctor(doctorId);
                return Ok(bookings);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("patient/{patientId}")]
        public async Task<IActionResult> GetBookingsByPatient(int patientId)
        {
            try
            {
                var bookings = await _bookingRepository.GetBookingsByPatient(patientId);
                return Ok(bookings);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpDelete("{bookingId}")]
        public async Task<IActionResult> DeleteBooking(int bookingId)
        {
            try
            {
                await _bookingRepository.DeleteBooking(bookingId);
                return Ok("Booking deleted successfully.");
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBookings()
        {
            try
            {
                var bookings = await _bookingRepository.GetAllBookings();
                return Ok(bookings);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}*/


using HospitalManagementServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult BookAppointment(int patientId, int doctorId, DateTime bookingDateTime, string disesasedescription)
        {
            try
            {
                // Check if patient and doctor exist in the database
                var patient = _context.Patients.Find(patientId);
                var doctor = _context.Doctors.Find(doctorId);

                if (patient == null || doctor == null)
                {
                    return NotFound("Patient or doctor not found.");
                }

                // Create a new DoctorPatient object
                var booking = new DoctorPatient
                {
                    PatientId = patientId,
                    DoctorId = doctorId,
                    BookingDateTime = bookingDateTime,
                    BookingStatus = "Pending",
                    DiseaseDescription = disesasedescription
                };

                // Save the booking to the database
                _context.DoctorPatients.Add(booking);
                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPut("{bookingId}")]
        public IActionResult UpdateBooking(int bookingId)
        {
            try
            {
                // Find the booking by ID
                var booking = _context.DoctorPatients.FirstOrDefault(dp => dp.BookingId == bookingId);

                if (booking == null)
                {
                    return NotFound("Booking not found.");
                }

                // Update the booking properties with the values from the updatedBooking object

                booking.BookingStatus = "Approved";

                _context.SaveChanges();

                return Ok("Booking updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("doctor/{doctorId}")]
        public IActionResult GetBookingsByDoctor(int doctorId)
        {
            try
            {
                var bookings = _context.DoctorPatients
                    .Where(dp => dp.DoctorId == doctorId)
                    .Select(dp => new
                    {
                        BookingId = dp.BookingId,
                        PatientId = dp.PatientId,
                        DoctorId = dp.DoctorId,
                        BookingDateTime = dp.BookingDateTime,
                        BookingStatus = dp.BookingStatus,
                        DiseaseDescription = dp.DiseaseDescription,
                        Patient = new
                        {
                            PatientId = dp.Patient.Id,
                            Name = dp.Patient.Name,
                            Age = dp.Patient.Age,

                            // Include other patient properties as needed
                        }
                    })
                    .ToList();

                if (bookings.Count == 0)
                {
                    return NotFound("No bookings found for the specified doctor.");
                }

                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }



        [HttpGet("patient/{patientId}")]
        public IActionResult GetBookingsByPatient(int patientId)
        {
            try
            {
                var bookings = _context.DoctorPatients
                    .Where(dp => dp.PatientId == patientId)
                    .Select(dp => new
                    {
                        BookingId = dp.BookingId,
                        PatientId = dp.PatientId,
                        DoctorId = dp.DoctorId,
                        BookingDateTime = dp.BookingDateTime,
                        BookingStatus = dp.BookingStatus,
                        DiseaseDescription = dp.DiseaseDescription,
                        Doctor = new
                        {
                            DoctorId = dp.Doctor.Id,
                            Name = dp.Doctor.Name,
                            Specialization = dp.Doctor.Specialization,
                            ImageName = dp.Doctor.ImageName,
                        }
                    })
                    .ToList();

                if (bookings.Count == 0)
                {
                    return NotFound("No bookings found for the specified patient.");
                }

                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpDelete("{bookingId}")]
        public IActionResult DeleteBooking(int bookingId)
        {
            try
            {
                // Find the booking by ID
                var booking = _context.DoctorPatients.FirstOrDefault(dp => dp.BookingId == bookingId);

                if (booking == null)
                {
                    return NotFound("Booking not found.");
                }

                _context.DoctorPatients.Remove(booking);
                _context.SaveChanges();

                return Ok("Booking deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpGet]
        public IActionResult GetAllBookings()
        {
            try
            {
                var bookings = _context.DoctorPatients.ToList();

                if (bookings.Count == 0)
                {
                    return NotFound("No bookings found.");
                }

                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

    }
}
