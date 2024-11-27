import { BarChart2, UserX, Users, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

// import { CircularProgressbar } from "react-circular-progressbar"
import SalesOverviewChart from "../componets/Dashboard/UserLoginChart";

import Header from "../componets/Header/Header";
import StatCard from "../componets/state card/StatCard";
import MonthlySignUpProgress from "../componets/Dashboard/MonthlySignUpProgress";

const Dashboard = () => {
  return (
      <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Dashboard' />
  
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          {/* STATS */}
          <motion.div
            className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard name='Users' icon={Users} value='4,820' color='#6366F1' />
            <StatCard name='Active Users' icon={UserCheck} value='4,000' color='#10B981' />
            <StatCard name='Inactive Users' icon={UserX} value='820' color='#EF4444' />
            <StatCard name='View Recent Sign ups' icon={BarChart2} value='40' color='#F59E0B' />
          </motion.div>
  
          {/* CHARTS */}
  
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <SalesOverviewChart />
            <MonthlySignUpProgress />
            {/* <SalesChannelChart /> */}
          </div>
        </main>
      </div>
    )
}

export default Dashboard