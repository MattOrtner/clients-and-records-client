const ProfileDataRow = ({ label, data }) => {
  return (
    <div className="flex justify-between gap-2 px-4 py-2 border-[1px] border-gray-200 rounded-lg w-[90%]">
      <h2 className="text-xl font-medium">{label}</h2>
      <p className="color-blue-600 text-xl ">
        {label === "Rate" && "$ "}
        {data}
        {label === "Tax" && " %"}
      </p>
    </div>
  );
};
export default ProfileDataRow;
