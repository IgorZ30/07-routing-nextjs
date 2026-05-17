"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ModalPage({ params }: Props) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview params={params} />
    </Modal>
  );
}
