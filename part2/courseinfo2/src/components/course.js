// import { useState } from 'react';
import Total from './total';
import Header from './header';

const Content = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <div>
        {course.parts.map((part) => {
          return (
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
          );
        })}
      </div>
      <Total course={course} />
    </>
  );
};

export default Content;
