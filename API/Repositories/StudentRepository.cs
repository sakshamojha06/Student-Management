using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class StudentRepository: IPersonRepository
{
    private readonly AppDbContext _context;

    public StudentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Student>> GetAll()
    {
        return await _context.Students.ToListAsync();
    }

    public async Task<Student?> GetById(int id)
    {
        return await _context.Students.FindAsync(id);
    }

    public async Task<Student> Create(Student student)
    {
        _context.Students.Add(student);
        await _context.SaveChangesAsync();

        return student;
    }

    public async Task<bool> Update(int id, Student student)
    {
        var existingStudent = await _context.Students.FindAsync(id);
        if(existingStudent == null) return false;

        existingStudent.Name = student.Name;
        existingStudent.CourseId = student.CourseId;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> Delete(int id)
    {
        var existingStudent = await _context.Students.FindAsync(id);
        if(existingStudent == null) return false;

        _context.Students.Remove(existingStudent);
        await _context.SaveChangesAsync();

        return true;
    }
}