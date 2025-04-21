const ProfileDataRow = ({ label, data, type, name, isEditing, onChange }) => {
  return (
    <div
      className={`flex justify-between align-center gap-2 px-4 py-2 border-gray-200 rounded-lg w-[90%]`}
    >
      <label
        aria-label={`label for ${label}`}
        className="text-lg flex items-center"
      >
        {label}:
      </label>
      <p>
        {label === "Rate" && "$ "}
        <input
          type={type}
          name={name}
          disabled={isEditing ? false : true}
          defaultValue={data}
          onChange={onChange}
        />
        {label === "Tax" && " %"}
      </p>
    </div>
  );
};
export default ProfileDataRow;
