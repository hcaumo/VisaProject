"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Document,
  formatFileSize,
  getDocumentTypeDisplayName,
  getStatusColor,
  mockDocuments,
} from "@/models/Document";
import { cn } from "@/utils/Helpers";

import { DocumentHistoryDialog } from "@/features/documents/DocumentHistoryDialog";
import { DocumentUploadDialog } from "@/features/documents/DocumentUploadDialog";

interface DocumentListProps {
  userId: string;
}

export const DocumentList = ({ userId }: DocumentListProps) => {
  const t = useTranslations("Documents");
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isReplaceDialogOpen, setIsReplaceDialogOpen] = useState(false);

  // Filter documents by the current user
  const userDocuments = documents.filter((doc) => doc.userId === userId);

  const handleDeleteDocument = (documentId: string) => {
    if (window.confirm(t("confirm_delete"))) {
      setDocuments(documents.filter((doc) => doc.id !== documentId));
    }
  };

  const handleViewHistory = (document: Document) => {
    setSelectedDocument(document);
    setIsHistoryDialogOpen(true);
  };

  const handleReplaceDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsReplaceDialogOpen(true);
  };

  const handleUploadDocument = () => {
    setIsUploadDialogOpen(true);
  };

  // Group documents by type
  const documentsByType = userDocuments.reduce<Record<string, Document[]>>(
    (acc, document) => {
      const type = document.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(document);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t("my_documents")}</h2>
        <Button onClick={handleUploadDocument}>{t("upload_document")}</Button>
      </div>

      {Object.keys(documentsByType).length === 0 ? (
        <div className="text-center py-10 bg-muted rounded-lg">
          <h3 className="text-lg font-medium">{t("no_documents")}</h3>
          <p className="text-muted-foreground mt-1">{t("upload_first_document")}</p>
          <Button onClick={handleUploadDocument} className="mt-4">
            {t("upload_document")}
          </Button>
        </div>
      ) : (
        Object.entries(documentsByType).map(([type, docs]) => (
          <div key={type} className="space-y-3">
            <h3 className="text-xl font-semibold">
              {getDocumentTypeDisplayName(type as any)}
            </h3>
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">{t("document_name")}</th>
                      <th className="px-4 py-3 text-left font-medium">{t("uploaded")}</th>
                      <th className="px-4 py-3 text-left font-medium">{t("size")}</th>
                      <th className="px-4 py-3 text-left font-medium">{t("status")}</th>
                      <th className="px-4 py-3 text-right font-medium">{t("actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {docs.map((doc) => (
                      <tr key={doc.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <DocumentIcon mimeType={doc.mimeType} />
                            <span className="font-medium">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {doc.uploadedAt.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {formatFileSize(doc.fileSize)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                              getStatusColor(doc.status)
                            )}
                          >
                            {t(`status_${doc.status}`)}
                          </span>
                          {doc.notes && (
                            <p className="text-xs text-muted-foreground mt-1">{doc.notes}</p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewHistory(doc)}
                            >
                              {t("history")}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReplaceDocument(doc)}
                            >
                              {t("replace")}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteDocument(doc.id)}
                            >
                              {t("delete")}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))
      )}

      {selectedDocument && (
        <DocumentHistoryDialog
          document={selectedDocument}
          isOpen={isHistoryDialogOpen}
          onClose={() => setIsHistoryDialogOpen(false)}
        />
      )}

      <DocumentUploadDialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        userId={userId}
        onUpload={(newDoc: Document) => {
          setDocuments([...documents, newDoc]);
          setIsUploadDialogOpen(false);
        }}
      />

      {selectedDocument && (
        <DocumentUploadDialog
          isOpen={isReplaceDialogOpen}
          onClose={() => setIsReplaceDialogOpen(false)}
          userId={userId}
          documentToReplace={selectedDocument}
          onUpload={(newDoc: Document) => {
            setDocuments(
              documents.map((doc) => (doc.id === selectedDocument.id ? newDoc : doc))
            );
            setIsReplaceDialogOpen(false);
          }}
        />
      )}
    </div>
  );
};

// Helper component to display document icon based on mime type
const DocumentIcon = ({ mimeType }: { mimeType: string }) => {
  let icon = (
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
      className="h-5 w-5 text-muted-foreground"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );

  if (mimeType.startsWith("image/")) {
    icon = (
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
        className="h-5 w-5 text-muted-foreground"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    );
  } else if (mimeType === "application/pdf") {
    icon = (
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
        className="h-5 w-5 text-red-500"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15v-6h6" />
        <path d="M9 15v-6h6" />
        <path d="M9 12h6" />
      </svg>
    );
  }

  return icon;
};