using HospitalManagementServer.Models;

namespace HospitalManagementServer.Repositories
{
    public interface IAdminRepository
    {
        List<Admin> GetAllAdmins();
        Admin GetAdminById(int id);
        void AddAdmin(Admin admin);
        void UpdateAdmin(int id, Admin adminData);
        void DeleteAdmin(int id);
    }
}
