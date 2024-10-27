import PasswordInfos from '@src/components/dashboard/client/profile/password-infos';
import PersonalInfos from '@src/components/dashboard/client/profile/personal-infos';
import { UserProfile } from '@src/components/dashboard/client/profile/user-profile';
import { TitleSection } from '@src/components/dashboard/title-section';
import { Spacer } from '@src/components/global';

export default async function Page() {
	return (
		<div className='scroll-m-20 tracking-tight'>
			<TitleSection title='Mon profil' />
			<UserProfile />
			<Spacer extraSmall />
			<PersonalInfos />
			<Spacer extraSmall />
			<PasswordInfos />
		</div>
	);
}
