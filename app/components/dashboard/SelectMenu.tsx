const Menu = () => {
  return (
    <div className="mt-2">
      <label
        htmlFor="location"
        className="block text-sm font-medium text-gray-700"
      >
        License
      </label>
      <select
        id="location"
        name="location"
        className="form-input mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm rounded-md"
      >
        <option>True</option>
        <option>False</option>
      </select>
    </div>
  );
};

export default Menu;
