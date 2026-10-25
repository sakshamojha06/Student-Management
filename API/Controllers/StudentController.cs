using API.Models;
using API.Service;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller;

[Route("api/[controller]")]
[ApiController]
public class StudentController: ControllerBase
{
    private readonly IStudentService _service;

    public StudentController(IStudentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var students = await _service.GetAll();
        return Ok(students);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var student = await _service.GetById(id);
        if(student == null) return NotFound("Student not found");

        return Ok(student);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Student student)
    {
        var result = await _service.Create(student);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Student student)
    {
        var result = await _service.Update(id, student);
        if(!result) return NotFound("Student not found");

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.Delete(id);
        if(!result) return NotFound("Student not found");

        return Ok(result);
    }
}