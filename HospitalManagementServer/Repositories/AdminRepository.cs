using HospitalManagementServer.Models;

namespace HospitalManagementServer.Repositories
{
    public class AdminRepository:IAdminRepository
    {
        private readonly ApplicationDbContext _context;

        public AdminRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Admin> GetAllAdmins()
        {
            return _context.Admins.ToList();
        }

        public Admin GetAdminById(int id)
        {
            return _context.Admins.FirstOrDefault(a => a.Id == id);
        }

        public void AddAdmin(Admin admin)
        {
            _context.Admins.Add(admin);
            _context.SaveChanges();
        }

        public void UpdateAdmin(int id, Admin adminData)
        {
            var admin = _context.Admins.FirstOrDefault(a => a.Id == id);

            if (admin != null)
            {
                admin.Name = adminData.Name;
                _context.SaveChanges();
            }
        }

        public void DeleteAdmin(int id)
        {
            var admin = _context.Admins.FirstOrDefault(a => a.Id == id);
            RegisterUser ru = _context.RegisterUser.FirstOrDefault(t => t.Id == id);

            if (admin != null)
            {
                _context.Admins.Remove(admin);
                _context.RegisterUser.Remove(ru);
                _context.SaveChanges();
            }
        }
    }
}
