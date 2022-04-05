using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace demo_upload.Controllers
{
    [ApiController]
    [Route("controller")]
    public class UploadController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<UploadController> _logger;

        public UploadController(ILogger<UploadController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("demo")]
        public string Get()
        {
            return DateTime.Now.ToString();
        }
        [HttpPost]
        [Route("upload")]
        public async Task<dynamic> uploadAsync([FromForm] adm_Attachment model)
        {
            try
            {
                if (model == null || model.Files == null)
                {
                    throw new Exception("Files is null");
                }

                string path = Path.Combine(@"E:\uploadFiles");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                string FileName = "";
                int lengFiles = model.Files.Count();
                var filenames = new string[lengFiles];

                for (int i = 0; i < lengFiles; i++)
                {
                    FileName = DateTime.Now.ToString("hhmmssddMMyyyy") + "-" + i.ToString() + Path.GetExtension(model.Files[i].FileName);
                    using (var fs = new FileStream(Path.Combine(path, FileName), FileMode.Create))
                    {
                      await model.Files[i].CopyToAsync(fs);
                    }

                    filenames[i] = model.Files[i].FileName;
                    //Upload()
                }


                return new { Success = true, data = filenames };
            }
            catch (Exception ex)
            {
                return new { Success = false, ex.Message };
            }
        }
    }
}
