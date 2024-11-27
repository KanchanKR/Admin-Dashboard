import Header from '../componets/Header/Header'
import StatCard from '../componets/state card/StatCard'
import UsersTable from '../componets/users/UsersTable'
// import UserAdd from '../componets/users/UserAdd'


import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

const userStats = {
	totalUsers: 4820,
	newUsersToday: 40,
	activeUsers: 4000,
	churnRate: "2.4%",
};


const UserManger = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
			<Header title='Users' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Users'
						icon={UsersIcon}
						value={userStats.totalUsers.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard name='New Users Today' icon={UserPlus} value={userStats.newUsersToday} color='#F59E0B' />
					<StatCard
						name='Active Users'
						icon={UserCheck}
						value={userStats.activeUsers.toLocaleString()}
						color='#10B981'
					/>
					<StatCard name='Churn Rate' icon={UserX} value={userStats.churnRate} color='#EF4444' />
				</motion.div>

				<UsersTable />

        {/* <UserAdd /> */}

			</main>
		</div>
  )
}

export default UserManger
