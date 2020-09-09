using System;
using System.Net;

namespace Application.Errors
{
    public class RestException : Exception
    {
        public RestException(HttpStatusCode codes, object errors = null)
        {
            Codes = codes;
            Errors = errors;
        }

        public HttpStatusCode Codes { get; }
        public object Errors { get; }
    }
}