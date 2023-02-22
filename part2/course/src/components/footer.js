const Footer = () => {
  const footerStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 22,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022,
        Kevin cul Poilu zut please
      </em>
    </div>
    // "build:ui": "rm -rf build && cd ../../part2/course && npm run build && cp -r build ../../part3/helloworld",
  );
};
export default Footer;
// /Users/Hanard/Documents/IT/full stack open 2023/fullstackopen/part2/course/build
