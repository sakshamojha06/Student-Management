using API.Models;

namespace API.Repositories;

public interface IStudentRepository
{
    public Task<List<Student>> GetAll();
    public Task<Student?> GetById(int id);
    public Task<Student> Create(Student student);
    public Task<bool> Update(int id, Student student);
    public Task<bool> Delete(int id);
}