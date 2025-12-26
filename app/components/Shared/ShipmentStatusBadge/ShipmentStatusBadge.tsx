import { IShipmentStatus, ShipmentStatuses } from "@/app/types";

const styles = {
  [ShipmentStatuses.created]: {
    backgroundColor: "#F9FAFB",
    color: "#4B5563",
    borderColor: "#9CA3AF",
  },
  [ShipmentStatuses.in_progress]: {
    backgroundColor: "#FEFCE8",
    color: "#CA8A04",
    borderColor: "#FB923C",
  },
  [ShipmentStatuses.on_the_way]: {
    backgroundColor: "#EFF6FF",
    color: "#2563EB",
    borderColor: "#60A5FA",
  },
  [ShipmentStatuses.at_pickup_point]: {
    backgroundColor: "#FAF5FF",
    color: "#9333EA",
    borderColor: "#C084FC",
  },
  [ShipmentStatuses.received]: {
    backgroundColor: "#F0FDF4",
    color: "#16A34A",
    borderColor: "#4ADE80",
  },
};

const ShipmentStatusBadge = ({ name, type }: IShipmentStatus) => {
  return (
    <div
      style={{ ...styles[type as ShipmentStatuses] }}
      className="px-4 py-1 text-sm rounded-lg w-fit border"
    >
      {name}
    </div>
  );
};

export default ShipmentStatusBadge;
