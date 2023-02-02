import courses from './data';

import Content from './components/course';

const App = () => {
  console.log(courses);
  return (
    <div>
      {/* <Header courses={courses} /> */}
      {courses.map((course) => {
        return <Content key={course.id} course={course} />;
      })}
    </div>
  );
};

export default App;
