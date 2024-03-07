using AuthAPI;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add entityframework with SQLite
builder.Services.AddDbContext<ApplicationDbContext>(
	options => options.UseSqlite("Data Source=database.db"));
// Add identity
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
	.AddEntityFrameworkStores<ApplicationDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.MapIdentityApi<IdentityUser>();
app.UseHttpsRedirection();

// Just some random endpoint to test authentication with
app.MapGet("/list", (HttpContext httpContext) =>
	{
		var forecast = Enumerable.Range(1, 5).ToArray();
		return forecast;
	})
	.WithName("GetWeatherForecast")
	.WithOpenApi()
	.RequireAuthorization();

app.Run();