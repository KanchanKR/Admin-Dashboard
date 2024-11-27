import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import UserManger from '../pages/UserManger'
import RoleMangement from '../pages/RoleMangement'
import PermissionManagement from '../pages/PermissionManagement'
import AuditLog from '../pages/AuditLog'
import Settings from '../pages/Settings '

const Routers = () => {
    return <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/home" element={<Dashboard/>} />
      
      <Route path="/user-management" element={<UserManger/>} />
      <Route path="/role-management" element={<RoleMangement/>} />
      <Route path="/permission-manage" element={<PermissionManagement/>} />
      <Route path="/audit-log" element={<AuditLog/>} />
      <Route path="/setting" element={<Settings/>} />
      
      
    </Routes>
  }

export default Routers
