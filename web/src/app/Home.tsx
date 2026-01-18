import { useState } from "react";
import { UploadEmailForm } from "../components/home/UploadEmailForm";
import { EmailAnalysis } from "../components/home/EmailAnalysis";

export function Home() {
  const [emailAnalysis, setEmailAnalysis] = useState<EmailAnalysisResponse | null>(null);

  function handleSetEmailAnalysis(emailAnalysis: EmailAnalysisResponse | null) {
    setEmailAnalysis(emailAnalysis)
  }

  return (
    <main className="py-12 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <UploadEmailForm handleSetEmailAnalysis={handleSetEmailAnalysis} />

        {emailAnalysis && (
          <EmailAnalysis emailAnalysis={emailAnalysis} />
        )}
      </div>
    </main>
  )
}