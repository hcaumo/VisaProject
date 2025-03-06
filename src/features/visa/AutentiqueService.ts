/**
 * Service for integrating with the Autentique API for digital signatures
 * Documentation: https://docs.autentique.com.br/api/
 *
 * This service is meant to be used only on the server-side
 */
export class AutentiqueService {
  // API URL for future implementation
  // private static readonly API_URL = "https://api.autentique.com.br/v2";
  // Token for future implementation
  // private static readonly TOKEN = process.env.AUTENTIQUE_TOKEN || "";

  /**
   * Creates a document in Autentique for signature
   * @param documentName Name of the document
   * @param documentContent Content of the document in HTML format
   * @param signerName Name of the signer
   * @param signerEmail Email of the signer
   * @returns Document ID if successful
   */
  public static async createDocument(
    documentName: string,
    documentContent: string,
    signerName: string,
    signerEmail: string
  ): Promise<string | null> {
    try {
      // This is a simplified version for demonstration
      // In a real implementation, you would use the Autentique GraphQL API
      
      // For now, we'll simulate the API call and return a mock document ID
      console.log("Creating document in Autentique:", {
        documentName,
        signerName,
        signerEmail,
        contentLength: documentContent.length,
      });
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Return a mock document ID
      return `doc-${Math.random().toString(36).substring(2, 10)}`;
    } catch (error) {
      console.error("Error creating document in Autentique:", error);
      return null;
    }
  }

