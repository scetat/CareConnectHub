const DayAvailability = ({ day, start, end, onStartChange, onEndChange }) => (
  <div className="day-availability">
    <span>{day}</span>
    <input type="time" value={start} onChange={onStartChange} />
    <input type="time" value={end} onChange={onEndChange} />
  </div>
);

export default DayAvailability;
