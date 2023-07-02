using HospitalManagementServer.Models;

namespace HospitalManagementServer.Repositories
{
    public interface IAppointmentRepository
    {
        Task<List<Appointment>> GetAllAppointments();
        Task<Appointment> GetAppointmentById(int id);
        Task AddAppointment(Appointment appointment);
        Task UpdateAppointment(int id, Appointment appointment);
        Task DeleteAppointment(int id);
    }
}
