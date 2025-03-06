import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

// B2C product - no organization selection needed
// Redirect directly to dashboard
const OrganizationSelectionPage = () => {
  redirect('/dashboard');
  // Removed unreachable code
};

export const dynamic = 'force-dynamic';

export default OrganizationSelectionPage;
