"use client";

import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

import { TitleBar } from "@/features/dashboard/TitleBar";
import { DocumentList } from "@/features/documents/DocumentList";

const DocumentsPage = () => {
  const t = useTranslations("Documents");
  const { user } = useUser();

  return (
    <>
      <TitleBar
        title={t("title_bar")}
        description={t("title_bar_description")}
      />

      <div className="mt-6">
        {user ? (
          <DocumentList userId={user.id} />
        ) : (
          <div className="text-center py-10 bg-muted rounded-lg">
            <p>{t("loading_user_data")}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DocumentsPage;