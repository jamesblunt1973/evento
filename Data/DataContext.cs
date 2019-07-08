using System;
using ServerApi.Models.DomainModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ServerApi.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Log> Logs { get; set; }

        [DbFunction]
        public static int GetDistance(double sourceLat, double sourceLng, double targetLat, double targetLng)
        {
            throw new NotImplementedException();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // EventTag join table has composit key
            modelBuilder.Entity<EventTag>()
                .HasKey(e => new { e.EventId, e.TagId });
            // Define primary key for Activities
            modelBuilder.Entity<Activity>()
                .HasKey(e => new { e.EventId, e.UserId });
            modelBuilder.Entity<Activity>()
                .HasOne(a => a.Event)
                .WithMany(a => a.Activities)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Activity>()
                .HasOne(a => a.User)
                .WithMany(a => a.Activities)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}