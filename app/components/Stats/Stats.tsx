import "./Stats.css";

type Activity = {
  distance: number;
  moving_time: number;
  average_speed: number;
};

type StatsProps = {
  activities: Activity[];
};

const Stats: React.FC<StatsProps> = ({ activities }) => {
  const calculateStats = () => {
    if (activities.length === 0) {
      return {
        totalRuns: 0,
        totalDistance: 0,
        totalTime: 0,
        averagePace: 0,
      };
    }

    const totalDistance = activities.reduce(
      (sum, activity: Activity) => sum + activity.distance,
      0
    );
    const totalTime = activities.reduce(
      (sum, activity: Activity) => sum + activity.moving_time,
      0
    );

    const totalSpeed = activities.reduce(
      (sum, activity: Activity) => sum + activity.average_speed,
      0
    );
    const averageSpeed = totalSpeed / activities.length;

    return {
      totalRuns: activities.length,
      totalDistance: totalDistance / 1000, // в км
      totalTime,
      averagePace: formatPace(averageSpeed),
    };
  };

  const formatPace = (speedMps: number) => {
    if (speedMps === 0) return "0:00";
    const paceMinPerKm = 16.6667 / speedMps;
    const minutes = Math.floor(paceMinPerKm);
    const seconds = Math.round((paceMinPerKm - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  };

  const stats = calculateStats();

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Всего забегов</h3>
        <span className="stat-value">{stats.totalRuns}</span>
      </div>
      <div className="stat-card">
        <h3>Общая дистанция</h3>
        <span className="stat-value">{stats.totalDistance.toFixed(1)} км</span>
      </div>
      <div className="stat-card">
        <h3>Общее время</h3>
        <span className="stat-value">{formatTime(stats.totalTime)}</span>
      </div>
      <div className="stat-card">
        <h3>Средний темп</h3>
        <span className="stat-value">{stats.averagePace} /км</span>
      </div>
    </div>
  );
};

export default Stats;
