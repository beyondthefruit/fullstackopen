const Total = ({ course }) => {
  const totalEx = course.parts.reduce((acc, current) => {
    acc += current.exercises;
    return acc;
    //must return acc
  }, 0);
  return (
    <div>
      <p>Number of exercices {totalEx}</p>
    </div>
  );
};
export default Total;
