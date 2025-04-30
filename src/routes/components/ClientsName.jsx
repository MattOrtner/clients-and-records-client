const ClientsName = ({ first, last, containerStyle, contentStyle }) => {
  return (
    <div className={`${containerStyle}`}>
      {first || last ? (
        <h1 className={`${contentStyle}`}>
          {first} {last}
        </h1>
      ) : (
        <i>No Name</i>
      )}
    </div>
  );
};
export default ClientsName;
