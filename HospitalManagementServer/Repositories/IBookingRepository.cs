using HospitalManagementServer.Models;

namespace HospitalManagementServer.Repositories
{
    public interface IBookingRepository
    {
        Task BookAppointment(int patientId, int doctorId, DateTime bookingDateTime, string diseaseDescription);
        Task UpdateBooking(int bookingId);
        Task<IEnumerable<object>> GetBookingsByDoctor(int doctorId);
        Task<IEnumerable<object>> GetBookingsByPatient(int patientId);
        Task DeleteBooking(int bookingId);
        Task<IEnumerable<DoctorPatient>> GetAllBookings();
    }
}
