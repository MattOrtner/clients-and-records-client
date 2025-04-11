const ClientsName = ({ first, last }) => {
  return (
    <div>
      {first || last ? (
        <>
          <h1>
            {first} {last}
          </h1>
        </>
      ) : (
        <i>No Name</i>
      )}
    </div>
  );
};
export default ClientsName;
