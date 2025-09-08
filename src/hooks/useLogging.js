import { useCallback } from 'react';
import { loggingMiddleware } from '../api/loggingMiddleware';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyazIyLmNzYWltbC4zMjUyMEBnbWFpbC5jb20iLCJleHAiOjE3NTczMjI5NTQsImlhdCI6MTc1NzMyMjA1NCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjE4NTdmNjA0LWJiOWQtNGQwNC05YjE3LWVmMzE3ZDc3YjhiNSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFudWogeWFkYXYiLCJzdWIiOiIyZjFkMmMxMi02MTE5LTQyZWQtYTAyZS03NTJmMjQ5YmUwMmYifSwiZW1haWwiOiIyazIyLmNzYWltbC4zMjUyMEBnbWFpbC5jb20iLCJuYW1lIjoiYW51aiB5YWRhdiIsInJvbGxObyI6IjIyMDE2NDE1MzAwMzYiLCJhY2Nlc3NDb2RlIjoic0FXVHVSIiwiY2xpZW50SUQiOiIyZjFkMmMxMi02MTE5LTQyZWQtYTAyZS03NTJmMjQ5YmUwMmYiLCJjbGllbnRTZWNyZXQiOiJ2RmprUXh3Smp2ZGRRQlRIIn0.qCrOVsDX8XWj_eKMMrUEvLVhSifU3Jl84z1odVA_lL8';

export const useLogging = () => {
  const log = useCallback((message, level = 'info', pkg = 'frontend') => {
    loggingMiddleware(message, level, pkg, token);
  }, []);

  return { log };
};