  /**
   * Converts the legal agreement template to HTML format
   * @param agreement Legal agreement data
   * @returns HTML content of the agreement
   */
  public static generateAgreementHtml(agreement: {
    clientName: string;
    clientMaritalStatus: string;
    clientNationality: string;
    clientDocumentType: string;
    clientDocumentNumber: string;
    clientDocumentIssuer: string;
    clientDocumentExpiryDate: string;
    clientAddress: string;
    clientTaxId: string;
    clientPhone: string;
    clientEmail: string;
    consultantName: string;
    serviceDescription: string;
    serviceValue: number;
    signatureLocation: string;
    signatureDate: string;
  }): string {
    // Convert the agreement template to HTML
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            h1 { text-align: center; font-size: 18px; margin-bottom: 20px; }
            .signature { margin-top: 50px; display: flex; justify-content: space-between; }
            .signature-line { border-top: 1px solid #000; width: 200px; text-align: center; }
          </style>
        </head>
        <body>
          <h1>AGREEMENT ON PROVISION OF LEGAL SERVICES</h1>
          
          <p>
            <strong>${agreement.clientName}</strong>, ${agreement.clientMaritalStatus}, ${agreement.clientNationality}, 
            holder of ${agreement.clientDocumentType} n.º ${agreement.clientDocumentNumber}, 
            issued by the ${agreement.clientDocumentIssuer} valid until ${agreement.clientDocumentExpiryDate}, 
            with habitual residence at ${agreement.clientAddress}, Tax Number ID ${agreement.clientTaxId}, 
            mobile phone nr. ${agreement.clientPhone}, email ${agreement.clientEmail}, 
            hereby referred to as CLIENT; and,
          </p>
          
          <p>
            <strong>${agreement.consultantName}</strong>, with professional domiciled at 
            Rua Fialho de Almeida, 14, 2º Esq., Esc. DP5, Avenidas Novas, CP 1070-129, Lisbon, Portugal, 
            mobile nr. +351 915663246, e-mail info@advogadoszr.com, hereby simply referred to as CONSULTANT.
          </p>
          
          <p>
            In consideration of the mutual covenants herein contained and other good and valuable consideration, 
            the receipt and sufficiency of which are hereby acknowledged, the parties hereto agree as follows:
          </p>
          
          <p>
            <strong>FIRST CLAUSE:</strong> The CONSULTANT agrees to provide the CLIENT with the follow legal 
            assistance services: ${agreement.serviceDescription}
          </p>
          
          <p>
            <strong>CLAUSE TWO:</strong> The CLIENT shall pay as fees to the CONSULTANT the amount of 
            ${agreement.serviceValue} € by transfer to the bank account. The receipt will provide proof of payment.
          </p>
          
          <p>
            <strong>First Paragraph:</strong> This payment does not include the legal fees charged by public or 
            private services, such as the Portuguese Consulate, VFS or AIMA, for visa and residence permit applications.
          </p>
          
          <p>
            <strong>Second Paragraph:</strong> The remuneration outlined in the first paragraph constitutes a best 
            endeavours contract, which implies that the CONSULTANT is obliged to conduct himself in a diligent, 
            attentive, and probity-driven manner in the execution of the professional duties for which he has been contracted.
          </p>
          
          <p>
            <strong>THIRD CLAUSE:</strong> The CLIENT is dedicated to furnishing the CONSULTANT with all the requisite 
            elements for the development of the service in question. This entails providing the CONSULTANT with all the 
            information, materials, and support necessary for the optimal realisation of the objective that has been agreed upon.
          </p>
          
          <p>
            <strong>FOURTH CLAUSE:</strong> The CLIENT shall advance the necessary funds to cover all administrative and 
            related expenses. The CONSULTANT shall provide receipts and detailed records for all expenses incurred, 
            either upon request or at the conclusion of the matter.
          </p>
          
          <p>
            <strong>FIFTH CLAUSE:</strong> The services are limited to the Lisbon area. Any services requiring travel 
            outside of this geographic area, including but not limited to representation in administrative actions or appeals, 
            will be subject to additional transport and/or accommodation expenses, as provided in Clause Four.
          </p>
          
          <p>
            <strong>SIXTH CLAUSE:</strong> This agreement will remain in effect for a period of one year, unless its purpose 
            is fulfilled prior to that time. It will be automatically extended for successive one-year periods, unless 
            terminated by either party with fifteen days' written notice via electronic communication or registered letter.
          </p>
          
          <p>
            <strong>SEVENTH CLAUSE:</strong> In the event of termination, withdrawal of representation, or cancellation of 
            the agreement by the CLIENT, no refund of any fees paid shall be made. Additionally, the CLIENT remains liable 
            for any outstanding fees as provided under Clause Two.
          </p>
          
          <p>
            <strong>EIGHTH CLAUSE:</strong> The resolution of the contract by a declaration of the CONSULTANT before the 
            period provided in Clause Six or before obligates the CONSULTANT to restitute the received amounts. However, 
            the CONSULTANT may deduct the proportional amount referring to the services already provided, when applicable.
          </p>
          
          <p>
            <strong>NINTH CLAUSE:</strong> The CLIENT consents to the CONSULTANT creating an email account in the CLIENT's 
            name, reproducing, and using identification documents and personal data necessary for the execution of this 
            agreement, in accordance with the General Data Protection Regulation (GDPR). The CONSULTANT undertakes to 
            maintain the confidentiality of all documents and information provided under this agreement, using them 
            exclusively for the intended purposes and in strict compliance with the applicable data protection regulations.
          </p>
          
          <p>
            <strong>TENTH CLAUSE:</strong> This Agreement shall be governed by and construed in accordance with the laws 
            of Portugal. The parties agree that the courts of Lisbon shall have exclusive jurisdiction over any disputes 
            arising from this Agreement. The parties expressly waive any other jurisdiction. All formal notices may be 
            sent to the parties' designated email addresses or by registered mail.
          </p>
          
          <p>
            This agreement is executed digitally, and each party acknowledges that their electronic signature constitutes 
            a binding agreement with the same legal effect as a handwritten signature. This digital execution guarantees 
            the authenticity of this agreement and ensures that it is considered an official version with equal legal standing.
          </p>
          
          <p>${agreement.signatureLocation}, ${agreement.signatureDate}.</p>
          
          <div class="signature">
            <div>
              <div class="signature-line">CONSULTANT</div>
            </div>
            <div>
              <div class="signature-line">CLIENT</div>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  /**
   * Gets the status of a document
   * @param documentId ID of the document
   * @returns Status of the document
   */
  public static async getDocumentStatus(documentId: string): Promise<string> {
    try {
      // Simulate API call
      console.log("Getting document status:", documentId);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Return a mock status
      return "PENDING";
    } catch (error) {
      console.error("Error getting document status:", error);
      return "ERROR";
    }
  }

  /**
   * Gets the signed document URL
   * @param documentId ID of the document
   * @returns URL of the signed document
   */
  public static async getSignedDocumentUrl(documentId: string): Promise<string | null> {
    try {
      // Simulate API call
      console.log("Getting signed document URL:", documentId);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Return a mock URL
      return `https://app.autentique.com.br/documento/${documentId}`;
    } catch (error) {
      console.error("Error getting signed document URL:", error);
      return null;
    }
  }
}