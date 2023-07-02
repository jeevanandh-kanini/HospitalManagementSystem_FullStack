using HospitalManagementServer.Models;
using Microsoft.EntityFrameworkCore;
using static HospitalManagementServer.Repositories.AppointmentRepository;

namespace HospitalManagementServer.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly ApplicationDbContext _context;

        public BookingRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task BookAppointment(int patientId, int doctorId, DateTime bookingDateTime, string diseaseDescription)
        {
            try
            {
                var patient = await _context.Patients.FindAsync(patientId);
                var doctor = await _context.Doctors.FindAsync(doctorId);

                var booking = new DoctorPatient
                {
                    PatientId = patientId,
                    DoctorId = doctorId,
                    BookingDateTime = bookingDateTime,
                    BookingStatus = "Pending",
                    DiseaseDescription = diseaseDescription
                };

                _context.DoctorPatients.Add(booking);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Handle the exception and examine the inner exception for more details
                var innerException = ex.InnerException;
                // Log or print the inner exception message and stack trace for troubleshooting
                Console.WriteLine($"Inner Exception: {innerException?.Message}");
                Console.WriteLine($"Inner Exception Stack Trace: {innerException?.StackTrace}");
                // You can also throw or handle the exception accordingly
            }
        }

        public async Task UpdateBooking(int bookingId)
        {
            var booking = await _context.DoctorPatients.FirstOrDefaultAsync(dp => dp.BookingId == bookingId);

            if (booking == null)
            {
                throw new NotFoundException("Booking not found.");
            }

            booking.BookingStatus = "Approved";

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<object>> GetBookingsByDoctor(int doctorId)
        {
            var bookings = await _context.DoctorPatients
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
                .ToListAsync();

            if (bookings.Count == 0)
            {
                throw new NotFoundException("No bookings found for the specified doctor.");
            }

            return bookings;
        }

        public async Task<IEnumerable<object>> GetBookingsByPatient(int patientId)
        {
            var bookings = await _context.DoctorPatients
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
                .ToListAsync();

            if (bookings.Count == 0)
            {
                throw new NotFoundException("No bookings found for the specified patient.");
            }

            return bookings;
        }

        public async Task DeleteBooking(int bookingId)
        {
            var booking = await _context.DoctorPatients.FirstOrDefaultAsync(dp => dp.BookingId == bookingId);

            if (booking == null)
            {
                throw new NotFoundException("Booking not found.");
            }

            _context.DoctorPatients.Remove(booking);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DoctorPatient>> GetAllBookings()
        {
            var bookings = await _context.DoctorPatients.ToListAsync();

            if (bookings.Count == 0)
            {
                throw new NotFoundException("No bookings found.");
            }

            return bookings;
        }

    }
}
