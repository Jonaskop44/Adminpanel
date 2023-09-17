import * as IconFa from "react-icons/fa";

type Box = {
  name: string;
  description: string;
  license: boolean;
};

interface BoxProps {
  servers: Box[];
  isLoading: boolean;
}

const Box: React.FC<BoxProps> = ({ servers, isLoading }) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : servers[0] ? (
        servers.map((list, index) => (
          <li
            key={index}
            className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div className="w-full flex items-center justify-between p-6 space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="text-gray-900 text-sm font-medium truncate">
                    {list.name}
                  </h3>
                  <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                    {list.license ? "Licensed" : "Unlicensed"}
                  </span>
                </div>
                <p className="mt-1 text-gray-500 text-sm truncate">
                  {list.description}
                </p>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="w-0 flex-1 flex">
                  <a
                    href={`mailto:${list.name}`}
                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                  >
                    <IconFa.FaAdversal
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Edit</span>
                  </a>
                </div>
                <div className="-ml-px w-0 flex-1 flex">
                  <a
                    href={`tel:${list.name}`}
                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                  >
                    <IconFa.Fa500Px
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">License</span>
                  </a>
                </div>
                <div className="-ml-px w-0 flex-1 flex">
                  <a
                    href={`tel:${list.name}`}
                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                  >
                    <IconFa.Fa500Px
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Remove</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))
      ) : (
        <div className="text-4xl font-semibold">
          <h1 className="text-gray-800">Create Server</h1>
        </div>
      )}
    </ul>
  );
};

export default Box;
