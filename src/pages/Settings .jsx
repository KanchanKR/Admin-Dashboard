import Header from "../componets/Header/Header";
import Profile from "../componets/settings/Profile"
import Notifications from '../componets/settings/Notifications'
import Security from '../componets/settings/Security'
import ConnectedAccounts from '../componets/settings/ConnectedAccounts'
import DangerZone from '../componets/settings/DangerZone'

const Settings = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Settings' />
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Profile />
				<Notifications />
				<Security />
				<ConnectedAccounts />
				<DangerZone />
			</main>
		</div>
	);
};
export default Settings;