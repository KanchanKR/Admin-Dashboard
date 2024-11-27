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
let mockUsers = [...userData]; // Initialize mockUsers with the static user data

export const mockApi = {
  // GET all users
  getUsers: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockUsers]); // Return the mockUsers array
      }, 500); // Simulate network latency
    });
  },

  // POST a new user
  addUser: (user) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(
          (u) => u.email === user.email
        );
        if (existingUser) {
          reject({ message: 'User with this email already exists.' });
        } else {
          const newUser = { ...user, id: mockUsers.length + 1 };
          mockUsers.push(newUser); // Add to mockUsers
          userData.push(newUser); // Add to static userData
          resolve({ message: 'User added successfully!' });
        }
      }, 500); // Simulate network latency
    });
  },

  // PUT (Update a user)
  updateUser: (updatedUser) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          mockUsers[index] = { ...updatedUser };
          
          // Also update the static userData array
          const staticIndex = userData.findIndex((u) => u.id === updatedUser.id);
          if (staticIndex !== -1) {
            userData[staticIndex] = { ...updatedUser };
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
        // Remove the user from mockUsers array
        mockUsers = mockUsers.filter((user) => user.id !== userId);
        
        // Also remove the user from static userData array
        userData = userData.filter((user) => user.id !== userId);
        
        resolve({ message: 'User deleted successfully!' });
      }, 500);
    });
  }
};
