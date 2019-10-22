using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApiFormulario.Models;

namespace WebApiFormulario.Controllers
{
    public class CiudadanosController : ApiController
    {
        private DBFormularioEntities db = new DBFormularioEntities();
        // GET: api/Ciudadanos
        public HttpResponseMessage GetCiudadano()
        {
            List<Ciudadano> ciudadanos = db.Ciudadano.ToList();
            if (ciudadanos != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ciudadanos);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "No se encontro ciudadano");
            }
        }

        [HttpPost]
        public HttpResponseMessage registrarCiudadano([FromBody]Ciudadano ciudadano)
        {
            try
            {
                if (ciudadano != null)
                {
                    db.Ciudadano.Add(ciudadano);
                    db.SaveChanges();

                    var message = Request.CreateResponse(HttpStatusCode.Created, ciudadano);
                    message.Headers.Location = new Uri(Request.RequestUri + "/" + ciudadano.id.ToString());
                    return message;
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadGateway, "El ciudadano es null");
                }

            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadGateway, "La Falló al registrar el ciudadano"); ;
            }
        }
    }
}
