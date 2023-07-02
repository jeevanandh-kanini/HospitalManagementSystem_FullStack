using HospitalManagementServer.Models;

namespace HospitalManagementServer.Repositories
{
    public interface IPatientRepository
    {
        Task<IEnumerable<Patient>> GetAllPatients();
        Task<Patient> GetPatient(int id);
        Task<Patient> CreatePatient(Patient patient);
        Task<Patient> UpdatePatient(int id, Patient patient);
        Task<bool> DeletePatient(int id);
        Task<bool> AddDoctorToPatient(int patientId, int doctorId);
        Task<bool> RemoveDoctorFromPatient(int patientId, int doctorId);
    }
}
