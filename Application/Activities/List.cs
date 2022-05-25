using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
  public class List
  {
    public class Query : IRequest<Result<List<Activity>>> { }

    public class Handler : IRequestHandler<Query, Result<List<Activity>>>
    {
      public DataContext _context { get; set; }
      public Handler(DataContext context)
      {
        _context = context;
      }
      public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
      {
        return Result<List<Activity>>.Succes(await _context.Activities.ToListAsync());
      }
    }
  }
}