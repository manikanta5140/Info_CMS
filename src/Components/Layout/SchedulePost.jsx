import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Ensure react-datepicker is installed
import "react-datepicker/dist/react-datepicker.css";

export default function SchedulePost({
  contentHistoryId,
  selectedPlatforms,
  closeModal,
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSchedule = () => {
    // Here you would send the schedule information to the backend
    console.log("Scheduled for:", selectedDate);
    console.log("ContentHistoryId:", contentHistoryId);
    console.log("Selected Platforms:", selectedPlatforms);

    // Send to backend, then close the modal
    closeModal();
  };

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
