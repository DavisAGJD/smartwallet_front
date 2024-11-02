import { useContext } from "react";
import { NotificationContext } from "../../../context/NotificationContext";

export default function GlobalNotification() {
  const { newNotification, clearNotification } = useContext(NotificationContext);

  if (!newNotification) return null;

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-green-600 text-white rounded-lg shadow-lg">
      <p>{newNotification}</p>
      <button onClick={clearNotification} className="mt-2 text-xs underline">
        Cerrar
      </button>
    </div>
  );
}
