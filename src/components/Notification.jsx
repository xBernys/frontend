export const Notification = ({ message }) =>
  message === null ? null : <div className="error">{message}</div>
