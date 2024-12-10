using Microsoft.EntityFrameworkCore;
using RESTservice_API.Data;

var builder = WebApplication.CreateBuilder(args);

// Register the services based on whether to use mock data or the real database
bool useMockData = builder.Configuration.GetValue<bool>("UseMockData");

if (useMockData)
{
    // Register mock repositories
    builder.Services.AddSingleton<IAssetRepository, MockAssetRepository>();
    builder.Services.AddSingleton<IPositionHistoryRepository, MockPositionHistoryRepository>();
}
else
{
    // Register the real database context and repository
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
    builder.Services.AddScoped<IAssetRepository, AssetRepository>();
    builder.Services.AddScoped<IPositionHistoryRepository, PositionHistoryRepository>();
}

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
