/**
 * @file src/hooks/useToast.js
 * @description Simple toast notification hook.
 */

import { useState, useCallback } from "react";

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showToast, hideToast };
};
