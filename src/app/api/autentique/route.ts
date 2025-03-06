import { NextRequest, NextResponse } from 'next/server';
import { AutentiqueService } from '@/features/visa/AutentiqueService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    // Ensure the API token is only used server-side
    if (!process.env.AUTENTIQUE_TOKEN) {
      console.error('No Autentique token found. Please set the AUTENTIQUE_TOKEN environment variable.');
      return NextResponse.json(
        { error: 'Autentique token is required' },
        { status: 500 }
      );
    }

    switch (action) {
      case 'createDocument': {
        const { documentName, documentContent, signerName, signerEmail } = params;
        
        console.log('Creating document in Autentique:', {
          documentName,
          signerName,
          signerEmail,
          contentLength: documentContent.length,
        });
        
        // Call the Autentique service to create the document
        const documentId = await AutentiqueService.createDocument(
          documentName,
          documentContent,
          signerName,
          signerEmail
        );
        
        if (!documentId) {
          return NextResponse.json(
            { error: 'Failed to create document in Autentique' },
            { status: 500 }
          );
        }
        
        return NextResponse.json({ documentId });
      }
      
      case 'getDocumentStatus': {
        const { documentId } = params;
        
        console.log('Getting document status:', documentId);
        
        // Call the Autentique service to get the document status
        const status = await AutentiqueService.getDocumentStatus(documentId);
        
        return NextResponse.json({ status });
      }
      
      case 'getSignedDocumentUrl': {
        const { documentId } = params;
        
        console.log('Getting signed document URL:', documentId);
        
        // Call the Autentique service to get the signed document URL
        const url = await AutentiqueService.getSignedDocumentUrl(documentId);
        
        if (!url) {
          return NextResponse.json(
            { error: 'Failed to get signed document URL' },
            { status: 500 }
          );
        }
        
        return NextResponse.json({ url });
      }
      
      case 'generateAgreementHtml': {
        const { agreement } = params;
        
        // Call the Autentique service to generate the agreement HTML
        const html = AutentiqueService.generateAgreementHtml(agreement);
        
        return NextResponse.json({ html });
      }
      
      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in Autentique API route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}