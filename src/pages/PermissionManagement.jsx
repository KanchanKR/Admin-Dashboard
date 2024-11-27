/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../componets/Header/Header';

const PermissionManagement = () => {
  // Permissions for each role
  const rolePermissions = {
    'Super Admin': ['Read', 'Write', 'Delete', 'Manage Users', 'Access Settings'],
    Admin: ['Read', 'Write', 'Delete', 'Manage Users'],
    Manager: ['Read', 'Write', 'Manage Users'],
    Editor: ['Read', 'Write'],
    Viewer: ['Read'],
    Contributor: ['Write'],
    'Guest/User': ['Read'],
  };

  // Available permissions with their respective colors
  const allPermissions = [
    { name: 'Read', color: 'bg-green-500' },
    { name: 'Write', color: 'bg-blue-500' },
    { name: 'Delete', color: 'bg-red-500' },
    { name: 'Manage Users', color: 'bg-yellow-500' },
    { name: 'Access Settings', color: 'bg-purple-500' },
  ];

  // Initial roles with permissions
  const [roles, setRoles] = useState(Object.keys(rolePermissions));
  const [permissions, setPermissions] = useState(rolePermissions);

  const handlePermissionChange = (role, permission) => {
    setPermissions((prev) => {
      const updatedPermissions = { ...prev };
      if (updatedPermissions[role].includes(permission)) {
        updatedPermissions[role] = updatedPermissions[role].filter(
          (perm) => perm !== permission
        );
      } else {
        updatedPermissions[role] = [...updatedPermissions[role], permission];
      }
      return updatedPermissions;
    });
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Permission Management" />
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 m-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >

      {/* Permissions Table */}
      <div className="overflow-x-auto mx-auto mb-12">
        <table className="min-w-full divide-y divide-gray-700 text-center">
          <thead>
            <tr>
              <th className="px-6 py-3  text-xs font-medium text-gray-400 uppercase tracking-wider text-center">Role</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-center">Permissions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {roles.map((role) => (
              <motion.tr 
              key={role} initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{role}</td>
                <td className="py-2 px-4">
                  <div className="flex justify-center flex-wrap gap-2">
                    {allPermissions.map(({ name, color }) => {
                      const isPermissionGiven = permissions[role]?.includes(name);

                      return (
                        <button
                          key={name}
                          onClick={() => handlePermissionChange(role, name)}
                          className={`py-1 px-3 rounded-lg text-sm focus:outline-none ${isPermissionGiven ? color : 'bg-gray-700 text-gray-400'}`}
                        >
                          {name}
                        </button>
                      );
                    })}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      </motion.div>

      {/* Updated Permissions Section */}
      <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 m-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Updated Permissions</h2>
        <div className="overflow-x-auto mx-auto">
          <table className="min-w-full divide-y divide-gray-700 text-center">
            <thead>
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Given Permissions</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Allowed Permissions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {roles.map((role) => (
                <motion.tr 
                key={role} 
                initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{role}</td>
                  <td className="py-2 px-4">
                    <div className="flex justify-center flex-wrap gap-2">
                      {permissions[role]?.map((permission) => {
                        const permissionColor = allPermissions.find((perm) => perm.name === permission).color;
                        return (
                          <span
                            key={permission}
                            className={`py-1 px-3 rounded-lg text-sm ${permissionColor} text-white`}
                          >
                            {permission}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex justify-center flex-wrap gap-2">
                      {allPermissions.map(({ name, color }) => {
                        const isPermissionGiven = permissions[role]?.includes(name);
                        return !isPermissionGiven ? (
                          <span
                            key={name}
                            className={`py-1 px-3 rounded-lg text-sm ${color} text-white`}
                          >
                            {name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </motion.div>
    </div>
  );
};

export default PermissionManagement;
