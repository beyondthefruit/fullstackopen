const Notification = ({ successMessage }) => {
  if (successMessage === null) {
    return null;
  }

  return <div className='error'>{successMessage}</div>;
};

export default Notification;
