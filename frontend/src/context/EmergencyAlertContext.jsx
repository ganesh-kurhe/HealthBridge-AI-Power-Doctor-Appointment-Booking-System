import React, { createContext, useContext, useState, useCallback } from 'react';

const EmergencyAlertContext = createContext();

export const EmergencyAlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const [alertHistory, setAlertHistory] = useState([]);

  // Add emergency alert
  const addAlert = useCallback((alert) => {
    const alertWithId = {
      id: Date.now(),
      timestamp: new Date(),
      ...alert,
      severity: alert.severity || 'high', // low, medium, high, critical
      type: alert.type || 'general', // general, health, appointment, medication, vital
      read: false,
    };

    setAlerts((prev) => [alertWithId, ...prev]);
    setAlertHistory((prev) => [alertWithId, ...prev]);

    // Auto-remove after duration (default 10 seconds for non-critical)
    if (alert.autoDismiss !== false) {
      const duration = alert.severity === 'critical' ? 30000 : 10000;
      setTimeout(() => {
        removeAlert(alertWithId.id);
      }, duration);
    }

    return alertWithId.id;
  }, []);

  // Remove alert
  const removeAlert = useCallback((alertId) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  }, []);

  // Mark as read
  const markAsRead = useCallback((alertId) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
    setAlertHistory((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  }, []);

  // Clear all alerts
  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  // Clear alert history
  const clearHistory = useCallback(() => {
    setAlertHistory([]);
  }, []);

  // Get unread count
  const getUnreadCount = useCallback(() => {
    return alerts.filter((alert) => !alert.read).length;
  }, [alerts]);

  // Get critical alerts
  const getCriticalAlerts = useCallback(() => {
    return alerts.filter((alert) => alert.severity === 'critical');
  }, [alerts]);

  const value = {
    alerts,
    alertHistory,
    addAlert,
    removeAlert,
    markAsRead,
    clearAllAlerts,
    clearHistory,
    getUnreadCount,
    getCriticalAlerts,
  };

  return (
    <EmergencyAlertContext.Provider value={value}>
      {children}
    </EmergencyAlertContext.Provider>
  );
};

export const useEmergencyAlert = () => {
  const context = useContext(EmergencyAlertContext);
  if (!context) {
    throw new Error('useEmergencyAlert must be used within EmergencyAlertProvider');
  }
  return context;
};
