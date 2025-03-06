import { useTranslations } from 'next-intl';

import { TitleBar } from '@/features/dashboard/TitleBar';
import { ApplicationStatus } from '@/features/visa/ApplicationStatus';

const DashboardIndexPage = () => {
  const t = useTranslations('DashboardIndex');

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <div className="mt-6">
        <ApplicationStatus />
      </div>
    </>
  );
};

export default DashboardIndexPage;
