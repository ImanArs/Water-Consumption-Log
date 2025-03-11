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
            {["privacy", "terms", "support"].map((section) => (
              <Button
                key={section}
                variant="ghost"
                className="w-full justify-between items-center text-left"
                onClick={() => setOpenDialog(section)}
              >
                <span>
                  {section === "privacy"
                    ? "Privacy Policy"
                    : section === "terms"
                    ? "Terms of Use"
                    : "Support"}
                </span>
                <ChevronRight className="h-5 w-5" />
              </Button>
            ))}
          </CardContent>
        </Card>

        {["privacy", "terms", "support"].map((section) => (
          <Dialog
            key={section}
            open={openDialog === section}
            onOpenChange={(open) => !open && setOpenDialog(null)}
          >
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {section === "privacy"
                    ? "Privacy Policy"
                    : section === "terms"
                    ? "Terms of Use"
                    : "Support"}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="max-h-[60vh] overflow-y-auto">
                {section === "privacy" && (
                  <>
                    <p className="mb-4">
                      This Privacy Policy describes how your personal
                      information is collected, used, and shared when you use
                      the Water Consumption Log application.
                    </p>
                    <h3 className="font-bold mb-2">Information We Collect</h3>
                    <p className="mb-4">
                      We collect data that you input into the application,
                      including water consumption records and chicken counts.
                      This data is stored locally on your device and is not
                      transmitted to our servers.
                    </p>
                    <h3 className="font-bold mb-2">
                      How We Use Your Information
                    </h3>
                    <p className="mb-4">
                      The information collected is used solely to provide the
                      functionality of the application, including tracking water
                      consumption, generating charts, and providing
                      recommendations.
                    </p>
                  </>
                )}
                {section === "terms" && (
                  <>
                    <p className="mb-4">
                      By using the Water Consumption Log application, you agree
                      to these Terms of Use.
                    </p>
                    <h3 className="font-bold mb-2">License</h3>
                    <p className="mb-4">
                      We grant you a limited, non-exclusive, non-transferable
                      license to use the application for your personal,
                      non-commercial purposes.
                    </p>
                    <h3 className="font-bold mb-2">Restrictions</h3>
                    <p className="mb-4">
                      You may not: (a) copy, modify, or create derivative works
                      based on the application; (b) distribute, transfer,
                      sublicense, lease, lend, or rent the application to any
                      third party; (c) reverse engineer, decompile, or
                      disassemble the application.
                    </p>
                  </>
                )}
                {section === "support" && (
                  <>
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
                    <p className="mb-4">
                      Monday - Friday: 9:00 AM - 5:00 PM EST
                    </p>
                  </>
                )}
              </DialogDescription>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </Layout>
  );
}
