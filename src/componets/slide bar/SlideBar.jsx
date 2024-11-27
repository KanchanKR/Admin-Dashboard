import { BarChart2, UserCog, Menu, Settings, ScrollText, NotebookPen, Users } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    icon: BarChart2,
    color: "#6366f1",
    href: "/home",
  },
  { name: "Users", icon: Users, color: "#EC4899", href: "/user-management" },
  { name: "Manage Roles", icon: UserCog, color: "#8B5CF6", href: "/role-management" },
  { name: "Permission", icon: NotebookPen, color: "#10B981", href: "/permission-manage" },
  { name: "Audit Log", icon: ScrollText, color: "#F59E0B", href: "/audit-log" },
  { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/setting" },
];

const SlideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Media query to detect mobile screen (width < 768px)
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? (isMobile ? "w-20" : "w-64") : "w-20"
      }`}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        {/* Menu Button for Toggling Sidebar */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit mb-6"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div
                className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                <AnimatePresence>
                  {isSidebarOpen && !isMobile && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default SlideBar;
