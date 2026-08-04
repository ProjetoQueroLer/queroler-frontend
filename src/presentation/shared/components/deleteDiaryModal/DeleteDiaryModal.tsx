'use client';

import { useEffect, useRef } from 'react';

interface DeleteDiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteDiaryModal({ isOpen, onClose }: DeleteDiaryModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} onClose={onClose}>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
        <div className="bg-card-bg border border-border rounded-2xl p-6 w-full max-w-sm flex flex-col items-center gap-4 relative">
          <div className="text-start">
            <h2 className="text-text-primary font-semibold text-base mb-1">
              Aviso
            </h2>
            <div className="h-px bg-text-primary/50" />
            <p className="text-text-primary text-sm pt-3">
              Ao excluir a sua leitura, todas as informações serão perdidas.
            </p>
            <p className="text-text-primary text-sm pt-3 pb-10">
              Confirmar a exclusão da leitura?
            </p>
          </div>

          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 text-sm text-text-primary bg-secondary-button border border-border rounded-lg hover:opacity-80 cursor-pointer"
            >
              Cancelar
            </button>
            <button className="flex-1 py-2 text-sm text-white bg-brand rounded-lg hover:brightness-110 cursor-pointer font-medium">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
