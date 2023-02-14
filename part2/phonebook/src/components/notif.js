const Notification = ({ successMessage }) => {
  if (successMessage === null) {
    return null;
  }

  return (
    <>
      {/* <div className={`${toggleS} ? 'success visible' : 'hidden'`}></div> */}
      <div className='success'>{successMessage}</div>
    </>
  );
};

export default Notification;
