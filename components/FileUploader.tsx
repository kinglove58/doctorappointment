"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type fileUploaderProps = {
  files: File[] | undefined;
  onChange: (file: File[]) => void;
};

export const FileUploader = ({ files, onChange }: fileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="upload image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            alt="icons for upload"
            width={24}
            height={24}
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">click to upload</span> or drag
              and drop
            </p>
            <p>png, svg, jpg (max 800 X 400) </p>
          </div>
        </>
      )}
    </div>
  );
};
