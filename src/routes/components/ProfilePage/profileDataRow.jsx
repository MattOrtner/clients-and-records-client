const ProfileDataRow = ({ label, data }) => {
  return (
    <div className="flex flex-col gap-2 pl-4 py-2 border-[3px] border-gray-200 rounded-lg w-[90%]">
      <h2 className="text-xl font-medium">{label}</h2>
      <p className="color-blue-600 text-xl">
        {label === "Rate" && "$ "}
        {data}
        {label === "Tax" && " %"}
      </p>
    </div>
  );
};
export default ProfileDataRow;
