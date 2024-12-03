using Microsoft.EntityFrameworkCore;
using RESTservice_API.Models;


namespace RESTservice_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Asset> Assets { get; set; }
        public DbSet<PositionHistory> PositionHistories { get; set; }
        public DbSet<Zone> Zones { get; set; }
        public DbSet<FloorMap> FloorMaps { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure relationships or constraints if necessary
        }
    }
}