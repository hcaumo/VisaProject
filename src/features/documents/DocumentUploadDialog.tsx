"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/file-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Document, DocumentStatus, DocumentType } from "@/models/Document";

interface DocumentUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  documentToReplace?: Document;
  onUpload: (document: Document) => void;
}

// Form schema for document upload
const uploadFormSchema = z.object({
  name: z.string().min(1, "Document name is required"),
  type: z.nativeEnum(DocumentType, {
    required_error: "Document type is required",
  }),
  file: z.instanceof(File, { message: "File is required" }),
  notes: z.string().optional(),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

export const DocumentUploadDialog = ({
  isOpen,
  onClose,
  userId,
  documentToReplace,
  onUpload,
}: DocumentUploadDialogProps) => {
  const t = useTranslations("Documents");
  const [isUploading, setIsUploading] = useState(false);

  // Initialize form with default values or values from document to replace
  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: documentToReplace
      ? {
          name: documentToReplace.name,
          type: documentToReplace.type,
          notes: documentToReplace.notes || "",
        }
      : {
          name: "",
          notes: "",
        },
  });

  const onSubmit = (values: UploadFormValues) => {
    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      // Create a new document object
      const newDocument: Document = {
        id: documentToReplace?.id || `doc-${Date.now()}`,
        name: values.name,
        type: values.type,
        status: DocumentStatus.PENDING,
        uploadedAt: new Date(),
        updatedAt: documentToReplace ? new Date() : undefined,
        fileUrl: URL.createObjectURL(values.file),
        fileSize: values.file.size,
        mimeType: values.file.type,
        userId,
        notes: values.notes,
        history: [
          ...(documentToReplace?.history || []),
          {
            id: `hist-${Date.now()}`,
            action: documentToReplace ? "update" : "upload",
            timestamp: new Date(),
            userId,
            userName: "Current User", // In a real app, get this from auth context
            details: documentToReplace
              ? "Document updated"
              : "Document uploaded",
          },
        ],
      };

      onUpload(newDocument);
      setIsUploading(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            {documentToReplace ? t("replace_document") : t("upload_document")}
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("document_name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("enter_document_name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("document_type")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!!documentToReplace}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select_document_type")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(DocumentType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {t(`document_type_${type}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {documentToReplace
                      ? t("cannot_change_document_type")
                      : t("select_appropriate_document_type")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>{t("file")}</FormLabel>
                  <FormControl>
                    <FileInput
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      buttonText={t("select_file")}
                      value={value as File | null}
                      onChange={onChange}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("supported_file_types")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("notes")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("optional_notes")} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t("notes_description")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isUploading}
              >
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {documentToReplace ? t("replacing") : t("uploading")}
                  </>
                ) : documentToReplace ? (
                  t("replace")
                ) : (
                  t("upload")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};