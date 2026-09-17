const fs = require('fs');

const path = 'src/app/(dashboard)/client/ClientDashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add KYC banner
const bannerStr = `
            {/* KYC Alert Banner */}
            {user.kycStatus !== "VERIFIED" && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-3">
                  <div className="mt-0.5"><AlertCircle className="w-5 h-5 text-amber-600" /></div>
                  <div>
                    <h4 className="font-semibold text-amber-900 text-sm">
                      {user.kycStatus === "REJECTED" ? "KYC Rejected" : "Complete your KYC"}
                    </h4>
                    <p className="text-sm text-amber-700 mt-0.5">
                      {profile?.kycRejectionReason 
                        ? \`Reason: \${profile.kycRejectionReason}. Please resubmit your documents.\`
                        : "As per regulations, please submit your PAN and GST details to complete onboarding."}
                    </p>
                  </div>
                </div>
                <Button onClick={() => window.document.getElementById('kyc-tab-trigger')?.click()} variant="outline" className="shrink-0 bg-white border-amber-200 text-amber-700 hover:bg-amber-100">
                  Submit KYC Now
                </Button>
              </div>
            )}
`;
content = content.replace(
  '<TabsContent value="dashboard" className="m-0 space-y-6">',
  '<TabsContent value="dashboard" className="m-0 space-y-6">\n' + bannerStr
);

// 2. Add id to profile tab trigger
content = content.replace(
  '<TabsTrigger value="profile"',
  '<TabsTrigger id="kyc-tab-trigger" value="profile"'
);

// 3. Add state for KYC form
const stateStr = `
  const [avatar, setAvatar] = useState<string | null>(user.image || null)
  const [kycLoading, setKycLoading] = useState(false)
`;
content = content.replace(
  'const [avatar, setAvatar] = useState<string | null>(user.image || null)',
  stateStr
);

// 4. Add submit KYC function
const submitStr = `
  const handleKycSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKycLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch('/api/kyc', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      window.location.reload();
    } catch (err) {
      alert(err);
    } finally {
      setKycLoading(false);
    }
  }
`;
content = content.replace(
  'const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {',
  submitStr + '\n\n  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {'
);

// 5. Add KYC Form inside Profile tab
const kycFormStr = `
            {user.kycStatus !== "VERIFIED" && (
              <Card className="border-slate-200 shadow-sm mt-6">
                <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
                  <CardTitle className="text-lg">KYC Document Upload</CardTitle>
                  <CardDescription>Submit your PAN and GST documents securely.</CardDescription>
                </CardHeader>
                <form action={async (formData) => {
                  setKycLoading(true);
                  try {
                    const { submitKyc } = await import("@/app/actions/kyc");
                    await submitKyc(formData);
                    window.location.reload();
                  } catch (e: any) {
                    alert(e.message);
                    setKycLoading(false);
                  }
                }}>
                  <CardContent className="grid gap-6 md:grid-cols-2 p-8">
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-slate-700">PAN Number *</label>
                      <Input name="panNumber" required placeholder="ABCDE1234F" className="font-mono uppercase" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-slate-700">PAN Document (PDF/JPG) *</label>
                      <Input name="panFile" type="file" required accept=".pdf,.jpg,.jpeg,.png" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-slate-700">GSTIN (Optional)</label>
                      <Input name="gstin" placeholder="22AAAAA0000A1Z5" className="font-mono uppercase" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-slate-700">GST Document (PDF/JPG)</label>
                      <Input name="gstFile" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                    </div>
                  </CardContent>
                  <div className="p-6 border-t border-slate-100 flex justify-end">
                    <Button type="submit" disabled={kycLoading}>
                      {kycLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Submit KYC for Verification
                    </Button>
                  </div>
                </form>
              </Card>
            )}
`;
content = content.replace(
  '</TabsContent>\n\n        </div>',
  kycFormStr + '\n          </TabsContent>\n\n        </div>'
);

fs.writeFileSync(path, content, 'utf8');
