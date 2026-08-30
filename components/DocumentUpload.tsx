"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, FileText, X } from "lucide-react";
import { DOCUMENT_SLOTS, type DocumentType } from "@/lib/mock-data";

interface UploadedFiles {
  [key: string]: { name: string; uploaded: boolean };
}

export default function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFiles>({});
  const [dragOver, setDragOver] = useState<DocumentType | null>(null);

  const handleDrop = useCallback(
    (id: DocumentType, e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(null);
      const file = e.dataTransfer.files[0];
      if (file) {
        setFiles((prev) => ({
          ...prev,
          [id]: { name: file.name, uploaded: true },
        }));
      }
    },
    []
  );

  const handleFileSelect = (id: DocumentType, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [id]: { name: file.name, uploaded: true },
      }));
    }
  };

  const removeFile = (id: DocumentType) => {
    setFiles((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const requiredDocs = DOCUMENT_SLOTS.filter((d) => d.required);
  const uploadedRequired = requiredDocs.filter((d) => files[d.id]?.uploaded).length;
  const optionalUploaded = files.cv?.uploaded ? 1 : 0;
  const totalRequired = requiredDocs.length;
  const completionPercent = Math.round(
    ((uploadedRequired + optionalUploaded * 0.25) / (totalRequired + 0.25)) * 100
  );

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">
            Complétion du dossier
          </span>
          <span className="text-sm font-bold text-electric">{completionPercent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-night-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-electric-dark to-electric"
          />
        </div>
        {completionPercent >= 75 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 flex items-center gap-1 text-xs text-green-400"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Dossier presque complet — tu peux postuler !
          </motion.p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {DOCUMENT_SLOTS.map((slot, i) => {
          const uploaded = files[slot.id]?.uploaded;
          return (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(slot.id);
              }}
              onDragLeave={() => setDragOver(null)}
              onDrop={(e) => handleDrop(slot.id, e)}
              className={`relative rounded-xl border-2 border-dashed p-5 transition-all ${
                uploaded
                  ? "border-green-500/40 bg-green-500/5"
                  : dragOver === slot.id
                    ? "border-electric/60 bg-electric/5"
                    : "border-night-border bg-night-card/50 hover:border-night-muted"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    uploaded ? "bg-green-500/20" : "bg-night-muted"
                  }`}
                >
                  {uploaded ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  ) : (
                    <FileText className="h-5 w-5 text-slate-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">{slot.label}</h4>
                    {!slot.required && (
                      <span className="rounded bg-night-muted px-1.5 py-0.5 text-[10px] text-slate-500">
                        Optionnel
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">{slot.description}</p>

                  {uploaded ? (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="truncate text-xs text-green-400">
                        {files[slot.id].name}
                      </span>
                      <button
                        onClick={() => removeFile(slot.id)}
                        className="shrink-0 text-slate-500 hover:text-red-400"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-night-border bg-night-muted/50 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-electric/40 hover:text-electric">
                      <Upload className="h-3.5 w-3.5" />
                      Choisir un fichier
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileSelect(slot.id, e)}
                      />
                    </label>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
