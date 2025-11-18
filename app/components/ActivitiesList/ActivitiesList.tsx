"use client";

export default function ActivitiesList({ activities, loading }) {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatPace = (speedMps) => {
    if (!speedMps) return "0:00";
    const paceMinPerKm = 16.6667 / speedMps;
    const minutes = Math.floor(paceMinPerKm);
    const seconds = Math.round((paceMinPerKm - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="activities-section">
        <div className="loading">Loading activities...</div>
      </div>
    );
  }

  return (
    <div className="activities-section">
      <h2>Your Running Activities ({activities.length})</h2>

      {activities.length === 0 ? (
        <div className="empty-state">
          <p>No running activities found</p>
        </div>
      ) : (
        <div className="activities-list">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-card">
              <div className="activity-header">
                <h3>{activity.name}</h3>
                <span className="activity-date">
                  {new Date(activity.start_date).toLocaleDateString()}
                </span>
              </div>

              <div className="activity-stats">
                <div className="stat">
                  <span className="label">Distance:</span>
                  <span className="value">
                    {(activity.distance / 1000).toFixed(2)} km
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Time:</span>
                  <span className="value">
                    {formatTime(activity.moving_time)}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Pace:</span>
                  <span className="value">
                    {formatPace(activity.average_speed)} /km
                  </span>
                </div>
                {activity.average_heartrate && (
                  <div className="stat">
                    <span className="label">Avg HR:</span>
                    <span className="value">
                      {Math.round(activity.average_heartrate)} bpm
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
