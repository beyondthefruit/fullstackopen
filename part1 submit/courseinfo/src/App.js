const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      contents: 'Fundamentals of React',
      ex: 10,
    },
    {
      contents: 'Using props to pass data',
      ex: 7,
    },
    {
      contents: 'State of a component',
      ex: 14,
    },
  ];
  const Content = () => {
    return parts.map((part) => {
      console.log(part);
      const { contents, ex } = part;
      return (
        <div>
          <p>
            {contents} {ex}
          </p>
        </div>
      );
    });
  };

  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    );
  };
  const Total = () => {
    return (
      <div>
        <p>Number of exercices {parts[0].ex + parts[1].ex + parts[2].ex}</p>
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
