"use client";

/**
 * Client-side service for interacting with the Autentique API through our backend API routes
 * This service makes HTTP requests to our Next.js API routes, which then communicate with Autentique
 */
export class AutentiqueClientService {
  /**
   * Creates a document in Autentique for signature through the backend API
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
      const response = await fetch('/api/autentique', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'createDocument',
          documentName,
          documentContent,
          signerName,
          signerEmail,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.documentId || null;
    } catch (error) {
      console.error("Error creating document in Autentique:", error);
      return null;
    }
  }

  /**
   * Generates agreement HTML through the backend API
   * @param agreement Legal agreement data
   * @returns HTML content of the agreement
   */
  public static async generateAgreementHtml(agreement: {
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
    signatureDate: string | undefined;
  }): Promise<string> {
    try {
      const response = await fetch('/api/autentique', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generateAgreementHtml',
          agreement,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.html || '';
    } catch (error) {
      console.error("Error generating agreement HTML:", error);
      return '';
    }
  }

  /**
   * Gets the status of a document through the backend API
   * @param documentId ID of the document
   * @returns Status of the document
   */
  public static async getDocumentStatus(documentId: string): Promise<string> {
    try {
      const response = await fetch('/api/autentique', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getDocumentStatus',
          documentId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.status || 'ERROR';
    } catch (error) {
      console.error("Error getting document status:", error);
      return "ERROR";
    }
  }

  /**
   * Gets the signed document URL through the backend API
   * @param documentId ID of the document
   * @returns URL of the signed document
   */
  public static async getSignedDocumentUrl(documentId: string): Promise<string | null> {
    try {
      const response = await fetch('/api/autentique', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getSignedDocumentUrl',
          documentId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.url || null;
    } catch (error) {
      console.error("Error getting signed document URL:", error);
      return null;
    }
  }
}