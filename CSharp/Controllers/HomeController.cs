using Microsoft.AspNetCore.Mvc;
using MVCTest.Models;
using System.Diagnostics;



namespace MVCTest.Controllers
{

    public class HomeController : Controller
    {
        [HttpPost]
        public ActionResult FormOne(string name, string email, string card)
        {
            ViewBag.Name = name;
            ViewBag.Email = email;
            ViewBag.Card = card;

            return View("Index");
        }

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}