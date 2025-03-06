import { useTranslations } from 'next-intl';

import { TitleBar } from '@/features/dashboard/TitleBar';
import { VisaApplicationForm } from '@/features/visa/VisaApplicationForm';

const NewVisaApplicationPage = () => {
  const t = useTranslations('VisaApplication');

  return (
    <>
      <TitleBar
        title={t('new_application')}
        description={t('new_application_description')}
      />

      <div className="mt-6">
        <VisaApplicationForm />
      </div>
    </>
  );
};

export default NewVisaApplicationPage;