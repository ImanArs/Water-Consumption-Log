"use client";

import { useState } from "react";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function SettingsPage() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  return (
    <Layout>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-dark-brown fade-in">Settings</h1>

        <Card className="fade-in delay-100">
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {["privacy", "terms"].map((section) => (
              <Button
                key={section}
                variant="ghost"
                className="w-full justify-between items-center text-left"
                onClick={() => setOpenDialog(section)}
              >
                <span>
                  {section === "privacy" && "Privacy Policy"}
                  {section === "terms" && "Terms of Use"}
                </span>
                <ChevronRight className="h-5 w-5" />
              </Button>
            ))}
          </CardContent>
        </Card>

        {["privacy", "terms"].map((section) => (
          <Dialog
            key={section}
            open={openDialog === section}
            onOpenChange={(open) => !open && setOpenDialog(null)}
          >
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {section === "privacy" && "Privacy Policy"}
                  {section === "terms" && "Terms of Use"}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="max-h-[60vh] overflow-y-auto">
                {section === "privacy" && (
                  <iframe
                    src="https://www.termsfeed.com/live/6fd2940c-4644-4531-b92b-a93a83d8a7d5"
                    frameBorder="0"
                    className="w-full h-[60vh]"
                  ></iframe>
                )}
                {section === "terms" && (
                  <iframe
                    src="https://www.termsfeed.com/live/27e7b64e-e0c6-4cd2-aa11-efa35d1198f8"
                    frameBorder="0"
                    className="w-full h-[60vh]"
                  ></iframe>
                )}
              </DialogDescription>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </Layout>
  );
}
