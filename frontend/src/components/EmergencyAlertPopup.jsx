import React, { useState, useEffect } from 'react';
import { useEmergencyAlert } from '../context/EmergencyAlertContext';

const EmergencyAlertPopup = () => {
  const { alerts, removeAlert, markAsRead } = useEmergencyAlert();
  const [displayAlerts, setDisplayAlerts] = useState([]);

  useEffect(() => {
    setDisplayAlerts(alerts);
  }, [alerts]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-gradient-to-br from-red-600/80 to-red-700/80',
          border: 'border-red-400/50',
          icon: '🚨',
          glow: 'shadow-red-500/50',
        };
      case 'high':
        return {
          bg: 'bg-gradient-to-br from-orange-600/80 to-orange-700/80',
          border: 'border-orange-400/50',
          icon: '⚠️',
          glow: 'shadow-orange-500/50',
        };
      case 'medium':
        return {
          bg: 'bg-gradient-to-br from-yellow-600/80 to-yellow-700/80',
          border: 'border-yellow-400/50',
          icon: '⚡',
          glow: 'shadow-yellow-500/50',
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-blue-600/80 to-blue-700/80',
          border: 'border-blue-400/50',
          icon: 'ℹ️',
          glow: 'shadow-blue-500/50',
        };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'health':
        return '❤️';
      case 'appointment':
        return '📅';
      case 'medication':
        return '💊';
      case 'vital':
        return '📊';
      default:
        return '🔔';
    }
  };

  const handleDismiss = (alertId) => {
    removeAlert(alertId);
  };

  const handleRead = (alertId) => {
    markAsRead(alertId);
  };

  if (displayAlerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {displayAlerts.map((alert) => {
        const severity = getSeverityColor(alert.severity);
        const typeIcon = getTypeIcon(alert.type);

        return (
          <div
            key={alert.id}
            className={`${severity.bg} ${severity.border} backdrop-blur-xl rounded-2xl shadow-2xl ${severity.glow} border-2 overflow-hidden transform transition-all duration-300 hover:scale-105 animate-slide-in`}
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl animate-bounce">{severity.icon}</div>
                  <div className="text-2xl">{typeIcon}</div>
                </div>
                <button
                  onClick={() => handleDismiss(alert.id)}
                  className="text-white/80 hover:text-white text-xl transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Title */}
              <h3 className="text-white font-black text-lg mb-2">
                {alert.title}
              </h3>

              {/* Message */}
              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                {alert.message}
              </p>

              {/* Additional Info */}
              {alert.details && (
                <div className="mb-4 p-3 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm">
                  <p className="text-white/80 text-xs font-mono">{alert.details}</p>
                </div>
              )}

              {/* Timestamp */}
              <div className="text-white/70 text-xs mb-4">
                {new Date(alert.timestamp).toLocaleTimeString()}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {alert.actionButtons && alert.actionButtons.length > 0 ? (
                  <>
                    {alert.actionButtons.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (btn.onClick) btn.onClick();
                          handleDismiss(alert.id);
                        }}
                        className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                          btn.primary
                            ? 'bg-white text-red-600 hover:bg-gray-100'
                            : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleRead(alert.id);
                      }}
                      className="flex-1 px-4 py-2 rounded-lg font-bold text-sm bg-white/20 text-white hover:bg-white/30 border border-white/30 transition-all duration-200"
                    >
                      Mark Read
                    </button>
                    <button
                      onClick={() => handleDismiss(alert.id)}
                      className="flex-1 px-4 py-2 rounded-lg font-bold text-sm bg-white text-red-600 hover:bg-gray-100 transition-all duration-200"
                    >
                      Dismiss
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Progress bar for auto-dismiss */}
            {alert.severity !== 'critical' && (
              <div className="h-1 bg-white/20">
                <div
                  className="h-full bg-white/50 animate-shrink"
                  style={{
                    animation: `shrink 10s linear forwards`,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(400px) rotateY(90deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotateY(0);
          }
        }

        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }

        .animate-shrink {
          animation: shrink 10s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default EmergencyAlertPopup;
