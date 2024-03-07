using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AuthAPI;

public class ApplicationDbContext : IdentityDbContext<IdentityUser>
{
	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
		base(options)
	{
	}

	protected override void OnModelCreating(ModelBuilder builder)
	{
		base.OnModelCreating(builder);

		// Seed user to login with
		var hasher = new PasswordHasher<IdentityUser>();
		builder.Entity<IdentityUser>().HasData(new IdentityUser
		{
			UserName = "admin@admin.com",
			NormalizedUserName = "ADMIN@ADMIN.COM",
			Email = "admin@admin.com",
			NormalizedEmail = "ADMIN@ADMIN.COM",
			EmailConfirmed = true,
			PasswordHash = hasher.HashPassword(null, "@dm1nKaas"),
			SecurityStamp = String.Empty
		});
	}
}