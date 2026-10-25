using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controller;

[Route("api/[controller]")]
[ApiController]
public class CourseController: ControllerBase
{
    private readonly AppDbContext _context;

    public CourseController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var courses = await _context.Courses.ToListAsync();

        return Ok(courses);
    }
}