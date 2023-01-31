const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };
  const Content = () => {
    return course.parts.map((part) => {
      console.log(part);
      const { name, exercises } = part;

      return (
        <div>
          <p>
            {name} {exercises}
          </p>
        </div>
      );
    });
  };

  const Header = (props) => {
    console.log(props);
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
    );
  };
  const Total = () => {
    return (
      <div>
        <p>
          Number of exercices{' '}
          {course.parts[0].exercises +
            course.parts[1].exercises +
            course.parts[2].exercises}
        </p>
      </div>
    );
  };
  return (
    <div>
      <Header course={course} />
      <Content />
      <Total />
    </div>
  );
};

export default App;
