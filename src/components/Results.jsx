export const Results = ({ age }) => {
  //   console.log(age);
  return (
    <section className="leading-10 md:leading-[4.5em]">
      {Object.entries(age).map(([key, value]) => (
        <p
          key={key}
          className="text-[45px] md:text-[80px] font-poppins-extrabolditalic text-Off-black"
        >
          <span className="text-Purple">{value} </span>
          {key}
        </p>
      ))}
    </section>
  );
};
