"use client";

import { TGuestItem } from "@/typings";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoreVertical } from "lucide-react";
import UpdateResponseForm from "./UpdateResponseForm";

type ResponseActionButtonProps = {
  guest: TGuestItem;
};

function ResponseActionButton({ guest }: ResponseActionButtonProps) {
  const [open, setIsOpenEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setIsOpen(false);
              setIsOpenEdit(true);
            }}
          >
            Edit Guest Response
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setIsOpenEdit}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit {guest.name}</DialogTitle>
            <DialogDescription>Fill up all required fields</DialogDescription>
          </DialogHeader>
          {guest && (
            <UpdateResponseForm
              guest={guest}
              setClose={() => setIsOpenEdit(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ResponseActionButton;
