using System;

namespace Bl.Exceptions
{
    public class QuotaExceededException : Exception
    {
        public QuotaExceededException(string message = "המכסה של שירות ה-AI נוצלה. נא לבדוק חיוב או להמתין.") : base(message) {}
    }
}
