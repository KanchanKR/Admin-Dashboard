// mockApi.js
// Static user data array
let userData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Super Admin", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Manager", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Contributor", status: "Active" },
  { id: 6, name: "Eva Green", email: "eva@example.com", role: "Editor", status: "Inactive" },
  { id: 7, name: "George Martin", email: "george@example.com", role: "Guest/User", status: "Active" },
  { id: 8, name: "Sophia Turner", email: "sophia@example.com", role: "Super Admin", status: "Active" },
  { id: 9, name: "Liam Brooks", email: "liam@example.com", role: "Manager", status: "Inactive" },
  { id: 10, name: "Emily Watson", email: "emily@example.com", role: "Admin", status: "Active" },
];

// Mock API handling both static `userData` and dynamic `mockUsers`
let mockUsers = [...userData]; // Mock API state for users

// Pre-fill audit log with dummy data for showcasing
let auditLogData = [
  {
    id: 1,
    user: "Jane Smith", // The user on whom the action was performed
    action: "Changed Role",
    details: "Assigned Super Admin role to Jane Smith",
    timestamp: "2024-11-26 10:30:00",
  },
  {
    id: 2,
    user: "Mark Johnson",
    action: "Updated Permission",
    details: "Granted Write permission to Mark Johnson",
    timestamp: "2024-11-26 11:15:00",
  },
  {
    id: 3,
    user: "Sarah Lee",
    action: "Status Change",
    details: "Set status to Inactive for Sarah Lee",
    timestamp: "2024-11-26 12:00:00",
  },
]; // New array to store audit logs

export const mockApi = {
  // GET all users
  getUsers: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockUsers]);
      }, 500); // Simulate network latency
    });
  },

  // POST a new user
  addUser: (user) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find((u) => u.email === user.email);
        if (existingUser) {
          reject({ message: 'User with this email already exists.' });
        } else {
          const newUser = { ...user, id: mockUsers.length + 1 };
          mockUsers.push(newUser);
          userData.push(newUser);
          
          // Log user addition
          auditLogData.push({
            id: auditLogData.length + 1,
            user: newUser.name, // Log the name of the new user
            action: 'Added User',
            details: `Added user ${newUser.name} (${newUser.email})`,
            timestamp: new Date().toISOString(),
          });

          resolve({ message: 'User added successfully!' });
        }
      }, 500);
    });
  },

  // PUT (Update a user)
  updateUser: (updatedUser) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          const oldUser = mockUsers[index];
          mockUsers[index] = { ...updatedUser };

          // Also update the static userData array
          const staticIndex = userData.findIndex((u) => u.id === updatedUser.id);
          if (staticIndex !== -1) {
            userData[staticIndex] = { ...updatedUser };
          }

          // Log role change
          if (oldUser.role !== updatedUser.role) {
            auditLogData.push({
              id: auditLogData.length + 1,
              user: updatedUser.name,
              action: 'Changed Role',
              details: `Updated role for ${updatedUser.name} from ${oldUser.role} to ${updatedUser.role}`,
              timestamp: new Date().toISOString(),
            });
          }

          // Log status change
          if (oldUser.status !== updatedUser.status) {
            auditLogData.push({
              id: auditLogData.length + 1,
              user: updatedUser.name,
              action: 'Changed Status',
              details: `Updated status for ${updatedUser.name} from ${oldUser.status} to ${updatedUser.status}`,
              timestamp: new Date().toISOString(),
            });
          }

          // Log name change
          if (oldUser.name !== updatedUser.name) {
            auditLogData.push({
              id: auditLogData.length + 1,
              user: oldUser.name, // Log the old name to indicate the change
              action: 'Changed Name',
              details: `Updated name from ${oldUser.name} to ${updatedUser.name}`,
              timestamp: new Date().toISOString(),
            });
          }

          // Log email change
          if (oldUser.email !== updatedUser.email) {
            auditLogData.push({
              id: auditLogData.length + 1,
              user: updatedUser.name, // Log the new name or existing name
              action: 'Changed Email',
              details: `Updated email for ${updatedUser.name} from ${oldUser.email} to ${updatedUser.email}`,
              timestamp: new Date().toISOString(),
            });
          }

          resolve({ message: 'User updated successfully!' });
        } else {
          reject({ message: 'User not found.' });
        }
      }, 500);
    });
  },

  // DELETE a user
  deleteUser: (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.id === userId);
        if (user) {
          // Log user deletion
          auditLogData.push({
            id: auditLogData.length + 1,
            user: user.name, // Log the name of the user being deleted
            action: 'Deleted User',
            details: `Deleted user ${user.name} (${user.email})`,
            timestamp: new Date().toISOString(),
          });
        }

        // Remove the user from both mockUsers and userData arrays
        mockUsers = mockUsers.filter((user) => user.id !== userId);
        userData = userData.filter((user) => user.id !== userId);

        resolve({ message: 'User deleted successfully!' });
      }, 500);
    });
  },

  // GET audit log data
  getAuditLog: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...auditLogData]);
      }, 500);
    });
  }
};