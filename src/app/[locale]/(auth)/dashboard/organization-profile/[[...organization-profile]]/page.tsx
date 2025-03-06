import { redirect } from 'next/navigation';

// B2C product - no organization profile needed
// Redirect to user profile instead
const OrganizationProfilePage = (props: { params: { locale: string } }) => {
  redirect(`/${props.params.locale}/dashboard/user-profile`);
  // Removed unreachable code
};

export default OrganizationProfilePage;
