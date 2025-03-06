"use client";

import * as React from "react";
import { useRef, useState, useImperativeHandle } from "react";

import { cn } from "@/utils/Helpers";
import { Button } from "./button";

interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  value?: File | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  buttonText?: string;
  className?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, value, onChange, accept, buttonText = "Upload file", ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(value?.name || null);
    
    // Forward the ref to the parent component
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      if (file) {
        setFileName(file.name);
        onChange?.(file);
      } else {
        setFileName(null);
        onChange?.(null);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setFileName(null);
      onChange?.(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <div
          className="flex min-h-10 w-full cursor-pointer items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
          onClick={handleClick}
        >
          <span className={cn("truncate", fileName ? "text-foreground" : "text-muted-foreground")}>
            {fileName || "No file selected"}
          </span>
          <div className="flex items-center gap-2">
            {fileName && (
              <button
                type="button"
                className="rounded-full p-1 hover:bg-muted"
                onClick={handleClear}
                aria-label="Clear file"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            )}
            <Button type="button" variant="outline" size="sm">
              {buttonText}
            </Button>
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleChange}
          accept={accept}
          {...props}
        />
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput };