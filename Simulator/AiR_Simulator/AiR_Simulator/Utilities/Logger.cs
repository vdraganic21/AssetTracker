using System;
using System.Diagnostics;

namespace AiR_Simulator.Utilities
{
    public static class Logger
    {
        public static void Log(string message)
        {
            Debug.WriteLine(message);
            #if DEBUG
            System.Diagnostics.Debug.WriteLine(message);
            #endif
        }
    }
} 