using API.Models;
using API.Repositories;

namespace API.Service;

public class StudentService: IStudentService
{
    private readonly IStudentRepository _repo;

    public StudentService(IStudentRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<Student>> GetAll()
    {
        return await _repo.GetAll();
    }

    public async Task<Student?> GetById(int id)
    {
        return await _repo.GetById(id);
    }

    public async Task<Student> Create(Student student)
    {
        return await _repo.Create(student);
    }

    public async Task<bool> Update(int id, Student student)
    {
        return await _repo.Update(id, student);
    }

    public async Task<bool> Delete(int id)
    {
        return await _repo.Delete(id);
    }
}