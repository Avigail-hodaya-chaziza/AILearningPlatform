using System;

namespace Bl.Exceptions
{
    public class KeyNotAvailableException : Exception
    {
        public KeyNotAvailableException(string message = "the key is not available.") : base(message) {}
    }
}
