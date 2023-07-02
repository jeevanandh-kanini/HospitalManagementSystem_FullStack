using HospitalManagementServer.Models;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagementServer.Repositories
{
    public interface IDoctorRepository
    {
        Task<IEnumerable<DoctorResponse>> GetDoctors(bool? approved = null);
        Task<Doctor> CreateDoctor(DoctorCreateUpdateRequest request);
        Task<IActionResult> UpdateDoctorApproval(int id, bool approved);
        Task<ActionResult<Doctor>> GetDoctor(int id);
        Task<IActionResult> DeleteDoctor(int id);
        Task<IActionResult> UpdateDoctor(int id, DoctorWithImage request);
        Task<ActionResult<IEnumerable<Patient>>> GetPatientsByDoctor(int doctorId);
    }
}
