import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../componets/Header/Header";
import { mockApi } from "../mockapi/mockApi"; // Import mockApi

const AuditLog = () => {
  const [logData, setLogData] = useState([]);
  const [eventFilter, setEventFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch audit log data from mock API
    mockApi.getAuditLog().then((logs) => setLogData(logs));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEventFilter = (e) => {
    setEventFilter(e.target.value);
  };

  // Filter logs based on event type and search term
  const filteredLogs = logData.filter((log) => {
    const matchesEvent =
      eventFilter === "All" || log.action.includes(eventFilter);
    const matchesSearch = log.details
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesEvent && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Audit Log" />
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 m-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center items-center mb-6">
          {/* Search Input */}
          <div className="relative w-full sm:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search logs..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {/* Event Filter Dropdown */}
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <select
              className="bg-gray-700 text-white rounded-lg py-2 px-4 focus:outline-none w-full focus:ring-2 focus:ring-blue-500"
              value={eventFilter}
              onChange={handleEventFilter}
            >
              <option value="All">All Events</option>
              <option value="Added User">Added User</option>
              <option value="Changed Role">Changed Role</option>
              <option value="Deleted User">Deleted User</option>
            </select>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 text-center">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-left">
                  User
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-left">
                  Action
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-left">
                  Details
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-left">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-100">
                          {log.user}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left flex-wrap">
                      {log.details.split("\n").map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-2 px-4 text-center text-gray-400"
                  >
                    No logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AuditLog;
