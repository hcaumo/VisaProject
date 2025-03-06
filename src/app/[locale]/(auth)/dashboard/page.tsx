import { useTranslations } from 'next-intl';

import { TitleBar } from '@/features/dashboard/TitleBar';
import { VisaApplicationForm } from '@/features/visa/VisaApplicationForm';

const DashboardIndexPage = () => {
  const t = useTranslations('DashboardIndex');

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <div className="mt-6">
        <VisaApplicationForm />
      </div>
    </>
  );
};

export default DashboardIndexPage;
