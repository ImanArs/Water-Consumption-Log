"use client";

import { useState } from "react";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export default function SettingsPage() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleOpenDialog = (section: string) => {
    setOpenDialog(section);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  return (
    <Layout>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-dark-brown fade-in">Settings</h1>

        <Card className="fade-in delay-100">
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-between items-center text-left"
              onClick={() => handleOpenDialog("privacy")}
            >
              <span>Privacy Policy</span>
              <ChevronRight className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between items-center text-left"
              onClick={() => handleOpenDialog("terms")}
            >
              <span>Terms of Use</span>
              <ChevronRight className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between items-center text-left"
              onClick={() => handleOpenDialog("support")}
            >
              <span>Support</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>

        <Dialog
          open={openDialog === "privacy"}
          onOpenChange={handleCloseDialog}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>Privacy Policy</span>
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="max-h-[60vh] overflow-y-auto">
              <p className="mb-4">
                This Privacy Policy describes how your personal information is
                collected, used, and shared when you use the Water Consumption
                Log application.
              </p>
              <h3 className="font-bold mb-2">Information We Collect</h3>
              <p className="mb-4">
                We collect data that you input into the application, including
                water consumption records and chicken counts. This data is
                stored locally on your device and is not transmitted to our
                servers.
              </p>
              <h3 className="font-bold mb-2">How We Use Your Information</h3>
              <p className="mb-4">
                The information collected is used solely to provide the
                functionality of the application, including tracking water
                consumption, generating charts, and providing recommendations.
              </p>
              <h3 className="font-bold mb-2">Data Storage</h3>
              <p>
                All data is stored locally on your device using localStorage. We
                do not collect, store, or process your data on our servers.
              </p>
            </DialogDescription>
          </DialogContent>
        </Dialog>

        <Dialog open={openDialog === "terms"} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>Terms of Use</span>
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="max-h-[60vh] overflow-y-auto">
              <p className="mb-4">
                By using the Water Consumption Log application, you agree to
                these Terms of Use.
              </p>
              <h3 className="font-bold mb-2">License</h3>
              <p className="mb-4">
                We grant you a limited, non-exclusive, non-transferable license
                to use the application for your personal, non-commercial
                purposes.
              </p>
              <h3 className="font-bold mb-2">Restrictions</h3>
              <p className="mb-4">
                You may not: (a) copy, modify, or create derivative works based
                on the application; (b) distribute, transfer, sublicense, lease,
                lend, or rent the application to any third party; (c) reverse
                engineer, decompile, or disassemble the application.
              </p>
              <h3 className="font-bold mb-2">Disclaimer</h3>
              <p>
                The application is provided "as is" without warranty of any
                kind. We do not guarantee that the application will be
                error-free or uninterrupted, or that any defects will be
                corrected.
              </p>
            </DialogDescription>
          </DialogContent>
        </Dialog>

        <Dialog
          open={openDialog === "support"}
          onOpenChange={handleCloseDialog}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>Support</span>
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="max-h-[60vh] overflow-y-auto">
              <p className="mb-4">
                If you need assistance with the Water Consumption Log
                application, please contact our support team.
              </p>
              <h3 className="font-bold mb-2">Contact Information</h3>
              <p className="mb-4">
                Email: support@waterlog.example.com
                <br />
                Phone: +1 (555) 123-4567
              </p>
              <h3 className="font-bold mb-2">Hours of Operation</h3>
              <p className="mb-4">Monday - Friday: 9:00 AM - 5:00 PM EST</p>
              <h3 className="font-bold mb-2">Frequently Asked Questions</h3>
              <p>
                For common issues and questions, please visit our FAQ page at
                www.waterlog.example.com/faq
              </p>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
