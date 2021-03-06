﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieList.Models;

namespace MovieList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieListsController : ControllerBase
    {
        private readonly MovieListContext _context;

        public MovieListsController(MovieListContext context)
        {
            _context = context;
        }

        // GET: api/MovieLists
        [HttpGet]
        public IEnumerable<MovieLists> GetMovieLists()
        {                             // vvvv must use include to load movies collection
            return _context.MovieLists.Include(m => (m.Movies));
        }

        // GET: api/MovieLists/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieLists([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
                                                                   // must use Include then find by ID
            var movieLists = await _context.MovieLists.Include(m => m.Movies).FirstOrDefaultAsync(i => i.Id == id);

            if (movieLists == null)
            {
                return NotFound();
            }

            return Ok(movieLists);
        }

        // PUT: api/MovieLists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovieLists([FromRoute] int id, [FromBody] MovieLists movieLists)
        {
            // Make sure we are capturing the id from the URL once we make the API calls on the frontend
            if (!ModelState.IsValid)
            {
                
                return BadRequest(ModelState);
            }

            if (id != movieLists.Id)
            {
                
                return BadRequest();
            }

            _context.Entry(movieLists).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieListsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/MovieLists/5/add-movie
        [HttpPut("{id}/add-movie")]
        public async Task<IActionResult> PutMovieListsMovies([FromRoute] int id, [FromBody] Movie movie)
        {
            // Make sure we are capturing the id from the URL once we make the API calls on the frontend
            if (!ModelState.IsValid)
            {

                return BadRequest(ModelState);
            }

            var SingleList = await _context.MovieLists.Include(m => m.Movies).FirstOrDefaultAsync(i => i.Id == id);
            SingleList.Movies.Add(movie);

            _context.Entry(SingleList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieListsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/MovieLists/5/remove-movie
        [HttpPut("{id}/remove-movie")]
        public async Task<IActionResult> removeMovieListsMovies([FromRoute] int id, [FromBody] Movie movie)
        {
            // Make sure we are capturing the id from the URL once we make the API calls on the frontend
            if (!ModelState.IsValid)
            {

                return BadRequest(ModelState);
            }

            var SingleList = await _context.MovieLists.Include(m => m.Movies).FirstOrDefaultAsync(i => i.Id == id);
            var movieToRemove = new Movie { };

            foreach (var movieObject in SingleList.Movies)
            {
                if(movieObject.Id == movie.Id)
                {
                    movieToRemove = movieObject;
                }
            }
                    SingleList.Movies.Remove(movieToRemove);

            _context.Entry(SingleList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieListsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MovieLists
        [HttpPost]
        public async Task<IActionResult> PostMovieLists([FromBody] MovieLists movieLists)
        {
            Console.Write(movieLists);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MovieLists.Add(movieLists);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovieLists", new { id = movieLists.Id }, movieLists);
        }

        // DELETE: api/MovieLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovieLists([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
                                                    // Have to load the children movies before we can delete or we will get
                                                    // references errors (trying to delete parent but orphan the child)
           var movieLists = await _context.MovieLists.Include(m => m.Movies).FirstOrDefaultAsync(i => i.Id == id);

            if (movieLists == null)
            {
                return NotFound();
            }

            
            _context.MovieLists.Remove(movieLists);
            await _context.SaveChangesAsync();

            return Ok(movieLists);
        }


        

        private bool MovieListsExists(int id)
        {
            return _context.MovieLists.Any(e => e.Id == id);
        }
    }
}