"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Document, DocumentHistory } from "@/models/Document";

interface DocumentHistoryDialogProps {
  document: Document;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentHistoryDialog = ({
  document,
  isOpen,
  onClose,
}: DocumentHistoryDialogProps) => {
  const t = useTranslations("Documents");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">{t("document_history")}</h2>
          <p className="text-sm text-muted-foreground">{document.name}</p>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          {document.history.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">{t("no_history")}</p>
          ) : (
            <div className="space-y-4">
              {document.history.map((historyItem) => (
                <HistoryItem key={historyItem.id} item={historyItem} />
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t flex justify-end">
          <Button onClick={onClose}>{t("close")}</Button>
        </div>
      </div>
    </div>
  );
};

const HistoryItem = ({ item }: { item: DocumentHistory }) => {
  const t = useTranslations("Documents");

  // Format the timestamp
  const formattedDate = item.timestamp.toLocaleDateString();
  const formattedTime = item.timestamp.toLocaleTimeString();

  // Get the appropriate icon based on the action
  let icon;
  switch (item.action) {
    case "upload":
      icon = (
        <div className="rounded-full bg-blue-100 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-blue-600"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
        </div>
      );
      break;
    case "update":
      icon = (
        <div className="rounded-full bg-green-100 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-green-600"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>
      );
      break;
    case "delete":
      icon = (
        <div className="rounded-full bg-red-100 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-red-600"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </div>
      );
      break;
    case "status_change":
      icon = (
        <div className="rounded-full bg-purple-100 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-purple-600"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
      );
      break;
    default:
      icon = (
        <div className="rounded-full bg-gray-100 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-gray-600"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
        </div>
      );
  }

  return (
    <div className="flex items-start space-x-4">
      {icon}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">{t(`action_${item.action}`)}</p>
            <p className="text-sm text-muted-foreground">{item.details}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
            <p className="text-xs text-muted-foreground">{formattedTime}</p>
          </div>
        </div>
        <p className="text-sm mt-1">
          {t("by")} <span className="font-medium">{item.userName}</span>
        </p>
      </div>
    </div>
  );
};