import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Monthly sign-up data from previous data
const userData = [
	{ name: "Jul", users: 150 },
	{ name: "Aug", users: 200 },
	{ name: "Sep", users: 300 },
	{ name: "Oct", users: 250 },
	{ name: "Nov", users: 400 },
	{ name: "Dec", users: 500 },
	{ name: "Jan", users: 450 },
	{ name: "Feb", users: 420 },
	{ name: "Mar", users: 520 },
	{ name: "Apr", users: 480 },
	{ name: "May", users: 550 },
	{ name: "Jun", users: 600 },
];

// Current month data (replace with actual logic to get the current month's data)
const currentMonth = userData[userData.length - 1]; // June (600 sign-ups)

// Target sign-ups for the current month
const targetSignUps = 750; // Example target for the month

// Monthly growth rate compared to the previous month
const previousMonth = userData[userData.length - 2]; // May (550 sign-ups)
const monthGrowth = ((currentMonth.users - previousMonth.users) / previousMonth.users) * 100;

// Year-over-year growth (compare June this year to June last year)
const lastYearSameMonth = userData[0]; // July (150 sign-ups, assume last year's June is similar)
const yearGrowth = ((currentMonth.users - lastYearSameMonth.users) / lastYearSameMonth.users) * 100;

const MonthlySignUpProgress = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 flex flex-col justify-between min-h-[300px] sm:min-h-[400px]'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100 text-center'>
				Monthly Sign-Up Progress
			</h2>

			{/* Circular Progress Bar */}
			<div className='flex justify-center items-center flex-grow'>
				<div className='w-full sm:w-1/2 lg:w-1/3 p-4'>
					<CircularProgressbar
						value={(currentMonth.users / targetSignUps) * 100}
						text={`${((currentMonth.users / targetSignUps) * 100).toFixed(0)}%`}
						styles={buildStyles({
							textColor: "#E5E7EB",
							pathColor: "#6366F1",
							trailColor: "#4B5563",
						})}
					/>
				</div>
			</div>

			{/* Figures for total users, month growth, year growth */}
			<div className='mt-6 text-gray-100 text-center flex flex-wrap justify-between items-center'>
				{/* Row 1: Labels */}
				<div className='flex w-full justify-around text-sm sm:text-lg'>
					<p>Total Users</p>
					<p>Month Growth</p>
					<p>Year Growth</p>
				</div>
				{/* Row 2: Values */}
				<div className='flex w-full justify-around mt-2 text-sm sm:text-lg'>
					<p className='text-center text-[#F59E0B]'>{currentMonth.users} users</p>
					<p className={monthGrowth >= 0 ? "text-green-500" : "text-red-500"}>
						{monthGrowth >= 0
							? `+${monthGrowth.toFixed(2)}%`
							: `${monthGrowth.toFixed(2)}%`}
					</p>
					<p className={yearGrowth >= 0 ? "text-green-500" : "text-red-500"}>
						{yearGrowth >= 0
							? `+${yearGrowth.toFixed(2)}%`
							: `${yearGrowth.toFixed(2)}%`}
					</p>
				</div>
			</div>
		</motion.div>
	);
};

export default MonthlySignUpProgress;
