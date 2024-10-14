import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Ensure react-datepicker is installed
import "react-datepicker/dist/react-datepicker.css";
import { showNotification } from "../notification/Notification";
import { schedulePosts } from "../../Api/services/socialMediaService";

export default function SchedulePost({
  contentHistoryId,
  selectedPlatformsId,
  closeModal,
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSchedule = () => {
    const scheduledData = {
      platformIds: selectedPlatformsId,
      contentHistoryId: contentHistoryId,
      scheduledDate: formatScheduledDateTime(selectedDate).scheduledDate,
      scheduledTime: formatScheduledDateTime(selectedDate).scheduledTime,
    };
    console.log(scheduledData);

    schedulePosts(scheduledData)
      .then((res) => {
        console.log(res);
        showNotification("Your post is scheduled successfully ", "success");
      })
      .catch((err) => showNotification("Sorry please reschedule ! ", "error"));

    // Send to backend, then close the modal
    closeModal();
  };

  function formatScheduledDateTime(dateInput) {
    const scheduledFor = new Date(dateInput);
    const scheduledDate = scheduledFor.toISOString().split("T")[0];
    const hours = String(scheduledFor.getHours()).padStart(2, "0");
    const minutes = String(scheduledFor.getMinutes()).padStart(2, "0");
    const scheduledTime = `${hours}:${minutes}`;
    return {
      scheduledDate: scheduledDate,
      scheduledTime: scheduledTime,
    };
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Schedule Post</h2>
      <p className="mb-4">
        Select a date and time for scheduling your post on the selected
        platforms.
      </p>
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="p-2 border rounded w-full "
          popperClassName="custom-datepicker"
        />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          className="px-8 py-2 bg-gray-600 text-white rounded"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="px-8 py-2 bg-blue-600 text-white rounded"
          onClick={handleSchedule}
          disabled={!selectedDate}
        >
          Schedule
        </button>
      </div>
    </div>
  );
}
